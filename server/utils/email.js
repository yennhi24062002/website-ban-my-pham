const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

async function sendOrderConfirmationEmail(order, items, userEmail) {
  const EMAIL_USER = process.env.EMAIL_USER;       // Email gửi (ví dụ: phamyennhi2462002@gmail.com)
  const BREVO_API_KEY = process.env.BREVO_API_KEY; // API key từ brevo.com
  const EMAIL_PASS = process.env.EMAIL_PASS;       // Gmail App Password
  // Tạo danh sách sản phẩm hiển thị trong email
  const itemsHtml = items.map(item => {
    const options = [item.mausac, item.loai, item.dungtich].filter(Boolean).join(" - ");
    const itemName = (item.tensanpham || item.ten) + (options ? ` (${options})` : "");
    const qty = item.soluong || 1;
    const price = Number(item.dongia || item.giaban || 0);
    const lineTotal = price * qty;
    return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${itemName}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${qty}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${price.toLocaleString("vi-VN")}đ</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${lineTotal.toLocaleString("vi-VN")}đ</td>
      </tr>
    `;
  }).join("");

  const emailHtml = `
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #4a353b; line-height: 1.6; background-color: #fff5f8; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; border: 1px solid #ffccd5; border-radius: 18px; overflow: hidden; background-color: #ffffff; box-shadow: 0 8px 30px rgba(255, 133, 161, 0.08); }
          .header { background: linear-gradient(135deg, #ff76c6 0%, #ff85d6 100%); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 24px; text-shadow: 0 1px 3px rgba(0,0,0,0.15); }
          .content { padding: 30px; }
          .info-box { background-color: #fff0f3; border: 1px dashed #ffccd5; border-radius: 12px; padding: 15px; margin: 20px 0; }
          .info-box p { margin: 5px 0; }
          .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          .table th { background-color: #ffe5ea; color: #c9184a; padding: 12px 10px; text-align: left; font-weight: 600; }
          .table td { padding: 12px 10px; border-bottom: 1px solid #eee; }
          .total { font-size: 20px; color: #d81b60; font-weight: bold; text-align: right; margin-top: 25px; }
          .footer { background: #ffe5ea; text-align: center; padding: 20px; font-size: 13px; color: #7a3e4d; border-top: 1px solid #ffccd5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Xác Nhận Đơn Hàng #${order.madonhang}</h1>
          </div>
          <div class="content">
            <p>Xin chào <strong>${order.tennguoinhan}</strong>,</p>
            <p>Cảm ơn bạn đã tin tưởng mua sắm tại <strong>Website bán mỹ phẩm</strong>. Đơn hàng của bạn đã được khởi tạo thành công và đang được chúng tôi xử lý chuẩn bị gửi đi.</p>
            
            <div class="info-box">
              <p><strong>Thông tin người nhận:</strong></p>
              <p>- Họ tên: ${order.tennguoinhan}</p>
              <p>- Số điện thoại: ${order.sodienthoainhan}</p>
              <p>- Địa chỉ giao hàng: ${order.diachigiaohang}</p>
              <p>- Ngày đặt hàng: ${new Date(order.ngaydat || Date.now()).toLocaleString("vi-VN")}</p>
            </div>

            <h3>Chi tiết sản phẩm đã đặt:</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th style="text-align: center;">SL</th>
                  <th style="text-align: right;">Đơn giá</th>
                  <th style="text-align: right;">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <div class="total">
              Tổng cộng thanh toán: ${Number(order.tongtien).toLocaleString("vi-VN")}đ
            </div>
          </div>
          <div class="footer">
            <p><strong>Website bán mỹ phẩm</strong> - Chúc bạn luôn rạng rỡ!</p>
            <p>Địa chỉ: 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
            <p>Hotline hỗ trợ: 0908719006</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Luôn lưu một bản sao local để phục vụ demo offline
  try {
    const dir = path.join(__dirname, "../sent_emails");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, `email_${order.madonhang}.html`);
    fs.writeFileSync(filePath, emailHtml, "utf8");
    console.log(`[Email] Đã lưu bản sao email xác nhận đơn hàng tại: ${filePath}`);
  } catch (err) {
    console.error("[Email] Không thể lưu bản sao local:", err.message);
  }


  // Gửi email thực tế
  const canSend = EMAIL_USER && (BREVO_API_KEY || EMAIL_PASS);

  if (canSend) {
    try {
      let transporter;

      if (BREVO_API_KEY) {
        // Ưu tiên Brevo SMTP - miễn phí 300 email/ngày, không cần App Password
        transporter = nodemailer.createTransport({
          host: "smtp-relay.brevo.com",
          port: 587,
          secure: false,
          auth: {
            user: EMAIL_USER,
            pass: BREVO_API_KEY
          }
        });
        console.log(`[Email] Sử dụng Brevo SMTP...`);
      } else {
        // Fallback: Gmail App Password
        transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
          }
        });
        console.log(`[Email] Sử dụng Gmail SMTP...`);
      }

      const mailOptions = {
        from: `"Website bán mỹ phẩm" <${EMAIL_USER}>`,
        to: userEmail,
        subject: `[Website bán mỹ phẩm] Xác nhận đơn hàng #${order.madonhang} thành công!`,
        html: emailHtml
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Email] ✅ Đã gửi email xác nhận đến: ${userEmail}`);
      return true;
    } catch (err) {
      console.error("[Email] ❌ Lỗi gửi email:", err.message);
      return false;
    }
  } else {
    console.log("[Email] Chưa cấu hình email. Chỉ lưu bản sao offline.");
    return false;
  }
}

module.exports = {
  sendOrderConfirmationEmail
};
