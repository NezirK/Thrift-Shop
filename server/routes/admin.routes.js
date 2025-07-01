const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const { getAllUsers, deleteUser } = require('../controllers/admin.controller');
const { getAllProducts, deleteProduct } = require('../controllers/product.controller');

// Rrugët admin (vetëm admin me middleware protect + adminMiddleware)
router.use(protect, adminMiddleware);

// Merr të gjithë user-at
router.get('/users', getAllUsers);

// Fshi user me id
router.delete('/users/:id', deleteUser);

// Merr të gjithë produktet
router.get('/products', getAllProducts);

// Fshi produkt me id
router.delete('/products/:id', deleteProduct);

module.exports = router;
