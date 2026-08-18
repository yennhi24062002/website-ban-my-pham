import React, { useState, useEffect } from "react";

function formatTien(tien) {
  if (!tien) return "0đ";
  return tien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
}

function PromotionManagement({ danhSachSanPham }) {
  const [khuyenMais, setKhuyenMais] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    tenkm: "",
    loai_giamgia: "phan_tram",
    mucgiam: "",
    ngaybatdau: "",
    ngayketthuc: "",
    sanphamIds: []
  });

  useEffect(() => {
    fetchKhuyenMais();
  }, []);

  const fetchKhuyenMais = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/khuyenmai");
      if (res.ok) {
        const data = await res.json();
        setKhuyenMais(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectProduct = (masp) => {
    setForm(prev => {
      if (prev.sanphamIds.includes(masp)) {
        return { ...prev, sanphamIds: prev.sanphamIds.filter(id => id !== masp) };
      } else {
        return { ...prev, sanphamIds: [...prev.sanphamIds, masp] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.sanphamIds.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm tham gia khuyến mãi!");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/khuyenmai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        alert("Đã tạo chương trình khuyến mãi thành công!");
        setShowModal(false);
        setForm({
          tenkm: "", loai_giamgia: "phan_tram", mucgiam: "",
          ngaybatdau: "", ngayketthuc: "", sanphamIds: []
        });
        fetchKhuyenMais();
      } else {
        alert("Có lỗi xảy ra khi tạo khuyến mãi.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (makm) => {
    if (!window.confirm("Bạn có chắc muốn xóa khuyến mãi này?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/khuyenmai/${makm}`, { method: "DELETE" });
      if (res.ok) {
        alert("Xóa thành công!");
        fetchKhuyenMais();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#9d1b57", margin: 0 }}>Quản lý Khuyến Mãi (Chiến dịch)</h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "10px 20px", background: "#d81b60", color: "white",
            border: "none", borderRadius: 8, cursor: "pointer", fontWeight: "bold"
          }}
        >
          + Tạo Khuyến Mãi Mới
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: 8, overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#f8bbd0", color: "#880e4f" }}>
            <th style={{ padding: 12, textAlign: "left" }}>Tên KM</th>
            <th style={{ padding: 12, textAlign: "left" }}>Chiết khấu</th>
            <th style={{ padding: 12, textAlign: "left" }}>Thời gian</th>
            <th style={{ padding: 12, textAlign: "left" }}>Sản phẩm</th>
            <th style={{ padding: 12, textAlign: "center" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {khuyenMais.length === 0 ? (
            <tr><td colSpan="5" style={{ padding: 20, textAlign: "center" }}>Chưa có chiến dịch khuyến mãi nào.</td></tr>
          ) : (
            khuyenMais.map(km => {
              const isActive = new Date() >= new Date(km.ngaybatdau) && new Date() <= new Date(km.ngayketthuc);
              const isPast = new Date() > new Date(km.ngayketthuc);
              return (
                <tr key={km.makm} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: 12 }}>
                    <strong>{km.tenkm}</strong>
                    <div style={{ marginTop: 4, fontSize: 12 }}>
                      {isActive ? (
                        <span style={{ color: "green", background: "#e8f5e9", padding: "2px 6px", borderRadius: 4 }}>Đang chạy</span>
                      ) : isPast ? (
                        <span style={{ color: "gray", background: "#f5f5f5", padding: "2px 6px", borderRadius: 4 }}>Đã kết thúc</span>
                      ) : (
                        <span style={{ color: "orange", background: "#fff3e0", padding: "2px 6px", borderRadius: 4 }}>Sắp diễn ra</span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: 12, color: "#d81b60", fontWeight: "bold" }}>
                    {km.loai_giamgia === "phan_tram" ? `Giảm ${km.mucgiam}%` : `Giảm ${formatTien(km.mucgiam)}`}
                  </td>
                  <td style={{ padding: 12, fontSize: 13 }}>
                    Từ: {new Date(km.ngaybatdau).toLocaleString()}<br/>
                    Đến: {new Date(km.ngayketthuc).toLocaleString()}
                  </td>
                  <td style={{ padding: 12, fontSize: 13 }}>
                    {km.sanpham?.map(sp => (
                      <div key={sp.masanpham}>• {sp.tensanpham}</div>
                    ))}
                  </td>
                  <td style={{ padding: 12, textAlign: "center" }}>
                    <button onClick={() => handleDelete(km.makm)} style={{ background: "red", color: "white", border: "none", padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}>Xóa</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* MODAL TẠO KHUYẾN MÃI */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "white", padding: 24, borderRadius: 12, width: 800, maxHeight: "90vh", overflow: "auto" }}>
            <h2 style={{ marginTop: 0, color: "#d81b60" }}>Tạo Chương trình Khuyến Mãi</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>Tên chương trình:</label>
                  <input required name="tenkm" value={form.tenkm} onChange={handleChange} style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4 }} placeholder="VD: Siêu Sale Hè 2025" />
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>Loại chiết khấu:</label>
                  <select name="loai_giamgia" value={form.loai_giamgia} onChange={handleChange} style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4 }}>
                    <option value="phan_tram">Giảm theo phần trăm (%)</option>
                    <option value="tien_mat">Giảm số tiền trực tiếp (VNĐ)</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>Mức giảm:</label>
                  <input required type="number" min="1" name="mucgiam" value={form.mucgiam} onChange={handleChange} style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4 }} placeholder={form.loai_giamgia === "phan_tram" ? "VD: 20 (tương ứng 20%)" : "VD: 50000 (tương ứng 50.000đ)"} />
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>Bắt đầu từ:</label>
                  <input required type="datetime-local" name="ngaybatdau" value={form.ngaybatdau} onChange={handleChange} style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>Đến hết ngày:</label>
                  <input required type="datetime-local" name="ngayketthuc" value={form.ngayketthuc} onChange={handleChange} style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4 }} />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Chọn Sản phẩm tham gia KM:</label>
                <div style={{ maxHeight: 200, overflow: "auto", border: "1px solid #eee", padding: 10, borderRadius: 8 }}>
                  {danhSachSanPham.map(sp => (
                    <div key={sp.masanpham} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #f0f0f0", width: "100%" }}>
                      <label htmlFor={`sp-${sp.masanpham}`} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12, flex: 1, margin: 0, textAlign: "left", width: "100%" }}>
                        <img src={sp.hinh} alt={sp.ten} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4, border: "1px solid #eee" }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "bold", fontSize: 14, color: "#333" }}>{sp.ten}</div>
                          <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                            Giá gốc: <strong style={{ color: "#d81b60" }}>{formatTien(sp.gia)}</strong>
                          </div>
                        </div>
                      </label>
                      <input 
                        type="checkbox" 
                        id={`sp-${sp.masanpham}`}
                        checked={form.sanphamIds.includes(sp.masanpham)}
                        onChange={() => handleSelectProduct(sp.masanpham)}
                        style={{ marginLeft: 16, transform: "scale(1.5)", cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "10px 20px", background: "#ccc", border: "none", borderRadius: 8, cursor: "pointer" }}>Hủy</button>
                <button type="submit" disabled={loading} style={{ padding: "10px 20px", background: "#d81b60", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: "bold" }}>
                  {loading ? "Đang lưu..." : "Tạo Khuyến Mãi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromotionManagement;
