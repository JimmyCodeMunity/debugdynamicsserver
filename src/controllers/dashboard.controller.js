const Contact = require('../models/contact.model');
const Lead = require('../models/lead.model');
const Service = require('../models/service.model');
const Product = require('../models/product.model');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/admin/dashboard/stats
const getStats = asyncHandler(async (req, res) => {
    const [
        totalContacts,
        newContacts,
        totalLeads,
        newLeads,
        wonLeads,
        totalServices,
        totalProducts,
        recentContacts,
        recentLeads,
    ] = await Promise.all([
        Contact.countDocuments(),
        Contact.countDocuments({ status: 'new' }),
        Lead.countDocuments(),
        Lead.countDocuments({ status: 'new' }),
        Lead.countDocuments({ status: 'won' }),
        Service.countDocuments({ published: true }),
        Product.countDocuments({ published: true }),
        Contact.find().sort({ createdAt: -1 }).limit(5),
        Lead.find().sort({ createdAt: -1 }).limit(5),
    ]);

    // Leads by status breakdown
    const leadsByStatus = await Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Contacts last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const contactsThisWeek = await Contact.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    res.json({
        success: true,
        data: {
            stats: {
                totalContacts,
                newContacts,
                contactsThisWeek,
                totalLeads,
                newLeads,
                wonLeads,
                totalServices,
                totalProducts,
            },
            leadsByStatus,
            recentContacts,
            recentLeads,
        },
    });
});

module.exports = { getStats };
