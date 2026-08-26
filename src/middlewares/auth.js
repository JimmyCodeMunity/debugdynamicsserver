const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { StatusCodes } = require('http-status-codes');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Not authorized, no token');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'User no longer exists');
    }

    next();
});

const adminOnly = asyncHandler(async (req, res, next) => {
    if (req.user?.role !== 'admin') {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Admin access required');
    }
    next();
});

module.exports = { protect, adminOnly };
