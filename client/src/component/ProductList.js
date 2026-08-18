import { useContext } from "react";
import { AppContext } from "../store/AppContext";

function ProductList({ sanPhams, setChiTiet }) {
  const { themVaoGio } = useContext(AppContext);

  function formatTien(soTien) {
    return new Intl.NumberFormat("vi-VN").format(soTien) + "đ";
  }

  return (
    <section id="sanpham" className="hop danh-sach-san-pham-box">
      <h2>Danh sách sản phẩm</h2>
      <div className="luoi-san-pham">
        {sanPhams.map((sp) => {
          // Tính toán phần trăm giảm giá nếu có giá gốc
          const coGiamGia = sp.giagoc && sp.giagoc > sp.gia;
          const phanTramGiam = coGiamGia
            ? Math.round(((sp.giagoc - sp.gia) / sp.giagoc) * 100)
            : 0;

          // Phân loại mặc định để thêm nhanh vào giỏ hàng
          const defaultVariant = sp.luachon?.[0] || null;

          return (
            <div className="san-pham the-san-pham-hasaki" key={sp.masanpham} onClick={() => setChiTiet(sp)}>
              <div className="anh-san-pham-wrapper">
                <img src={sp.hinh} alt={sp.ten} />
                {coGiamGia && (
                  <span className="nhan-giam-gia">-{phanTramGiam}%</span>
                )}
              </div>

              <div className="thong-tin-san-pham-card">
                <h3 className="ten-san-pham-card">{sp.ten}</h3>
                <p className="danhmuc-card">{sp.danhMuc}</p>

                <div className="dong-gia-card" style={{ justifyContent: "center" }}>
                  <span className="gia">{formatTien(sp.gia)}</span>
                  {coGiamGia && (
                    <span className="gia-goc-gach-cheo">{formatTien(sp.giagoc)}</span>
                  )}
                </div>

                {/* Thanh tiến trình % đã bán */}
                <div className="thanh-tien-trinh-ban">
                  <div 
                    className="phan-tram-tien-trinh" 
                    style={{ width: `${sp.tileban || 30}%` }}
                  ></div>
                  <span className="chu-tien-trinh">Đã bán {sp.tileban || 30}%</span>
                </div>

                {/* Dòng khuyến mại/Promo */}
                {sp.tenkm ? (
                  <div className="tag-khuyen-mai" style={{ color: "#d81b60", textAlign: "center" }}>
                    {sp.tenkm}
                  </div>
                ) : (
                  <div className="tag-khuyen-mai rong"></div>
                )}

                {/* Nút thêm giỏ hàng nhanh */}
                <button 
                  className="nut nut-phu nut-them-gio-nhanh"
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện click thẻ cha (mở chi tiết)
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

export default ProductList;
