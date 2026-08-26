const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

// Auth
const { signup, login, getMe } = require('../controllers/auth.controller');
router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.get('/auth/me', protect, getMe);

// Public — contact form & inquiry
const { submitContact, submitInquiry } = require('../controllers/contact.controller');
router.post('/contact', submitContact);
router.post('/contact/inquiry', submitInquiry);

// Public — services & products (for frontend display)
const { getServices } = require('../controllers/service.controller');
const { getProducts } = require('../controllers/product.controller');
router.get('/services', getServices);
router.get('/products', getProducts);

// ── Admin routes (all protected) ────────────────────────────────────────────
const {
    getContacts, updateContactStatus, deleteContact,
} = require('../controllers/contact.controller');

const {
    getLeads, createLead, updateLead, deleteLead,
} = require('../controllers/lead.controller');

const {
    getAllServices, createService, updateService, deleteService,
} = require('../controllers/service.controller');

const {
    getAllProducts, createProduct, updateProduct, deleteProduct,
} = require('../controllers/product.controller');

const { getStats } = require('../controllers/dashboard.controller');

// Dashboard stats
router.get('/admin/dashboard/stats', protect, getStats);

// Contacts
router.get('/admin/contacts', protect, getContacts);
router.patch('/admin/contacts/:id', protect, updateContactStatus);
router.delete('/admin/contacts/:id', protect, deleteContact);

// Leads (Kanban)
router.get('/admin/leads', protect, getLeads);
router.post('/admin/leads', protect, createLead);
router.patch('/admin/leads/:id', protect, updateLead);
router.delete('/admin/leads/:id', protect, deleteLead);

// Services
router.get('/admin/services', protect, getAllServices);
router.post('/admin/services', protect, createService);
router.put('/admin/services/:id', protect, updateService);
router.delete('/admin/services/:id', protect, deleteService);

// Products
router.get('/admin/products', protect, getAllProducts);
router.post('/admin/products', protect, createProduct);
router.put('/admin/products/:id', protect, updateProduct);
router.delete('/admin/products/:id', protect, deleteProduct);

// Health
router.get('/health', (req, res) => res.json({ success: true, message: 'API is healthy' }));

module.exports = router;
