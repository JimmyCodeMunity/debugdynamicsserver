const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const generateToken = (userId) =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });

// POST /api/auth/signup
const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Please provide username, email and password');

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing)
        throw new ApiError(StatusCodes.CONFLICT,
            existing.email === email ? 'Email already registered' : 'Username taken');

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);
    user.password = undefined;

    res.status(StatusCodes.CREATED).json({ success: true, data: { user, token } });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email and password are required');

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password)))
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');

    const token = generateToken(user._id);
    user.password = undefined;

    res.json({ success: true, data: { user, token } });
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
    res.json({ success: true, data: req.user });
});

module.exports = { signup, login, getMe };
