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
    photocard: 'Photocard Platform',
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
      { id: 'photocard', label: 'Photocard Platform' },
      { id: 'utils', label: 'Web Utilities' },
      { id: 'corporate', label: 'Corporate Website' },
      { id: 'cafe24', label: 'Cafe24 Maintenance' },
      { id: 'compass', label: 'GPS Compass' },
      { id: 'worldcup', label: 'K-Pop Ranking Game' },
    ],
    photocard: {
      tier: 'Advanced · $1,500 - $3,000+',
      title: 'Photocard Sales Platform',
      desc: 'Backend-focused development, not just UI.\nDesigned and implemented the complete workflow from product management through payments, orders, and server operations.',
      urlLabel: 'Visit Live Site →',
      features: [
        {
          category: 'Product Management',
          items: ['Product CRUD operations', 'Image upload and management', 'Category classification'],
        },
        {
          category: 'Order Management',
          items: ['Order history and status updates', 'Shipping process workflow', 'Customer order tracking'],
        },
        {
          category: 'Payment System',
          items: ['Payment gateway integration', 'Order processing after payment', 'Refund workflow'],
        },
        {
          category: 'Admin Dashboard',
          items: ['Unified product and order management', 'Separate admin accounts', 'Sales overview'],
        },
      ],
      opsTitle: 'Operations Structure',
      ops: [
        {
          title: 'Separated Frontend & Backend Operations',
          body: 'Next.js frontend and REST API server operate independently for maintainability.',
        },
        {
          title: 'Direct Server Management',
          body: 'We directly manage Nginx configuration, domain connectivity, and SSL certificates on Oracle Cloud instances.',
        },
        {
          title: 'Automated Deployment Pipeline',
          body: 'Jenkins enables automatic build and deployment on code push, creating a complete CI/CD pipeline.',
        },
      ],
      techTitle: 'Technology Stack',
      techNote: 'Reference for technical validation if needed',
      tech: [
        { label: 'Frontend', value: 'Next.js (React)' },
        { label: 'Backend', value: 'Spring Boot (REST API)' },
        { label: 'Database', value: 'MySQL' },
        { label: 'Infra', value: 'Oracle Cloud Infrastructure' },
        { label: 'Server', value: 'Nginx (Reverse Proxy + SSL)' },
        { label: 'CI/CD', value: 'Jenkins' },
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
        desc: 'Maintenance and feature additions for an active Cafe24 mall. We maintained the existing structure while carefully improving specific areas.',
        features: [
          'Existing layout preservation',
          'UI improvements and retouching',
          'Custom feature additions',
          'Mobile responsiveness improvements',
        ],
        stack: ['HTML', 'CSS', 'JavaScript', 'Cafe24'],
        deploy: 'Cafe24 Hosting',
        urlLabel: 'Visit Shopping Mall →',
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
      worldcup: {
        tier: 'Basic ~ Standard',
        desc: 'K-Pop idol ranking game static website. Supports 7 categories and auto-detects 11 languages for global reach.',
        features: [
          'Tournament-style 1v1 matchups',
          '7 categories',
          'Auto-detection of 11 languages (KO/EN/JA/DE/FR/PT/ES/ID/TH/VI/ZH)',
          'Results and rankings display',
          'OG meta tags for social sharing',
          'Ad monetization ready',
        ],
        stack: ['HTML', 'CSS', 'JavaScript', 'i18n (11 languages)'],
        deploy: 'Cloudflare Pages',
        urlLabel: 'Play K-Pop Game →',
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
