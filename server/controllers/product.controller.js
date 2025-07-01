const Product = require('../models/Product');

// ✅ Krijo një produkt të ri
const createProduct = async (req, res) => {
  try {
    const { name, price, size, gender, quality } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = await Product.create({
      name,
      price,
      size,
      gender,
      quality,
      image,
      owner: req.user.id
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Merr të gjithë produktet (me owner)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('owner', '_id email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Merr produktet sipas gjinisë
const getByGender = async (req, res) => {
  try {
    const gender = req.params.gender;
    const products = await Product.find({ gender }).populate('owner', '_id email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Fshi produkt – vetëm owner ose admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Edito produkt – vetëm nga owner
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this product' });
    }

    const { name, price, size, gender, quality } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateFields = { name, price, size, gender, quality };
    if (image) updateFields.image = image;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getByGender,
  deleteProduct,
  updateProduct
};
