import { useState } from "react";
import { TK_NHAN, DANH_SACH_NGAN_HANG } from "../constant/thanhToan";

// Component hướng dẫn chuyển khoản ngân hàng
// Cho phép chọn ngân hàng nguồn, hiển thị thông tin tài khoản đích
// Hỗ trợ chế độ demo: nút giả lập chuyển khoản thành công
function ThanhToanBanking({ madonhang, tongtien, onGiaLap }) {
  const [nganhangChon, setNganhangChon] = useState("");
  const noiDung = `HONGXINH DH${madonhang || "XXX"}`;

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #c3e6cb",
      borderRadius: 16,
      overflow: "hidden",
      marginTop: 12,
      boxShadow: "0 4px 20px rgba(40,167,69,0.08)"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg,#155724,#28a745)",
        padding: "14px 20px",
        display: "flex", alignItems: "center", gap: 10, color: "white"
      }}>
        <span style={{ fontSize: 22 }}></span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Chuyển khoản ngân hàng</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>Chuyển đến tài khoản người bán</div>
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {/* Chọn ngân hàng nguồn */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: "#555", fontWeight: 600, display: "block", marginBottom: 6 }}>
            Bạn chuyển từ ngân hàng nào?
          </label>
          <select
            value={nganhangChon}
            onChange={(e) => setNganhangChon(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px",
              border: "2px solid #c3e6cb", borderRadius: 10,
              fontSize: 15, background: "#fff", margin: 0
            }}
          >
            <option value="">-- Chọn ngân hàng của bạn --</option>
            {DANH_SACH_NGAN_HANG.map((nh) => (
              <option key={nh.ma} value={nh.ma}>{nh.ten}</option>
            ))}
          </select>
        </div>

        {/* Thông tin tài khoản nhận */}
        <div style={{ background: "#f0fff4", border: "1px solid #c3e6cb", borderRadius: 12, padding: "14px 18px" }}>
          <div style={{ fontSize: 13, color: "#555", fontWeight: 700, marginBottom: 10 }}>
            Thông tin tài khoản nhận
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 16px", fontSize: 14, alignItems: "center" }}>
            <span style={{ color: "#666" }}>Ngân hàng</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ background: "#155724", color: "white", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                VCB
              </span>
              <span>{TK_NHAN.tenNganHang}</span>
            </div>

            <span style={{ color: "#666" }}>Số tài khoản</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <strong style={{ fontSize: 20, letterSpacing: 2, color: "#155724" }}>{TK_NHAN.sotk}</strong>
              <button
                className="nut nut-phu"
                style={{ fontSize: 12, padding: "4px 10px", margin: 0 }}
                onClick={() => { navigator.clipboard?.writeText(TK_NHAN.sotk); alert("Đã sao chép!"); }}
              >
                Copy
              </button>
            </div>

            <span style={{ color: "#666" }}>Chủ tài khoản</span>
            <strong>{TK_NHAN.ten}</strong>

            <span style={{ color: "#666" }}>Số tiền</span>
            <strong style={{ color: "#c21869", fontSize: 18 }}>
              {new Intl.NumberFormat("vi-VN").format(tongtien)}đ
            </strong>

            {madonhang && (
              <>
                <span style={{ color: "#666" }}>Nội dung CK</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <code style={{ background: "#d4edda", padding: "4px 10px", borderRadius: 6, fontWeight: 700, color: "#155724" }}>
                    {noiDung}
                  </code>
                  <button
                    className="nut nut-phu"
                    style={{ fontSize: 12, padding: "4px 10px", margin: 0 }}
                    onClick={() => { navigator.clipboard?.writeText(noiDung); alert("Đã sao chép!"); }}
                  >
                    
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hướng dẫn theo ngân hàng đã chọn */}
        {nganhangChon && (
          <div style={{
            background: "#fff3cd", border: "1px solid #ffc107",
            borderRadius: 10, padding: "12px 16px", marginTop: 14
          }}>
            <strong style={{ color: "#856404" }}>
               Hướng dẫn qua {DANH_SACH_NGAN_HANG.find(n => n.ma === nganhangChon)?.ten}:
            </strong>
            <ol style={{ margin: "8px 0 0", paddingLeft: 20, color: "#856404", fontSize: 13 }}>
              <li>Mở app {DANH_SACH_NGAN_HANG.find(n => n.ma === nganhangChon)?.ten}</li>
              <li>Chọn <strong>Chuyển tiền</strong> → tài khoản ngân hàng khác</li>
              <li>Chọn ngân hàng đích: <strong>Vietcombank (VCB)</strong></li>
              <li>Nhập STK: <strong>{TK_NHAN.sotk}</strong></li>
              <li>Số tiền: <strong>{new Intl.NumberFormat("vi-VN").format(tongtien)}đ</strong></li>
              <li>Nội dung: <strong>{noiDung}</strong></li>
              <li>Xác nhận và gửi</li>
            </ol>
          </div>
        )}

        {/* NÚT DEMO */}
        {onGiaLap && (
          <div style={{ marginTop: 14 }}>
            <div style={{
              background: "#fff8e1", border: "1px dashed #ffc107",
              borderRadius: 10, padding: "10px 14px", marginBottom: 10,
              fontSize: 12, color: "#856404", textAlign: "center"
            }}>
               <strong>Chế độ demo:</strong> Nhấn nút bên dưới để giả lập khách hàng vừa chuyển khoản thành công
            </div>
            <button
              className="nut"
              style={{
                width: "100%", fontSize: 15, padding: 13,
                background: "linear-gradient(135deg,#28a745,#1e7e34)"
              }}
              onClick={() => onGiaLap("banking", nganhangChon || "VCB")}
            >
              Giả lập: Khách đã chuyển khoản thành công
            </button>
          </div>
        )}

        <p style={{ fontSize: 12, color: "#999", margin: "12px 0 0" }}>
          Ghi đúng nội dung để đơn được xác nhận trong vòng 30 phút.
        </p>
      </div>
    </div>
  );
}

export default ThanhToanBanking;
