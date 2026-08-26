const Lead = require('../models/lead.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');

// GET /api/admin/leads
const getLeads = asyncHandler(async (req, res) => {
    const leads = await Lead.find().sort({ createdAt: -1 }).populate('assignedTo', 'username email');
    // Group by status for kanban
    const kanban = {
        new: leads.filter(l => l.status === 'new'),
        contacted: leads.filter(l => l.status === 'contacted'),
        qualified: leads.filter(l => l.status === 'qualified'),
        proposal: leads.filter(l => l.status === 'proposal'),
        won: leads.filter(l => l.status === 'won'),
        lost: leads.filter(l => l.status === 'lost'),
    };
    res.json({ success: true, data: leads, kanban });
});

// POST /api/admin/leads
const createLead = asyncHandler(async (req, res) => {
    const lead = await Lead.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, data: lead });
});

// PATCH /api/admin/leads/:id
const updateLead = asyncHandler(async (req, res) => {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true,
    });
    if (!lead) throw new ApiError(StatusCodes.NOT_FOUND, 'Lead not found');
    res.json({ success: true, data: lead });
});

// DELETE /api/admin/leads/:id
const deleteLead = asyncHandler(async (req, res) => {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) throw new ApiError(StatusCodes.NOT_FOUND, 'Lead not found');
    res.json({ success: true, message: 'Lead deleted' });
});

module.exports = { getLeads, createLead, updateLead, deleteLead };
