import { useState } from "react";

function ContactWidget() {
  const ZALO_PHONE = "0908719006"; // Số điện thoại mới của cửa hàng
  const [showPhone, setShowPhone] = useState(false);

  return (
    <>
      {/* Widget nổi góc phải màn hình */}
      <div style={{
        position: "fixed",
        right: 20,
        bottom: 90,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 10
      }}>
        {/* Nút Zalo */}
        <a
          href={`https://zalo.me/${ZALO_PHONE}`}
          target="_blank"
          rel="noreferrer"
          title="Chat Zalo với cửa hàng"
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0068FF, #00C6FB)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0,104,255,0.5)",
            cursor: "pointer",
            textDecoration: "none",
            animation: "pulseBadge 2s infinite",
            transition: "transform 0.2s"
          }}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.15)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg viewBox="0 0 24 24" width="30" height="30" style={{ display: "block" }}>
            <path fill="#ffffff" d="M12,2C6.477,2,2,6.03,2,11c0,2.885,1.527,5.437,3.923,7.031L5.056,21.57 C4.947,21.897,5.267,22.189,5.556,22.046l4.636-2.28C10.825,19.9,11.408,20,12,20c5.523,0,10-4.03,10-9S17.523,2,12,2z"/>
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="#0068FF" fontSize="7.5" fontFamily="'Outfit', sans-serif" fontWeight="900">Zalo</text>
          </svg>
        </a>

        {/* Nút Điện thoại & Popover số điện thoại */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          {showPhone && (
            <div style={{
              position: "absolute",
              right: 65,
              background: "#ffffff",
              color: "#c9184a",
              border: "2px solid #ffccd5",
              borderRadius: "10px",
              padding: "10px 16px",
              boxShadow: "0 6px 20px rgba(255, 117, 143, 0.15)",
              whiteSpace: "nowrap",
              fontWeight: "bold",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              animation: "fadeInRight 0.3s ease",
              zIndex: 9998
            }}>
              Hotline: <a href={`tel:${ZALO_PHONE}`} style={{ color: "#c9184a", textDecoration: "underline" }}>{ZALO_PHONE}</a>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowPhone(false); }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#999",
                  cursor: "pointer",
                  padding: "0 0 0 5px",
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: "bold"
                }}
              >
                
              </button>
            </div>
          )}

          <div
            onClick={() => setShowPhone(!showPhone)}
            title={`Gọi ${ZALO_PHONE}`}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #11998e, #38ef7d)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(17,153,142,0.5)",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.15)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Thanh thông tin liên hệ cuối trang */}
      <section id="lienhe" style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        color: "#fff",
        padding: "40px 30px",
        marginTop: 40
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 30 }}>
          <div>
            <h3 style={{ color: "#ffccd5", marginBottom: 12, fontSize: 18 }}>Cửa hàng</h3>
            <p style={{ color: "#ccc", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "#fff" }}>Website bán mỹ phẩm</strong><br />
              123 Đường Nguyễn Huệ, Quận 1<br />
              Thành phố Hồ Chí Minh
            </p>
          </div>
          <div>
            <h3 style={{ color: "#ffccd5", marginBottom: 12, fontSize: 18 }}>Liên hệ</h3>
            <p style={{ color: "#ccc", lineHeight: 1.9, margin: 0 }}>
              Hotline: <a href={`tel:${ZALO_PHONE}`} style={{ color: "#81d4fa" }}>{ZALO_PHONE}</a><br />
              Zalo: <a href={`https://zalo.me/${ZALO_PHONE}`} target="_blank" rel="noreferrer" style={{ color: "#81d4fa" }}>Chat ngay</a><br />
              Email: <a href="mailto:support@mypham.vn" style={{ color: "#81d4fa" }}>support@mypham.vn</a>
            </p>
          </div>
          <div>
            <h3 style={{ color: "#ffccd5", marginBottom: 12, fontSize: 18 }}>Giờ mở cửa</h3>
            <p style={{ color: "#ccc", lineHeight: 1.9, margin: 0 }}>
              Thứ 2 – Thứ 6: 8:00 – 21:00<br />
              Thứ 7: 8:00 – 22:00<br />
              Chủ nhật: 9:00 – 20:00
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 30, borderTop: "1px solid #333", paddingTop: 20, color: "#777", fontSize: 13 }}>
          © 2026 Website bán mỹ phẩm. All rights reserved.
        </div>
      </section>

      <style>{`
        @keyframes pulseBadge {
          0%, 100% { box-shadow: 0 4px 15px rgba(0,104,255,0.5); }
          50% { box-shadow: 0 4px 25px rgba(0,104,255,0.9); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

export default ContactWidget;
