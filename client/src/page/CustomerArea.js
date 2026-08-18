import { useEffect, useMemo, useState, useCallback, useContext } from "react";
import API_BASE from "../config/api";
import { formatTien } from "../utils/format";
import ManHinhThanhToan from "../component/ManHinhThanhToan";
import ThanhToanQR from "../component/ThanhToanQR";
import ThanhToanBanking from "../component/ThanhToanBanking";
import ThanhToanTienMat from "../component/ThanhToanTienMat";
import ModalXemHoaDon from "../component/ModalXemHoaDon";
import { AppContext } from "../store/AppContext";


function CustomerArea({
  nguoiDung,
  vaiTro,
  gioHang,
  onCapNhatSoLuong,
  onXoaKhoiGio,
  onDatHang,
  donHangGanNhat,
  onXoaSachGioHang
}) {
  const { refreshProducts } = useContext(AppContext);

  const [form, setForm] = useState({
    tennguoinhan: nguoiDung?.hoten || "",
    sodienthoainhan: nguoiDung?.sodienthoai || "",
    diachigiaohang: "",
    phuongthuc: "qrcode",
    ma_serial: null
  });

  const [dangDat, setDangDat] = useState(false);
  const [thanhToanGiaLap, setThanhToanGiaLap] = useState(null);
  const [danhSachVoucher, setDanhSachVoucher] = useState([]);
  const [tabLichSu, setTabLichSu] = useState("donhang"); // donhang | voucher
  const [hoaDonXem, setHoaDonXem] = useState(null);
  const [voucherChon, setVoucherChon] = useState(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      tennguoinhan: nguoiDung?.hoten || prev.tennguoinhan,
      sodienthoainhan: nguoiDung?.sodienthoai || prev.sodienthoainhan
    }));
  }, [nguoiDung]);

  const [danhSachDonHang, setDanhSachDonHang] = useState([]);

  // Hàm tải riêng voucher (đ Ồ refresh nhanh không cần tải cả đ đơn hàng)
  const taiVoucher = useCallback(() => {
    if (nguoiDung?.manguoidung && vaiTro !== "admin") {
      fetch(`${API_BASE}/vouchers/user/${nguoiDung.manguoidung}`)
        .then(res => res.json())
        .then(data => setDanhSachVoucher(Array.isArray(data) ? data : []))
        .catch(err => console.error(err));
    }
  }, [nguoiDung, vaiTro]);

  const taiDonHang = useCallback(() => {
    if (nguoiDung?.manguoidung && vaiTro !== "admin") {
      fetch(`${API_BASE}/orders/user/${nguoiDung.manguoidung}`)
        .then(res => res.json())
        .then(data => setDanhSachDonHang(Array.isArray(data) ? data : []))
        .catch(err => console.error(err));
      taiVoucher();
      // Tải thông tin cá nhân và tự đ đ"ng đ iền đ đ9a chđ0 giao hàng mặc đ đ9nh
      fetch(`${API_BASE}/customers/${nguoiDung.manguoidung}`)
        .then(res => res.json())
        .then(data => {
          if (data && Array.isArray(data.diachi)) {
            const defaultAddress = data.diachi.find(addr => addr.macdinh === 1) || data.diachi[0];
            if (defaultAddress) {
              setForm(prev => {
                if (!prev.diachigiaohang) {
                  return {
                    ...prev,
                    tennguoinhan: defaultAddress.tennguoinhan || prev.tennguoinhan,
                    sodienthoainhan: defaultAddress.sodienthoainhan || prev.sodienthoainhan,
                    diachigiaohang: defaultAddress.diachichitiet || ""
                  };
                }
                return prev;
              });
            }
          }
        })
        .catch(err => console.error(err));
    } else {
      setDanhSachDonHang([]);
      setDanhSachVoucher([]);
    }
  }, [nguoiDung, vaiTro, taiVoucher]);

  useEffect(() => {
    taiDonHang();
  }, [taiDonHang, donHangGanNhat]);

  // Auto-refresh voucher mđ i 30s khi đ ang đx tab voucher
  useEffect(() => {
    if (tabLichSu !== "voucher") return;
    taiVoucher();
    const interval = setInterval(taiVoucher, 30000);
    return () => clearInterval(interval);
  }, [tabLichSu, taiVoucher]);

  // Hủy đ đơn hàng
  async function huyDon(madonhang, lydo) {
    if (!window.confirm(`Hủy đ ơn #${madonhang}? Lý do: ${lydo || "Không đ iền"}`)) return;
    try {
      const res = await fetch(`${API_BASE}/orders/${madonhang}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manguoidung: nguoiDung.manguoidung, lydo })
      });
      const data = await res.json();
      if (res.ok) {
        alert("" + data.message);
        taiDonHang();
        if (refreshProducts) await refreshProducts();
      } else {
        alert("" + data.message);
      }
    } catch (e) {
      alert("Không kết nối được server.");
    }
  }

  // Yêu cầu trả hàng
  async function yeuCauTraHang(madonhang) {
    const lydo = window.prompt(`Nhập lý do trả hàng cho đơn #${madonhang}:`);
    if (!lydo) return;
    try {
      const res = await fetch(`${API_BASE}/returns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ madonhang, manguoidung: nguoiDung.manguoidung, lydo })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Gửi yêu cầu trả hàng thành công! Admin sẽ xử lý trong vòng 24 giờ.");
        taiDonHang();
      } else {
        alert("" + data.message);
      }
    } catch (e) {
      alert("Không kết nối được server.");
    }
  }

  // Lấy dữ liệu và mở modal xem hóa đơn
  async function taiVaXemHoaDon(madonhang) {
    try {
      const res = await fetch(`${API_BASE}/orders/${madonhang}/invoice`);
      const d = await res.json();
      if (!res.ok) { alert("" + d.message); return; }
      setHoaDonXem(d);
    } catch (e) {
      console.error(e);
      alert("Không thể tải thông tin hóa đơn.");
    }
  }

  // Hàm in hóa đơn sử dụng cửa sổ in của trình duyệt để hỗ trợ đầy đủ tiếng Việt Unicode
  function inHoaDon(invoiceData) {
    if (!invoiceData) return;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Hóa đơn #${invoiceData.donhang.madonhang}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #333; line-height: 1.5; }
            .invoice-card { max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); }
            .header { text-align: center; border-bottom: 2px solid #f8bbd0; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { color: #d81b60; margin: 0 0 10px 0; font-size: 28px; }
            .header p { margin: 5px 0; color: #666; font-size: 14px; }
            .info-table { width: 100%; margin-bottom: 20px; border-collapse: collapse; }
            .info-table td { padding: 6px 0; vertical-align: top; }
            .info-table td.label { color: #777; width: 150px; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table th { background-color: #fce4ec; color: #c2185b; padding: 10px; text-align: left; font-weight: 600; border-bottom: 2px solid #f8bbd0; }
            .details-table td { padding: 12px 10px; border-bottom: 1px solid #eee; }
            .summary { text-align: right; margin-top: 20px; }
            .summary .total { font-size: 20px; color: #d81b60; font-weight: bold; }
            .status { font-weight: bold; padding: 4px 10px; border-radius: 20px; display: inline-block; }
            .status.paid { background-color: #d4edda; color: #155724; }
            .status.unpaid { background-color: #fff3cd; color: #856404; }
            .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
            @media print {
              body { padding: 0; }
              .invoice-card { border: none; box-shadow: none; padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-card">
            <div class="header">
              <h1>HÓA ĐƠN MUA HÀNG</h1>
              <p><strong>Website bán mỹ phẩm</strong> | 123 Nguyễn Huệ, Q.1, TP.HCM</p>
              <p>Hotline: 0908719006</p>
            </div>
            <table class="info-table">
              <tr>
                <td class="label">Mã đơn hàng:</td>
                <td><strong>#${invoiceData.donhang.madonhang}</strong></td>
                <td class="label">Ngày đặt:</td>
                <td>${new Date(invoiceData.donhang.ngaydat).toLocaleString("vi-VN")}</td>
              </tr>
              <tr>
                <td class="label">Người nhận:</td>
                <td>${invoiceData.donhang.tennguoinhan || invoiceData.donhang.hoten}</td>
                <td class="label">SĐT nhận:</td>
                <td>${invoiceData.donhang.sodienthoainhan || invoiceData.donhang.sodienthoai}</td>
              </tr>
              <tr>
                <td class="label">Địa chỉ giao:</td>
                <td colspan="3">${invoiceData.donhang.diachigiaohang}</td>
              </tr>
              <tr>
                <td class="label">Thanh toán:</td>
                <td>${invoiceData.thanhtoan?.phuongthuc === 'qrcode' ? 'QR Code' : invoiceData.thanhtoan?.phuongthuc === 'banking' ? 'Chuyển khoản' : 'Tiền mặt (COD)'}</td>
                <td class="label">Mã GD:</td>
                <td>${invoiceData.thanhtoan?.magiaodich || 'N/A'}</td>
              <tr>
                <td class="label">Ghi chú:</td>
                <td colspan="3">${invoiceData.donhang.ghichu || 'Không có'}</td>
              </tr>
              </tr>
            </table>
            <table class="details-table">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th style="text-align: center; width: 80px;">SL</th>
                  <th style="text-align: right; width: 120px;">Đơn giá</th>
                  <th style="text-align: right; width: 140px;">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                ${(invoiceData.chitiet || []).map(item => {
                  const options = [item.mausac, item.loai, item.dungtich].filter(Boolean).join(" - ");
                  const name = item.tensanpham + (options ? ` (${options})` : "");
                  return `
                    <tr>
                      <td>${name}</td>
                      <td style="text-align: center;">${item.soluong}</td>
                      <td style="text-align: right;">${Number(item.dongia).toLocaleString("vi-VN")}đ</td>
                      <td style="text-align: right; font-weight: 600;">${Number(item.thanhtien).toLocaleString("vi-VN")}đ</td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
            <div class="summary">
              <div style="margin-bottom: 8px;">Trạng thái: <span class="status ${invoiceData.donhang.trangthaithanhtoan === 'dathanhtoan' ? 'paid' : 'unpaid'}">${invoiceData.donhang.trangthaithanhtoan === 'dathanhtoan' ? 'Đã thanh toán' : 'Chờ thanh toán'}</span></div>
              <div class="total">Tổng cộng: ${Number(invoiceData.donhang.tongtien).toLocaleString("vi-VN")}đ</div>
            </div>
            <div class="footer">
              <p>Cảm ơn quý khách đã mua sắm tại cửa hàng của chúng tôi!</p>
              <p>Hẹn gặp lại quý khách!</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  const tongTien = useMemo(
    () => gioHang.reduce((tong, item) => tong + item.thanhtien, 0),
    [gioHang]
  );

  const vouchersKhaDung = useMemo(() => {
    return danhSachVoucher.filter(
      v => !v.sudung && Number(v.giatri) <= tongTien * 0.5
    );
  }, [danhSachVoucher, tongTien]);

  function capNhatForm(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }




  async function xuLyDatHang() {
    if (dangDat) return;
    setDangDat(true);
    try {
      const data = await onDatHang(form, false);
      if (data) {
        alert(`Đặt hàng thành công! Mã đơn hàng: #${data.madonhang}`);
        // Reset voucher sau khi đặt hàng thành công
        setVoucherChon(null);
        setForm(prev => ({ ...prev, ma_serial: null }));
        if (onXoaSachGioHang) onXoaSachGioHang();
        // Tải và hiỒn thđ9 chi tiết hóa đ ơn xác nhận ngay lập tức cho khách hàng
        taiVaXemHoaDon(data.madonhang);
      }
    } finally {
      setDangDat(false);
    }
  }

  async function xuLyGiaLapThanhToan(phuongthuc, nganhang) {
    if (dangDat) return;
    setDangDat(true);
    try {
      const data = await onDatHang({ ...form, phuongthuc }, true);
      if (data) {
        setThanhToanGiaLap({ phuongthuc, nganhang, madonhang: data.madonhang, tongtien: data.tongtien });
      }
    } finally {
      setDangDat(false);
    }
  }

  return (
    <section className="hai-cot">
      {/* Màn hình overlay giả lập thanh toán thành công */}
      {thanhToanGiaLap && (
        <ManHinhThanhToan
          phuongthuc={thanhToanGiaLap.phuongthuc}
          madonhang={thanhToanGiaLap.madonhang}
          tongtien={thanhToanGiaLap.tongtien}
          soNganHang={thanhToanGiaLap.nganhang}
          onDong={() => {
            const madon = thanhToanGiaLap.madonhang;
            setThanhToanGiaLap(null);
            if (onXoaSachGioHang) onXoaSachGioHang();
            // Tải và hiỒn thđ9 chi tiết hóa đơn sau khi hoàn thành thanh toán
            taiVaXemHoaDon(madon);
          }}
        />
      )}

          {/* ===== GIỎ HÀNG ===== */}
      <div id="giohang" className="hop">
        <h2>Giỏ hàng</h2>
        {gioHang.length === 0 ? (
          <p>Giỏ hàng đang trống. Chọn một sản phẩm để thêm vào giỏ.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Phân loại</th>
              <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {gioHang.map((item) => (
                <tr key={`${item.masanpham}-${item.maluachon}`}>
                  <td>{item.tensanpham}</td>
                  <td>{item.luachonText}</td>
                  <td>
                    <button className="nut nut-phu" onClick={() => onCapNhatSoLuong(item, item.soluong - 1)}>-</button>
                    <span className="so-luong">{item.soluong}</span>
                    <button className="nut nut-phu" onClick={() => onCapNhatSoLuong(item, item.soluong + 1)}>+</button>
                  </td>
                  <td>{formatTien(item.dongia)}</td>
                  <td>
                    <button className="nut nut-phu" onClick={() => onXoaKhoiGio(item)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p><b>Tổng tiền:</b> <span className="gia">{formatTien(tongTien)}</span></p>
      </div>

      {/* ===== FORM ĐẶT HÀNG ===== */}
      <div className="hop">
        <h2>Đặt hàng</h2>
        <input
          name="tennguoinhan"
          value={form.tennguoinhan}
          onChange={capNhatForm}
          placeholder="Tên người nhận *"
        />
        <input
          name="sodienthoainhan"
          value={form.sodienthoainhan}
          onChange={capNhatForm}
          placeholder="Số điện thoại nhận hàng *"
        />
        <textarea
          name="diachigiaohang"
          value={form.diachigiaohang}
          onChange={capNhatForm}
          placeholder="Địa chỉ giao hàng *"
        />
        <textarea
          name="ghichu"
          value={form.ghichu || ""}
          onChange={capNhatForm}
          placeholder="Ghi chú cho đơn hàng (ví dụ: giao giờ hành chính)..."
          style={{ marginTop: 10 }}
        />

        {/* Chọn phương thức thanh toán */}
        <div style={{ margin: "8px 0 4px", fontWeight: 600, color: "#9d1b57", fontSize: 14 }}>
          Phương thức thanh toán
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
          {[
            { val: "tienmat", icon: "", label: "Tiền mặt (COD)" },
            { val: "qrcode",  icon: "", label: "QR Code" },
            { val: "banking", icon: "", label: "Chuyển khoản" }
          ].map(({ val, icon, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => setForm((p) => ({ ...p, phuongthuc: val }))}
              style={{
                padding: "10px 18px", borderRadius: 12,
                border: form.phuongthuc === val ? "2px solid #c21869" : "2px solid #f3a8c9",
                background: form.phuongthuc === val
                  ? "linear-gradient(180deg,#eb5f9a,#de2c7f)" : "white",
                color: form.phuongthuc === val ? "white" : "#9d1b57",
                fontWeight: 600, fontSize: 14, cursor: "pointer", margin: 0,
                transition: "all 0.2s"
              }}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Chọn Voucher */}
        {danhSachVoucher.filter(v => !v.sudung).length > 0 ? (
          <div style={{ marginTop: 12 }}>
            <div style={{ margin: "4px 0 6px", fontWeight: 600, color: "#9d1b57", fontSize: 14 }}>
              Áp dụng Voucher giảm giá
            </div>
            <select
              value={voucherChon?.ma_serial || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (!val) {
                  setVoucherChon(null);
                  setForm(prev => ({ ...prev, ma_serial: null }));
                } else {
                  const vc = vouchersKhaDung.find(v => v.ma_serial === val);
                  if (vc) {
                    setVoucherChon(vc);
                    setForm(prev => ({ ...prev, ma_serial: vc.ma_serial }));
                  } else {
                    alert("Voucher này vượt quá 50% giá trị đơn hàng!");
                    setVoucherChon(null);
                    setForm(prev => ({ ...prev, ma_serial: null }));
                  }
                }
              }}
              style={{
                width: "100%", padding: 10, borderRadius: 12,
                border: "2px solid #f3a8c9", background: "white",
                color: "#9d1b57", fontWeight: 600, fontSize: 14, cursor: "pointer"
              }}
            >
              <option value="">--- Không áp dụng voucher ---</option>
              {danhSachVoucher.filter(v => !v.sudung).map(v => {
                const hopLe = Number(v.giatri) <= tongTien * 0.5;
                return (
                  <option
                    key={v.mavoucher_nd}
                    value={v.ma_serial}
                    disabled={!hopLe}
                  >
                    [{v.ma_serial}] {v.ten} — Giảm {formatTien(v.giatri)}{!hopLe ? ` (Yêu cầu đơn tối thiểu từ ${formatTien(Number(v.giatri) * 2)})` : " ✓"}
                  </option>
                );
              })}
            </select>
            {voucherChon && (
              <div style={{
                marginTop: 8, padding: "8px 12px", background: "#e8f5e9",
                borderRadius: 8, color: "#2e7d32", fontSize: 13, display: "flex",
                justifyContent: "space-between", alignItems: "center"
              }}>
                <span>Áp dụng thành công! Giảm: <strong>-{formatTien(voucherChon.giatri)}</strong></span>
                <button
                  type="button"
                  onClick={() => { setVoucherChon(null); setForm(prev => ({ ...prev, ma_serial: null })); }}
                  style={{ background: "none", border: "none", color: "#c62828", cursor: "pointer", fontWeight: 700, fontSize: 16 }}
                >✕</button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ marginTop: 12, fontSize: 13, color: "#888", fontStyle: "italic" }}>
            ️ Bạn chưa sở hữu voucher nào. Mua sắm nhiều hơn để được tự động nhận voucher!
          </div>
        )}

        {/* Hiển thị hướng dẫn thanh toán theo phương thức */}
        {gioHang.length > 0 && form.phuongthuc === "tienmat" && (
          <ThanhToanTienMat tongtien={Math.max(0, tongTien - Number(voucherChon?.giatri || 0))} />
        )}
        {gioHang.length > 0 && form.phuongthuc === "qrcode" && (
          <ThanhToanQR
            madonhang={"DEMO"}
            tongtien={Math.max(0, tongTien - Number(voucherChon?.giatri || 0))}
            onGiaLap={xuLyGiaLapThanhToan}
          />
        )}
        {gioHang.length > 0 && form.phuongthuc === "banking" && (
          <ThanhToanBanking
            madonhang={"DEMO"}
            tongtien={Math.max(0, tongTien - Number(voucherChon?.giatri || 0))}
            onGiaLap={xuLyGiaLapThanhToan}
          />
        )}

        {/* Bảng chi phí tổng kết */}
        <div style={{
          marginTop: 16, padding: "12px 16px", background: "#fdf2f8",
          borderRadius: 12, border: "1px dashed #f3a8c9"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 14 }}>
            <span style={{ color: "#666" }}>Tạm tính:</span>
            <span>{formatTien(tongTien)}</span>
          </div>
          {voucherChon && (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 14, color: "#c2185b" }}>
              <span>Voucher giảm giá:</span>
              <span>-{formatTien(voucherChon.giatri)}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16, paddingTop: 6, borderTop: "1px solid #fce4ec" }}>
            <span style={{ color: "#9d1b57" }}>Tổng thanh toán:</span>
            <span style={{ color: "#c2185b" }}>
              {formatTien(Math.max(0, tongTien - Number(voucherChon?.giatri || 0)))}
            </span>
          </div>
        </div>

        <button
          className="nut"
          onClick={xuLyDatHang}
          disabled={gioHang.length === 0 || dangDat}
          style={{ marginTop: 16, width: "100%", fontSize: 16, padding: "13px" }}
        >
          {dangDat ? "Đang xử lý..." : "Xác nhận đặt hàng"}
        </button>

        {/* Hướng dẫn thanh toán sau khi đặt */}
        {donHangGanNhat && (
          <div style={{ background: "#e8f5e9", border: "1px solid #81c784", borderRadius: 10, padding: 14, marginTop: 14 }}>
            <strong style={{ color: "#155724" }}>Đặt hàng thành công!</strong>
            <p style={{ margin: "6px 0 0" }}>
              Mã đơn: <strong>#{donHangGanNhat.madonhang}</strong> {" "}
              <span className="gia">{formatTien(donHangGanNhat.tongtien)}</span>
            </p>
          </div>
        )}
      </div>

      {/* ===== LỊCH SỬ ĐƠN HÀNG ===== */}
      {vaiTro !== "admin" && (
        <div id="lichsu" className="hop rong">
          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: "2px solid #f8bbd0" }}>
            <button
              onClick={() => setTabLichSu("donhang")}
              style={{
                padding: "10px 22px", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600,
                background: tabLichSu === "donhang" ? "linear-gradient(135deg,#e91e63,#f06292)" : "#fce4ec",
                color: tabLichSu === "donhang" ? "#fff" : "#c2185b",
                borderRadius: "8px 8px 0 0"
              }}
            > Lịch sử đơn hàng</button>
            <button
              onClick={() => setTabLichSu("voucher")}
              style={{
                padding: "10px 22px", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600,
                background: tabLichSu === "voucher" ? "linear-gradient(135deg,#e91e63,#f06292)" : "#fce4ec",
                color: tabLichSu === "voucher" ? "#fff" : "#c2185b",
                borderRadius: "8px 8px 0 0", marginLeft: 4, position: "relative"
              }}
            >
              Voucher của tôi
              {danhSachVoucher.filter(v => !v.sudung).length > 0 && (
                <span style={{
                  position: "absolute", top: -6, right: -6, background: "#e91e63", color: "#fff",
                  borderRadius: "50%", fontSize: 11, width: 18, height: 18,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>{danhSachVoucher.filter(v => !v.sudung).length}</span>
              )}
            </button>
            <button
              onClick={() => setTabLichSu("thongbao")}
              style={{
                padding: "10px 22px", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600,
                background: tabLichSu === "thongbao" ? "linear-gradient(135deg,#e91e63,#f06292)" : "#fce4ec",
                color: tabLichSu === "thongbao" ? "#fff" : "#c2185b",
                borderRadius: "8px 8px 0 0", marginLeft: 4, position: "relative"
              }}
            >
              Thông báo
              {danhSachDonHang.length > 0 && (
                <span style={{
                  position: "absolute", top: -6, right: -6, background: "#e91e63", color: "#fff",
                  borderRadius: "50%", fontSize: 11, width: 18, height: 18,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>{danhSachDonHang.length}</span>
              )}
            </button>
          </div>

          {/* Tab: Đơn hàng */}
          {tabLichSu === "donhang" && (
            <>
              <p style={{ color: "#888", fontSize: 13, marginBottom: 10 }}>
            Chỉ có thể <strong>hủy đơn</strong> khi đơn đang "Chờ xác nhận". Sau khi nhận hàng, bạn có thể <strong>yêu cầu trả hàng</strong> trong 7 ngày.
              </p>
              {danhSachDonHang && danhSachDonHang.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {danhSachDonHang.map((donHang) => {
                    const tt = donHang.trangthaidonhang;
                    const ttLabels = {
                      choxacnhan:  { label: "Chờ xác nhận", bg: "#fff3cd", color: "#856404" },
                      cholayhang:  { label: "Chờ lấy hàng",  bg: "#d1ecf1", color: "#0c5460" },
                      chogiaohhang:{ label: "Đang giao",       bg: "#cce5ff", color: "#004085" },
                      hoanthanh:   { label: "Hoàn thành",      bg: "#d4edda", color: "#155724" },
                      trahang:     { label: "Trả hàng",       bg: "#f8d7da", color: "#721c24" },
                      dahuy:       { label: "Đã hủy",          bg: "#e2e3e5", color: "#383d41" }
                    };
                    const badge = ttLabels[tt] || { label: tt, bg: "#eee", color: "#333" };
                    return (
                      <div key={donHang.madonhang} style={{
                        border: "1px solid #fce4ec", borderRadius: 12, padding: 16,
                        background: "#fffbfe", boxShadow: "0 2px 8px rgba(233,30,99,0.06)"
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                          <div>
                            <strong style={{ fontSize: 16, color: "#c2185b" }}>Đơn #{donHang.madonhang}</strong>
                            <span style={{ marginLeft: 10, fontSize: 13, color: "#888" }}>
                              {new Date(donHang.ngaydat).toLocaleString("vi-VN") + "đ"}
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                            <span style={{ background: badge.bg, color: badge.color, padding: "4px 12px", borderRadius: 99, fontSize: 13, fontWeight: 600 }}>
                              {badge.label}
                            </span>
                            <span style={{
                              background: donHang.trangthaithanhtoan === "dathanhtoan" ? "#d4edda" : "#fff3cd",
                              color: donHang.trangthaithanhtoan === "dathanhtoan" ? "#155724" : "#856404",
                              padding: "4px 12px", borderRadius: 99, fontSize: 13
                            }}>
                              {donHang.trangthaithanhtoan === "dathanhtoan" ? "Đã TT" : "Chờ TT"}
                            </span>
                          </div>
                        </div>

                        <div style={{ marginTop: 8, fontSize: 15 }}>
                  Tổng: <strong className="gia">{formatTien(donHang.tongtien)}</strong>
                          {donHang.lydo_huy && (
                            <span style={{ marginLeft: 12, fontSize: 12, color: "#888" }}>Lý do: {donHang.lydo_huy}</span>
                          )}
                        </div>

                        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {tt === "choxacnhan" && (
                            <button
                              className="nut"
                              style={{ background: "linear-gradient(135deg,#dc3545,#c82333)", fontSize: 13, padding: "6px 14px" }}
                              onClick={() => {
                      const lydo = window.prompt("Lý do hủy đơn:") || "Khách hàng hủy đơn";
                                huyDon(donHang.madonhang, lydo);
                              }}
                    > Hủy đơn</button>
                          )}
                          {tt === "hoanthanh" && (
                            <button
                              className="nut"
                              style={{ background: "linear-gradient(135deg,#fd7e14,#e65100)", fontSize: 13, padding: "6px 14px" }}
                              onClick={() => yeuCauTraHang(donHang.madonhang)}
                    >Trả hàng</button>
                          )}
                          <button
                            className="nut"
                            style={{ background: "linear-gradient(135deg,#c2185b,#d81b60)", fontSize: 13, padding: "6px 14px" }}
                            onClick={() => taiVaXemHoaDon(donHang.madonhang)}
                          > Xem Hóa Đơn</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: 40, color: "#aaa" }}>
                  <div style={{ fontSize: 48 }}></div>
                  <p>Chưa có đơn hàng nào. Hãy bắt đầu mua sắm!</p>
                </div>
              )}
            </>
          )}

          {/* Tab: Voucher */}
          {tabLichSu === "voucher" && (
            <div>
              <div style={{ background: "linear-gradient(135deg,#fce4ec,#f8bbd0)", borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h4 style={{ color: "#c2185b", margin: "0 0 6px" }}>Chính sách Voucher</h4>
                  <button
                    onClick={taiVoucher}
                    style={{
                      background: "linear-gradient(135deg,#e91e63,#f06292)",
                      color: "#fff", border: "none", borderRadius: 20,
                      padding: "5px 14px", fontSize: 12, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 4
                    }}
                    title="Làm mới danh sách voucher"
                  >
                    Làm mới
                  </button>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                  ⬢ Chi tiêu <strong>2-3 triệu/tháng</strong> → Nhận Voucher <strong style={{ color: "#e91e63" }}>-500.000đ</strong><br/>
                  ⬢ Chi tiêu <strong>≥5 triệu/tháng</strong> → Nhận Voucher <strong style={{ color: "#e91e63" }}>-1.000.000đ</strong><br/>
                  ⬢ Voucher được tặng tự động hoặc do Admin cấp, cập nhật mỗi 30 giây
                </p>
              </div>
              {danhSachVoucher.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {danhSachVoucher.map((v) => (
                    <div key={v.mavoucher_nd} style={{
                      border: v.sudung ? "1px solid #ddd" : "1px solid #f06292",
                      borderRadius: 12, padding: 16,
                      background: v.sudung ? "#f5f5f5" : "linear-gradient(135deg,#fff,#fce4ec)",
                      opacity: v.sudung ? 0.6 : 1,
                      display: "flex", justifyContent: "space-between", alignItems: "center"
                    }}>
                      <div>
                        <strong style={{ color: v.sudung ? "#888" : "#c2185b", fontSize: 18 }}>
                          -{Number(v.giatri).toLocaleString("vi-VN")}đ
                        </strong><br/>
                        <span style={{ fontSize: 13, color: "#666" }}>{v.ten}</span><br/>
                        <span style={{ fontSize: 12, color: "#999" }}>
                          Mã: <code>{v.macode}</code> · HSD: {new Date(v.ngayhethan).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <div>
                        {v.sudung
                          ? <span style={{ background: "#e2e3e5", color: "#666", padding: "4px 12px", borderRadius: 99, fontSize: 12 }}>Đã dùng</span>
                          : <span style={{ background: "linear-gradient(135deg,#e91e63,#f06292)", color: "#fff", padding: "4px 12px", borderRadius: 99, fontSize: 12 }}>Còn hiệu lực</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: 40, color: "#aaa" }}>
                  <div style={{ fontSize: 48 }}>️</div>
                  <p>Bạn chưa có voucher nào. Hãy mua sắm nhiều hơn để nhận!</p>
                </div>
              )}
            </div>
          )}

          {/* Tab: Thông báo */}
          {tabLichSu === "thongbao" && (
            <div>
              <div style={{ background: "linear-gradient(135deg,#fdf2f8,#fce4ec)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <h4 style={{ color: "#c2185b", margin: "0 0 6px" }}>Trung tâm Thông báo</h4>
                <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
                  Bấm vào thông báo để xem chi tiết xác nhận và hóa đơn của các đơn hàng bạn đã đặt.
                </p>
              </div>
              {danhSachDonHang.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {danhSachDonHang.map((don) => {
                    const statusText = {
                      choxacnhan: "Đang chờ xác nhận",
                      cholayhang: "Đã được duyệt (chờ lấy hàng)",
                      chogiaohhang: "Đang được giao đi",
                      hoanthanh: "Đã hoàn thành giao hàng",
                      trahang: "Đã gửi yêu cầu trả hàng",
                      dahuy: "Đã bị hủy"
                    }[don.trangthaidonhang] || don.trangthaidonhang;

                    return (
                      <div
                        key={`notif-${don.madonhang}`}
                        onClick={() => taiVaXemHoaDon(don.madonhang)}
                        style={{
                          border: "1px solid #f0d0e8", borderRadius: 12, padding: "14px 16px",
                          background: "white", cursor: "pointer", transition: "all 0.2s",
                          boxShadow: "0 2px 5px rgba(194,24,105,0.04)"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <strong style={{ color: "#c2185b", fontSize: 14 }}>
                            Xác nhận đặt hàng đơn #{don.madonhang}
                          </strong>
                          <span style={{ fontSize: 12, color: "#999" }}>
                            {new Date(don.ngaydat).toLocaleString("vi-VN") + "đ"}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: 13, color: "#444", lineHeight: 1.5 }}>
                          Đơn hàng <strong>#{don.madonhang}</strong> trị giá <strong>{formatTien(don.tongtien)}</strong> của bạn {statusText}. Nhấn vào đây để xem chi tiết hóa đơn xác nhận.
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: 40, color: "#aaa" }}>
                  <div style={{ fontSize: 48 }}></div>
                  <p>Chưa có thông báo nào dành cho bạn.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {hoaDonXem && (
        <ModalXemHoaDon
          invoiceData={hoaDonXem}
          onDong={() => setHoaDonXem(null)}
          onPrint={() => inHoaDon(hoaDonXem)}
        />
      )}
    </section>
  );
}

export default CustomerArea;
