import { useState } from "react";

function LoginForm({ dangKy, setDangKy, onDangNhap, onDangKyTaiKhoan, dongForm }) {
  const [dangNhapForm, setDangNhapForm] = useState({
    taikhoan: "",
    matkhau: ""
  });

  const [dangKyForm, setDangKyForm] = useState({
    hoten: "",
    sodienthoai: "",
    email: "",
    matkhau: ""
  });

  function capNhatDangNhap(event) {
    const { name, value } = event.target;
    setDangNhapForm((prev) => ({ ...prev, [name]: value }));
  }

  function capNhatDangKy(event) {
    const { name, value } = event.target;
    setDangKyForm((prev) => ({ ...prev, [name]: value }));
  }

  if (dangKy) {
    return (
      <section className="hop hop-dang-nhap">
        <h2>Đăng ký tài khoản khách hàng</h2>
        <div className="hang-form">
          <input
            name="hoten"
            placeholder="Họ tên"
            value={dangKyForm.hoten}
            onChange={capNhatDangKy}
          />
          <input
            name="sodienthoai"
            placeholder="Số điện thoại"
            value={dangKyForm.sodienthoai}
            onChange={capNhatDangKy}
          />
          <input
            name="email"
            placeholder="Email"
            value={dangKyForm.email}
            onChange={capNhatDangKy}
          />
          <input
            name="matkhau"
            type="password"
            placeholder="Mật khẩu"
            value={dangKyForm.matkhau}
            onChange={capNhatDangKy}
          />
        </div>
        <button className="nut" onClick={() => onDangKyTaiKhoan(dangKyForm)}>
          Đăng ký
        </button>
        <button className="nut nut-phu" onClick={() => setDangKy(false)}>
          Đã có tài khoản? Đăng nhập
        </button>
      </section>
    );
  }

  return (
    <section className="hop hop-dang-nhap">
      <form onSubmit={(event) => onDangNhap(event, dangNhapForm)}>
        <h2>Đăng nhập hệ thống</h2>
        <input
          name="taikhoan"
          placeholder="Email hoặc số điện thoại"
          value={dangNhapForm.taikhoan}
          onChange={capNhatDangNhap}
        />
        <input
          name="matkhau"
          type="password"
          placeholder="Mật khẩu"
          value={dangNhapForm.matkhau}
          onChange={capNhatDangNhap}
        />
        <button className="nut">Đăng nhập</button>
        <button type="button" className="nut nut-phu" onClick={dongForm}>
          Hủy
        </button>
        <p className="ghi-chu">Tài khoản mẫu: khachhang@gmail.com / 123456 hoặc admin@gmail.com / 123456</p>
        <button type="button" className="link-nut" onClick={() => setDangKy(true)}>
          Chưa có tài khoản? Đăng ký
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
