const Contact = require('../models/contact.model');
const Lead = require('../models/lead.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');

// POST /api/contact  — public
const submitContact = asyncHandler(async (req, res) => {
    const { name, email, phone, company, service, budget, message } = req.body;

    if (!name || !email || !message)
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Name, email and message are required');

    // Save contact
    const contact = await Contact.create({ name, email, phone, company, service, budget, message });

    // Also create a lead automatically
    await Lead.create({
        name, email, phone, company,
        service, budget,
        description: message,
        source: 'contact_form',
        status: 'new',
        priority: 'medium',
    });

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Message received! We will get back to you within 24 hours.',
        data: contact,
    });
});

// POST /api/contact/inquiry  — stepper modal
const submitInquiry = asyncHandler(async (req, res) => {
    const { name, email, phone, company, service, budget, description, timeline } = req.body;

    if (!name || !email)
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Name and email are required');

    const contact = await Contact.create({
        name, email, phone, company, service, budget,
        message: description || 'Submitted via inquiry form',
    });

    await Lead.create({
        name, email, phone, company, service, budget,
        description,
        source: 'stepper_modal',
        status: 'new',
        priority: budget?.includes('1m') ? 'high' : 'medium',
    });

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Thanks! We'll be in touch soon.",
        data: contact,
    });
});

// GET /api/admin/contacts  — protected
const getContacts = asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const contacts = await Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
    const total = await Contact.countDocuments(filter);
    res.json({ success: true, data: contacts, total, page: Number(page) });
});

// PATCH /api/admin/contacts/:id  — protected
const updateContactStatus = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true, runValidators: true }
    );
    if (!contact) throw new ApiError(StatusCodes.NOT_FOUND, 'Contact not found');
    res.json({ success: true, data: contact });
});

// DELETE /api/admin/contacts/:id  — protected
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) throw new ApiError(StatusCodes.NOT_FOUND, 'Contact not found');
    res.json({ success: true, message: 'Contact deleted' });
});

module.exports = { submitContact, submitInquiry, getContacts, updateContactStatus, deleteContact };
