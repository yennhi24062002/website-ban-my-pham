const { sendOrderConfirmationEmail } = require('../utils/email');

async function testMail() {
  process.env.EMAIL_USER = 'phamyennhi2462002@gmail.com';
  process.env.EMAIL_PASS = 'lilbbuxhaoswthgu';

  const fakeOrder = {
    madonhang: 9999,
    tennguoinhan: 'Phạm Yến Nhi',
    sodienthoainhan: '0908719006',
    diachigiaohang: '123 Nguyễn Huệ, Quận 1',
    tongtien: 580000,
    ngaydat: new Date()
  };

  const fakeItems = [
    { tensanpham: 'Son Lì MAC Ruby Woo', mausac: 'Ruby Woo', soluong: 1, dongia: 580000 }
  ];

  console.log('Sending test email to phamyennhi2462002@gmail.com...');
  const success = await sendOrderConfirmationEmail(fakeOrder, fakeItems, 'phamyennhi2462002@gmail.com');
  console.log('Result:', success ? 'SUCCESS!' : 'FAILED!');
  process.exit(0);
}

testMail();
