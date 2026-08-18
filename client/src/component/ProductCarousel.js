import { useContext, useRef, useEffect, useState } from "react";
import { AppContext } from "../store/AppContext";

function ProductCarousel({ sanPhams, setChiTiet }) {
  const { themVaoGio } = useContext(AppContext);
  const carouselRef = useRef(null);
  const [dangHover, setDangHover] = useState(false);

  function formatTien(soTien) {
    return new Intl.NumberFormat("vi-VN").format(soTien) + "đ";
  }

  // Auto-scroll mỗi 3 giây, dừng khi hover
  useEffect(() => {
    if (dangHover || !sanPhams?.length) return;
    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const el = carouselRef.current;
      const cardWidth = 220 + 16; // width + gap
      const maxScroll = el.scrollWidth - el.clientWidth;
      const nextScroll = el.scrollLeft + cardWidth;

      if (nextScroll >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [dangHover, sanPhams]);

  // Cuộn trái/phải thủ công
  const cuonCarousel = (direction) => {
    if (!carouselRef.current) return;
    const cardWidth = 220 + 16;
    carouselRef.current.scrollBy({
      left: direction === "trai" ? -cardWidth * 2 : cardWidth * 2,
      behavior: "smooth",
    });
  };

  if (!sanPhams?.length) return null;

  return (
    <section
      className="hop o-carousel-san-pham-doc-quyen"
      onMouseEnter={() => setDangHover(true)}
      onMouseLeave={() => setDangHover(false)}
    >
      <div className="hang-tieu-de-carousel">
        <div>
          <h2 className="tieu-de-hasaki-carousel">Có thể bạn thích</h2>
          <p style={{ margin: 0, fontSize: 13, color: "#a0727f" }}>Gợi ý dành riêng cho bạn</p>
        </div>
        <div className="hang-nut-dieu-huong-carousel">
          <button
            type="button"
            className="nut-cuon nut-cuon-trai"
            onClick={() => cuonCarousel("trai")}
            title="Trước"
          >
            ‹
          </button>
          <button
            type="button"
            className="nut-cuon nut-cuon-phai"
            onClick={() => cuonCarousel("phai")}
            title="Tiếp"
          >
            ›
          </button>
        </div>
      </div>

      <div className="vung-chua-carousel" ref={carouselRef}>
        {sanPhams.map((sp) => {
          const coGiamGia = sp.giagoc && sp.giagoc > sp.gia;
          const phanTramGiam = coGiamGia
            ? Math.round(((sp.giagoc - sp.gia) / sp.giagoc) * 100)
            : 0;
          const defaultVariant = sp.luachon?.[0] || null;
          const banMoiThang =
            sp.masanpham % 3 === 0
              ? "955/tháng"
              : sp.masanpham % 2 === 0
              ? "1.6k/tháng"
              : "504/tháng";
          const ratingDiem = (4.7 + (sp.masanpham % 4) * 0.1).toFixed(1);
          const reviewCount = 28 + (sp.masanpham * 17) % 250;
          // Render sao
          const renderSao = (diem) => {
            const full = Math.floor(diem);
            return Array.from({ length: 5 }, (_, i) => (
              <span key={i} style={{ color: i < full ? "#f5a623" : "#ddd", fontSize: 12 }}>★</span>
            ));
          };

          return (
            <div
              className="the-carousel-san-pham"
              key={sp.masanpham}
              onClick={() => setChiTiet(sp)}
            >
              <div className="anh-wrapper-carousel">
                <img src={sp.hinh} alt={sp.ten} loading="lazy" />
                {coGiamGia && (
                  <span className="nhan-giam-gia-badge">-{phanTramGiam}%</span>
                )}
              </div>

              <div className="thong-tin-wrapper-carousel">
                <p style={{ margin: "0 0 2px", fontSize: 11, color: "#c9184a", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {sp.tenthuonghieu || "Hồng Xinh"}
                </p>
                <h4 className="ten-san-pham-carousel">{sp.ten}</h4>

                <div className="hang-danh-gia-va-ban">
                  <span className="diem-sao-hasaki">
                    {renderSao(ratingDiem)}
                    <span style={{ marginLeft: 4, fontSize: 12, color: "#555" }}>{ratingDiem} ({reviewCount})</span>
                  </span>
                </div>

                <p style={{ margin: "4px 0", fontSize: 12, color: "#888" }}>Đã bán {banMoiThang}</p>

                <div className="gia-san-pham-carousel" style={{ justifyContent: "center" }}>
                  <span className="gia-ban-hien-tai">{formatTien(sp.gia)}</span>
                  {coGiamGia && (
                    <span className="gia-goc-gach-ngang">{formatTien(sp.giagoc)}</span>
                  )}
                </div>

                {sp.tenkm ? (
                  <div className="tag-khuyen-mai-detail">{sp.tenkm}</div>
                ) : (
                  <div className="tag-khuyen-mai-detail empty-detail">Hồng Xinh Beauty Care</div>
                )}

                <button
                  type="button"
                  className="nut nut-phu nut-them-gio-carousel-nhanh"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (defaultVariant) {
                      const success = themVaoGio(sp, defaultVariant);
                      if (success) alert(`Đã thêm ${sp.ten} vào giỏ hàng!`);
                    } else {
                      setChiTiet(sp);
                    }
                  }}
                >
                  Thêm giỏ hàng
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProductCarousel;
