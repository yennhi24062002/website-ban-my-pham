// Component modal xem chi tiết hóa đơn sau khi đặt hàng thành công
// Hiển thị thông tin đơn hàng, sản phẩm, tổng tiền, trạng thái thanh toán
function ModalXemHoaDon({ invoiceData, onDong, onPrint }) {
  if (!invoiceData) return null;
  const { donhang, thanhtoan, chitiet } = invoiceData;

  const styleLabel = { color: "#888", fontSize: "14px", paddingBottom: "6px" };
  const styleVal = { fontWeight: 600, color: "#333", paddingBottom: "6px" };

  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20
    }}>
      <style>{keyframes}</style>
      <div style={{
        background: "white", borderRadius: 20, maxWidth: 650, width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        animation: "fadeIn 0.3s ease", display: "flex", flexDirection: "column",
        maxHeight: "90vh", overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg,#c2185b,#d81b60)",
          padding: "20px 24px", color: "white", display: "flex",
          justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18 }}> Xem hóa đơn</h3>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Mã đơn hàng: #{donhang.madonhang}</span>
          </div>
          <button
            onClick={onDong}
            style={{
              background: "rgba(255,255,255,0.2)", border: "none", color: "white",
              borderRadius: "50%", width: 32, height: 32, cursor: "pointer",
              fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center"
            }}
          ></button>
        </div>

        {/* Content có thể cuộn */}
        <div style={{ padding: 24, overflowY: "auto", flex: 1 }}>
          {/* Thông tin cửa hàng */}
          <div style={{ marginBottom: 20, borderBottom: "1px dashed #f0d0e8", paddingBottom: 15 }}>
            <h2 style={{ color: "#c2185b", margin: "0 0 6px", fontSize: 22, textAlign: "center" }}>HÓA ĐƠN MUA HÀNG</h2>
            <p style={{ margin: 0, fontSize: 13, color: "#666", textAlign: "center" }}>
              <strong>Website bán mỹ phẩm</strong> | 123 Nguyễn Huệ, Q.1, TP.HCM
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#666", textAlign: "center" }}>
              Hotline: 0908719006
            </p>
          </div>

          {/* Thông tin khách hàng & giao dịch */}
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "2px 10px", fontSize: 14, marginBottom: 20 }}>
            <span style={styleLabel}>Người nhận:</span>
            <span style={styleVal}>{donhang.tennguoinhan || donhang.hoten}</span>

            <span style={styleLabel}>Số điện thoại:</span>
            <span style={styleVal}>{donhang.sodienthoainhan || donhang.sodienthoai}</span>

            <span style={styleLabel}>Địa chỉ giao:</span>
            <span style={styleVal}>{donhang.diachigiaohang}</span>

            <span style={styleLabel}>Ngày đặt:</span>
            <span style={styleVal}>{new Date(donhang.ngaydat).toLocaleString("vi-VN")}</span>

            <span style={styleLabel}>Thanh toán:</span>
            <span style={styleVal}>
              {thanhtoan?.phuongthuc === "qrcode" ? "QR Code" : thanhtoan?.phuongthuc === "banking" ? "Chuyển khoản" : "Tiền mặt (COD)"}
            </span>

            {thanhtoan?.magiaodich && (
              <>
                <span style={styleLabel}>Mã giao dịch:</span>
                <span style={styleVal}><code>{thanhtoan.magiaodich}</code></span>
              </>
            )}
            {donhang.ghichu && (
              <>
                <span style={styleLabel}>Ghi chú:</span>
                <span style={styleVal}>{donhang.ghichu}</span>
              </>
            )}
          </div>

          {/* Bảng sản phẩm */}
          <div style={{ border: "1px solid #f0d0e8", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#fce4ec", borderBottom: "1px solid #f8bbd0" }}>
                  <th style={{ textAlign: "left", padding: 10, color: "#c2185b", fontWeight: 600 }}>Sản phẩm</th>
                  <th style={{ textAlign: "center", padding: 10, color: "#c2185b", fontWeight: 600, width: 60 }}>SL</th>
                  <th style={{ textAlign: "right", padding: 10, color: "#c2185b", fontWeight: 600, width: 100 }}>Đơn giá</th>
                  <th style={{ textAlign: "right", padding: 10, color: "#c2185b", fontWeight: 600, width: 110 }}>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {(chitiet || []).map((item, idx) => {
                  const options = [item.mausac, item.loai, item.dungtich].filter(Boolean).join(" - ");
                  return (
                    <tr key={idx} style={{ borderBottom: "1px solid #fdf2f8" }}>
                      <td style={{ padding: 10, color: "#333" }}>
                        <strong>{item.tensanpham}</strong>
                        {options && <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{options}</div>}
                      </td>
                      <td style={{ padding: 10, textAlign: "center", color: "#555" }}>{item.soluong}</td>
                      <td style={{ padding: 10, textAlign: "right", color: "#555" }}>
                        {Number(item.dongia).toLocaleString("vi-VN")}đ
                      </td>
                      <td style={{ padding: 10, textAlign: "right", fontWeight: 600, color: "#333" }}>
                        {Number(item.thanhtien).toLocaleString("vi-VN")}đ
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Tổng tiền & trạng thái */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed #f0d0e8", paddingTop: 15 }}>
            <div>
              <span style={{
                background: donhang.trangthaithanhtoan === "dathanhtoan" ? "#d4edda" : "#fff3cd",
                color: donhang.trangthaithanhtoan === "dathanhtoan" ? "#155724" : "#856404",
                padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600
              }}>
                {donhang.trangthaithanhtoan === "dathanhtoan" ? "Đã thanh toán" : "Chờ thanh toán"}
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 14, color: "#666" }}>Tổng cộng:</span>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#c2185b", marginTop: 4 }}>
                {Number(donhang.tongtien).toLocaleString("vi-VN")}đ
              </div>
            </div>
          </div>
        </div>

        {/* Footer nút bấm */}
        <div style={{
          padding: "16px 24px", background: "#fdf2f8", borderTop: "1px solid #f0d0e8",
          display: "flex", justifyContent: "flex-end", gap: 10
        }}>
          <button
            onClick={onPrint}
            className="nut"
            style={{ background: "linear-gradient(135deg,#e91e63,#c2185b)", fontSize: 14, padding: "10px 20px" }}
          >️ In & Lưu PDF</button>
          <button
            onClick={onDong}
            className="nut nut-phu"
            style={{ fontSize: 14, padding: "10px 20px", border: "1px solid #ccc", background: "#eee", color: "#333" }}
          >Đóng</button>
        </div>
      </div>
    </div>
  );
}

export default ModalXemHoaDon;
