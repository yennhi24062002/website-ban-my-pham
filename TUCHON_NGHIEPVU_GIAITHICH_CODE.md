# 📋 TÀI LIỆU NGHIỆP VỤ VÀ GIẢI THÍCH MÃ NGUỒN (CODE)
## HỆ THỐNG WEBSITE BÁN MỸ PHẨM TỰ ĐỘNG

**Sinh viên:** Phạm Yến Nhi — **MSSV:** DH52201160  
**GVHD:** ThS. Hà Văn Tùng  
**Công nghệ:** React.js + Node.js (Express) + MySQL (TiDB Cloud)  

---

## 1. 🛍️ CHỨC NĂNG ĐẶT HÀNG & THANH TOÁN

### Diễn giải nghiệp vụ
Khách hàng duyệt danh sách sản phẩm (16 sản phẩm gồm Chăm sóc da, Làm sạch, Chống nắng, Son môi...), chọn biến thể (Dung tích/Màu sắc), nhập thông tin người nhận và chọn phương thức thanh toán (Tiền mặt COD hoặc Chuyển khoản QR Code).

### Mã Serial Voucher độc nhất
- Mỗi lượt cấp voucher cho người dùng tạo ra một **`ma_serial` duy nhất** (Ví dụ: `VC-YSI93J91`, `VC-LEGACY-S65MLU`).
- Khách hàng áp dụng mã này khi đặt hàng. Hệ thống xác minh mã serial + kiểm tra `sudung = 0` và điều kiện giá trị tối thiểu của đơn.

### Code luồng chính (`server/controller/order.controller.js`)

```js
// [1] Lấy email người dùng để gửi mail thông báo sau khi tạo đơn
const [userRows] = await conn.query(
  "SELECT email FROM nguoidung WHERE manguoidung = ? LIMIT 1", [manguoidung]
);
const userEmail = userRows.length ? userRows[0].email : null;

// [2] Khởi tạo Transaction — Đảm bảo toàn vẹn dữ liệu
await conn.beginTransaction();

// [3] Tạo đơn hàng mới với trạng thái choxacnhan
[orderResult] = await conn.query(
  `INSERT INTO donhang (manguoidung, tennguoinhan, sodienthoainhan, diachigiaohang, tongtien, trangthaidonhang, trangthaithanhtoan, ghichu)
   VALUES (?, ?, ?, ?, 0, 'choxacnhan', ?, ?)`,
  [manguoidung, tennguoinhan, sodienthoainhan, diachigiaohang, trangthaiThanhToan, ghichu]
);
const madonhang = orderResult.insertId;

// [4] Duyệt từng sản phẩm trong giỏ hàng và khoá dòng tồn kho
for (const item of items) {
  // Khoá dòng kiểm tra tồn kho biến thể chống tranh chấp (FOR UPDATE)
  const [variantRows] = await conn.query(
    "SELECT * FROM luachon_sanpham WHERE maluachon = ? FOR UPDATE",
    [item.maluachon]
  );
  if (variantRows[0].soluongton < item.soluong) {
    throw new Error("Không đủ tồn kho!");
  }

  // Thêm chi tiết đơn hàng
  await conn.query(
    "INSERT INTO chitietdonhang (madonhang, masanpham, maluachon, soluong, dongia, thanhtien) VALUES (?, ?, ?, ?, ?, ?)",
    [madonhang, item.masanpham, item.maluachon, item.soluong, donGia, thanhTien]
  );

  // Trừ số lượng tồn kho tự động ở 3 bảng
  await conn.query("UPDATE luachon_sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE maluachon = ?", [item.soluong, item.maluachon]);
  await conn.query("UPDATE tonkho SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?", [item.soluong, item.masanpham]);
  await conn.query("UPDATE sanpham SET soluongton = GREATEST(soluongton - ?, 0) WHERE masanpham = ?", [item.soluong, item.masanpham]);
}

// [5] Kiểm tra & Áp dụng mã Serial Voucher độc nhất (nếu có)
if (ma_serial) {
  const [vRows] = await conn.query(
    `SELECT v.*, vn.mavoucher_nd
     FROM voucher_nguoidung vn
     JOIN voucher v ON v.mavoucher = vn.mavoucher
     WHERE (vn.ma_serial = ? OR v.macode = ?) AND vn.manguoidung = ? AND vn.sudung = 0
       AND v.trangthai = 'hoatdong' AND v.ngayhethan >= NOW()`,
    [ma_serial, ma_serial, manguoidung]
  );
  if (vRows.length) {
    giamgia = Number(vRows[0].giatri);
    // Đánh dấu mã serial đã được sử dụng cho đơn hàng này
    await conn.query("UPDATE voucher_nguoidung SET sudung = 1, madonhang_sudung = ? WHERE mavoucher_nd = ?", [madonhang, vRows[0].mavoucher_nd]);
  }
}

// [6] Hoàn tất Transaction
await conn.commit();

// [7] Gửi email xác nhận đơn hàng bất đồng bộ
sendOrderConfirmationEmail(orderObj, items, userEmail).catch(console.error);
```

