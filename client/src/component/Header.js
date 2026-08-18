function Header({ nguoiDung, vaiTro, setVaiTro, setMoDangNhap, onDangXuat, setTabAdmin, soLuongGioHang, onNavigate }) {
  return (
    <>
      <header className="dau-trang">
        <div>
          <h1>Website bán mỹ phẩm</h1>
          <p>Mỹ phẩm chính hãng — Giao hàng toàn quốc</p>
        </div>
        <div>
          {!nguoiDung && (
            <button className="nut" onClick={() => setMoDangNhap(true)}>
              Đăng nhập / Đăng ký
            </button>
          )}
          {nguoiDung && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "#fff", fontSize: 14 }}>{nguoiDung.hoten}</span>
              <button className="nut" onClick={onDangXuat}>Đăng xuất</button>
            </div>
          )}
        </div>
      </header>

      <nav className="menu">
        {vaiTro === "admin" ? (
          <>
            <a href="#admin" onClick={() => setTabAdmin("thongke")}>Báo cáo Thống kê</a>
            <a href="#admin" onClick={() => setTabAdmin("donhang")}>Quản lý đơn hàng</a>
            <a href="#admin" onClick={() => setTabAdmin("sanpham")}>Quản lý danh mục & Sản phẩm</a>
            <a href="#admin" onClick={() => setTabAdmin("trahang")}>Trả hàng</a>
            <a href="#admin" onClick={() => setTabAdmin("voucher")}>Voucher</a>
          </>
        ) : (
          <>
            <a href="#sanpham" onClick={(e) => { e.preventDefault(); onNavigate('sanpham'); }}>Sản phẩm</a>
            <a href="#giohang" onClick={(e) => { e.preventDefault(); onNavigate('giohang'); }}>
              Giỏ hàng {soLuongGioHang > 0 && <span style={{background: "#c2185b", color: "white", padding: "2px 6px", borderRadius: "10px", marginLeft: "4px", fontSize: "12px"}}>{soLuongGioHang}</span>}
            </a>
            <a href="#lichsu" onClick={(e) => { e.preventDefault(); onNavigate('lichsu'); }}>Lịch sử đơn</a>
            <a href="#lienhe" onClick={(e) => { e.preventDefault(); onNavigate('lienhe'); }}>Liên hệ</a>
          </>
        )}
        {!nguoiDung && <span style={{ color: "#c2185b", fontSize: 13 }}>Đăng nhập để mua hàng</span>}
      </nav>
    </>
  );
}

export default Header;
