export const en = {
  // Navigation
  nav: {
    menuLabel: 'Open menu',
  },

  // Hero
  hero: {
    badge: 'Full-Stack Developer',
    title: 'Frontend, backend, server infrastructure —\nbuilt with any tech stack you need.',
    subtitle: 'A developer who designs and implements operational, maintainable systems.',
    cta1: 'Inquire About a Project',
    cta2: 'View Work Portfolio',
  },

  // Footer
  footer: {
    desc: 'Building complete solutions from frontend to infrastructure.',
    pageTitle: 'Pages',
    linkTitle: 'Quick Links',
    contact: 'Contact',
    foodtruck: 'Food Truck Platform',
    utils: 'Web Utilities',
    copyright: 'BD. All rights reserved.',
  },

  // HomePage
  home: {
    serviceTitle: 'Services',
    serviceDesc: 'We tailor development scope to match your project scale',
    tiers: [
      {
        name: 'Basic',
        range: '$100 - $500',
        summary: 'Landing pages, corporate websites, maintenance',
      },
      {
        name: 'Standard',
        range: '$500 - $1,500',
        summary: 'Corporate portals, booking/inquiry systems, server deployment',
      },
      {
        name: 'Advanced',
        range: '$1,500 - $3,000+',
        summary: 'E-commerce platforms, payment systems, infrastructure setup',
      },
    ],
    serviceMore: 'View Detailed Services →',
    caseLabel: 'Platform Case',
    caseTitle: 'Experience building e-commerce\nplatforms with admin and payment systems',
    caseDesc: 'Designed and implemented the complete workflow from product management to payments, orders, and server operations.',
    caseMore: 'View Case Study →',
    midCta: 'Feel free to inquire about any project scope',
    midCtaBtn: 'Inquire Now',
  },

  // ServicesPage
  services: {
    pageLabel: 'Services',
    title: 'Service Overview',
    desc: 'We structure the scope based on your project size and goals.\nPricing is flexible and negotiable based on requirements.',
    badge: 'Platform Development',
    techOpen: 'View Technology Details ▼',
    techClose: 'Hide Technology Details ▲',
    cta: 'Inquire',
    midCta: 'We can discuss both scope and pricing without obligation',
    midCtaBtn: 'Free Quote Request',
    tiers: [
      {
        name: 'Basic',
        range: '$100 - $500',
        items: [
          'Landing pages / corporate websites',
          'Cafe24 · Godaddy mall maintenance',
          'Feature additions to existing sites',
          'UI improvements and responsive design',
        ],
      },
      {
        name: 'Standard',
        range: '$500 - $1,500',
        items: [
          'Corporate website development',
          'Booking · inquiry system implementation',
          'Basic admin dashboard setup',
          'Server deployment and domain configuration',
        ],
      },
      {
        name: 'Advanced',
        range: '$1,500 - $3,000+',
        items: [
          'Full e-commerce platform development',
          'Payment system integration',
          'Product · order management system',
          'Admin dashboard development',
          'Server infrastructure setup and operations',
          'Automated deployment pipeline',
          'Maintenance contract available',
        ],
      },
    ],
  },

  // ProcessPage
  process: {
    pageLabel: 'Process',
    title: 'Development Process',
    desc: 'From requirements analysis to operations and maintenance.\nWe share and document each stage clearly.',
    steps: [
      {
        step: '01',
        title: 'Requirements Analysis',
        desc: 'We define project goals, required features, and budget together. Clear scope definition prevents unnecessary additional costs.',
      },
      {
        step: '02',
        title: 'Design',
        desc: 'Database structure and API design first. We confirm user flows and data structure before beginning development.',
      },
      {
        step: '03',
        title: 'Development',
        desc: 'Frontend and backend developed in parallel. We conduct interim reviews as major features are completed.',
      },
      {
        step: '04',
        title: 'Testing',
        desc: 'We verify functionality and mobile responsiveness. Identified issues are fixed immediately.',
      },
      {
        step: '05',
        title: 'Deployment',
        desc: 'We set up the server environment and complete domain/SSL configuration. Jenkins CI/CD pipeline is built if needed.',
      },
      {
        step: '06',
        title: 'Operations & Maintenance',
        desc: 'We handle bug fixes and feature improvements during operations. Ongoing management is available through maintenance contracts.',
      },
    ],
    midCta: 'Want to start your project with this process?',
    midCtaBtn: 'Get in Touch',
  },

  // ContactPage
  contact: {
    pageLabel: 'Contact',
    title: 'Project Inquiry',
    desc: 'Send us a brief summary of your requirements and we\'ll review and respond quickly.\nFeel free to discuss pricing and scope without obligation.',
  },

  // ContactForm
  form: {
    labels: {
      name: 'Name',
      contact: 'Contact',
      type: 'Project Type',
      budget: 'Budget Range',
      description: 'Brief Description',
    },
    placeholders: {
      name: 'John Doe',
      contact: '+1-234-567-8900 or email',
      description: 'Briefly describe the features you want to implement or reference sites',
    },
    selectDefault: 'Please select',
    projectTypes: [
      'Landing page / Corporate site',
      'Corporate website',
      'E-commerce / Sales platform',
      'Admin system',
      'Maintenance / Feature additions',
      'Other',
    ],
    budgetRanges: [
      '$100 - $500',
      '$500 - $1,500',
      '$1,500 - $3,000+',
      'Negotiable',
    ],
    submit: 'Send Inquiry',
    submitting: 'Sending...',
    successMessage: 'Inquiry sent successfully. We\'ll review and respond quickly.',
    errorMessage: 'Failed to send. Please try again.',
    errorNetworkMessage: 'An error occurred during sending. Please try again.',
  },

  // MobileFixedCTA
  mobileCta: {
    button: 'Inquire About Project',
  },

  // PlatformCasePage
  platformCase: {
    pageLabel: 'Platform Case',
    title: 'Work Portfolio',
    desc: 'Case studies of projects we designed and operated end-to-end.\nSelect a tab to view detailed information about each project.',
    tabs: [
      { id: 'foodtruck', label: 'Food Truck' },
      { id: 'utils', label: 'Web Utilities' },
      { id: 'corporate', label: 'Corporate Site' },
      { id: 'cafe24', label: 'Cafe24 Shop' },
      { id: 'compass', label: 'GPS Compass' },
      { id: 'telequote', label: 'Telecom Forms' },
      { id: 'mockup', label: 'Mockup Site' },
      { id: 'saveridge', label: 'Smart Fridge' },
      { id: 'dreamway', label: 'DreamWay (AI)' },
    ],
    foodtruck: {
      tier: 'Advanced',
      title: 'Food Truck Marketing & Admin Platform',
      desc: 'Full-stack marketing site and admin system for food truck businesses.\nMenu, reviews, quotes management with automated blog sync.',
      urlLabel: 'Visit Live Site →',
      features: [
        { category: 'Marketing Site', items: ['Hero banner slider', 'Menu categories & set menus', 'Review & blog auto-sync'] },
        { category: 'Quote Management', items: ['Quote inquiry form', 'Status management', 'Admin memo'] },
        { category: 'Admin System', items: ['Banner/Menu/Review CRUD', 'Site settings', 'Dashboard overview'] },
        { category: 'Automation', items: ['Naver blog crawling sync', 'Auto image resize', 'Daily cron trigger'] },
      ],
      opsTitle: 'Operations Structure',
      ops: [
        { title: 'Separated Frontend & Backend', body: 'React frontend (Cloudflare Pages) and Hono API (Cloudflare Workers) operate independently.' },
        { title: 'Serverless Infrastructure', body: 'Cloudflare Workers + D1 (SQLite) + R2 (storage) — no server management needed.' },
        { title: 'Auto Deployment', body: 'GitHub push triggers automatic build and deploy via Cloudflare Pages.' },
      ],
      techTitle: 'Technology Stack',
      techNote: 'Reference for technical validation',
      tech: [
        { label: 'Frontend', value: 'React + Vite' },
        { label: 'Backend', value: 'Hono (Cloudflare Workers)' },
        { label: 'Database', value: 'Cloudflare D1 (SQLite)' },
        { label: 'Storage', value: 'Cloudflare R2' },
        { label: 'Deploy', value: 'Cloudflare Pages + Workers' },
        { label: 'Etc', value: 'TipTap Editor, Puppeteer' },
      ],
    },
    otherProjects: {
      utils: {
        tier: 'Basic ~ Standard',
        desc: 'Browser-based utilities for office efficiency. All processing runs safely on the client without server involvement.',
        features: [
          'PDF merge / split',
          'CSV ↔ JSON conversion',
          'D-Day and date calculations',
          'SQL → CSV conversion',
          'Image format conversion',
          'Batch file renaming',
        ],
        stack: ['Next.js', 'React', 'TypeScript'],
        deploy: 'Cloudflare Pages',
        urlLabel: 'Visit Utilities Site →',
      },
      corporate: {
        tier: 'Basic ~ Standard',
        desc: 'Interior design company website template. Features image carousel, service descriptions, inquiry form, and responsive layout.',
        features: [
          'Image carousel (Hero)',
          'Service detail pages',
          'Company info and team',
          'Inquiry form',
          'Mobile responsive',
          'Oracle Cloud deployment',
        ],
        stack: ['Next.js', 'TypeScript', 'CSS Modules'],
        deploy: 'Cloudflare Pages',
        urlLabel: 'Visit Corporate Site →',
      },
      cafe24: {
        tier: 'Basic',
        desc: 'Cafe24 shopping mall skin design modification and maintenance. UI improvements and custom features while preserving existing structure.',
        features: ['Full skin design modification', 'UI improvements', 'Custom feature additions', 'Mobile responsive', 'SFTP auto-deploy'],
        stack: ['HTML', 'CSS', 'JavaScript', 'Cafe24', 'jQuery', 'Swiper.js'],
        deploy: 'Cafe24 Hosting',
        urlLabel: 'SerasRoom · Balandog · LATIO',
      },
      compass: {
        tier: 'Standard',
        desc: 'Browser-based compass that guides destinations using real-time GPS and device orientation sensors. MVP prototype with retro terminal UI and audio feedback.',
        features: [
          'Real-time GPS location tracking',
          'Device orientation sensor integration',
          'Real-time destination direction and distance calculation',
          'Arrival detection (within 50m)',
          'Brown noise audio feedback',
          'SVG compass and level UI',
        ],
        stack: ['Next.js', 'TypeScript', 'Geolocation API', 'DeviceOrientation API', 'Web Audio API'],
        deploy: 'Cloudflare Pages',
        urlLabel: 'Visit GPS Compass →',
      },
      telequote: {
        tier: 'Standard',
        desc: 'Online telecom application form service. Supports all carriers including SKT, KT, LG U+, and MVNOs.',
        features: ['All carrier form templates', 'Dynamic PDF generation', 'Form version management', 'Admin dashboard', 'Inquiry management'],
        stack: ['Next.js', 'TypeScript', 'pdf-lib', 'Cloudflare Workers', 'D1', 'R2'],
        deploy: 'Cloudflare Pages + Workers',
        urlLabel: 'Visit Site',
      },
      mockup: {
        tier: 'Standard',
        desc: 'AI-based mockup demo site built for client requirements. Interactive prototype with Google GenAI and chart visualization.',
        features: ['AI data analysis demo', 'Interactive chart visualization', 'Responsive layout', 'Motion animation'],
        stack: ['React', 'Vite', 'Google GenAI', 'Recharts', 'Tailwind CSS'],
        deploy: 'Client delivery',
        urlLabel: 'Delivered',
      },
      saveridge: {
        tier: 'Basic ~ Standard',
        desc: 'Desktop app tracking fridge ingredient expiry dates and recommending recipes. Visualizes food waste costs for motivation.',
        features: ['Expiry D-Day management', 'Color-coded status', 'Recipe recommendations (500+)', 'Waste cost tracking', 'Wishlist comparison'],
        stack: ['Python', 'Flask', 'PyInstaller', 'pywebview'],
        deploy: 'Desktop app (.exe)',
        urlLabel: 'Delivered',
      },
      dreamway: {
        tier: 'Advanced',
        desc: 'Mobile app for dream journaling with AI interpretation. Combines 3,000 traditional keywords with AI analysis and DreamBTI psychology system.',
        features: ['Dream recording + AI interpretation', 'Traditional dream DB (3,000 keywords)', 'DreamBTI 6-axis psychology (8 types)', 'In-app purchase (ticket system)', 'AdMob reward ads', 'Push notifications (FCM)'],
        stack: ['React Native (Expo)', 'Spring Boot', 'Oracle DB', 'Redis', 'Claude API'],
        deploy: 'Google Play / App Store',
        urlLabel: 'App Landing Page',
      },
    },
    midCta: 'Need a similar project?',
    midCtaBtn: 'Get in Touch',
    mainFeatures: 'Implemented Features',
    mainFeatures2: 'Key Features',
    mainTech: 'Technology Stack',
    mainDeploy: 'Deployment',
  },
} as const;