---

## 2. 📦 CHỨC NĂNG QUẢN LÝ TỒN KHO & HOÀN KHO KHI TRẢ HÀNG

### Nghiệp vụ trừ & hoàn tồn kho đồng bộ 3 bảng
Hệ thống lưu giữ tồn kho đồng nhất giữa:
1. `luachon_sanpham` (Tồn kho của từng biến thể: 150ml, 500ml, màu sắc)
2. `tonkho` (Tồn kho tổng theo sản phẩm)
3. `sanpham` (Cột tồn kho chính của sản phẩm)

### Code xử lý hoàn tồn kho khi Admin nhận hàng trả (`server/controller/return.controller.js`)

```js
// Admin xác nhận đã nhận hàng hoàn về kho
async confirmReceived(req, res) {
  const { id } = req.params; // ID yêu cầu trả hàng

  const [rows] = await db.query("SELECT * FROM yeucautranhang WHERE mayeucau = ?", [id]);
  const yeucau = rows[0];

  // Lấy toàn bộ sản phẩm trong đơn hàng bị trả
  const [chitiet] = await db.query(
    "SELECT masanpham, soluong, maluachon FROM chitietdonhang WHERE madonhang = ?",
    [yeucau.madonhang]
  );

  // Hoàn lại số lượng vào cả 3 bảng
  for (const item of chitiet) {
    // 1. Cộng lại tonkho tổng
    await db.query("UPDATE tonkho SET soluongton = soluongton + ? WHERE masanpham = ?", [item.soluong, item.masanpham]);
    // 2. Cộng lại bảng sanpham
    await db.query("UPDATE sanpham SET soluongton = soluongton + ? WHERE masanpham = ?", [item.soluong, item.masanpham]);
    // 3. Cộng lại biến thể luachon_sanpham nếu có
    if (item.maluachon) {
      await db.query("UPDATE luachon_sanpham SET soluongton = soluongton + ? WHERE maluachon = ?", [item.soluong, item.maluachon]);
    }
  }

  // Cập nhật trạng thái yêu cầu sang 'danhan'
  await db.query("UPDATE yeucautranhang SET trangthai = 'danhan', ngayxuly = NOW() WHERE mayeucau = ?", [id]);

  // Ghi nhật ký lịch sử
  await db.query(
    "INSERT INTO lichsutrangthaidon (madonhang, trangthai, ghichu, thoigian) VALUES (?, 'trahang', 'Admin đã nhận hàng trả, hoàn tồn kho', NOW())",
    [yeucau.madonhang]
  );

  res.json({ message: "Đã xác nhận nhận hàng và hoàn tồn kho thành công." });
}
```

---

## 3. 📧 CHỨC NĂNG GỬI EMAIL XÁC NHẬN ĐƠN HÀNG

### Nghiệp vụ
Sau khi đơn hàng được khởi tạo thành công, hệ thống gửi email HTML bao gồm chi tiết đơn hàng, danh sách sản phẩm, hình ảnh và tổng chi phí.

