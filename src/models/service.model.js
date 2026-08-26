const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        description: { type: String, required: true },
        shortDesc: { type: String },
        icon: { type: String },          // lucide icon name or emoji
        color: { type: String, default: '#1bbde4' },
        image: { type: String },          // URL
        features: [{ type: String }],
        category: {
            type: String,
            enum: ['software', 'cloud', 'ai', 'web', 'mobile', 'database', 'other'],
            default: 'software',
        },
        published: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// Auto-generate slug from title if not provided
serviceSchema.pre('validate', function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    next();
});

module.exports = mongoose.model('Service', serviceSchema);
