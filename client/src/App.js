import { useContext } from "react";
import { AppProvider, AppContext } from "./store/AppContext";
import Header from "./component/Header";
import LoginForm from "./component/LoginForm";
import ProductFilter from "./component/ProductFilter";
import ProductList from "./component/ProductList";
import ProductDetail from "./component/ProductDetail";
import CustomerArea from "./page/CustomerArea";
import AdminArea from "./page/AdminArea";
import ContactWidget from "./component/ContactWidget";
import Banner from "./component/Banner";
import PromoBanner from "./component/PromoBanner";
import ProductCarousel from "./component/ProductCarousel";

// Component nội dung chính, sử dụng context để lấy state và hàm xử lý
function AppContent() {
  const {
    vaiTro, setVaiTro,
    nguoiDung,
    moDangNhap, setMoDangNhap,
    dangKy, setDangKy,
    danhMuc, danhSachLoc, chiTiet,
    danhMucChon, setDanhMucChon,
    tuKhoa, setTuKhoa,
    sanPhams,
    gioHang, setGioHang,
    donHangGanNhat,
    tabAdmin, setTabAdmin,
    dangNhap, dangKyTaiKhoan, dangXuat,
    capNhatChiTiet,
    themVaoGio, capNhatSoLuong, xoaKhoiGio,
    datHang
  } = useContext(AppContext);

  // Hàm điều hướng thông minh: đóng chi tiết sản phẩm rồi cuộn đến đúngs mục
  function handleNavigate(target) {
    // Nếu đang xem chi tiết sản phẩm, đóng lại trước
    if (chiTiet) {
      capNhatChiTiet(null);
    }
    // Cuộn đến đúng mục sau khi React render lại
    setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  }

  return (
    <div>
      <Header
        nguoiDung={nguoiDung}
        vaiTro={vaiTro}
        setVaiTro={setVaiTro}
        setMoDangNhap={setMoDangNhap}
        onDangXuat={dangXuat}
        setTabAdmin={setTabAdmin}
        soLuongGioHang={gioHang.length}
        onNavigate={handleNavigate}
      />

      <main className="khung">
        {moDangNhap && (
          <LoginForm
            dangKy={dangKy}
            setDangKy={setDangKy}
            onDangNhap={dangNhap}
            onDangKyTaiKhoan={dangKyTaiKhoan}
            dongForm={() => setMoDangNhap(false)}
          />
        )}

        {/* TRANG CHỦ KHÁCH HÀNG (chỉ hiện khi chưa chọn chi tiết sản phẩm và không phải admin) */}
        {vaiTro !== "admin" && !chiTiet && (
          <>
            <Banner />
            <PromoBanner />
            <ProductFilter
              danhMuc={danhMuc}
              tuKhoa={tuKhoa}
              setTuKhoa={setTuKhoa}
              danhMucChon={danhMucChon}
              setDanhMucChon={setDanhMucChon}
            />
            <ProductList sanPhams={danhSachLoc} setChiTiet={capNhatChiTiet} />
          </>
        )}

        {/* TRANG CHI TIẾT SẢN PHẨM (tập trung duy nhất vào 1 sản phẩm) */}
        {vaiTro !== "admin" && chiTiet && (
          <ProductDetail
            sanPham={chiTiet}
            onThemVaoGio={themVaoGio}
            sanPhams={sanPhams}
            setChiTiet={capNhatChiTiet}
          />
        )}

        {/* KHU VỰC GIỎ HÀNG VÀ THANH TOÁN (chỉ hiện trên trang chủ) */}
        {vaiTro !== "admin" && !chiTiet && (
          <CustomerArea
            nguoiDung={nguoiDung}
            vaiTro={vaiTro}
            gioHang={gioHang}
            onCapNhatSoLuong={capNhatSoLuong}
            onXoaKhoiGio={xoaKhoiGio}
            onDatHang={datHang}
            donHangGanNhat={donHangGanNhat}
            onXoaSachGioHang={() => setGioHang([])}
          />
        )}

        {/* KHU VỰC ADMIN AREA */}
        {vaiTro === "admin" && (
          <AdminArea
            danhMuc={danhMuc}
            sanPhams={sanPhams}
            donHangGanNhat={donHangGanNhat}
            currentTab={tabAdmin}
            setCurrentTab={setTabAdmin}
          />
        )}

        {/* CAROUSEL "CÓ THỂ BẠN THÍCH" - LUÔN HIỆN Ở DƯỚI CÙNG GẦN FOOTER */}
        {vaiTro !== "admin" && (
          <div style={{ marginTop: 40, borderTop: "2px solid #ffccd5", paddingTop: 30 }}>
            <ProductCarousel sanPhams={sanPhams} setChiTiet={capNhatChiTiet} />
          </div>
        )}
      </main>

      <ContactWidget />
    </div>
  );
}

// Component gốc: bọc AppProvider để cung cấp context cho toàn bộ app
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
