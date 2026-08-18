const db = require("../config/db");
const crypto = require("crypto");

// Sinh mã serial ngẫu nhiên duy nhất: VC-KH{userId}-XXXXXX
function generateSerial(manguoidung) {
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `VC-KH${manguoidung}-${rand}`;
}

const VoucherController = {
  // Lấy danh sách voucher của user
  async getMyVouchers(req, res) {
    try {
      const { userId } = req.params;
      const [rows] = await db.query(
        `SELECT v.mavoucher, v.macode, v.ten, v.giatri, v.loai,
                v.dieukien_tien_toi_thieu, v.ngaybatdau, v.ngayhethan, v.trangthai,
                vn.mavoucher_nd, COALESCE(v.macode, CONCAT('VC-KH', vn.manguoidung, '-', vn.mavoucher_nd)) as ma_serial,
                vn.ngaytang, vn.sudung, vn.madonhang_sudung
         FROM voucher_nguoidung vn
         JOIN voucher v ON v.mavoucher = vn.mavoucher
         WHERE vn.manguoidung = ?
         ORDER BY vn.ngaytang DESC`,
        [userId]
      );


      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Không thể lấy danh sách voucher.", error: error.message });
    }
  },

  // Admin cấp voucher thủ công cho user
  async grantVoucher(req, res) {
    try {
      const { manguoidung, mavoucher, ghichu } = req.body;

      if (!manguoidung || !mavoucher) {
        return res.status(400).json({ message: "Thiếu thông tin cấp voucher." });
      }

      // Kiểm tra voucher còn hiệu lực
      const [vRows] = await db.query(
        "SELECT * FROM voucher WHERE mavoucher = ? AND trangthai = 'hoatdong' AND ngayhethan >= NOW()",
        [mavoucher]
      );
      if (!vRows.length) {
        return res.status(400).json({ message: "Voucher không tồn tại hoặc đã hết hạn." });
      }

      // Đã bỏ chặn: Cho phép admin tặng nhiều voucher cùng loại cho user.

      // Sinh ma_serial độc nhất cho lượt cấp này
      const ma_serial = generateSerial(manguoidung);

      await db.query(
        "INSERT INTO voucher_nguoidung (mavoucher, manguoidung, ma_serial, ngaytang) VALUES (?, ?, ?, NOW())",
        [mavoucher, manguoidung, ma_serial]
      );

      res.json({
        message: `Đã tặng voucher cho người dùng #${manguoidung} thành công.`,
        ma_serial
      });
    } catch (error) {
      res.status(500).json({ message: "Không thể cấp voucher.", error: error.message });
    }
  },

  // Lấy tất cả voucher (admin)
  async getAllVouchers(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM voucher ORDER BY ngaybatdau DESC");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Lỗi.", error: error.message });
    }
  },

  // Lấy tất cả lịch sử tặng voucher (admin)
  async getGrantHistory(req, res) {
    try {
      const [rows] = await db.query(
        `SELECT vn.*, v.macode, v.ten, v.giatri, nd.hoten, nd.sodienthoai
         FROM voucher_nguoidung vn
         JOIN voucher v ON v.mavoucher = vn.mavoucher
         JOIN nguoidung nd ON nd.manguoidung = vn.manguoidung
         ORDER BY vn.ngaytang DESC`
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Lỗi.", error: error.message });
    }
  },

  // Kiểm tra và tự động tặng voucher dựa trên chi tiêu tháng
  async checkAndGrantAutoVoucher(manguoidung) {
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const [result] = await db.query(
        `SELECT SUM(tongtien) as tongthi
         FROM donhang
         WHERE manguoidung = ? AND trangthaidonhang IN ('choxacnhan', 'cholayhang', 'chogiaohhang', 'hoanthanh')
         AND ngaydat >= ?`,
        [manguoidung, startOfMonth]
      );

      const tongThiTrongThang = Number(result[0]?.tongthi || 0);
      let mavoucher = null;

      if (tongThiTrongThang >= 5000000) {
        const [v] = await db.query(
          "SELECT mavoucher FROM voucher WHERE macode = 'HONGXINH1M' AND trangthai = 'hoatdong'"
        );
        if (v.length) mavoucher = v[0].mavoucher;
      } else if (tongThiTrongThang >= 2000000) {
        const [v] = await db.query(
          "SELECT mavoucher FROM voucher WHERE macode = 'HONGXINH500K' AND trangthai = 'hoatdong'"
        );
        if (v.length) mavoucher = v[0].mavoucher;
      }

      if (mavoucher) {
        // Mỗi lần đạt mốc cấp 1 voucher mới với ma_serial riêng biệt
        // (không chặn trùng mavoucher nữa - mỗi lần cấp là 1 serial độc nhất)
        const ma_serial = generateSerial(manguoidung);
        await db.query(
          "INSERT INTO voucher_nguoidung (mavoucher, manguoidung, ma_serial, ngaytang) VALUES (?, ?, ?, NOW())",
          [mavoucher, manguoidung, ma_serial]
        );
        console.log(`[Voucher] Tặng voucher #${mavoucher} cho user #${manguoidung}, serial: ${ma_serial}`);
      }
    } catch (error) {
      console.error('[Voucher] Lỗi kiểm tra voucher:', error.message);
    }
  }
};

module.exports = VoucherController;
