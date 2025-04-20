const express = require('express');
const router = express.Router();
const upload = require('../middleware/MulterConfig');
const authMiddleware = require('../middleware/Jwt');

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/ProductController');


router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', authMiddleware, upload.single('image'), createProduct);
router.put('/:id', authMiddleware, upload.single('image'), updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
