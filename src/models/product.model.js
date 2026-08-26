const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        tagline: { type: String },
        description: { type: String, required: true },
        badge: { type: String },          // e.g. "HR & Payroll"
        color: { type: String, default: '#1bbde4' },
        image: { type: String },          // URL
        features: [{ type: String }],
        highlights: [
            {
                icon: { type: String },
                label: { type: String },
            },
        ],
        metrics: [
            {
                value: { type: String },
                label: { type: String },
            },
        ],
        audience: { type: String },
        published: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

productSchema.pre('validate', function (next) {
    if (!this.slug && this.name) {
        this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
