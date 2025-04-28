const Product = require('../models/ProductModel');
const { processImage } = require('../middleware/ImageProcessor')
const path = require('path');

const createProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded!" });
  }

  try {
    // Generate paths for original and optimized images
    const originalImagePath = req.file.path;
    const optimizedImagePath = path.join(__dirname, '../middleware/uploads', `${Date.now()}-optimized.webp`);

    // Process the image (resize and convert)
    await processImage(originalImagePath, optimizedImagePath);

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      image: optimizedImagePath,  // Save the path to the optimized image
      createdBy: req.user.id 
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ message: error.message });
  }
};




const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const formattedProducts = products.map(product => {
      let formattedImage = null;
      if (product.image) {
        formattedImage = product.image;
      }

      return {
        ...product.toObject(),
        image: formattedImage
      };
    });

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const formattedProduct = {
      ...product.toObject(),
      image: `data:image/jpeg;base64,${product.image.toString('base64')}`
    };

    res.status(200).json(formattedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
};
