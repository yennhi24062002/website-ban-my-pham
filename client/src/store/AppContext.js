import { createContext, useContext, useEffect, useMemo, useState } from "react";
import API_BASE from "../config/api";
import { danhMuc as danhMucMacDinh, sanPhams as sanPhamMacDinh } from "../constant/sanPham";

// Tạo context để chia sẻ state toàn cục cho toàn bộ ứng dụng
export const AppContext = createContext();

// Hook tiện ích để dùng context trong component con
export function useApp() {
  return useContext(AppContext);
}

// Hàm gộp lựa chọn từ API với dữ liệu mẫu local (fallback)
function hopNhatLuachon(apiSanPham) {
  if (!apiSanPham) return apiSanPham;
  const sanPhamMau = sanPhamMacDinh.find((item) => item.masanpham === apiSanPham.masanpham);
  if (apiSanPham.luachon && apiSanPham.luachon.length > 0) {
    return apiSanPham;
  }
  if (sanPhamMau && sanPhamMau.luachon && sanPhamMau.luachon.length > 0) {
    const luachonCapNhat = sanPhamMau.luachon.map(lc => ({
      ...lc,
      soluongton: Number(apiSanPham.ton ?? lc.soluongton ?? 0)
    }));
    return { ...apiSanPham, luachon: luachonCapNhat };
  }
  return apiSanPham;
}

// Hàm chuyển đổi dữ liệu sản phẩm từ API sang định dạng nội bộ
function chuyenSanPhamTuApi(sp) {
  return {
    masanpham: sp.masanpham,
    ten: sp.tensanpham || sp.ten,
    danhMuc: sp.tendanhmuc || sp.danhMuc,
    tenthuonghieu: sp.tenthuonghieu || sp.tenthuonghieu || "",
    gia: Number(sp.giaban ?? sp.gia ?? 0),
    giagoc: sp.giagoc ? Number(sp.giagoc) : null,
    ton: Number(sp.soluongton ?? sp.ton ?? 0),
    hinh: sp.hinhanh || sp.hinh,
    moTa: sp.mota || sp.moTa || "",
    thongso: sp.thongso || "",
    thanhphan: sp.thanhphan || "",
    hdsd: sp.hdsd || "",
    tileban: sp.tileban ?? 30,
    khuyenmai: sp.khuyenmai || sp.tenkhuyenmai || "",
    tenkm: sp.tenkm || sp.khuyenmai || (sp.tenkhuyenmai ? `${sp.tenkhuyenmai} (-${sp.phantramgiam}%)` : ""),
    luachon: (sp.luachon || sp.bienthe || []).map((item) => ({
      maluachon: item.maluachon || item.mabienthe,
      mausac: item.mausac || "Mặc định",
      loai: item.loai || "",
      dungtich: item.dungtich || "",
      giaban: Number(item.giaban ?? 0),
      soluongton: Number(item.soluongton ?? 0),
      hinh: item.hinhanh || item.hinh || sp.hinhanh || sp.hinh
    }))
  };
}

