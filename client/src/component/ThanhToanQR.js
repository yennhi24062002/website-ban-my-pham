import { TK_NHAN } from "../constant/thanhToan";

// Component hiển thị mã QR VietQR để khách thanh toán
// Hỗ trợ cả chế độ demo: nút giả lập quét QR thành công
function ThanhToanQR({ madonhang, tongtien, onGiaLap }) {
  const noiDung = `HONGXINH DH${madonhang || "XXX"}`;

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #f0d0e8",
      borderRadius: 16,
      overflow: "hidden",
      marginTop: 12,
      boxShadow: "0 4px 20px rgba(194,24,105,0.10)"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #ae2d68, #d81b70)",
        padding: "14px 20px",
        display: "flex", alignItems: "center", gap: 10, color: "white"
      }}>
        <span style={{ fontSize: 22 }}></span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Quét mã QR để thanh toán</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>VietQR · MoMo · Napas 247</div>
        </div>
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* QR thật từ VietQR */}
        <div style={{
          background: "white", border: "2px solid #f0d0e8",
          borderRadius: 12, padding: 10, marginBottom: 14
        }}>
          <img
            src={`https://img.vietqr.io/image/VCB-${TK_NHAN.sotk}-compact2.png?amount=${tongtien}&addInfo=${encodeURIComponent(noiDung)}&accountName=${encodeURIComponent(TK_NHAN.ten)}`}
            alt="Mã QR thanh toán"
            style={{ width: 200, height: 200, display: "block", borderRadius: 8 }}
            onError={(e) => {
              e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`VCB|${TK_NHAN.sotk}|${TK_NHAN.ten}|${tongtien}|${noiDung}`)}`;
            }}
          />
        </div>

        {/* Thông tin tài khoản */}
        <div style={{ width: "100%", background: "#fdf2f8", borderRadius: 10, padding: "12px 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 14px", fontSize: 14 }}>
            <span style={{ color: "#888" }}>Tên người nhận</span>
            <strong>{TK_NHAN.ten}</strong>
            <span style={{ color: "#888" }}>Ngân hàng</span>
            <span>{TK_NHAN.tenNganHang}</span>
            <span style={{ color: "#888" }}>Số tài khoản</span>
            <strong style={{ letterSpacing: 1 }}>{TK_NHAN.sotk}</strong>
            <span style={{ color: "#888" }}>Số tiền</span>
            <strong style={{ color: "#c21869", fontSize: 16 }}>
              {new Intl.NumberFormat("vi-VN").format(tongtien)}đ
            </strong>
            {madonhang && (
              <>
                <span style={{ color: "#888" }}>Nội dung CK</span>
                <code style={{ background: "#ffe0f0", padding: "2px 8px", borderRadius: 6, fontWeight: 700, color: "#c21869" }}>
                  {noiDung}
                </code>
              </>
            )}
          </div>
        </div>

        {/* NÚT DEMO – Giả lập quét QR thành công */}
        {onGiaLap && (
          <div style={{ width: "100%", marginTop: 14 }}>
            <div style={{
              background: "#fff8e1", border: "1px dashed #ffc107",
              borderRadius: 10, padding: "10px 14px", marginBottom: 10,
              fontSize: 12, color: "#856404", textAlign: "center"
            }}>
               <strong>Chế độ demo:</strong> Nhấn nút bên dưới để giả lập khách hàng vừa quét QR thành công
            </div>
            <button
              className="nut"
              style={{
                width: "100%", fontSize: 15, padding: 13,
                background: "linear-gradient(135deg,#28a745,#1e7e34)"
              }}
              onClick={() => onGiaLap("qrcode", null)}
            >
              Giả lập: Khách đã quét QR & chuyển tiền
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThanhToanQR;
