const Product = require('../models/product.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');

// GET /api/products  — public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ published: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: products });
});

// GET /api/admin/products  — all
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: products });
});

// POST /api/admin/products
const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, data: product });
});

// PUT /api/admin/products/:id
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true,
    });
    if (!product) throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
    res.json({ success: true, data: product });
});

// DELETE /api/admin/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
    res.json({ success: true, message: 'Product deleted' });
});

module.exports = { getProducts, getAllProducts, createProduct, updateProduct, deleteProduct };
