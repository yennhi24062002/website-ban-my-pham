import { useEffect, useState } from "react";

const SLIDES = [
  {
    id: 1,
    title: "QUÀ TẶNG THÁNG 6 VỚI VOUCHER KHỦNG",
    subtitle: "Tặng ngay Voucher 500.000đ cho hóa đơn tích lũy từ 2 triệu, và Voucher 1.000.000đ khi chi tiêu từ 5 triệu trong tháng!",
    image: "/hinhanh/cosmetics_banner.png",
    link: "#lichsu",
    btnText: "Xem voucher của tôi",
    bg: "linear-gradient(135deg, #ffe5ec 0%, #ffccd5 100%)"
  },
  {
    id: 2,
    title: "TÔN VINH VẺ ĐẸP TỰ NHIÊN CỦA BẠN",
    subtitle: "Khám phá các sản phẩm Serum dưỡng ẩm sâu, nước hoa hồng dịu nhẹ và kem chống nắng nâng tông lành tính cho mọi làn da.",
    image: "/hinhanh/cosmetics_banner.png",
    link: "#sanpham-grid",
    btnText: "Khám phá ngay ",
    bg: "linear-gradient(135deg, #fff0f3 0%, #ffccd5 100%)"
  },
  {
    id: 3,
    title: "HỖ TRỢ TRỰC TUYẾN & TƯ VẤN VIP",
    subtitle: "Cần tư vấn da liễu hoặc yêu cầu hỗ trợ gấp? Nhấp vào biểu tượng Zalo hoặc Hotline ở góc dưới màn hình để gặp tư vấn viên ngay lập tức!",
    image: "/hinhanh/cosmetics_banner.png",
    link: "#lienhe",
    btnText: "Liên hệ chúng tôi ",
    bg: "linear-gradient(135deg, #ffe5ec 0%, #ffb3c1 100%)"
  }
];

function Banner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "380px",
      borderRadius: "24px",
      overflow: "hidden",
      marginBottom: "35px",
      boxShadow: "0 15px 35px rgba(255, 179, 193, 0.25)",
      background: SLIDES[active].bg,
      transition: "background 0.8s ease"
    }}>
      {/* Khung chứa danh sách Slide */}
      {SLIDES.map((slide, idx) => {
        const isCurrent = idx === active;
        return (
          <div
            key={slide.id}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: isCurrent ? 1 : 0,
              transform: isCurrent ? "translateX(0)" : "translateX(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 60px",
              zIndex: isCurrent ? 2 : 1,
              pointerEvents: isCurrent ? "auto" : "none"
            }}
          >
            {/* Phần nội dung chữ trên Slide */}
            <div style={{ maxWidth: "55%", color: "#4a353b" }}>
              <span style={{
                background: "rgba(255, 255, 255, 0.7)",
                color: "#ff5c7a",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
                letterSpacing: "1px",
                textTransform: "uppercase",
                boxShadow: "0 4px 10px rgba(0,0,0,0.02)"
              }}>
                HOT PROMOTION
              </span>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "2.1rem",
                color: "#c9184a",
                margin: "18px 0 10px",
                border: "none",
                padding: 0
              }}>
                {slide.title}
              </h2>
              <p style={{
                fontSize: "15px",
                lineHeight: "1.6",
                color: "#6b4d57",
                margin: "0 0 24px"
              }}>
                {slide.subtitle}
              </p>
              <a
                href={slide.link}
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #ff758f 0%, #ff8fa3 100%)",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "14px",
                  boxShadow: "0 8px 20px rgba(255, 117, 143, 0.3)",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(255, 117, 143, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 117, 143, 0.3)";
                }}
              >
                {slide.btnText}
              </a>
            </div>

            {/* Phần hình ảnh minh họa trên Slide */}
            <div style={{
              width: "35%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.4)",
                filter: "blur(20px)",
                zIndex: 1
              }} />
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  borderRadius: "18px",
                  zIndex: 2,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  transform: isCurrent ? "scale(1)" : "scale(0.95)",
                  transition: "transform 0.8s ease"
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Nút tròn chỉ định trang Slide */}
      <div style={{
        position: "absolute",
        bottom: "20px",
        left: "60px",
        display: "flex",
        gap: "8px",
        zIndex: 10
      }}>
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            style={{
              width: active === idx ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: active === idx ? "#c9184a" : "rgba(107, 77, 87, 0.3)",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
