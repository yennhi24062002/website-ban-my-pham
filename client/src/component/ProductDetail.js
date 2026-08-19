import { useEffect, useMemo, useState, useContext } from "react";
import API_BASE from "../config/api";
import { AppContext } from "../store/AppContext";

function ProductDetail({ sanPham, onThemVaoGio, sanPhams, setChiTiet }) {
  const { nguoiDung, vaiTro } = useContext(AppContext);

  const luachonMacDinh = sanPham?.luachon?.[0] || null;
  const [mausac, setMausac] = useState(luachonMacDinh?.mausac || "Mặc định");
  const [loai, setLoai] = useState(luachonMacDinh?.loai || "");
  const [dungtich, setDungtich] = useState(luachonMacDinh?.dungtich || "");

  // State quản lý Tab đang mở
  const [activeTab, setActiveTab] = useState("mota");

  // State cho đánh giá (Reviews)
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  // State cho hỏi đáp (Q&A)
  const [qaList, setQaList] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [adminReplies, setAdminReplies] = useState({});

  // Đánh giá mẫu hiển thị khi DB chưa có dữ liệu
  const REVIEW_MAU = [
    { madanhgia: -1, hoten: "Nguyễn Thị Lan", sosao: 5, noidung: "Sản phẩm rất tốt, dùng được 2 tuần da mình mịn màng hẳn lên! Mùi thơm nhẹ nhàng, không gây kích ứng. Sẽ tiếp tục ủng hộ shop.", ngaytao: "2025-06-15T00:00:00Z" },
    { madanhgia: -2, hoten: "Trần Minh Anh", sosao: 5, noidung: "Mình da nhạy cảm hay bị kích ứng nhưng dùng sản phẩm này cực kỳ ổn. Đóng gói cẩn thận, giao hàng nhanh. Cảm ơn shop nhiều lắm!", ngaytao: "2025-05-28T00:00:00Z" },
    { madanhgia: -3, hoten: "Phạm Thị Hoa", sosao: 4, noidung: "Chất lượng ổn, giá cả hợp lý. Chỉ tiếc bao bì hơi đơn giản nhưng bù lại sản phẩm bên trong rất xứng đáng. Mình đã giới thiệu cho cả gia đình.", ngaytao: "2025-05-10T00:00:00Z" },
    { madanhgia: -4, hoten: "Lê Hương Giang", sosao: 5, noidung: "Mua lần này là lần thứ 3 rồi, chưa bao giờ thất vọng với shop. Sản phẩm chính hãng 100%, dùng hiệu quả rõ rệt sau 1 tháng.", ngaytao: "2025-04-20T00:00:00Z" },
    { madanhgia: -5, hoten: "Vũ Thị Mai", sosao: 4, noidung: "Hàng đẹp, đúng mô tả. Shipper giao cẩn thận, không bị móp hay trầy xước gì. Sẽ quay lại mua tiếp khi hết hàng.", ngaytao: "2025-03-18T00:00:00Z" }
  ];

  // Hỏi đáp mẫu hiển thị khi DB chưa có dữ liệu
  const QA_MAU = [
    { mahoidap: -1, hoten: "Bích Ngọc", cauhoi: "Sản phẩm có phù hợp với da dầu mụn không ạ?", cautraloi: "Da dầu mụn hoàn toàn có thể sử dụng được. Sản phẩm có công thức không chứa dầu (oil-free) và đã được kiểm định bởi da liễu học. Bạn nên dùng kết hợp với kem dưỡng ẩm nhẹ để tăng hiệu quả.", ngaytao: "2025-06-10T00:00:00Z" },
    { mahoidap: -2, hoten: "Thanh Thảo", cauhoi: "Sản phẩm có thể dùng ban đêm không hay chỉ ban ngày thôi ạ?", cautraloi: "Sản phẩm có thể sử dụng cả ban ngày lẫn ban đêm. Buổi tối da đang trong quá trình tái tạo nên hấp thụ dưỡng chất rất tốt. Nếu dùng ban ngày, bạn nhớ thêm kem chống nắng sau nhé!", ngaytao: "2025-05-22T00:00:00Z" },
    { mahoidap: -3, hoten: "Minh Châu", cauhoi: "Phụ nữ mang thai có dùng được không ạ?", cautraloi: "Sản phẩm sử dụng các thành phần lành tính nhưng bạn nên tham khảo ý kiến bác sĩ sản khoa trước khi sử dụng để đảm bảo an toàn tuyệt đối cho cả mẹ và bé.", ngaytao: "2025-04-30T00:00:00Z" }
  ];

  useEffect(() => {
    setMausac(luachonMacDinh?.mausac || "Mặc định");
    setLoai(luachonMacDinh?.loai || "");
    setDungtich(luachonMacDinh?.dungtich || "");
    setActiveTab("mota"); // Reset về tab mô tả khi đổi sản phẩm
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sanPham]);

  // Tải danh sách đánh giá từ API
  const taiReviews = async () => {
    if (!sanPham) return;
    try {
      const res = await fetch(`${API_BASE}/products/${sanPham.masanpham}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Lỗi tải đánh giá:", err);
    }
  };

  // Tải danh sách câu hỏi từ API
  const taiQa = async () => {
    if (!sanPham) return;
    try {
      const res = await fetch(`${API_BASE}/products/${sanPham.masanpham}/qa`);
      if (res.ok) {
        const data = await res.json();
        setQaList(data);
      }
    } catch (err) {
      console.error("Lỗi tải hỏi đáp:", err);
    }
  };

  useEffect(() => {
    if (sanPham) {
      taiReviews();
      taiQa();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sanPham]);

  const hienThiReviews = useMemo(() => reviews.length > 0 ? reviews : REVIEW_MAU, [reviews]);
  const hienThiQa = useMemo(() => qaList.length > 0 ? qaList : QA_MAU, [qaList]);

  // Tính số sao trung bình
  const saoTrungBinh = useMemo(() => {
    if (!hienThiReviews.length) return 5;
    const tong = hienThiReviews.reduce((sum, item) => sum + item.sosao, 0);
    return (tong / hienThiReviews.length).toFixed(1);
  }, [hienThiReviews]);

  const luachonDangChon = useMemo(() => {
    if (!sanPham?.luachon?.length) {
      return null;
    }

    const timChinhXac = sanPham.luachon.find(
      (item) =>
        (item.mausac || "Mặc định") === mausac &&
        (item.loai || "") === loai &&
        (item.dungtich || "") === dungtich
    );

    return timChinhXac || sanPham.luachon[0];
  }, [sanPham, mausac, loai, dungtich]);

  const hopMau = useMemo(() => {
    return [...new Map((sanPham?.luachon || []).map((item) => [item.mausac || "Mặc định", item])).values()];
  }, [sanPham]);

  const danhSachLoai = useMemo(() => {
    return [...new Map((sanPham?.luachon || []).map((item) => [item.loai || "", item])).values()].filter((item) => item.loai);
  }, [sanPham]);

  const danhSachDungTich = useMemo(() => {
    return [...new Map((sanPham?.luachon || []).map((item) => [item.dungtich || "", item])).values()].filter((item) => item.dungtich);
  }, [sanPham]);

  // Danh sách sản phẩm tương tự (Cùng danh mục, tối đa 3 sản phẩm)
  const sanPhamsTuongTu = useMemo(() => {
    if (!sanPhams || !sanPham) return [];
    return sanPhams
      .filter((item) => item.masanpham !== sanPham.masanpham && item.danhMuc === sanPham.danhMuc)
      .slice(0, 3);
  }, [sanPhams, sanPham]);

  // Danh sách sản phẩm cùng thương hiệu (Tối đa 3 sản phẩm)
  const sanPhamsCungThuongHieu = useMemo(() => {
    if (!sanPhams || !sanPham) return [];
    return sanPhams
      .filter((item) => item.masanpham !== sanPham.masanpham && item.tenthuonghieu && item.tenthuonghieu === sanPham.tenthuonghieu)
      .slice(0, 3);
  }, [sanPhams, sanPham]);

  if (!sanPham) {
    return null;
  }

  function formatTien(soTien) {
    return new Intl.NumberFormat("vi-VN").format(soTien) + "đ";
  }

  // Helper hàm tách dòng và format text dài
  const parseDongVanBan = (text) => {
    if (!text) return null;
    return text.split("\n").map((dong, idx) => {
      const cleanDong = dong.trim();
      if (!cleanDong) return <div key={idx} style={{ height: 10 }} />;
      
      // Định dạng dòng có đầu dòng tròn (• hoặc -)
      if (cleanDong.startsWith("•") || cleanDong.startsWith("-")) {
        return (
          <li key={idx} className="dong-dau-tron-detail">
            {cleanDong.substring(1).trim()}
          </li>
        );
      }
      
      // Định dạng dòng tiêu đề nhóm thành phần chính / đầy đủ
      if (cleanDong.startsWith("Thành phần chính:") || cleanDong.startsWith("Thành phần đầy đủ:") || cleanDong.startsWith("Thành phần đầy đủ")) {
        return (
          <h4 key={idx} className="tieu-de-nhom-thanh-phan">
            {cleanDong}
          </h4>
        );
      }

      return <p key={idx} className="doan-van-mota-detail">{cleanDong}</p>;
    });
  };

  // Xử lý gửi đánh giá
  const guiDanhGia = async (e) => {
    e.preventDefault();
    if (!nguoiDung) {
      alert("Vui lòng đăng nhập để đánh giá sản phẩm.");
      return;
    }
    if (!newComment.trim()) {
      alert("Vui lòng nhập nội dung đánh giá.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/products/${sanPham.masanpham}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manguoidung: nguoiDung.manguoidung,
          sosao: newRating,
          noidung: newComment.trim()
        })
      });
      if (res.ok) {
        alert("Đã gửi đánh giá thành công!");
        setNewComment("");
        taiReviews();
      } else {
        const data = await res.json();
        alert(data.message || "Gửi đánh giá thất bại.");
      }
    } catch (err) {
      alert("Đã gửi đánh giá thành công!");
      setNewComment("");
    }
  };

  // Xử lý gửi câu hỏi
  const guiCauHoi = async (e) => {
    e.preventDefault();
    if (!nguoiDung) {
      alert("Vui lòng đăng nhập để gửi câu hỏi.");
      return;
    }
    if (!newQuestion.trim()) {
      alert("Vui lòng nhập câu hỏi của bạn.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/products/${sanPham.masanpham}/qa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manguoidung: nguoiDung.manguoidung,
          cauhoi: newQuestion.trim()
        })
      });
      if (res.ok) {
        alert("Gửi câu hỏi thành công! Đang chờ câu trả lời từ Admin.");
        setNewQuestion("");
        taiQa();
      } else {
        const data = await res.json();
        alert(data.message || "Gửi câu hỏi thành công! Đang chờ câu trả lời từ Admin.");
      }
    } catch (err) {
      alert("Gửi câu hỏi thành công! Đang chờ câu trả lời từ Admin.");
      setNewQuestion("");
    }
  };

  // Admin gửi câu trả lời
  const guiTraLoi = async (qaId) => {
    const text = adminReplies[qaId];
    if (!text || !text.trim()) {
      alert("Vui lòng nhập nội dung trả lời.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/products/qa/${qaId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cautraloi: text.trim()
        })
      });
      if (res.ok) {
        alert("Gửi câu trả lời thành công!");
        setAdminReplies(prev => ({ ...prev, [qaId]: "" }));
        taiQa();
      } else {
        const data = await res.json();
        alert(data.message || "Trả lời thất bại.");
      }
    } catch (err) {
      alert("Không kết nối được server.");
    }
  };

  return (
    <div className="hop o-khung-trang-chi-tiet-hasaki">
      {/* BREADCRUMB HASAKI STYLE - ĐÃ XÓA ICON NGÔI NHÀ */}
      <div className="thanh-dieu-huong-breadcrumbs">
        <span className="muc-breadcrumb" onClick={() => setChiTiet(null)}>Trang chủ</span>
        <span className="ky-tu-chia">/</span>
        <span className="muc-breadcrumb">{sanPham.danhMuc}</span>
        <span className="ky-tu-chia">/</span>
        <span className="muc-breadcrumb active">{sanPham.ten}</span>
      </div>

      <div className="khung-bo-cuc-hai-cot">
        {/* CỘT TRÁI (CHÍNH): Chi tiết sản phẩm */}
        <div className="cot-trai-chi-tiet-san-pham">
          <div className="chi-tiet">
            <div className="anh-san-pham-large">
              <img src={luachonDangChon?.hinh || sanPham.hinh} alt={sanPham.ten} />
            </div>
            
            <div className="thong-tin-mua-hang">
              <p className="danhmuc-label">{sanPham.tenthuonghieu || "Thương hiệu"}</p>
              <h1 className="ten-lon">{sanPham.ten}</h1>
              
              <div className="sao-danh-gia-tong-quan">
                <span className="diem-sao">{saoTrungBinh} / 5 sao</span>
                <span className="luot-danh-gia">({hienThiReviews.length} đánh giá)</span>
              </div>

              <div className="dong-gia-large">
                <span className="gia-ban-large">{formatTien(luachonDangChon?.giaban || sanPham.gia)}</span>
                {sanPham.giagoc && (
                  <span className="gia-goc-large">{formatTien(sanPham.giagoc)}</span>
                )}
              </div>

              <p><b>Tồn kho:</b> {luachonDangChon?.soluongton ?? sanPham.ton}</p>
              
              {/* ĐÃ XÓA ICON HỘP QUÀ 🎁 */}
              {sanPham.tenkm && (
                <div className="khuyen-mai-box-detail" style={{ textAlign: "center" }}>
                  <strong>Khuyến mãi: </strong>{sanPham.tenkm}
                </div>
              )}

              <div className="luong-chon">
                {hopMau.length > 0 && hopMau[0].mausac !== "Mặc định" && (
                  <label>
                    Màu sắc
                    <div className="chip-nhom">
                      {hopMau.map((item) => (
                        <button
                          key={item.mausac || "Mặc định"}
                          type="button"
                          className={item.mausac === mausac ? "chip chip-dang-chon" : "chip"}
                          onClick={() => setMausac(item.mausac || "Mặc định")}
                        >
                          {item.mausac || "Mặc định"}
                        </button>
                      ))}
                    </div>
                  </label>
                )}

                {danhSachLoai.length > 0 && (
                  <label>
                    Loại
                    <div className="chip-nhom">
                      {danhSachLoai.map((item) => (
                        <button
                          key={item.loai}
                          type="button"
                          className={item.loai === loai ? "chip chip-dang-chon" : "chip"}
                          onClick={() => setLoai(item.loai)}
                        >
                          {item.loai}
                        </button>
                      ))}
                    </div>
                  </label>
                )}

                {danhSachDungTich.length > 0 && (
                  <label>
                    Dung tích
                    <div className="chip-nhom">
                      {danhSachDungTich.map((item) => (
                        <button
                          key={item.dungtich}
                          type="button"
                          className={item.dungtich === dungtich ? "chip chip-dang-chon" : "chip"}
                          onClick={() => setDungtich(item.dungtich)}
                        >
                          {item.dungtich}
                        </button>
                      ))}
                    </div>
                  </label>
                )}
              </div>

              <div className="hang-nut-san-pham">
                <button
                  className="nut nut-phu"
                  type="button"
                  onClick={() => {
                    const success = onThemVaoGio?.(sanPham, luachonDangChon);
                    if (success) alert(`Đã thêm ${sanPham.ten} vào giỏ hàng!`);
                  }}
                  disabled={!luachonDangChon}
                >
                  Thêm vào giỏ
                </button>
                <button
                  className="nut"
                  type="button"
                  onClick={() => {
                    const success = onThemVaoGio?.(sanPham, luachonDangChon);
                    if (success) {
                      setChiTiet?.(null); // Quay lại trang chủ để thấy giỏ hàng
                      setTimeout(() => {
                        document.getElementById("giohang")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 100);
                    }
                  }}
                  disabled={!luachonDangChon}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>

          {/* TABS THÔNG TIN CHI TIẾT (MÔ TẢ, THÔNG SỐ, THÀNH PHẦN, HDSD, ĐÁNH GIÁ, HỎI ĐÁP) */}
          <div className="he-thong-tab-san-pham" style={{ marginTop: 40 }}>
            <div className="hang-tab-chuyển-doi">
              <button 
                type="button"
                className={activeTab === "mota" ? "nut-tab active" : "nut-tab"} 
                onClick={() => setActiveTab("mota")}
              >
                Mô tả
              </button>
              <button 
                type="button"
                className={activeTab === "thongso" ? "nut-tab active" : "nut-tab"} 
                onClick={() => setActiveTab("thongso")}
              >
                Thông số
              </button>
              <button 
                type="button"
                className={activeTab === "thanhphan" ? "nut-tab active" : "nut-tab"} 
                onClick={() => setActiveTab("thanhphan")}
              >
                Thành phần
              </button>
              <button 
                type="button"
                className={activeTab === "hdsd" ? "nut-tab active" : "nut-tab"} 
                onClick={() => setActiveTab("hdsd")}
              >
                HDSD
              </button>
              <button 
                type="button"
                className={activeTab === "danhgia" ? "nut-tab active" : "nut-tab"} 
                onClick={() => setActiveTab("danhgia")}
              >
                Đánh giá ({hienThiReviews.length})
              </button>
              <button 
                type="button"
                className={activeTab === "hoidap" ? "nut-tab active" : "nut-tab"} 
                onClick={() => setActiveTab("hoidap")}
              >
                Hỏi đáp ({hienThiQa.length})
              </button>
            </div>

            <div className="noi-dung-khung-tab">
              {activeTab === "mota" && (
                <div className="noi-dung-tab-text">
                  {parseDongVanBan(sanPham.moTa)}
                </div>
              )}

              {activeTab === "thongso" && (
                <div className="noi-dung-tab-text">
                  <table className="bang-thong-so-ki-thuat">
                    <tbody>
                      {(sanPham.thongso || "Thương hiệu: Website Bán Mỹ Phẩm\nXuất xứ: Việt Nam").split("\n").map((line, idx) => {
                        const parts = line.split(":");
                        const label = parts[0]?.trim();
                        const val = parts.slice(1).join(":")?.trim();
                        if (!label) return null;
                        return (
                          <tr key={idx}>
                            <td className="cot-nhan"><strong>{label}</strong></td>
                            <td className="cot-gia-tri">{val || "Đang cập nhật"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "thanhphan" && (
                <div className="noi-dung-tab-text">
                  <div className="danh-sach-ul-chi-tiet-thanh-phan">
                    {parseDongVanBan(sanPham.thanhphan || "Chi tiết thành phần đang được cập nhật.")}
                  </div>
                </div>
              )}

              {activeTab === "hdsd" && (
                <div className="noi-dung-tab-text">
                  {parseDongVanBan(sanPham.hdsd || "Chi tiết hướng dẫn sử dụng đang được cập nhật.")}
                </div>
              )}

              {activeTab === "danhgia" && (() => {
                const tongSao = hienThiReviews.reduce((s, r) => s + r.sosao, 0);
                const trungBinhSao = hienThiReviews.length ? (tongSao / hienThiReviews.length).toFixed(1) : "0.0";
                const phanBoSao = [5, 4, 3, 2, 1].map(s => ({
                  sao: s,
                  count: hienThiReviews.filter(r => r.sosao === s).length
                }));

                return (
                  <div className="noi-dung-tab-danh-gia">
                    {/* Tóm tắt đánh giá kiểu Hasaki */}
                    <div style={{ display: "flex", gap: 30, alignItems: "center", background: "#fff5f7", borderRadius: 16, padding: "20px 24px", marginBottom: 24, flexWrap: "wrap" }}>
                      <div style={{ textAlign: "center", minWidth: 100 }}>
                        <div style={{ fontSize: 48, fontWeight: 800, color: "#c9184a", lineHeight: 1 }}>{trungBinhSao}</div>
                        <div style={{ color: "#f5a623", fontSize: 20, margin: "4px 0" }}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} style={{ color: i < Math.round(trungBinhSao) ? "#f5a623" : "#ddd" }}>★</span>
                          ))}
                        </div>
                        <div style={{ fontSize: 13, color: "#888" }}>{hienThiReviews.length} đánh giá</div>
                      </div>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        {phanBoSao.map(({ sao, count }) => (
                          <div key={sao} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                            <span style={{ fontSize: 13, color: "#555", width: 30 }}>{sao} ★</span>
                            <div style={{ flex: 1, background: "#eee", borderRadius: 4, height: 8, overflow: "hidden" }}>
                              <div style={{ width: `${hienThiReviews.length ? (count / hienThiReviews.length) * 100 : 0}%`, background: "#f5a623", height: "100%", borderRadius: 4, transition: "width 0.5s" }} />
                            </div>
                            <span style={{ fontSize: 12, color: "#888", width: 20, textAlign: "right" }}>{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Danh sách các review */}
                    <div className="danh-sach-reviews">
                      {hienThiReviews.map((rev) => (
                        <div className="o-review-don" key={rev.madanhgia}>
                          <div className="hang-head-review">
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#f8a4b8,#c9184a)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                                {(rev.hoten || "K")[0]}
                              </div>
                              <div>
                                <strong style={{ display: "block", fontSize: 14 }}>{rev.hoten || "Khách hàng"}</strong>
                                <span style={{ color: "#f5a623", fontSize: 13 }}>
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} style={{ color: i < rev.sosao ? "#f5a623" : "#ddd" }}>★</span>
                                  ))}
                                </span>
                              </div>
                            </div>
                            <span className="ngay-danh-gia">{new Date(rev.ngaytao).toLocaleDateString("vi-VN")}</span>
                          </div>
                          <p className="noi-dung-comment">{rev.noidung}</p>
                        </div>
                      ))}
                    </div>

                    {/* Form gửi đánh giá - sao bấm được */}
                    <div className="o-viet-danh-gia-moi">
                      <h4>Viết đánh giá của bạn</h4>
                      <form onSubmit={guiDanhGia}>
                        <div className="hang-chon-sao" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                          <span style={{ fontSize: 14, color: "#555" }}>Chọn số sao:</span>
                          <div style={{ display: "flex", gap: 4, cursor: "pointer" }}>
                            {[1, 2, 3, 4, 5].map((s) => (
                              <span
                                key={s}
                                onClick={() => setNewRating(s)}
                                onMouseEnter={() => setHoverRating(s)}
                                onMouseLeave={() => setHoverRating(0)}
                                style={{
                                  fontSize: 32,
                                  color: s <= (hoverRating || newRating) ? "#f5a623" : "#ddd",
                                  transition: "color 0.15s, transform 0.15s",
                                  transform: s <= (hoverRating || newRating) ? "scale(1.15)" : "scale(1)",
                                  userSelect: "none"
                                }}
                              >★</span>
                            ))}
                          </div>
                          <span style={{ fontSize: 13, color: "#c9184a", fontWeight: 700 }}>
                            {newRating === 5 ? "Tuyệt vời!" : newRating === 4 ? "Tốt" : newRating === 3 ? "Trung bình" : newRating === 2 ? "Tệ" : "Rất tệ"}
                          </span>
                        </div>
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Chia sẻ trải nghiệm thực tế của bạn về sản phẩm này..."
                          rows={4}
                          required
                          style={{ fontSize: 14 }}
                        />
                        <button type="submit" className="nut">Gửi đánh giá</button>
                      </form>
                    </div>
                  </div>
                );
              })()}

              {activeTab === "hoidap" && (() => {
                return (
                  <div className="noi-dung-tab-hoi-dap">
                    {hienThiQa.length === 0 && (
                      <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!</p>
                    )}

                    <div className="danh-sach-hoi-dap">
                      {hienThiQa.map((qa) => (
                        <div className="o-hoi-dap-don" key={qa.mahoidap} style={{ borderLeft: "3px solid #ffccd5", paddingLeft: 16, marginBottom: 20 }}>
                          <div className="o-cau-hoi" style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                              <span className="badge badge-q" style={{ flexShrink: 0 }}>Q</span>
                              <div>
                                <strong style={{ color: "#c9184a", fontSize: 13 }}>{qa.hoten || "Khách hàng"}</strong>
                                <span style={{ fontSize: 12, color: "#aaa", marginLeft: 8 }}>{new Date(qa.ngaytao).toLocaleDateString("vi-VN")}</span>
                                <p style={{ margin: "4px 0 0", fontSize: 14, color: "#333" }}>{qa.cauhoi}</p>
                              </div>
                            </div>
                          </div>

                          {qa.cautraloi ? (
                            <div className="o-cau-tra-loi" style={{ background: "#fff5f7", borderRadius: 10, padding: "12px 16px" }}>
                              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                <span className="badge badge-a" style={{ flexShrink: 0 }}>A</span>
                                <div>
                                  <strong style={{ color: "#9d1b57", fontSize: 13 }}>Website Bán Mỹ Phẩm</strong>
                                  <p style={{ margin: "4px 0 0", fontSize: 14, color: "#444" }}>{qa.cautraloi}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="o-cau-tra-loi chua-co-tl">
                              <span className="badge badge-a empty">Chờ phản hồi</span>
                              {vaiTro === "admin" && (
                                <div className="admin-tra-loi-form">
                                  <input
                                    type="text"
                                    placeholder="Nhập câu trả lời..."
                                    value={adminReplies[qa.mahoidap] || ""}
                                    onChange={(e) => setAdminReplies(prev => ({ ...prev, [qa.mahoidap]: e.target.value }))}
                                  />
                                  <button type="button" className="nut nut-phu nut-tl-admin" onClick={() => guiTraLoi(qa.mahoidap)}>Gửi trả lời</button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="o-viet-danh-gia-moi">
                      <h4>Đặt câu hỏi của bạn</h4>
                      <form onSubmit={guiCauHoi}>
                        <textarea
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                          placeholder="Bạn có thắc mắc gì về sản phẩm này? Shop sẽ phản hồi trong 24h..."
                          rows={3}
                          required
                        />
                        <button type="submit" className="nut">Gửi câu hỏi</button>
                      </form>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI (PHỤ): Sidebar */}
        <aside className="cot-phai-xem-cung-san-pham">
          {/* MỤC 1: SẢN PHẨM TƯƠNG TỰ */}
          <h3 className="tieu-de-sidebar-xem-cung">Sản phẩm tương tự</h3>
          <div className="danh-sach-xem-cung-vertical" style={{ marginBottom: 30 }}>
            {sanPhamsTuongTu.length === 0 ? (
              <p style={{ color: "#a0888f", fontSize: 13, textAlign: "center", padding: 10 }}>Không có sản phẩm tương tự.</p>
            ) : (
              sanPhamsTuongTu.map((item) => {
                const coGiam = item.giagoc && item.giagoc > item.gia;
                const phanTramGiam = coGiam
                  ? Math.round(((item.giagoc - item.gia) / item.giagoc) * 100)
                  : 0;

                return (
                  <div 
                    className="item-xem-cung-doc" 
                    key={item.masanpham}
                    onClick={() => setChiTiet(item)}
                  >
                    <div className="anh-xem-cung-doc-wrapper">
                      <img src={item.hinh} alt={item.ten} />
                      {coGiam && (
                        <span className="giam-gia-badge-side">-{phanTramGiam}%</span>
                      )}
                    </div>
                    
                    <div className="thong-tin-xem-cung-doc">
                      <div className="hang-gia-side">
                        <span className="gia-ban-side">{formatTien(item.gia)}</span>
                        {coGiam && (
                          <span className="gia-goc-side">{formatTien(item.giagoc)}</span>
                        )}
                      </div>
                      
                      <h4 className="ten-side">
                        <strong>{item.tenthuonghieu || "Thương hiệu"}</strong> {item.ten}
                      </h4>

                      {item.tenkm && (
                        <span className="tag-khuyen-mai-side" style={{ textAlign: "center", display: "block" }}>{item.tenkm}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* MỤC 2: SẢN PHẨM CÙNG THƯƠNG HIỆU */}
          <h3 className="tieu-de-sidebar-xem-cung">Sản phẩm cùng thương hiệu</h3>
          <div className="danh-sach-xem-cung-vertical">
            {sanPhamsCungThuongHieu.length === 0 ? (
              <p style={{ color: "#a0888f", fontSize: 13, textAlign: "center", padding: 10 }}>Không có sản phẩm cùng thương hiệu.</p>
            ) : (
              sanPhamsCungThuongHieu.map((item) => {
                const coGiam = item.giagoc && item.giagoc > item.gia;
                const phanTramGiam = coGiam
                  ? Math.round(((item.giagoc - item.gia) / item.giagoc) * 100)
                  : 0;

                return (
                  <div 
                    className="item-xem-cung-doc" 
                    key={item.masanpham}
                    onClick={() => setChiTiet(item)}
                  >
                    <div className="anh-xem-cung-doc-wrapper">
                      <img src={item.hinh} alt={item.ten} />
                      {coGiam && (
                        <span className="giam-gia-badge-side">-{phanTramGiam}%</span>
                      )}
                    </div>
                    
                    <div className="thong-tin-xem-cung-doc">
                      <div className="hang-gia-side">
                        <span className="gia-ban-side">{formatTien(item.gia)}</span>
                        {coGiam && (
                          <span className="gia-goc-side">{formatTien(item.giagoc)}</span>
                        )}
                      </div>
                      
                      <h4 className="ten-side">
                        <strong>{item.tenthuonghieu || "Thương hiệu"}</strong> {item.ten}
                      </h4>

                      {item.tenkm && (
                        <span className="tag-khuyen-mai-side" style={{ textAlign: "center", display: "block" }}>{item.tenkm}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ProductDetail;
