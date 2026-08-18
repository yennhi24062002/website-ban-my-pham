const nodemailer = require('nodemailer');

async function debugMail() {
  const EMAIL_USER = 'phamyennhi2462002@gmail.com';
  const EMAIL_PASS = 'lilbbuxhaoswthgu'; // Gmail App Password
  const targetEmail = 'hoh119004@gmail.com';

  console.log(`Connecting to smtp.gmail.com:465 with user ${EMAIL_USER}...`);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `"Website bán mỹ phẩm" <${EMAIL_USER}>`,
      to: targetEmail,
      subject: '[Website bán mỹ phẩm] Test Email xác nhận đơn hàng #54',
      html: `
        <div style="font-family: Arial; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #d81b60;">Xác nhận đơn hàng #54 thành công!</h2>
          <p>Xin chào <b>Khách hàng (hoh119004@gmail.com)</b>,</p>
          <p>Cảm ơn bạn đã đặt hàng tại Website bán mỹ phẩm.</p>
          <p><b>Tổng tiền:</b> 1.409.000đ</p>
          <p>Email này được gửi tự động qua Gmail SMTP.</p>
        </div>
      `
    });

    console.log('✅ SendMail Response Info:', info);
  } catch (err) {
    console.error('❌ Error sending mail:', err);
  }
}

debugMail();
