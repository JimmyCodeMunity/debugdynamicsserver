/**
 * Seed script — Debug Dynamics services & products
 * Run: node src/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/service.model');
const Product = require('./models/product.model');

const services = [
    {
        title: 'Custom Software Development',
        slug: 'custom-software-development',
        shortDesc: 'Scalable, purpose-built software systems for your business.',
        description: 'By combining innovation, reliability, and deep technical expertise, we deliver software systems that drive efficiency, scale effortlessly, and produce measurable business impact. Our approach is simple and proven — we understand your business, design the right solution, build with precision, and provide continuous support to ensure every system achieves long-term success.',
        icon: 'Code2',
        color: '#1bbde4',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        category: 'software',
        order: 1,
        published: true,
        features: [
            'Business analysis & requirements gathering',
            'Web application development',
            'ERP & CRM systems',
            'API design and integrations',
            'Quality assurance & testing',
            'Ongoing maintenance & support',
        ],
    },
    {
        title: 'Cloud Infrastructure Setup',
        slug: 'cloud-infrastructure-setup',
        shortDesc: 'Robust, future-proof cloud systems built for scale.',
        description: 'Through strategic partnerships with top-tier cloud providers and a dependable reseller network, we deliver robust, future-proof systems you can trust. Our commitment goes beyond deployment — we ensure seamless execution, continuous support, and measurable business impact for every client.',
        icon: 'Cloud',
        color: '#a78bfa',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
        category: 'cloud',
        order: 2,
        published: true,
        features: [
            'AWS, GCP & Azure deployment',
            'CI/CD pipeline setup',
            'Auto-scaling & load balancing',
            'Database optimization',
            '24/7 infrastructure monitoring',
            'Disaster recovery planning',
        ],
    },
    {
        title: 'AI-Powered Workflow Automation',
        slug: 'ai-workflow-automation',
        shortDesc: 'Intelligent automation that drives efficiency and growth.',
        description: 'We transform businesses through AI-powered automation that drives efficiency, accuracy, and scalability. We design intelligent systems that streamline operations, enhance customer experiences, and deliver actionable insights — ensuring you stay ahead in a rapidly evolving digital landscape.',
        icon: 'BrainCircuit',
        color: '#34d399',
        image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
        category: 'ai',
        order: 3,
        published: true,
        features: [
            'Process automation & RPA',
            'AI chatbots & virtual assistants',
            'Predictive analytics & reporting',
            'Machine learning model integration',
            'Document processing automation',
            'Custom AI workflow design',
        ],
    },
    {
        title: 'Web Development',
        slug: 'web-development',
        shortDesc: 'Fast, beautiful, conversion-optimised web applications.',
        description: 'We craft high-performance, visually stunning web applications using modern frameworks. From landing pages to complex enterprise portals, every pixel is crafted for impact, speed, and accessibility — optimised for Core Web Vitals and search engines.',
        icon: 'Monitor',
        color: '#f59e0b',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
        category: 'web',
        order: 4,
        published: true,
        features: [
            'React, Next.js & Vue.js development',
            'Progressive Web Apps (PWA)',
            'E-commerce platforms',
            'Admin dashboards & portals',
            'SEO optimization',
            'Performance & Core Web Vitals',
        ],
    },
    {
        title: 'Mobile App Development',
        slug: 'mobile-app-development',
        shortDesc: 'Native & cross-platform apps with M-Pesa built-in.',
        description: 'We build native and cross-platform mobile applications that deliver seamless user experiences on both iOS and Android. Fully integrated with M-Pesa and local payment gateways, our mobile apps are built for the Kenyan market and beyond.',
        icon: 'Smartphone',
        color: '#fb7185',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        category: 'mobile',
        order: 5,
        published: true,
        features: [
            'Native iOS & Android development',
            'React Native & Flutter',
            'M-Pesa & mobile payments',
            'Offline-first architecture',
            'Push notifications',
            'App Store & Play Store deployment',
        ],
    },
    {
        title: 'Database Design & Optimization',
        slug: 'database-design-optimization',
        shortDesc: 'Performant, secure data architecture for any scale.',
        description: 'Solid data architecture is the backbone of every great system. We design, migrate, and optimize databases for performance, scalability, and security — whether relational or NoSQL — ensuring your data is always safe, fast, and accessible.',
        icon: 'Database',
        color: '#60a5fa',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        category: 'database',
        order: 6,
        published: true,
        features: [
            'Database architecture design',
            'MySQL, PostgreSQL & MongoDB',
            'Performance tuning & indexing',
            'Data migration services',
            'Backup & recovery strategies',
            'Real-time data pipelines',
        ],
    },
];

const products = [
    {
        name: 'Staff360',
        slug: 'staff360',
        tagline: 'Smart HR & Payroll Management Platform',
        badge: 'HR & Payroll',
        color: '#1bbde4',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
        description: 'Staff360 is an intelligent HR and payroll management platform designed to simplify and automate your entire workforce operations. From accurate salary processing to automated statutory deductions including PAYE, SHA, NSSF, and Housing Levy, Staff360 ensures compliance while saving time, reducing errors, and improving efficiency.',
        audience: 'SMEs · NGOs · Schools · Healthcare · Manufacturing',
        order: 1,
        published: true,
        features: [
            'Smart payroll with automated statutory calculations (PAYE, SHA, NSSF, Housing Levy)',
            'Centralized employee records and digital staff files',
            'Leave and shift management for dynamic work environments',
            'Real-time attendance tracking with insightful reports',
            'Multi-branch payroll management',
            'Automated payslip generation and email delivery',
            'Employee self-service portal',
            'Audit trail and compliance reporting',
        ],
        metrics: [
            { value: '80%', label: 'Time saved on payroll' },
            { value: '100%', label: 'Statutory compliance' },
            { value: '50+', label: 'Companies using Staff360' },
        ],
    },
    {
        name: 'DD POS',
        slug: 'dd-pos',
        tagline: 'All-in-One Cloud Hospitality POS System',
        badge: 'Hospitality',
        color: '#a78bfa',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
        description: 'DD POS is a powerful all-in-one, cloud-based SaaS point-of-sale system built for the hotel, bookings, tours, and hospitality industry. Designed to streamline operations across restaurants, front office, and service areas with real-time reporting.',
        audience: 'Hotels · Restaurants · Bars · Tour Operators · Event Venues',
        order: 2,
        published: true,
        features: [
            'Fast and intuitive POS interface for waitstaff and service teams',
            'Kitchen Order Ticket (KOT) system for real-time order processing',
            'Booking and reservation management for rooms, events, and services',
            'Inventory and stock management with low-stock alerts',
            'Integrated sales, finance, and performance reporting',
            'Table management and floor plan view',
            'Multi-outlet and multi-currency support',
            'Customer loyalty and discount management',
        ],
        metrics: [
            { value: '3x', label: 'Faster order processing' },
            { value: '99.9%', label: 'System uptime' },
            { value: '30+', label: 'Hospitality clients' },
        ],
    },
    {
        name: 'MFI Pro',
        slug: 'mfi-pro',
        tagline: 'Comprehensive Microfinance & SACCO ERP',
        badge: 'Fintech / MFI',
        color: '#34d399',
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=900&q=80',
        description: 'MFI PRO is a comprehensive cloud-based ERP designed for Microfinance Institutions, SACCOs, Chamas, Merry-Go-Rounds, and private lenders. Full M-Pesa and bank integration for seamless collections and disbursements.',
        audience: 'SACCOs · MFIs · Chamas · Table Banking · Private Lenders',
        order: 3,
        published: true,
        features: [
            'Member management with digital profiles and self-service portals',
            'Credit management with internal scoring and loan risk analysis',
            'Loan processing, tracking, and automated repayment management',
            'Integrated M-Pesa (C2B & B2C) and bank payment gateways',
            'Financial, statutory, and regulatory reporting',
            'Chama and table banking group management',
            'SMS and email automated notifications',
            'Field officer mobile app for loan disbursement',
        ],
        metrics: [
            { value: '95%', label: 'Loan repayment rate' },
            { value: '< 2min', label: 'Disbursement time' },
            { value: '20+', label: 'Financial institutions' },
        ],
    },
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✔ Connected to MongoDB');

    // Clear existing
    await Service.deleteMany({});
    await Product.deleteMany({});
    console.log('✔ Cleared existing services & products');

    // Insert
    await Service.insertMany(services);
    console.log(`✔ Seeded ${services.length} services`);

    await Product.insertMany(products);
    console.log(`✔ Seeded ${products.length} products`);

    await mongoose.disconnect();
    console.log('✔ Done — disconnected from MongoDB');
    process.exit(0);
}

seed().catch(err => {
    console.error('✘ Seed failed:', err.message);
    process.exit(1);
});
