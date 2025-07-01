const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const protect = require('../middleware/authMiddleware');

const {
  createProduct,
  getAllProducts,
  getByGender,
  deleteProduct,
  updateProduct
} = require('../controllers/product.controller');

// Krijo një produkt
router.post('/', protect, upload.single('image'), createProduct);

// Merr të gjithë produktet
router.get('/', getAllProducts);

// Merr produktet sipas gjinisë
router.get('/gender/:gender', getByGender);

// Fshi një produkt (vetëm owner ose admin)
router.delete('/:id', protect, deleteProduct);

// Përditëso një produkt (vetëm owner)
router.put('/:id', protect, upload.single('image'), updateProduct);

module.exports = router;
