import { useEffect, useState, useCallback, useContext } from "react";
import { AppContext } from "../store/AppContext";
import API_BASE from "../config/api";
import { formatTien } from "../utils/format";
import NhanThanhToan from "../component/NhanThanhToan";
import { NHAN_TRANG_THAI, MAU_TRANG_THAI } from "../constant/trangThai";
import PromotionManagement from "../component/admin/PromotionManagement";

function AdminArea({ danhMuc, sanPhams, currentTab, setCurrentTab }) {
  const { refreshProducts } = useContext(AppContext);
  const [nhapHangValues, setNhapHangValues] = useState({});
  const [dangNhapHang, setDangNhapHang] = useState(false);

  // States: Danh mục local (mockup UI)
  const [localDanhMuc, setLocalDanhMuc] = useState(danhMuc.filter((item) => item !== "Tất cả"));

  const handleAddCategory = () => {
    const newCat = window.prompt("Nhập tên danh mục mới:");
    if (newCat && newCat.trim() !== "") {
      if (localDanhMuc.includes(newCat.trim())) {
        window.alert("Danh mục đã tồn tại!");
      } else {
        setLocalDanhMuc([...localDanhMuc, newCat.trim()]);
      }
    }
  };

  const handleEditCategory = (oldCat) => {
    const newCat = window.prompt(`Cập nhật danh mục "${oldCat}":`, oldCat);
    if (newCat && newCat.trim() !== "" && newCat !== oldCat) {
      if (localDanhMuc.includes(newCat.trim())) {
        window.alert("Tên danh mục này đã tồn tại!");
      } else {
        setLocalDanhMuc(localDanhMuc.map(c => c === oldCat ? newCat.trim() : c));
      }
    }
  };

  const handleDeleteCategory = (cat) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${cat}" không?`)) {
      setLocalDanhMuc(localDanhMuc.filter(c => c !== cat));
    }
  };

  // States: Sản phẩm local (mockup UI)
  const [localSanPhams, setLocalSanPhams] = useState(sanPhams);

  const handleAddProduct = () => {
    const name = window.prompt("Nhập tên sản phẩm mới:");
    if (!name || name.trim() === "") return;
    
    const cat = window.prompt("Nhập tên danh mục cho sản phẩm này:", localDanhMuc[0] || "Chăm sóc da");
    if (!cat || cat.trim() === "") return;
    
    const price = window.prompt("Nhập giá bán (VD: 150000):", "150000");
    if (!price || isNaN(Number(price))) return;

    const stock = window.prompt("Nhập số lượng tồn kho ban đầu:", "10");
    if (!stock || isNaN(Number(stock))) return;

    const newProduct = {
      masanpham: Date.now(), // Fake ID
      ten: name.trim(),
      danhMuc: cat.trim(),
      gia: Number(price),
      giagoc: Number(price) * 1.2,
      ton: Number(stock),
      luachon: []
    };
    
    setLocalSanPhams([newProduct, ...localSanPhams]);
    window.alert("Thêm sản phẩm thành công!");
  };

  const handleEditProduct = (sp) => {
    const newPrice = window.prompt(`Cập nhật giá bán cho "${sp.ten}":`, sp.gia);
    if (!newPrice || isNaN(Number(newPrice))) return;
    
    setLocalSanPhams(localSanPhams.map(p => {
      if (p.masanpham === sp.masanpham) {
        return { ...p, gia: Number(newPrice) };
      }
      return p;
    }));
    window.alert("Cập nhật giá sản phẩm thành công!");
  };

  const handleDeleteProduct = (sp) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${sp.ten}" không?`)) {
      setLocalSanPhams(localSanPhams.filter(p => p.masanpham !== sp.masanpham));
    }
  };

  // States: Đơn hàng
  const [donHangs, setDonHangs] = useState([]);
  const [dangTaiDon, setDangTaiDon] = useState(false);
  const [donDangXem, setDonDangXem] = useState(null);
  const [chiTietDon, setChiTietDon] = useState(null);
  const [capNhatTT, setCapNhatTT] = useState({});

  // States: Trả hàng
  const [yeuCauTraHang, setYeuCauTraHang] = useState([]);
  const [dangTaiTra, setDangTaiTra] = useState(false);
  const [ghichuAdminMap, setGhichuAdminMap] = useState({});

  // States: Voucher & Khách hàng
  const [vouchers, setVouchers] = useState([]);
  const [lichSuVoucher, setLichSuVoucher] = useState([]);
  const [khachHangs, setKhachHangs] = useState([]);
  const [dangTaiVoucher, setDangTaiVoucher] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState("");

  // States: Thống kê doanh thu
  const [stats, setStats] = useState(null);
  const [dangTaiStats, setDangTaiStats] = useState(false);
  const [statsFilter, setStatsFilter] = useState("day");

  // Tải dữ liệu Thống kê
  const taiStats = useCallback(async () => {
    setDangTaiStats(true);
    try {
      const [res, statsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/statistics`),
        fetch(`${API_BASE}/stats/dashboard`)
      ]);
      if (res.ok && statsRes.ok) {
        const data = await res.json();
        const dashboardData = await statsRes.json();
        setStats({
          ...data,
          summary: {
            ...data.summary,
            totalVisitors: dashboardData.totalVisitors
          }
        });
      }
    } catch (err) {
      console.error("Lỗi tải thống kê:", err);
    } finally {
      setDangTaiStats(false);
    }
  }, []);

  // Tải danh sách đơn hàng
  const taiDonHangs = useCallback(async () => {
    setDangTaiDon(true);
    try {
      const res = await fetch(`${API_BASE}/orders`);
      if (!res.ok) throw new Error("Không tải được đơn hàng.");
      const data = await res.json();
      setDonHangs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setDangTaiDon(false);
    }
  }, []);

  // Tải danh sách yêu cầu trả hàng
  const taiYeuCauTraHang = useCallback(async () => {
    setDangTaiTra(true);
    try {
      const res = await fetch(`${API_BASE}/returns`);
      if (!res.ok) throw new Error("Không tải được danh sách trả hàng.");
      const data = await res.json();
      setYeuCauTraHang(data);
    } catch (err) {
      console.error(err);
    } finally {
      setDangTaiTra(false);
    }
  }, []);

  // Tải dữ liệu Voucher & Khách hàng
  const taiDuLieuVoucher = useCallback(async () => {
    setDangTaiVoucher(true);
    try {
      const [vRes, hRes, cRes] = await Promise.all([
        fetch(`${API_BASE}/vouchers/all`),
        fetch(`${API_BASE}/vouchers/history`),
        fetch(`${API_BASE}/customers`)
      ]);
      if (vRes.ok) setVouchers(await vRes.json());
      if (hRes.ok) setLichSuVoucher(await hRes.json());
      if (cRes.ok) {
        const users = await cRes.json();
        // Lọc chỉ lấy tài khoản khách hàng
        setKhachHangs(users.filter(u => u.tenvaitro === "khachhang"));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDangTaiVoucher(false);
    }
  }, []);

  useEffect(() => {
    taiDonHangs();
    taiYeuCauTraHang();
    taiDuLieuVoucher();
    taiStats();
  }, [taiDonHangs, taiYeuCauTraHang, taiDuLieuVoucher, taiStats]);

  // Xem chi tiết đơn
  async function xemChiTiet(madonhang) {
    if (donDangXem === madonhang) {
      setDonDangXem(null);
      setChiTietDon(null);
      return;
    }
    setDonDangXem(madonhang);
    setChiTietDon(null);
    try {
      const res = await fetch(`${API_BASE}/orders/${madonhang}`);
      if (!res.ok) throw new Error("Không lấy được chi tiết đơn.");
      const data = await res.json();
      setChiTietDon(data);
    } catch (err) {
      alert("Lỗi khi lấy chi tiết đơn: " + err.message);
    }
  }

  // Cập nhật trạng thái đơn hàng
  async function capNhatTrangThai(madonhang, trangthaiMoi, lydoHuy = "") {
    try {
      const res = await fetch(`${API_BASE}/orders/${madonhang}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trangthaidonhang: trangthaiMoi, lydo_huy: lydoHuy || null })
      });
      if (!res.ok) throw new Error("Cập nhật thất bại.");
      alert(`Đã cập nhật đơn #${madonhang} → ${NHAN_TRANG_THAI[trangthaiMoi] || trangthaiMoi}`);
      await taiDonHangs();
      if (donDangXem === madonhang) {
        const res2 = await fetch(`${API_BASE}/orders/${madonhang}`);
        const data2 = await res2.json();
        setChiTietDon(data2);
      }
      taiYeuCauTraHang(); // Tải lại để cập nhật trạng thái nếu liên quan
      taiStats(); // Tải lại số liệu thống kê
      
      // Nếu trạng thái cập nhật làm thay đổi tồn kho (hủy đơn, hoàn hàng), tải lại danh sách sản phẩm
      if (trangthaiMoi === "dahuy" || trangthaiMoi === "trahang" || trangthaiMoi === "choxacnhan") {
        if (refreshProducts) await refreshProducts();
      }
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  }

  // Duyệt yêu cầu trả hàng
  async function xuLyDuyetTraHang(mayeucau, hanhDong) {
    const note = ghichuAdminMap[mayeucau] || "";
    if (hanhDong === "approve" && !window.confirm("Duyệt yêu cầu trả hàng và chờ khách gửi hàng về?")) return;
    if (hanhDong === "reject" && !window.confirm("Từ chối yêu cầu trả hàng này?")) return;
    if (hanhDong === "confirm" && !window.confirm("Xác nhận đã nhận hàng trả và hoàn tồn kho?")) return;

    try {
      let url = `${API_BASE}/returns/${mayeucau}/${hanhDong}`;
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ghichu_admin: note })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Thao tác thất bại.");
      alert(`${data.message}`);
      taiYeuCauTraHang();
      taiDonHangs();
      taiStats(); // Tải lại số liệu thống kê
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  }

  // Cập nhật cấp voucher thủ công
  async function xuLyCapVoucher(e) {
    e.preventDefault();
    if (!selectedUser || !selectedVoucher) {
      alert("Vui lòng chọn khách hàng và voucher.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/vouchers/grant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manguoidung: Number(selectedUser),
          mavoucher: Number(selectedVoucher)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Tặng voucher thất bại.");
      alert(`${data.message}`);
      setSelectedUser("");
      setSelectedVoucher("");
      taiDuLieuVoucher();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  }

  return (
    <section id="admin" style={{ marginTop: 30, borderTop: "3px solid #0f3460", paddingTop: 20 }}>
      {/* SIDEBAR TABS & BANNER ADMIN */}
      <div style={{
        background: "linear-gradient(135deg, #1f4068 0%, #162447 100%)",
        padding: "20px 24px",
        borderRadius: "12px",
        color: "white",
        marginBottom: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 15,
        boxShadow: "0 6px 20px rgba(22,36,71,0.2)"
      }}>
        <div>
          <h2 style={{ margin: 0, color: "#e4e4e4", border: "none", padding: 0 }}>HỆ THỐNG QUẢN TRỊ (ADMIN)</h2>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              background: currentTab === "thongke" ? "#e4e4e4" : "#1f4068",
              color: currentTab === "thongke" ? "#162447" : "#e4e4e4",
              transition: "0.2s"
            }}
            onClick={() => setCurrentTab("thongke")}
          >
            Thống kê doanh thu
          </button>
          <button
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              background: currentTab === "donhang" ? "#e4e4e4" : "#1f4068",
              color: currentTab === "donhang" ? "#162447" : "#e4e4e4",
              transition: "0.2s"
            }}
            onClick={() => setCurrentTab("donhang")}
          >
            Đơn hàng ({donHangs.length})
          </button>
          <button
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              background: currentTab === "trahang" ? "#e4e4e4" : "#1f4068",
              color: currentTab === "trahang" ? "#162447" : "#e4e4e4",
              transition: "0.2s"
            }}
            onClick={() => setCurrentTab("trahang")}
          >
            Trả hàng ({yeuCauTraHang.filter(r => r.trangthai === "choxuly" || r.trangthai === "duyet_chohanghoi").length})
          </button>
          <button
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              background: currentTab === "khuyenmai" ? "#e4e4e4" : "#1f4068",
              color: currentTab === "khuyenmai" ? "#162447" : "#e4e4e4",
              transition: "0.2s"
            }}
            onClick={() => setCurrentTab("khuyenmai")}
          >
            Khuyến Mãi
          </button>
          <button
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              background: currentTab === "voucher" ? "#e4e4e4" : "#1f4068",
              color: currentTab === "voucher" ? "#162447" : "#e4e4e4",
              transition: "0.2s"
            }}
            onClick={() => setCurrentTab("voucher")}
          >
            Khuyến mãi / Voucher
          </button>
          <button
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              background: currentTab === "sanpham" ? "#e4e4e4" : "#1f4068",
              color: currentTab === "sanpham" ? "#162447" : "#e4e4e4",
              transition: "0.2s"
            }}
            onClick={() => setCurrentTab("sanpham")}
          >
            Sản phẩm & Kho
          </button>
        </div>
      </div>

      {/* ==================================== TAB 0: THỐNG KÊ DOANH THU ==================================== */}
      {currentTab === "thongke" && (
        <div className="hop" style={{ borderColor: "#1f4068" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <h3 style={{ margin: 0, color: "#1f4068" }}>Biểu đồ thống kê & Phân tích doanh số</h3>
            <div style={{ display: "flex", gap: 10 }}>
              <button 
                type="button" 
                className={`nut ${statsFilter === "day" ? "" : "nut-phu"}`} 
                onClick={() => setStatsFilter("day")}
                style={{ margin: 0, padding: "6px 12px", fontSize: 13 }}
              >
                Theo Ngày
              </button>
              <button 
                type="button" 
                className={`nut ${statsFilter === "week" ? "" : "nut-phu"}`} 
                onClick={() => setStatsFilter("week")}
                style={{ margin: 0, padding: "6px 12px", fontSize: 13 }}
              >
                Theo Tuần
              </button>
              <button 
                type="button" 
                className={`nut ${statsFilter === "month" ? "" : "nut-phu"}`} 
                onClick={() => setStatsFilter("month")}
                style={{ margin: 0, padding: "6px 12px", fontSize: 13 }}
              >
                Theo Tháng
              </button>
              <button 
                type="button" 
                className={`nut ${statsFilter === "year" ? "" : "nut-phu"}`} 
                onClick={() => setStatsFilter("year")}
                style={{ margin: 0, padding: "6px 12px", fontSize: 13 }}
              >
                Theo Năm
              </button>
              <button 
                className="nut-phu" 
                onClick={taiStats} 
                disabled={dangTaiStats}
                style={{ margin: 0, padding: "6px 12px", fontSize: 13 }}
              >
                Làm mới
              </button>
            </div>
          </div>

          {dangTaiStats ? (
            <p>Đang tải số liệu thống kê...</p>
          ) : (
            <>
              {/* KPI Cards chuyên nghiệp */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
                marginBottom: 28
              }}>
                {[
                  { label: "Tổng Doanh Thu", value: formatTien(stats?.summary?.totalRevenue || 0), icon: "$", color1: "#1f4068", color2: "#162447", sub: "Tất cả đơn hoàn thành" },
                  { label: "Lượt Truy Cập", value: `${stats?.summary?.totalVisitors || 0} lượt`, icon: "👁", color1: "#8338ec", color2: "#ff006e", sub: "Khách ghé thăm website" },
                  { label: "Tổng Đơn Hàng", value: `${stats?.summary?.totalOrders || 0} đơn`, icon: "#", color1: "#4361ee", color2: "#3a0ca3", sub: "Tất cả trạng thái" },
                  { label: "Khách Hàng", value: `${stats?.summary?.totalUsers || 0} người`, icon: "U", color1: "#2ec4b6", color2: "#0d8c84", sub: "Tài khoản đăng ký" },
                  { label: "Sản Phẩm", value: `${stats?.summary?.totalProducts ?? 0} mã`, icon: "P", color1: "#f77f00", color2: "#d62828", sub: "Đang kinh doanh" }
                ].map((card, i) => (
                  <div key={i} style={{
                    background: `linear-gradient(135deg, ${card.color1}, ${card.color2})`,
                    borderRadius: 16,
                    padding: "20px 22px",
                    color: "#fff",
                    boxShadow: `0 8px 20px ${card.color1}44`,
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    <div style={{ position: "absolute", right: 16, top: 16, fontSize: 36, opacity: 0.15, fontWeight: 900, fontFamily: "monospace" }}>{card.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, opacity: 0.8, marginBottom: 8 }}>{card.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5, marginBottom: 6 }}>{card.value}</div>
                    <div style={{ fontSize: 11, opacity: 0.7 }}>{card.sub}</div>
                  </div>
                ))}
              </div>

              {/* Biểu đồ doanh thu dạng SVG */}
              <div className="khung-bieu-do-svg" style={{ 
                background: "#ffffff", 
                border: "1px solid #cfd8dc", 
                borderRadius: 12, 
                padding: 20,
                marginBottom: 35,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <h4 style={{ margin: "0 0 15px", color: "#1f4068" }}>
                  Biểu đồ doanh thu {statsFilter === "day" ? "7 ngày gần nhất" : statsFilter === "week" ? "8 tuần gần nhất" : statsFilter === "month" ? "12 tháng gần nhất" : "5 năm gần nhất"}
                </h4>
                
                {(() => {
                  const chartData = statsFilter === "day"
                    ? stats?.revenueByDay
                    : statsFilter === "week"
                    ? stats?.revenueByWeek
                    : statsFilter === "month"
                    ? stats?.revenueByMonth
                    : stats?.revenueByYear;

                  if (!chartData || chartData.length === 0) {
                    return <p style={{ color: "#888", padding: "40px 0", textAlign: "center" }}>Chưa có số liệu doanh thu trong khoảng thời gian này.</p>;
                  }

                  const maxRev = Math.max(...chartData.map(d => Number(d.revenue || 0)), 1000000);
                  const svgW = 720;
                  const svgH = 300;
                  const padL = 70;
                  const padR = 20;
                  const padT = 30;
                  const padB = 45;
                  const chW = svgW - padL - padR;
                  const chH = svgH - padT - padB;
                  const stepW = chW / Math.max(chartData.length - 1, 1);

                  // Tính toạ độ điểm cho line chart
                  const points = chartData.map((item, idx) => {
                    const val = Number(item.revenue || 0);
                    const x = padL + (chartData.length === 1 ? chW / 2 : idx * stepW);
                    const y = padT + chH - (val / maxRev) * chH;
                    return { x, y, val, label: item.label };
                  });

                  const polylineStr = points.map(p => `${p.x},${p.y}`).join(" ");
                  const areaStr = [
                    `${points[0].x},${padT + chH}`,
                    ...points.map(p => `${p.x},${p.y}`),
                    `${points[points.length - 1].x},${padT + chH}`
                  ].join(" ");

                  return (
                    <div style={{ width: "100%", overflowX: "auto" }}>
                      <svg width={svgW} height={svgH} style={{ display: "block", margin: "0 auto", fontFamily: "inherit" }}>
                        <defs>
                          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4361ee" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#4361ee" stopOpacity="0.02" />
                          </linearGradient>
                          <filter id="shadow">
                            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4361ee" floodOpacity="0.3" />
                          </filter>
                        </defs>

                        {/* Lưới ngang */}
                        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                          const yLine = padT + chH * (1 - ratio);
                          return (
                            <g key={i}>
                              <line x1={padL} y1={yLine} x2={svgW - padR} y2={yLine} stroke="#e8edf5" strokeDasharray="4 4" />
                              <text x={padL - 8} y={yLine + 4} textAnchor="end" fontSize="9" fill="#94a3b8">
                                {ratio === 0 ? "0" : formatTien(maxRev * ratio)}
                              </text>
                            </g>
                          );
                        })}

                        {/* Vùng fill area */}
                        <polygon points={areaStr} fill="url(#areaGrad)" />

                        {/* Đường kẻ line */}
                        <polyline
                          points={polylineStr}
                          fill="none"
                          stroke="#4361ee"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter="url(#shadow)"
                        />

                        {/* Các điểm trên đường */}
                        {points.map((p, idx) => (
                          <g key={idx}>
                            <circle cx={p.x} cy={p.y} r="5" fill="#fff" stroke="#4361ee" strokeWidth="2.5" />
                            {p.val > 0 && (
                              <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1f4068">
                                {formatTien(p.val)}
                              </text>
                            )}
                            <text x={p.x} y={svgH - padB + 16} textAnchor="middle" fontSize="9" fill="#64748b">
                              {p.label}
                            </text>
                          </g>
                        ))}

                        {/* Trục X */}
                        <line x1={padL} y1={padT + chH} x2={svgW - padR} y2={padT + chH} stroke="#cbd5e1" strokeWidth="1.5" />
                        {/* Trục Y */}
                        <line x1={padL} y1={padT} x2={padL} y2={padT + chH} stroke="#cbd5e1" strokeWidth="1.5" />
                      </svg>
                    </div>
                  );
                })()}
              </div>

              {/* Bảng Mặt hàng Bán chạy và Bán chậm */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 25,
                marginBottom: 20
              }}>
                {/* Top 5 Bán chạy nhất */}
                <div style={{ background: "#ffffff", border: "1px solid #cfd8dc", borderRadius: 12, padding: 20 }}>
                  <h4 style={{ margin: "0 0 15px", color: "#4caf50", display: "flex", alignItems: "center", gap: 8 }}>
                    Top 5 sản phẩm bán chạy nhất
                  </h4>
                  <table style={{ margin: 0, boxShadow: "none" }}>
                    <thead>
                      <tr style={{ background: "#eef7ee" }}>
                        <th style={{ color: "#4caf50" }}>Sản phẩm</th>
                        <th style={{ color: "#4caf50", textAlign: "center", width: 100 }}>Số lượng bán</th>
                        <th style={{ color: "#4caf50", textAlign: "right", width: 130 }}>Doanh thu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats?.bestSellers?.length === 0 ? (
                        <tr>
                          <td colSpan="3" style={{ textAlign: "center", color: "#888" }}>Chưa có dữ liệu</td>
                        </tr>
                      ) : (
                        stats?.bestSellers?.map((p) => (
                          <tr key={p.masanpham}>
                            <td>{p.name}</td>
                            <td style={{ textAlign: "center", fontWeight: "bold" }}>{p.quantity}</td>
                            <td style={{ textAlign: "right", fontWeight: "bold" }}>{formatTien(p.totalRevenue)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Top 5 Bán chậm nhất */}
                <div style={{ background: "#ffffff", border: "1px solid #cfd8dc", borderRadius: 12, padding: 20 }}>
                  <h4 style={{ margin: "0 0 15px", color: "#e91e63", display: "flex", alignItems: "center", gap: 8 }}>
                    Top 5 sản phẩm bán chậm nhất
                  </h4>
                  <table style={{ margin: 0, boxShadow: "none" }}>
                    <thead>
                      <tr style={{ background: "#fdf0f4" }}>
                        <th style={{ color: "#e91e63" }}>Sản phẩm</th>
                        <th style={{ color: "#e91e63", textAlign: "center", width: 120 }}>Số lượng đã bán</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats?.slowSellers?.length === 0 ? (
                        <tr>
                          <td colSpan="2" style={{ textAlign: "center", color: "#888" }}>Chưa có dữ liệu</td>
                        </tr>
                      ) : (
                        stats?.slowSellers?.map((p) => (
                          <tr key={p.masanpham}>
                            <td>{p.name}</td>
                            <td style={{ textAlign: "center", fontWeight: "bold", color: "#e91e63" }}>{p.quantity}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ==================================== TAB 1: ĐƠN HÀNG ==================================== */}
      {currentTab === "donhang" && (
        <div className="hop" style={{ borderColor: "#1f4068" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <h3 style={{ margin: 0, color: "#1f4068" }}>Danh sách đơn đặt hàng</h3>
            <button className="nut" style={{ background: "#1f4068" }} onClick={taiDonHangs} disabled={dangTaiDon}>
              {dangTaiDon ? "Đang tải..." : "Làm mới"}
            </button>
          </div>

          {dangTaiDon && <p>Đang tải danh sách đơn...</p>}

          {!dangTaiDon && donHangs.length === 0 && <p style={{ color: "#888", marginTop: 16 }}>Chưa có đơn hàng nào.</p>}

          {!dangTaiDon && donHangs.length > 0 && (
            <div style={{ overflowX: "auto", marginTop: 15 }}>
              <table>
                <thead>
                  <tr style={{ background: "#f0f4f8" }}>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Tổng tiền</th>
                    <th>Thanh toán</th>
                    <th>Trạng thái đơn</th>
                    <th>Ngày đặt</th>
                    <th>Thao tác nhanh / Đổi trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {donHangs.map((don) => (
                    <>
                      <tr
                        key={don.madonhang}
                        style={{
                          background: donDangXem === don.madonhang ? "#f4f6fa" : undefined,
                          borderLeft: donDangXem === don.madonhang ? "4px solid #1f4068" : undefined
                        }}
                      >
                        <td><strong>#{don.madonhang}</strong></td>
                        <td>{don.hoten || "—"}</td>
                        <td><span className="gia">{formatTien(don.tongtien)}</span></td>
                        <td>
                          <span
                            style={{
                              fontSize: 12,
                              padding: "3px 8px",
                              borderRadius: 99,
                              background: don.trangthaithanhtoan === "dathanhtoan" ? "#d4edda" : "#fff3cd",
                              color: don.trangthaithanhtoan === "dathanhtoan" ? "#155724" : "#856404",
                              fontWeight: "bold"
                            }}
                          >
                            {don.trangthaithanhtoan === "dathanhtoan" ? "Đã TT" : "Chưa TT"}
                          </span>
                        </td>
                        <td>
                          <span
                            style={{
                              fontSize: 12,
                              padding: "3px 8px",
                              borderRadius: 99,
                              background: MAU_TRANG_THAI[don.trangthaidonhang] || "#eee",
                              color: "#333",
                              fontWeight: "bold"
                            }}
                          >
                            {NHAN_TRANG_THAI[don.trangthaidonhang] || don.trangthaidonhang}
                          </span>
                        </td>
                        <td style={{ fontSize: 13, color: "#666" }}>
                          {don.ngaydat ? new Date(don.ngaydat).toLocaleString("vi-VN") : "—"}
                        </td>
                        <td>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                            <button
                              className="nut nut-phu"
                              style={{ fontSize: 13, padding: "6px 12px" }}
                              onClick={() => xemChiTiet(don.madonhang)}
                            >
                              {donDangXem === don.madonhang ? "Ẩn" : "Xem chi tiết"}
                            </button>

                            {/* Các nút xử lý nhanh quy trình */}
                            {don.trangthaidonhang === "choxacnhan" && (
                              <button
                                className="nut"
                                style={{ fontSize: 13, padding: "6px 12px", background: "#28a745" }}
                                onClick={() => capNhatTrangThai(don.madonhang, "cholayhang")}
                              >
                                Duyệt đơn
                              </button>
                            )}
                            {don.trangthaidonhang === "cholayhang" && (
                              <button
                                className="nut"
                                style={{ fontSize: 13, padding: "6px 12px", background: "#17a2b8" }}
                                onClick={() => capNhatTrangThai(don.madonhang, "chogiaohhang")}
                              >
                                Giao hàng
                              </button>
                            )}
                            {don.trangthaidonhang === "chogiaohhang" && (
                              <button
                                className="nut"
                                style={{ fontSize: 13, padding: "6px 12px", background: "#28a745" }}
                                onClick={() => capNhatTrangThai(don.madonhang, "hoanthanh")}
                              >
                                Đã giao xong
                              </button>
                            )}

                            {/* Dropdown chỉnh trạng thái bất kỳ */}
                            <div style={{ display: "flex", gap: 4, alignItems: "center", marginLeft: 6 }}>
                              <select
                                style={{ fontSize: 12, padding: "4px 8px", margin: 0, width: "auto", border: "1px solid #1f4068" }}
                                value={capNhatTT[don.madonhang] || don.trangthaidonhang}
                                onChange={(e) =>
                                  setCapNhatTT((prev) => ({ ...prev, [don.madonhang]: e.target.value }))
                                }
                              >
                                <option value="choxacnhan">Chờ xác nhận</option>
                                <option value="cholayhang">Chờ lấy hàng</option>
                                <option value="chogiaohhang">Chờ giao hàng</option>
                                <option value="hoanthanh">Hoàn thành</option>
                                <option value="trahang">Trả hàng</option>
                                <option value="dahuy">Đã hủy</option>
                              </select>
                              <button
                                className="nut nut-phu"
                                style={{ fontSize: 12, padding: "5px 8px", background: "#1f4068", color: "white" }}
                                onClick={() => {
                                  const targetState = capNhatTT[don.madonhang] || don.trangthaidonhang;
                                  if (targetState === "dahuy") {
                                    const reason = window.prompt("Lý do hủy đơn hàng này:");
                                    if (reason === null) return; // cancel
                                    capNhatTrangThai(don.madonhang, "dahuy", reason || "Admin hủy đơn");
                                  } else {
                                    capNhatTrangThai(don.madonhang, targetState);
                                  }
                                }}
                              >
                                Lưu
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>

                      {/* Chi tiết đơn khi được click */}
                      {donDangXem === don.madonhang && (
                        <tr key={`ct-${don.madonhang}`}>
                          <td colSpan={7} style={{ background: "#f8f9fa", padding: 20 }}>
                            {chiTietDon === null ? (
                              <p style={{ color: "#888" }}>Đang tải thông tin chi tiết đơn hàng...</p>
                            ) : (
                              <div style={{ color: "#333" }}>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16, marginBottom: 16 }}>
                                  <div style={{ background: "white", padding: 12, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                                    <h4 style={{ margin: "0 0 8px", color: "#1f4068" }}>Thông tin giao hàng</h4>
                                    <strong>Người nhận:</strong> {chiTietDon.donhang?.tennguoinhan}<br />
                                    <strong>SĐT:</strong> {chiTietDon.donhang?.sodienthoainhan}<br />
                                    <strong>Địa chỉ:</strong> {chiTietDon.donhang?.diachigiaohang}
                                  </div>
                                  <div style={{ background: "white", padding: 12, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                                    <h4 style={{ margin: "0 0 8px", color: "#1f4068" }}>Thanh toán</h4>
                                    <strong>Phương thức:</strong> <NhanThanhToan pt={chiTietDon.thanhtoan?.phuongthuc} /><br />
                                    <strong>Mã giao dịch:</strong> {chiTietDon.thanhtoan?.magiaodich || "—"}<br />
                                    <strong>Tình trạng:</strong>{" "}
                                    <span style={{ fontWeight: "bold", color: chiTietDon.thanhtoan?.trangthaithanhtoan === "dathanhtoan" ? "green" : "orange" }}>
                                      {chiTietDon.thanhtoan?.trangthaithanhtoan === "dathanhtoan" ? "ĐÃ THANH TOÁN" : "CHƯA THANH TOÁN"}
                                    </span>
                                  </div>
                                  {chiTietDon.donhang?.lydo_huy && (
                                    <div style={{ background: "#f8d7da", color: "#721c24", padding: 12, borderRadius: 8 }}>
                                      <h4 style={{ margin: "0 0 8px" }}>Lý do hủy đơn</h4>
                                      <p style={{ margin: 0 }}>{chiTietDon.donhang.lydo_huy}</p>
                                    </div>
                                  )}
                                </div>

                                <strong style={{ color: "#1f4068" }}>Sản phẩm đã đặt:</strong>
                                <table style={{ marginTop: 8, background: "white" }}>
                                  <thead>
                                    <tr style={{ background: "#eef2f5" }}>
                                      <th>Tên sản phẩm</th>
                                      <th>Phân loại / Biến thể</th>
                                      <th>Số lượng</th>
                                      <th>Đơn giá</th>
                                      <th>Thành tiền</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(chiTietDon.chitiet || []).map((ct, i) => (
                                      <tr key={i}>
                                        <td>{ct.tensanpham}</td>
                                        <td>{[ct.mausac, ct.loai, ct.dungtich].filter(Boolean).join(" - ") || "Mặc định"}</td>
                                        <td>{ct.soluong}</td>
                                        <td>{formatTien(ct.dongia)}</td>
                                        <td><strong>{formatTien(ct.thanhtien)}</strong></td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>

                                {chiTietDon.lichsu && chiTietDon.lichsu.length > 0 && (
                                  <div style={{ marginTop: 16 }}>
                                    <strong style={{ color: "#1f4068" }}>Nhật ký trạng thái đơn:</strong>
                                    <ul style={{ marginTop: 8, paddingLeft: 20, color: "#555", fontSize: 13 }}>
                                      {chiTietDon.lichsu.map((ls, i) => (
                                        <li key={i} style={{ marginBottom: 4 }}>
                                          [{new Date(ls.thoigian).toLocaleString("vi-VN")}] {" "}
                                          <span style={{ fontWeight: "bold" }}>{NHAN_TRANG_THAI[ls.trangthai] || ls.trangthai}</span>:{" "}
                                          {ls.ghichu}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ==================================== TAB 2: YÊU CẦU TRẢ HÀNG ==================================== */}
      {currentTab === "trahang" && (
        <div className="hop" style={{ borderColor: "#1f4068" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <h3 style={{ margin: 0, color: "#1f4068" }}>Quản lý yêu cầu trả hàng / hoàn tiền</h3>
            <button className="nut" style={{ background: "#1f4068" }} onClick={taiYeuCauTraHang} disabled={dangTaiTra}>
              {dangTaiTra ? "Đang tải..." : "Làm mới"}
            </button>
          </div>

          {dangTaiTra && <p>Đang tải danh sách yêu cầu trả hàng...</p>}

          {!dangTaiTra && yeuCauTraHang.length === 0 && (
            <p style={{ color: "#888", marginTop: 16 }}>Chưa có yêu cầu trả hàng nào được tạo.</p>
          )}

          {!dangTaiTra && yeuCauTraHang.length > 0 && (
            <div style={{ overflowX: "auto", marginTop: 15 }}>
              <table>
                <thead>
                  <tr style={{ background: "#f0f4f8" }}>
                    <th>Mã Yêu Cầu</th>
                    <th>Mã Đơn</th>
                    <th>Khách Hàng</th>
                    <th>Số Điện Thoại</th>
                    <th>Giá Trị Đơn</th>
                    <th>Lý Do Trả Hàng</th>
                    <th>Trạng Thái</th>
                    <th>Ngày Gửi Yêu Cầu</th>
                    <th>Ghi Chú Của Admin</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {yeuCauTraHang.map((req) => {
                    const statusLabels = {
                      choxuly: "Chờ xử lý",
                      duyet_chohanghoi: "Chờ khách trả hàng",
                      danhan: "Đã nhận & hoàn kho",
                      tuchoi: "Từ từ chối trả"
                    };
                    const statusColors = {
                      choxuly: "#fff3cd",
                      duyet_chohanghoi: "#cce5ff",
                      danhan: "#d4edda",
                      tuchoi: "#f8d7da"
                    };
                    return (
                      <tr key={req.mayeucau}>
                        <td><strong>#{req.mayeucau}</strong></td>
                        <td><strong>#{req.madonhang}</strong></td>
                        <td>{req.hoten}</td>
                        <td>{req.sodienthoai}</td>
                        <td><span className="gia">{formatTien(req.tongtien)}</span></td>
                        <td><span style={{ fontSize: 13, fontStyle: "italic" }}>"{req.lydo}"</span></td>
                        <td>
                          <span
                            style={{
                              fontSize: 12,
                              padding: "3px 8px",
                              borderRadius: 99,
                              background: statusColors[req.trangthai] || "#eee",
                              color: "#333",
                              fontWeight: "bold"
                            }}
                          >
                            {statusLabels[req.trangthai] || req.trangthai}
                          </span>
                        </td>
                        <td style={{ fontSize: 12, color: "#666" }}>
                          {req.ngayyeucau ? new Date(req.ngayyeucau).toLocaleString("vi-VN") : "—"}
                        </td>
                        <td>
                          {req.trangthai === "choxuly" || req.trangthai === "duyet_chohanghoi" ? (
                            <input
                              type="text"
                              placeholder="Lưu ý khi xử lý..."
                              value={ghichuAdminMap[req.mayeucau] || ""}
                              onChange={(e) =>
                                setGhichuAdminMap((prev) => ({ ...prev, [req.mayeucau]: e.target.value }))
                              }
                              style={{ width: 160, padding: "5px 8px", margin: 0, fontSize: 13 }}
                            />
                          ) : (
                            <span style={{ fontSize: 13, color: "#555" }}>{req.ghichu_admin || "—"}</span>
                          )}
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {req.trangthai === "choxuly" && (
                              <>
                                <button
                                  className="nut"
                                  style={{ fontSize: 12, padding: "6px 10px", background: "#28a745" }}
                                  onClick={() => xuLyDuyetTraHang(req.mayeucau, "approve")}
                                >
                                  Duyệt
                                </button>
                                <button
                                  className="nut"
                                  style={{ fontSize: 12, padding: "6px 10px", background: "#dc3545" }}
                                  onClick={() => xuLyDuyetTraHang(req.mayeucau, "reject")}
                                >
                                  Từ chối
                                </button>
                              </>
                            )}
                            {req.trangthai === "duyet_chohanghoi" && (
                              <>
                                <button
                                  className="nut"
                                  style={{ fontSize: 12, padding: "6px 10px", background: "#007bff" }}
                                  onClick={() => xuLyDuyetTraHang(req.mayeucau, "confirm")}
                                >
                                  Đã nhận hàng (Hoàn kho)
                                </button>
                                <button
                                  className="nut"
                                  style={{ fontSize: 12, padding: "6px 10px", background: "#dc3545" }}
                                  onClick={() => xuLyDuyetTraHang(req.mayeucau, "reject")}
                                >
                                  Từ chối
                                </button>
                              </>
                            )}
                            {(req.trangthai === "danhan" || req.trangthai === "tuchoi") && (
                              <span style={{ fontSize: 12, color: "#888" }}>Đã xử lý</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ==================================== TAB 3.5: KHUYẾN MÃI CHIẾN DỊCH ==================================== */}
      {currentTab === "khuyenmai" && (
        <div style={{ padding: 20 }}>
          <PromotionManagement danhSachSanPham={sanPhams} />
        </div>
      )}

      {/* ==================================== TAB 3: KHUYẾN MÃI & VOUCHER ==================================== */}
      {currentTab === "voucher" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 20 }}>
          {/* Cột 1: Cấp voucher */}
          <div className="hop" style={{ borderColor: "#1f4068" }}>
            <h3 style={{ margin: "0 0 15px", color: "#1f4068" }}>Cấp Voucher Thủ Công</h3>
            <p style={{ fontSize: 13, color: "#666" }}>
              Chọn khách hàng và voucher tương ứng để gửi tặng trực tiếp vào tài khoản của khách hàng.
            </p>
            <form onSubmit={xuLyCapVoucher} style={{ marginTop: 15 }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: 4 }}>Chọn Khách hàng:</label>
                <select
                  required
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  style={{ border: "1px solid #1f4068" }}
                >
                  <option value="">-- Chọn khách hàng --</option>
                  {khachHangs.map(u => (
                    <option key={u.manguoidung} value={u.manguoidung}>
                      {u.hoten} ({u.sodienthoai}) - ID: {u.manguoidung}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: 4 }}>Chọn Voucher:</label>
                <select
                  required
                  value={selectedVoucher}
                  onChange={(e) => setSelectedVoucher(e.target.value)}
                  style={{ border: "1px solid #1f4068" }}
                >
                  <option value="">-- Chọn voucher --</option>
                  {vouchers.map(v => (
                    <option key={v.mavoucher} value={v.mavoucher}>
                      {v.macode} - Giảm {formatTien(v.giatri)} (ĐK: Chi tiêu tối thiểu {formatTien(v.dieukien_tien_toi_thieu)})
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="nut" style={{ background: "#1f4068", width: "100%" }} disabled={dangTaiVoucher}>
                Xác Nhận Tặng Voucher
              </button>
            </form>

            <h4 style={{ color: "#1f4068", marginTop: 25, marginBottom: 10 }}>Các Voucher Trên Hệ Thống</h4>
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr style={{ background: "#f0f4f8" }}>
                    <th>Code</th>
                    <th>Tên Voucher</th>
                    <th>Trị Giá</th>
                    <th>Điều Kiện Mua</th>
                  </tr>
                </thead>
                <tbody>
                  {vouchers.map(v => (
                    <tr key={v.mavoucher}>
                      <td><strong style={{ color: "#c2185b" }}>{v.macode}</strong></td>
                      <td>{v.ten}</td>
                      <td style={{ color: "green", fontWeight: "bold" }}>-{formatTien(v.giatri)}</td>
                      <td>≥{formatTien(v.dieukien_tien_toi_thieu)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cột 2: Lịch sử đã tặng */}
          <div className="hop" style={{ borderColor: "#1f4068" }}>
            <h3 style={{ margin: "0 0 15px", color: "#1f4068" }}>Lịch Sử Cấp & Sử Dụng Voucher</h3>
            {dangTaiVoucher && <p>Đang tải lịch sử voucher...</p>}
            {!dangTaiVoucher && lichSuVoucher.length === 0 && <p style={{ color: "#888" }}>Chưa có lịch sử tặng voucher nào.</p>}
            {!dangTaiVoucher && lichSuVoucher.length > 0 && (
              <div style={{ overflowX: "auto", maxHeight: "500px", overflowY: "auto" }}>
                <table>
                  <thead>
                    <tr style={{ background: "#f0f4f8" }}>
                      <th>Khách hàng</th>
                      <th>Voucher</th>
                      <th>Trị giá</th>
                      <th>Ngày tặng</th>
                      <th>Sử dụng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lichSuVoucher.map((h, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{h.hoten}</strong>
                          <div style={{ fontSize: 11, color: "#666" }}>SĐT: {h.sodienthoai}</div>
                        </td>
                        <td><strong style={{ color: "#c2185b" }}>{h.macode}</strong></td>
                        <td style={{ fontWeight: "bold" }}>-{formatTien(h.giatri)}</td>
                        <td style={{ fontSize: 12 }}>{h.ngaytang ? new Date(h.ngaytang).toLocaleDateString("vi-VN") : "—"}</td>
                        <td>
                          {h.sudung ? (
                            <span style={{ color: "green", fontWeight: "bold" }}>Đã dùng (Đơn #{h.madonhang_sudung})</span>
                          ) : (
                            <span style={{ color: "#888" }}>Chưa dùng</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================== TAB 4: SẢN PHẨM & TỒN KHO ==================================== */}
      {currentTab === "sanpham" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 20 }}>
          {/* Danh mục */}
          <div className="hop" style={{ borderColor: "#1f4068" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
              <h3 style={{ margin: 0, color: "#1f4068" }}> Quản lý danh mục</h3>
              <button className="nut" style={{ background: "#28a745", padding: "6px 12px", fontSize: 13 }} onClick={handleAddCategory}>Thêm mới</button>
            </div>
            <table>
              <thead>
                <tr style={{ background: "#f0f4f8" }}>
                  <th>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "center" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {localDanhMuc.map((item) => (
                    <tr key={item}>
                      <td>{item}</td>
                      <td>Danh mục sản phẩm trong hệ thống</td>
                      <td><span style={{ color: "green" }}>Đang dùng</span></td>
                      <td style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                          <button className="nut" style={{ background: "#17a2b8", padding: "4px 8px", fontSize: 12, margin: 0 }} onClick={() => handleEditCategory(item)}>Cập nhật</button>
                          <button className="nut" style={{ background: "#dc3545", padding: "4px 8px", fontSize: 12, margin: 0 }} onClick={() => handleDeleteCategory(item)}>Xóa</button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Sản phẩm & Tồn kho */}
          <div className="hop" style={{ borderColor: "#1f4068" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
              <h3 style={{ margin: 0, color: "#1f4068" }}>Quản lý sản phẩm và tồn kho</h3>
              <button className="nut" style={{ background: "#28a745", padding: "6px 12px", fontSize: 13 }} onClick={handleAddProduct}>Thêm sản phẩm</button>
            </div>
            <p style={{ fontSize: 13, color: "#666", marginBottom: 15 }}>
              Hệ thống sẽ tự động cảnh báo <span style={{ color: "red", fontWeight: "bold" }}>màu đỏ</span> đối với các sản phẩm sắp hết hàng (số lượng tồn kho dưới 5). Quản trị viên có thể nhập trực tiếp số lượng hàng bổ sung cho từng biến thể ở bên dưới.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f0f4f8" }}>
                    <th style={{ padding: "10px", textAlign: "left" }}>Tên sản phẩm & Biến thể</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Danh mục</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Giá bán</th>
                    <th style={{ padding: "10px", textAlign: "center", minWidth: "150px" }}>Số lượng tồn</th>
                    <th style={{ padding: "10px", textAlign: "right", minWidth: "300px" }}>Nhập thêm hàng</th>
                    <th style={{ padding: "10px", textAlign: "center", width: "130px" }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {localSanPhams.map((sp) => {
                    const hasVariants = sp.luachon && sp.luachon.length > 0;
                    return (
                      <tr key={sp.masanpham} style={{ borderBottom: "1px solid #e0e0e0" }}>
                        <td style={{ padding: "12px 10px" }}>
                          <strong>{sp.ten}</strong>
                          {hasVariants && (
                            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                              Có {sp.luachon.length} lựa chọn (Dung tích/Loại)
                            </div>
                          )}
                        </td>
                        <td style={{ padding: "12px 10px" }}>{sp.danhMuc}</td>
                        <td style={{ padding: "12px 10px" }}>{formatTien(sp.gia)}</td>
                        <td style={{ padding: "12px 10px", textAlign: "center" }}>
                          {!hasVariants ? (
                            <span style={{
                              color: sp.ton <= 5 ? "red" : "green",
                              fontWeight: "bold",
                              background: sp.ton <= 5 ? "#ffebee" : "#e8f5e9",
                              padding: "4px 10px",
                              borderRadius: 6,
                              display: "inline-block"
                            }}>
                              {sp.ton} {sp.ton <= 5 ? "Sắp hết hàng" : "Còn hàng"}
                            </span>
                          ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                              {sp.luachon.map((lc) => (
                                <div key={lc.maluachon} style={{ fontSize: 12 }}>
                                  <span style={{ color: "#555", marginRight: 6 }}>
                                    {[lc.mausac, lc.loai, lc.dungtich].filter(v => v && v !== "Mặc định").join(" - ") || "Mặc định"}:
                                  </span>
                                  <span style={{
                                    color: lc.soluongton <= 5 ? "red" : "green",
                                    fontWeight: "bold",
                                    background: lc.soluongton <= 5 ? "#ffebee" : "#e8f5e9",
                                    padding: "4px 10px",
                                    borderRadius: 6,
                                    display: "inline-block"
                                  }}>
                                    {lc.soluongton} {lc.soluongton <= 5 ? "Sắp hết hàng" : "Còn hàng"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: "12px 10px", textAlign: "center" }}>
                          {!hasVariants ? (
                            (() => {
                              const key = `sp-${sp.masanpham}`;
                              const handleNhapHangMoi = async () => {
                                const val = nhapHangValues[key];
                                const num = parseInt(val, 10);
                                if (isNaN(num) || num <= 0) {
                                  alert("Vui lòng nhập số lượng hợp lệ (lớn hơn 0)!");
                                  return;
                                }
                                setDangNhapHang(true);
                                try {
                                  const res = await fetch(`${API_BASE}/admin/nhap-hang/${key}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ soLuongNhap: num })
                                  });
                                  const data = await res.json();
                                  if (res.ok) {
                                    alert(`Đã nhập thêm ${num} sản phẩm cho ${sp.ten}!`);
                                    setNhapHangValues(prev => ({ ...prev, [key]: "" }));
                                    if (refreshProducts) await refreshProducts();
                                  } else {
                                    alert(data.message || "Không thể nhập hàng.");
                                  }
                                } catch (err) {
                                  alert("Lỗi kết nối server.");
                                } finally {
                                  setDangNhapHang(false);
                                }
                              };

                              return (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                                  <input
                                    type="number"
                                    min="1"
                                    placeholder="+ Số lượng"
                                    value={nhapHangValues[key] || ""}
                                    onChange={(e) => setNhapHangValues(prev => ({ ...prev, [key]: e.target.value }))}
                                    style={{ width: "85px", padding: "4px 8px", fontSize: 12, margin: 0, borderRadius: 4, border: "1px solid #ccc" }}
                                  />
                                  <button
                                    type="button"
                                    className="nut"
                                    disabled={dangNhapHang}
                                    onClick={handleNhapHangMoi}
                                    style={{ margin: 0, padding: "4px 10px", fontSize: 11, background: "#1f4068", color: "#fff" }}
                                  >
                                    Nhập
                                  </button>
                                </div>
                              );
                            })()
                          ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                              {sp.luachon.map((lc) => {
                                const handleNhapHang = async () => {
                                  const val = nhapHangValues[lc.maluachon];
                                  const num = parseInt(val, 10);
                                  if (isNaN(num) || num <= 0) {
                                    alert("Vui lòng nhập số lượng hợp lệ (lớn hơn 0)!");
                                    return;
                                  }
                                  setDangNhapHang(true);
                                  try {
                                    // MOCK UI: Cập nhật tồn kho của biến thể vào state thay vì gọi API thực tế
                                    setLocalSanPhams(localSanPhams.map(p => {
                                      if (p.masanpham === sp.masanpham) {
                                        const newLuachon = p.luachon.map(l => {
                                          if (l.maluachon === lc.maluachon) {
                                            return { ...l, soluongton: (l.soluongton || 0) + num };
                                          }
                                          return l;
                                        });
                                        return { ...p, luachon: newLuachon };
                                      }
                                      return p;
                                    }));
                                    alert(`Đã nhập thêm ${num} sản phẩm cho ${sp.ten} (${[lc.mausac, lc.loai, lc.dungtich].filter(v => v && v !== "Mặc định").join(" - ") || "Mặc định"})!`);
                                    setNhapHangValues(prev => ({ ...prev, [lc.maluachon]: "" }));
                                  } catch (err) {
                                    alert("Lỗi nhập hàng.");
                                  } finally {
                                    setDangNhapHang(false);
                                  }
                                };

                                return (
                                  <div key={lc.maluachon} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, marginBottom: 4 }}>
                                    <span style={{ fontSize: 12, color: "#555", textAlign: "right", marginRight: 8, whiteSpace: "nowrap" }}>
                                      {[lc.mausac, lc.loai, lc.dungtich].filter(v => v && v !== "Mặc định").join(" - ") || "Mặc định"}:
                                    </span>
                                    <input
                                      type="number"
                                      min="1"
                                      placeholder="+ Số lượng"
                                      value={nhapHangValues[lc.maluachon] || ""}
                                      onChange={(e) => setNhapHangValues(prev => ({ ...prev, [lc.maluachon]: e.target.value }))}
                                      style={{ width: "85px", padding: "4px 8px", fontSize: 12, margin: 0, borderRadius: 4, border: "1px solid #ccc" }}
                                    />
                                    <button
                                      type="button"
                                      className="nut"
                                      disabled={dangNhapHang}
                                      onClick={handleNhapHang}
                                      style={{ margin: 0, padding: "4px 10px", fontSize: 11, background: "#1f4068", color: "#fff" }}
                                    >
                                      Nhập
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: "12px 10px", textAlign: "center" }}>
                          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexDirection: "column" }}>
                            <button className="nut" style={{ background: "#17a2b8", padding: "4px 8px", fontSize: 12, margin: 0 }} onClick={() => handleEditProduct(sp)}>Cập nhật</button>
                            <button className="nut" style={{ background: "#dc3545", padding: "4px 8px", fontSize: 12, margin: 0 }} onClick={() => handleDeleteProduct(sp)}>Xóa</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminArea;