### Code (`server/utils/email.js`)
```js
async function sendOrderConfirmationEmail(order, items, userEmail) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log("[Email] Bỏ qua gửi email vì chưa cài đặt biến môi trường EMAIL_USER & EMAIL_PASS trên server host (Render/Railway).");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS }
  });

  const mailOptions = {
    from: `"Mỹ Phẩm Hồng Xinh" <${EMAIL_USER}>`,
    to: userEmail,
    subject: `[XÁC NHẬN ĐƠN HÀNG #${order.madonhang}] Cảm ơn bạn đã đặt hàng!`,
    html: `<h1>Đơn hàng #${order.madonhang} đã được đặt thành công</h1>...`
  };

  await transporter.sendMail(mailOptions);
}
```

---

## 4. 💄 DANH SÁCH 16 SẢN PHẨM TRONG HỆ THỐNG

| ID | Tên sản phẩm | Danh mục | Giá bán | Đường dẫn hình ảnh |
|---|---|---|---|---|
| 1 | Nước Tẩy Trang Bí Đao Cocoon | Làm sạch | 292,000đ | `/hinhanh/cocoon_cleansing_water.png` |
| 2 | Nước Hoa Hồng Klairs Không Mùi | Làm sạch | 207,000đ | `/hinhanh/klairs_toner.png` |
| 3 | Nước Tẩy Trang L'Oreal Tươi Mát | Làm sạch | 140,000đ | `/hinhanh/loreal_micellar_water.png` |
| 4 | Kem Chống Nắng Skin1004 Rau Má | Chống nắng | 252,000đ | `/hinhanh/skin1004_sunscreen.png` |
| 5 | Kem Chống Nắng La Roche-Posay | Chống nắng | 389,000đ | `/hinhanh/laroche_posay_sunscreen.png` |
| 6 | Sữa Chống Nắng Anessa Kiềm Dầu | Chống nắng | 428,000đ | `/hinhanh/anessa_sunscreen.png` |
| 7 | Nước Tẩy Trang Bioderma Hồng | Làm sạch | 361,000đ | `/hinhanh/bioderma_micellar.png` |
| 8 | Serum dưỡng ẩm Hồng Xinh | Chăm sóc da | 320,000đ | `/hinhanh/hongxinh_serum.png` |
| 9 | Kem Dưỡng Phục Hồi La Roche-Posay B5+ | Chăm sóc da | 345,000đ | `/hinhanh/laroche_posay_b5_cream.png` |
| 10 | Kem Dưỡng Sáng Da L'Oreal Glycolic-Bright | Chăm sóc da | 290,000đ | `/hinhanh/loreal_glycolic_cream.png` |
| 11 | Dưỡng Chất Khoáng Vichy Mineral 89 | Chăm sóc da | 620,000đ | `/hinhanh/vichy_mineral_89.png` |
| 12 | Tẩy Tế Bào Chết Cà Phê Cocoon | Làm sạch | 115,000đ | `/hinhanh/cocoon_coffee_scrub.png` |
| 13 | Kem Dưỡng Làm Dịu Da Ban Đêm Klairs Blue | Chăm sóc da | 345,000đ | `/hinhanh/kemduong.png` |
| 14 | Sữa Rửa Mặt Dịu Lành Cetaphil | Làm sạch | 280,000đ | `/hinhanh/suaruamat.png` |
| 15 | Son Lì MAC Ruby Woo | Trang điểm / Son | 580,000đ | `/hinhanh/son.png` |
| 16 | Son Kem 3CE Soft Lip Color | Trang điểm / Son | 320,000đ | `/hinhanh/son_3ce_lipstick.png` |

---

## 5. 🔍 TÌM KIẾM SẢN PHẨM THÔNG MINH

### Mã nguồn tìm kiếm (`client/src/context/AppContext.js`)
Cho phép tìm theo từ khóa **"Son"**, **"Cocoon"**, **"Klairs"**, **"La Roche"**... Tìm kiếm cả trên tên sản phẩm, thương hiệu lẫn mô tả.

```js
const danhSachLoc = useMemo(() => {
  const kw = tuKhoa.trim().toLowerCase();
  return sanPhams.filter((sp) => {
    const dungDanhMuc = kw ? true : (danhMucChon === "Tất cả" || sp.danhMuc === danhMucChon);
    if (!kw) return dungDanhMuc;

    const tenSp = (sp.ten || sp.tensanpham || "").toLowerCase();
    const moTaSp = (sp.moTa || sp.mota || "").toLowerCase();
    const thuongHieuSp = (sp.tenthuonghieu || "").toLowerCase();

    return (
      tenSp.includes(kw) || moTaSp.includes(kw) || thuongHieuSp.includes(kw)
    );
  });
}, [sanPhams, danhMucChon, tuKhoa]);
```

---

## 6. 🛠️ ĐỒNG BỘ CƠ SỞ DỮ LIỆU & DEPLOY

### Cấu trúc bảng Database đầy đủ (TiDB Cloud & MySQL local)
1. `nguoidung`, `vaitro`, `diachi`
2. `sanpham`, `luachon_sanpham`, `tonkho`, `danhmuc`, `thuonghieu`
3. `donhang`, `chitietdonhang`, `thanhtoan`, `lichsutrangthaidon`
4. `voucher`, `voucher_nguoidung` (chứa `ma_serial`)
5. `yeucautranhang`, `danhgia`, `hoidap`
6. `khuyenmai`, `sanpham_khuyenmai`

Tất cả đã được cập nhật đồng nhất trên CSDL **TiDB Cloud** và được deploy tự động lên **Vercel** & **Render.com**.
