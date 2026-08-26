const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, trim: true },
        company: { type: String, trim: true },
        service: { type: String, trim: true },
        budget: { type: String, trim: true },
        description: { type: String },
        source: {
            type: String,
            enum: ['contact_form', 'stepper_modal', 'direct', 'referral', 'social'],
            default: 'contact_form',
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'],
            default: 'new',
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        notes: { type: String },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
