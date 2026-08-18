import { DANH_SACH_NGAN_HANG } from "../constant/thanhToan";

// Màn hình giả lập thanh toán thành công (dùng khi demo)
// Hiển thị overlay modal xác nhận sau khi khách quét QR hoặc chuyển khoản
function ManHinhThanhToan({ phuongthuc, madonhang, tongtien, soNganHang, onDong }) {
  const ten = phuongthuc === "qrcode" ? "QR Code" : "Chuyển khoản";
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20
    }}>
      <div style={{
        background: "white", borderRadius: 20, maxWidth: 400, width: "100%",
        overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        animation: "fadeIn 0.3s ease"
      }}>
        {/* Header xanh lá */}
        <div style={{
          background: "linear-gradient(135deg, #1e7e34, #28a745)",
          padding: "28px 24px",
          textAlign: "center", color: "white"
        }}>
          <div style={{ fontSize: 64, lineHeight: 1 }}></div>
          <div style={{ fontSize: 22, fontWeight: 800, marginTop: 10 }}>Thanh toán thành công!</div>
          <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>
            Đã nhận thanh toán qua {ten}
          </div>
        </div>

        {/* Chi tiết */}
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 16px", fontSize: 14 }}>
            <span style={{ color: "#888" }}>Mã đơn hàng</span>
            <strong>#{madonhang}</strong>

            <span style={{ color: "#888" }}>Số tiền</span>
            <strong style={{ color: "#c21869", fontSize: 18 }}>
              {new Intl.NumberFormat("vi-VN").format(tongtien)}đ
            </strong>

            <span style={{ color: "#888" }}>Phương thức</span>
            <span>{ten}</span>

            {soNganHang && (
              <>
                <span style={{ color: "#888" }}>Từ ngân hàng</span>
                <span>{DANH_SACH_NGAN_HANG.find(n => n.ma === soNganHang)?.ten || soNganHang}</span>
              </>
            )}

            <span style={{ color: "#888" }}>Thời gian</span>
            <span>{new Date().toLocaleString("vi-VN")}</span>

            <span style={{ color: "#888" }}>Mã GD</span>
            <code style={{ fontSize: 12 }}>
              {phuongthuc === "qrcode" ? "QR" : "CK"}
              {Date.now().toString().slice(-8)}
            </code>
          </div>

          <div style={{
            background: "#e8f5e9", borderRadius: 10, padding: "10px 14px",
            marginTop: 16, fontSize: 13, color: "#155724", textAlign: "center"
          }}>
            Đơn hàng của bạn đang được chuẩn bị và sẽ giao sớm nhất có thể.
          </div>

          <button
            className="nut"
            style={{ width: "100%", marginTop: 16, fontSize: 15, padding: 13 }}
            onClick={onDong}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManHinhThanhToan;