// Provider bọc toàn bộ ứng dụng, cung cấp state và hàm xử lý cho mọi component con
export function AppProvider({ children }) {
  // State người dùng & phân quyền
  const [vaiTro, setVaiTro] = useState("");
  const [nguoiDung, setNguoiDung] = useState(null);
  const [moDangNhap, setMoDangNhap] = useState(false);
  const [dangKy, setDangKy] = useState(false);

  // State sản phẩm & danh mục
  const [danhMuc, setDanhMuc] = useState(danhMucMacDinh);
  const [danhMucChon, setDanhMucChon] = useState(danhMucMacDinh[0]);
  const [sanPhams, setSanPhams] = useState(sanPhamMacDinh);
  const [chiTiet, setChiTiet] = useState(null);
  const [tuKhoa, setTuKhoa] = useState("");

  // State giỏ hàng & đơn hàng
  const [gioHang, setGioHang] = useState([]);
  const [donHangGanNhat, setDonHangGanNhat] = useState(null);

  // State điều hướng tab admin
  const [tabAdmin, setTabAdmin] = useState("donhang");

  // Hàm tải dữ liệu sản phẩm
  async function taiDuLieu() {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch(`${API_BASE}/products`),
        fetch(`${API_BASE}/categories`)
      ]);

      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        const danhSachSanPham = productsData.map((item) => hopNhatLuachon(chuyenSanPhamTuApi(item)));
        setSanPhams(danhSachSanPham);
        setChiTiet((hienTai) => hienTai ? (danhSachSanPham.find((item) => item.masanpham === hienTai?.masanpham) || null) : null);
      }

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        const tenDanhMuc = ["Tất cả", ...categoriesData.map((item) => item.tendanhmuc)];
        setDanhMuc(tenDanhMuc);
        setDanhMucChon((hienTai) => tenDanhMuc.includes(hienTai) ? hienTai : tenDanhMuc[0]);
      }
    } catch (error) {
      console.warn("Không tải được dữ liệu từ backend, dùng dữ liệu mẫu.", error);
    }
  }

  // Tải dữ liệu sản phẩm và danh mục từ API khi khởi chạy ứng dụng
  useEffect(() => {
    taiDuLieu();
  }, []);

  // Danh sách sản phẩm đã lọc theo danh mục và từ khóa tìm kiếm
  const danhSachLoc = useMemo(() => {
    const kw = tuKhoa.trim().toLowerCase();
    return sanPhams.filter((sp) => {
      // Nếu có nhập từ khóa tìm kiếm, tự động tìm trên toàn bộ danh mục
      const dungDanhMuc = kw ? true : (danhMucChon === "Tất cả" || sp.danhMuc === danhMucChon);
      if (!kw) return dungDanhMuc;

      const tenSp = (sp.ten || "").toLowerCase();
      const moTaSp = (sp.moTa || "").toLowerCase();
      const thuongHieuSp = (sp.tenthuonghieu || "").toLowerCase();

      const dungTuKhoa =
        tenSp.includes(kw) ||
        moTaSp.includes(kw) ||
        thuongHieuSp.includes(kw);

      return dungDanhMuc && dungTuKhoa;
    });
  }, [sanPhams, danhMucChon, tuKhoa]);


  // Cập nhật sản phẩm đang xem chi tiết
  function capNhatChiTiet(sp) {
    setChiTiet(sp);
  }

  // Xử lý đăng nhập: gọi API và cập nhật state người dùng
  async function dangNhap(event, form) {
    event.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Đăng nhập không thành công.");
        return;
      }
      setNguoiDung(data.user);
      setVaiTro(data.user.tenvaitro);
      setMoDangNhap(false);
      setDangKy(false);
    } catch (error) {
      alert("Không kết nối được đến server.");
    }
  }

  // Xử lý đăng ký tài khoản mới
  async function dangKyTaiKhoan(form) {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Đăng ký không thành công.");
        return;
      }
      setNguoiDung(data.user);
      setVaiTro(data.user.tenvaitro);
      setMoDangNhap(false);
      setDangKy(false);
      alert("Đăng ký thành công.");
    } catch (error) {
      alert("Không kết nối được đến server.");
    }
  }

  // Xử lý đăng xuất: xóa toàn bộ state phiên làm việc
  function dangXuat() {
    setNguoiDung(null);
    setVaiTro("");
    setGioHang([]);
    setDonHangGanNhat(null);
  }

  // Thêm sản phẩm vào giỏ hàng (yêu cầu đã đăng nhập)
  function themVaoGio(sanPham, luachon) {
    if (!nguoiDung) {
      setMoDangNhap(true);
      return false;
    }
    if (!luachon) {
      alert("Sản phẩm này chưa có lựa chọn phù hợp.");
      return false;
    }
    const banGhi = {
      masanpham: sanPham.masanpham,
      maluachon: luachon.maluachon,
      tensanpham: sanPham.ten,
      hinh: luachon.hinh || sanPham.hinh,
      mausac: luachon.mausac || "Mặc định",
      loai: luachon.loai || "",
      dungtich: luachon.dungtich || "",
      dongia: Number(luachon.giaban || sanPham.gia),
      soluong: 1,
      luachonText: [luachon.mausac, luachon.loai, luachon.dungtich].filter(Boolean).join(" - ")
    };
    setGioHang((hienTai) => {
      const viTri = hienTai.findIndex((item) => item.maluachon === banGhi.maluachon);
      if (viTri >= 0) {
        const danhSachMoi = [...hienTai];
        danhSachMoi[viTri] = {
          ...danhSachMoi[viTri],
          soluong: danhSachMoi[viTri].soluong + 1,
          thanhtien: (danhSachMoi[viTri].soluong + 1) * danhSachMoi[viTri].dongia
        };
        return danhSachMoi;
      }
      return [...hienTai, { ...banGhi, thanhtien: banGhi.dongia * banGhi.soluong }];
    });
    return true;
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  function capNhatSoLuong(item, soLuongMoi) {
    if (soLuongMoi <= 0) {
      xoaKhoiGio(item);
      return;
    }
    setGioHang((hienTai) =>
      hienTai.map((gioItem) =>
        gioItem.maluachon === item.maluachon
          ? { ...gioItem, soluong: soLuongMoi, thanhtien: soLuongMoi * gioItem.dongia }
          : gioItem
      )
    );
  }

  // Xóa một sản phẩm khỏi giỏ hàng
  function xoaKhoiGio(item) {
    setGioHang((hienTai) => hienTai.filter((gioItem) => gioItem.maluachon !== item.maluachon));
  }

  // Xử lý đặt hàng: gửi thông tin đơn hàng lên API
  async function datHang(form, isDemo = false) {
    if (!nguoiDung) {
      setMoDangNhap(true);
      return;
    }
    if (gioHang.length === 0) {
      alert("Giỏ hàng đang trống.");
      return;
    }
    if (!form.tennguoinhan?.trim()) {
      alert("Vui lòng nhập tên người nhận.");
      return;
    }
    if (!form.sodienthoainhan?.trim()) {
      alert("Vui lòng nhập số điện thoại nhận hàng.");
      return;
    }
    if (!form.diachigiaohang?.trim()) {
      alert("Vui lòng nhập địa chỉ giao hàng.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manguoidung: nguoiDung.manguoidung,
          email: nguoiDung?.email || form?.email || null,
          tennguoinhan: form.tennguoinhan.trim(),
          sodienthoainhan: form.sodienthoainhan.trim(),
          diachigiaohang: form.diachigiaohang.trim(),
          phuongthuc: form.phuongthuc,
          isDemo: isDemo,
          ma_serial: form.ma_serial || null,
          items: gioHang.map((item) => ({
            masanpham: item.masanpham,
            maluachon: item.maluachon,
            soluong: item.soluong,
            dongia: item.dongia,
            tensanpham: item.tensanpham,
            luachonText: item.luachonText,
            mausac: item.mausac,
            loai: item.loai,
            dungtich: item.dungtich
          }))
        })
      });
      const data = await response.json();
      if (!response.ok) {
        alert("" + (data.error || data.message || "Không thể tạo đơn hàng."));
        return null;
      }
      setDonHangGanNhat({
        madonhang: data.madonhang,
        tongtien: data.tongtien,
        trangthaithanhtoan: data.trangthaithanhtoan,
        phuongthuc: form.phuongthuc,
        ngaydat: new Date().toLocaleString("vi-VN")
      });
      // Tải lại dữ liệu sản phẩm & tồn kho từ backend ngay sau khi trừ kho thành công
      await taiDuLieu();
      return data;
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      alert("Không kết nối được đến server. Vui lòng kiểm tra backend đang chạy.");
      return null;
    }
  }

  return (
    <AppContext.Provider value={{
      // State người dùng
      vaiTro, setVaiTro,
      nguoiDung, setNguoiDung,
      moDangNhap, setMoDangNhap,
      dangKy, setDangKy,
      // State sản phẩm
      danhMuc, sanPhams, chiTiet,
      danhMucChon, setDanhMucChon,
      tuKhoa, setTuKhoa,
      danhSachLoc,
      // State giỏ hàng & đơn hàng
      gioHang, setGioHang,
      donHangGanNhat,
      // State admin
      tabAdmin, setTabAdmin,
      // Hàm xử lý
      dangNhap, dangKyTaiKhoan, dangXuat,
      capNhatChiTiet,
      themVaoGio, capNhatSoLuong, xoaKhoiGio,
      datHang,
      refreshProducts: taiDuLieu
    }}>
      {children}
    </AppContext.Provider>
  );
}
