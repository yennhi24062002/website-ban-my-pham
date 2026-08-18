const db = require('../config/db');
const ProductController = require('../controller/product.controller');

async function test() {
  try {
    const req = {};
    const res = {
      json: (data) => {
        console.log('API Returned products count:', data.length);
        if (data.length > 0) {
          console.log('Sample product 1:', data[0].masanpham, data[0].tensanpham, data[0].hinhanh);
          console.log('Sample product 15:', data[14]?.masanpham, data[14]?.tensanpham);
        }
      },
      status: (code) => {
        console.log('Status code:', code);
        return res;
      }
    };
    await ProductController.index(req, res);
  } catch (err) {
    console.error('Test error:', err);
  }
  process.exit(0);
}

test();
