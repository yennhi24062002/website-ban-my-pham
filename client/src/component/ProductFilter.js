import { useMemo } from "react";

function ProductFilter({ danhMuc, tuKhoa, setTuKhoa, danhMucChon, setDanhMucChon }) {
  const GOI_Y = useMemo(() => ["Cocoon", "Klairs", "Anessa", "Skin1004", "Bioderma", "L'Oreal"], []);

  return (
    <section className="o-bo-loc-san-pham-hasaki">
      {/* Thanh tìm kiếm trung tâm */}
      <div className="khung-tim-kiem-lon-hasaki">
        <div className="o-nhap-tim-kiem-hasaki">
          <input
            type="text"
            value={tuKhoa}
            onChange={(e) => setTuKhoa(e.target.value)}
            placeholder="Bạn muốn tìm mỹ phẩm gì hôm nay?..."
            className="nhap-search-hasaki"
            style={{ paddingLeft: 10 }}
          />
          {tuKhoa && (
            <button 
              type="button" 
              className="nut-xoa-chu-tim-kiem" 
              onClick={() => setTuKhoa("")}
            >
              ✕
            </button>
          )}
          <button type="button" className="nut-nhan-tim-kiem-hasaki">
            Tìm kiếm
          </button>
        </div>
        
        {/* Gợi ý tìm kiếm nhanh */}
        <div className="hang-goi-y-tim-kiem">
          <span className="nhan-goi-y">Tìm kiếm nhiều nhất:</span>
          {GOI_Y.map((item) => (
            <span 
              key={item} 
              className="tag-goi-y-keyword"
              onClick={() => setTuKhoa(item)}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Danh mục dạng tab tròn sinh động - Đã xóa toàn bộ icon */}
      <div className="vung-tab-danh-muc-hasaki">
        {danhMuc.map((dm) => {
          const isActive = dm === danhMucChon;
          return (
            <button
              key={dm}
              type="button"
              className={`tab-danh-muc-pill ${isActive ? "active" : ""}`}
              onClick={() => setDanhMucChon(dm)}
            >
              <span className="chu-dm-pill">{dm}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default ProductFilter;
