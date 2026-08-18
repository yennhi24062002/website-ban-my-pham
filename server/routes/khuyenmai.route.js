const express = require('express');
const router = express.Router();
const KhuyenMaiController = require('../controller/khuyenmai.controller');

router.get('/', KhuyenMaiController.getAll);
router.post('/', KhuyenMaiController.create);
router.delete('/:id', KhuyenMaiController.delete);

module.exports = router;
