const { sendOrderConfirmationEmail } = require('../utils/email');

async function testHohMail() {
  process.env.EMAIL_USER = 'phamyennhi2462002@gmail.com';
  process.env.EMAIL_PASS = 'lilbbuxhaoswthgu';

  const fakeOrder = {
    madonhang: 51,
    tennguoinhan: 'Khách hàng',
    sodienthoainhan: '0908719006',
    diachigiaohang: '123 Nguyễn Huệ, TP.HCM',
    tongtien: 1409000,
    ngaydat: new Date()
  };

  const fakeItems = [
    { tensanpham: 'Kem Chống Nắng La Roche-Posay', mausac: 'Mặc định', soluong: 1, dongia: 350100 },
    { tensanpham: 'Dưỡng Chất Khoáng Vichy Mineral 89', mausac: 'Mặc định', soluong: 1, dongia: 620000 },
    { tensanpham: 'Son Lì MAC Ruby Woo', mausac: 'Ruby Woo', soluong: 1, dongia: 580000 },
    { tensanpham: 'Son Kem 3CE Soft Lip Color', mausac: 'Denim', soluong: 1, dongia: 320000 }
  ];

  console.log('Sending test confirmation email to hoh119004@gmail.com...');
  const success = await sendOrderConfirmationEmail(fakeOrder, fakeItems, 'hoh119004@gmail.com');
  console.log('Result for hoh119004@gmail.com:', success ? 'SUCCESS!' : 'FAILED!');
  process.exit(0);
}

testHohMail();
