const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        error = new ApiError(404, 'Resource not found');
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        error = new ApiError(400, 'Duplicate field value entered');
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ApiError(400, message);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
    });
};

module.exports = errorHandler;