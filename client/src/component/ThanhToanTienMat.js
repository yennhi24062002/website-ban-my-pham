// Component hướng dẫn thanh toán tiền mặt khi nhận hàng (COD)
// Hiển thị số tiền cần chuẩn bị khi shipper giao hàng
function ThanhToanTienMat({ tongtien }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #ffc107",
      borderRadius: 16, overflow: "hidden", marginTop: 12
    }}>
      <div style={{
        background: "linear-gradient(135deg,#856404,#ffc107)",
        padding: "14px 20px", display: "flex", alignItems: "center", gap: 10, color: "white"
      }}>
        <span style={{ fontSize: 22 }}></span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Thanh toán khi nhận hàng (COD)</div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>Chuẩn bị tiền mặt khi shipper giao</div>
        </div>
      </div>
      <div style={{ padding: "16px 20px" }}>
        <p style={{ margin: 0, fontSize: 15 }}>
          Vui lòng chuẩn bị{" "}
          <strong style={{ color: "#c21869", fontSize: 18 }}>
            {new Intl.NumberFormat("vi-VN").format(tongtien)}đ
          </strong>{" "}
          khi nhân viên giao hàng đến.
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 13, color: "#666" }}>
           Đơn sẽ được xác nhận sau khi bạn thanh toán cho shipper.
        </p>
      </div>
    </div>
  );
}

export default ThanhToanTienMat;
