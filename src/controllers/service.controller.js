const Service = require('../models/service.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');

// GET /api/services  — public
const getServices = asyncHandler(async (req, res) => {
    const services = await Service.find({ published: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: services });
});

// GET /api/admin/services  — all (including unpublished)
const getAllServices = asyncHandler(async (req, res) => {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: services });
});

// POST /api/admin/services
const createService = asyncHandler(async (req, res) => {
    const service = await Service.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, data: service });
});

// PUT /api/admin/services/:id
const updateService = asyncHandler(async (req, res) => {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true,
    });
    if (!service) throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
    res.json({ success: true, data: service });
});

// DELETE /api/admin/services/:id
const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
    res.json({ success: true, message: 'Service deleted' });
});

module.exports = { getServices, getAllServices, createService, updateService, deleteService };
