import { useEffect, useState } from "react";

const DANH_SACH_PROMO = [
  {
    id: 1,
    tieuDe: "SIÊU SALE MÙA HÈ - RỰC RỠ SẮC ĐẸP",
    noiDung: "Giảm đến 50% cho toàn bộ sản phẩm chống nắng & làm sạch! Nhập mã HONGXINH500K để giảm ngay 500k cho đơn từ 2 triệu.",
    mauNen: "linear-gradient(135deg, #ff76c6 0%, #ff85d6 100%)",
  },
  {
    id: 2,
    tieuDe: "ĐỘC QUYỀN THƯƠNG HIỆU KLAIRS & SKIN1004",
    noiDung: "Hóa đơn Klairs từ 399k tặng ngay Nước hoa hồng 30ml trị giá 135K. Số lượng có hạn!",
    mauNen: "linear-gradient(135deg, #ff85a1 0%, #ffb3c1 100%)",
  },
  {
    id: 3,
    tieuDe: "SIÊU HỘI VIP - ĐẶT HÀNG NHẬN VOUCHER TỰ ĐỘNG",
    noiDung: "Chi tiêu đạt 2 triệu/tháng tự động tặng Voucher 500k. Chi tiêu đạt 5 triệu tặng ngay Voucher 1 triệu!",
    mauNen: "linear-gradient(135deg, #ff5c8a 0%, #ff76c6 100%)",
  }
];

function PromoBanner() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % DANH_SACH_PROMO.length);
    }, 5000); // Đổi banner mỗi 5 giây
    return () => clearInterval(timer);
  }, []);

  const activePromo = DANH_SACH_PROMO[activeIdx];

  return (
    <div 
      className="o-promo-banner-chu-dong"
      style={{ background: activePromo.mauNen }}
    >
      <div className="khung-chua-promo-banner">
        <h3>{activePromo.tieuDe}</h3>
        <p>{activePromo.noiDung}</p>
      </div>
      <div className="hang-cham-dieu-huong-promo">
        {DANH_SACH_PROMO.map((_, idx) => (
          <span 
            key={idx}
            className={idx === activeIdx ? "cham-promo active" : "cham-promo"}
            onClick={() => setActiveIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default PromoBanner;
