/**
 * TECHNOBREN — CONTENT SOURCE OF TRUTH
 *
 * Every fact below is transcribed from the existing technobren.com website.
 * Nothing here is invented. Items that were drafted (because the old site had
 * no copy for them) are flagged `drafted: true` and listed in REDESIGN-NOTES.md
 * so they can be reviewed before launch.
 */

export const site = {
  name: "TechnoBren",
  legalName: "TechnoBren Infotech Private Limited",
  shortName: "TechnoBren Infotech",
  url: "https://technobren.com",
  tagline: "Infotech Private Limited",
  description:
    "TechnoBren Infotech builds custom software, enterprise ERP, mobile apps and AI-driven systems for businesses across India, the UAE and Uganda.",
} as const;

/* ------------------------------------------------------------------ */
/* CONTACT — verified from technobren.com contact + footer             */
/* ------------------------------------------------------------------ */

export const contact = {
  primaryEmail: "info@technobren.com",
  salesEmail: "r.yadav@technobren.com",
  hrEmail: "hr@technobren.com",
  emails: [
    { label: "General & Business", email: "info@technobren.com" },
    { label: "Direct & Sales", email: "r.yadav@technobren.com" },
    { label: "Careers & HR", email: "hr@technobren.com" },
  ],
  primaryPhone: "+91 93 0536 5576",
  phones: [
    "+91 93 0536 5576",
    "+91 901 664 3264",
    "+91 700 756 6557",
    "+91 972 169 3134",
    "+91 94 0918 4115",
    "+61 (02) 8317 1138",
  ],
} as const;

export type Office = {
  city: string;
  country: string;
  flag: string;
  address: string;
  hq?: boolean;
};

export const offices: Office[] = [
  {
    city: "Jaunpur",
    country: "India",
    flag: "🇮🇳",
    address: "5th Floor, City Tower, Wazidpur, Jaunpur, Uttar Pradesh",
    hq: true,
  },
  {
    city: "Ahmedabad",
    country: "India",
    flag: "🇮🇳",
    address:
      "C-404, Radhe Heights, Near Hathijan Circle, Hathijan, Ahmedabad, Gujarat, India",
  },
  {
    city: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    address:
      "604, Westburry Office Towers, Marasi Dr, Business Bay, Dubai, UAE",
  },
  {
    city: "Uganda",
    country: "Uganda",
    flag: "🇺🇬",
    address: "499, N. Canon Drive, Suite 215, Beverly Hills CA 90210 USA",
  },
];

export const socials = [
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/technobren-infotech-ptv-ltd",
  },
  { label: "Facebook", href: "https://www.facebook.com/technobren" },
  { label: "Instagram", href: "https://www.instagram.com/technobren" },
  { label: "X", href: "https://x.com/technobren" },
];

/* ------------------------------------------------------------------ */
/* STATS — verified: about.html "Milestones"                           */
/* ------------------------------------------------------------------ */

export const stats = [
  {
    value: 90,
    suffix: "+",
    label: "Projects delivered",
    sub: "Shipped with precision and quality",
  },
  {
    value: 40,
    suffix: "+",
    label: "Clients served",
    sub: "Businesses that trust our expertise",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction rate",
    sub: "Measured across delivered engagements",
  },
  {
    value: 4,
    suffix: "",
    label: "Global offices",
    sub: "India, the UAE and Uganda",
  },
];

/* ------------------------------------------------------------------ */
/* SERVICES — verified: service.html + home mega-menu                  */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  capabilities: string[];
  icon: string;
};

export const services: Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    short:
      "Tailored solutions engineered for your exact business need — built for precision, scale and efficiency.",
    description:
      "Unlock your business's true potential with tailored software built for performance, scale and security. From web applications to enterprise-grade platforms, we use current technologies to deliver robust systems that map to your specific requirements.",
    capabilities: [
      "Full-Stack Development",
      "Web Application Development",
      "Custom CRM & ERP Software",
      "Bespoke CMS Development",
      "Progressive Web Apps",
      "Responsive Web Apps",
      "Legacy Modernisation",
      "API & Systems Design",
    ],
    icon: "Code2",
  },
  {
    slug: "enterprise-applications",
    title: "Enterprise Applications & ERP",
    short:
      "Robust, scalable enterprise applications tailored to how your organisation actually runs.",
    description:
      "We design and deploy enterprise-grade applications that streamline processes, resources and operations. Our cloud-based, scalable ERP platforms are built for high availability, performance, agility and control across every part of the business.",
    capabilities: [
      "Custom ERP Platforms",
      "Distributor Management",
      "Asset Management",
      "Workflow Automation",
      "Role-Based Access Control",
      "Multi-Location Operations",
      "Real-Time Reporting",
      "Cloud & On-Premise Deployment",
    ],
    icon: "Building2",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    short:
      "Scalable, secure, high-performance apps designed to deliver an exceptional user experience.",
    description:
      "We create high-performance mobile apps for businesses of all sizes. Our expertise spans Android, iOS, hybrid and cross-platform development, with a track record of delivering engaging and scalable mobile applications.",
    capabilities: [
      "Native Android Development",
      "Native iOS Development",
      "React Native",
      "Flutter",
      "Cross-Platform Apps",
      "Hybrid Apps",
      "Xamarin",
      "Wearable Apps",
    ],
    icon: "Smartphone",
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    short:
      "Intelligent systems that automate operations, surface insight and drive measurable efficiency.",
    description:
      "Harness AI and ML to transform your applications and optimise operations. Our skilled AI-ML engineers develop intelligent solutions that can reduce operational costs by up to 30%, using frameworks including TensorFlow, Apache SystemML, Caffe, Apache Mahout, OpenNN, Torch, Neuroph and Mycroft AI.",
    capabilities: [
      "Chatbots & Conversational AI",
      "Predictive Analysis",
      "Product Recommendation Engines",
      "Image Processing & Recognition",
      "Behaviour Analytics",
      "Robotic Process Automation",
      "Virtual Try-Ons",
      "Emotion Learning",
    ],
    icon: "BrainCircuit",
  },
  {
    slug: "business-intelligence",
    title: "Business Intelligence & Analytics",
    short:
      "Actionable insight that turns operational data into smarter, faster decisions.",
    description:
      "We empower enterprises with actionable insights that drive smarter, data-informed decisions and strategic growth. Dashboards, visualisation and analytics tooling give leadership a single, trustworthy view of the business.",
    capabilities: [
      "Executive Dashboards",
      "Data Visualisation",
      "Reporting Automation",
      "KPI & Metric Modelling",
      "Data Warehousing",
      "Trend & Cohort Analysis",
      "Self-Service Analytics",
      "Data Pipeline Engineering",
    ],
    icon: "BarChart3",
  },
  {
    slug: "web-digital-commerce",
    title: "Web & Digital Commerce",
    short:
      "Responsive websites, web platforms and commerce experiences built to convert.",
    description:
      "We craft powerful, scalable and user-friendly web solutions for businesses of all sizes — responsive websites, web applications and commerce platforms built on current technology to deliver exceptional user experiences.",
    capabilities: [
      "eCommerce Store Development",
      "Custom Website Development",
      "Online Booking & Payments",
      "Customer Portals",
      "Shopify & WooCommerce",
      "Magento & BigCommerce",
      "Headless Commerce",
      "Performance Optimisation",
    ],
    icon: "Globe",
  },
];

/** Secondary practices — verified from service.html + mega-menu */
export const secondaryServices = [
  {
    title: "UI/UX Design",
    description:
      "Wireframes, information architecture, high and low fidelity prototypes, UX analysis and interface design across web and mobile.",
    icon: "PenTool",
  },
  {
    title: "Business Automation",
    description:
      "Streamlining operations and boosting productivity with custom business automation solutions.",
    icon: "Workflow",
  },
  {
    title: "Technology Integration",
    description:
      "Seamlessly integrating technologies to build cohesive and efficient IT infrastructures.",
    icon: "Blocks",
  },
  {
    title: "Digital Marketing",
    description:
      "SEO, content, social, PPC, email, conversion rate optimisation, reputation management and analytics reporting.",
    icon: "Megaphone",
  },
  {
    title: "Dedicated Teams",
    description:
      "Build and hire your own offshore team — vetted engineers on dedicated or fixed-time engagements, with qualification testing.",
    icon: "Users",
  },
  {
    title: "QA & Testing",
    description:
      "Manual and automated quality assurance using tooling such as Selenium, wired into a continuous integration pipeline.",
    icon: "ShieldCheck",
  },
];

/* ------------------------------------------------------------------ */
/* SOLUTIONS / PRODUCTS — verified: home "Customer-Centric Solutions"  */
/* ------------------------------------------------------------------ */

export type Solution = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  features: string[];
  icon: string;
};

export const solutions: Solution[] = [
  {
    slug: "custom-erp",
    name: "Custom ERP",
    category: "Enterprise Resource Planning",
    summary:
      "A comprehensive, customisable ERP designed to streamline all your business processes, resources and operations.",
    description:
      "Effectively manage every aspect of your business with a cloud-based, scalable and tailored mobile ERP that ensures high availability, performance, agility and control.",
    features: [
      "Cloud-based and scalable",
      "Mobile-ready access",
      "Process and resource management",
      "High availability architecture",
      "Configurable to your operations",
      "Role-based control",
    ],
    icon: "LayoutGrid",
  },
  {
    slug: "van-sales-system",
    name: "Van Sales System",
    category: "Field Sales",
    summary:
      "A powerful and dedicated solution designed specifically to streamline van sales operations.",
    description:
      "Efficiently manage your entire sales process, inventory, resources and logistics with a cloud-based, scalable and tailored mobile platform. Ensure high availability, performance, agility and control for enhanced productivity and seamless business management.",
    features: [
      "Route and journey planning",
      "On-vehicle stock tracking",
      "Invoicing at point of sale",
      "Offline-capable operation",
      "End-of-day settlement",
      "Sales representative reporting",
    ],
    icon: "Truck",
  },
  {
    slug: "distributor-management",
    name: "Distributor Management",
    category: "Channel Operations",
    summary:
      "A robust and scalable solution specifically designed to streamline your distribution network.",
    description:
      "Effortlessly manage inventory, orders, sales, logistics and partner relationships through a centralised, cloud-based and mobile-friendly system. Ensure peak efficiency, performance, agility and control for enhanced productivity and seamless distribution management.",
    features: [
      "Distributor onboarding",
      "Primary & secondary sales tracking",
      "Inventory visibility across the channel",
      "Scheme and claim management",
      "Order and dispatch workflow",
      "Channel performance reporting",
    ],
    icon: "Network",
  },
  {
    slug: "merchandiser-management",
    name: "Merchandiser Management",
    category: "Retail Execution",
    summary:
      "A powerful and tailored solution designed to optimise and streamline your merchandising operations.",
    description:
      "Effortlessly manage inventory, sales, product displays, promotions and logistics through a centralised, scalable and mobile-friendly system. Achieve peak performance, agility, availability and control to enhance productivity and ensure seamless merchandising management.",
    features: [
      "Store visit planning",
      "Planogram compliance checks",
      "Photo-backed field reporting",
      "Stock and shelf audits",
      "Attendance and geo check-in",
      "Outlet-level performance data",
    ],
    icon: "Store",
  },
  {
    slug: "asset-management",
    name: "Asset Management",
    category: "Operations",
    summary:
      "An advanced, cloud-based solution designed to efficiently manage and optimise your assets throughout their lifecycle.",
    description:
      "Track, monitor and maintain assets with scalable, mobile-friendly tools, ensuring high availability, performance, agility and control. Enhance operational efficiency, reduce downtime and maximise ROI with a streamlined asset management system.",
    features: [
      "Central asset register",
      "Assignment and custody tracking",
      "Maintenance scheduling",
      "Depreciation handling",
      "Audit and movement history",
      "Barcode / QR identification",
    ],
    icon: "Boxes",
  },
];

/* ------------------------------------------------------------------ */
/* SOLUTIONS PAGE — verbatim from technobren.com/solution.html         */
/* Descriptions come from the old site's own Services mega-menu, which   */
/* carried general-purpose wording. The solution.html versions of these   */
/* same six items were written around healthcare examples and were not     */
/* carried over.                                                           */
/* ------------------------------------------------------------------ */

export const solutionsIntro = {
  heading: "Focused IT Solutions & Services",
  body: "We are a dedicated team of AI engineers, data scientists and business analysts committed to empowering companies with AI-driven solutions for operational efficiency and a competitive edge. Our expertise spans custom enterprise applications, technology integration, digital commerce, business automation and business intelligence solutions.",
  eyebrow: "Learn more on",
  focusHeading: "Our current focus areas — key points to consider",
};

export const focusAreas = [
  {
    title: "Artificial Intelligence",
    description:
      "Harnessing the power of artificial intelligence to drive innovation and boost efficiency.",
    icon: "BrainCircuit",
  },
  {
    title: "Enterprise Application Services",
    description:
      "Empowering organisations with robust and scalable enterprise applications tailored to their needs.",
    icon: "Building2",
  },
  {
    title: "Technology Integration",
    description:
      "Seamlessly integrating technologies to build cohesive and efficient IT infrastructures.",
    icon: "Blocks",
  },
  {
    title: "Business Automation",
    description:
      "Streamlining operations and boosting productivity with custom business automation solutions.",
    icon: "Workflow",
  },
  {
    title: "Digital Commerce",
    description:
      "Creating high-performance, engaging digital commerce solutions that maximise the business.",
    icon: "ShoppingBag",
  },
  {
    title: "BI and Analytics",
    description:
      "Turning data into actionable insights with our advanced BI and analytics development service.",
    icon: "BarChart3",
  },
];

/** Verbatim from solution.html. */
export const rockEye = {
  name: "RockEye ERP System",
  headline: "Trusted by industry leaders for automating operations",
  body: "Our ERP solution is the top choice for industry giants, offering robust features like seamless automation, real-time analytics and customisable solutions tailored to meet unique operational needs.",
  points: [
    "Seamless automation",
    "Real-time analytics",
    "Customisable to your operations",
  ],
};

/* ------------------------------------------------------------------ */
/* TECHNOLOGY — verified: home tab strip + footer service list         */
/* ------------------------------------------------------------------ */

export const techCategories = [
  {
    name: "Mobile",
    blurb: "Native and cross-platform application engineering.",
    items: [
      "Android",
      "iOS",
      "Kotlin",
      "Swift",
      "React Native",
      "Flutter",
      "Xamarin",
      "PhoneGap",
    ],
  },
  {
    name: "Front End",
    blurb: "Interface layers built for speed and accessibility.",
    items: [
      "ReactJS",
      "AngularJS",
      "VueJS",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "PWA",
    ],
  },
  {
    name: "Backend",
    blurb: "Application servers, APIs and business logic.",
    items: [
      "Node.js",
      "PHP",
      "Laravel",
      "CodeIgniter",
      "CakePHP",
      "Python",
      "Java",
      ".NET",
      "Ruby on Rails",
    ],
  },
  {
    name: "Database",
    blurb: "Relational, document and in-memory data stores.",
    items: [
      "MySQL",
      "MongoDB",
      "Oracle",
      "Redis",
      "DynamoDB",
      "Firebase",
      "PostgreSQL",
    ],
  },
  {
    name: "CMS & Commerce",
    blurb: "Content platforms and storefront engines.",
    items: [
      "WordPress",
      "Magento",
      "Shopify",
      "Drupal",
      "Joomla",
      "WooCommerce",
      "BigCommerce",
      "OpenCart",
    ],
  },
  {
    name: "Infra & DevOps",
    blurb: "Cloud, containers, pipelines and automated testing.",
    items: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Git",
      "Gradle",
      "Selenium",
    ],
  },
];

/** Platform strip shown on the homepage — verified logos row on the old site */
export const platformStrip = [
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Jenkins",
  "Git",
  "Gradle",
  "Selenium",
];

/* ------------------------------------------------------------------ */
/* WHY TECHNOBREN — verified: home benefits grid                       */
/* ------------------------------------------------------------------ */

export const differentiators = [
  {
    title: "Flexible Timings",
    description:
      "We operate 24/7, ensuring seamless collaboration regardless of your location.",
    icon: "Clock",
  },
  {
    title: "On-Time Delivery",
    description: "Meeting deadlines is our priority — we deliver on time, every time.",
    icon: "CalendarCheck",
  },
  {
    title: "Cost-Effective",
    description:
      "Cut your development costs by up to 1/3 with our dedicated remote hiring solutions.",
    icon: "TrendingDown",
  },
  {
    title: "Seamless Communication",
    description:
      "Effective communication is the backbone of project success, and we take it seriously.",
    icon: "MessagesSquare",
  },
  {
    title: "Award-Winning Service",
    description:
      "Recognised as the Most Promising Company by the Chief Minister of Uttar Pradesh in 2018.",
    icon: "Award",
  },
  {
    title: "Qualification Interview",
    description:
      "Skilled resources, ready to meet your requirements through qualification tests.",
    icon: "UserCheck",
  },
];

/* ------------------------------------------------------------------ */
/* PROCESS — the old nav linked to /methodology but it 404'd.          */
/* Stage copy drafted for the redesign — see REDESIGN-NOTES.md         */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "We listen first. We map your goals, constraints and existing systems, then agree what success actually looks like before a line of code is written.",
    deliverables: [
      "Requirement analysis",
      "Scope & success criteria",
      "NDA in place",
      "Effort estimate",
    ],
  },
  {
    id: "02",
    title: "Design",
    description:
      "Information architecture, wireframes and high-fidelity prototypes. You see and approve the product before it is built.",
    deliverables: [
      "Information architecture",
      "Wireframes",
      "Interactive prototype",
      "UI design system",
    ],
  },
  {
    id: "03",
    title: "Development",
    description:
      "Engineering in short, visible increments. Code is reviewed, version-controlled and demonstrated to you at the end of every cycle.",
    deliverables: [
      "Sprint increments",
      "Code review",
      "Version control",
      "Regular demos",
    ],
  },
  {
    id: "04",
    title: "Testing",
    description:
      "Manual and automated quality assurance, wired into the build pipeline so regressions are caught before they reach you.",
    deliverables: [
      "Functional QA",
      "Automated test suites",
      "Performance checks",
      "Security review",
    ],
  },
  {
    id: "05",
    title: "Deployment",
    description:
      "Containerised, repeatable releases to cloud or on-premise infrastructure, with rollback and monitoring configured from day one.",
    deliverables: [
      "CI/CD pipeline",
      "Cloud or on-premise release",
      "Monitoring & alerting",
      "Handover documentation",
    ],
  },
  {
    id: "06",
    title: "Support",
    description:
      "We stay on after launch — maintenance, enhancements and a team that already knows your system inside out.",
    deliverables: [
      "Maintenance window",
      "Enhancement roadmap",
      "Issue resolution",
      "Ongoing optimisation",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* INDUSTRIES — derived from the product suite + solution.html         */
/* Flagged for client confirmation in REDESIGN-NOTES.md                */
/* ------------------------------------------------------------------ */

export const industries = [
  {
    name: "FMCG & Distribution",
    description:
      "Van sales, distributor and merchandiser systems for multi-tier channels.",
    icon: "PackageSearch",
  },
  {
    name: "Retail & Commerce",
    description: "Storefronts, order management and retail execution tooling.",
    icon: "ShoppingBag",
  },
  {
    name: "Manufacturing",
    description: "ERP, asset tracking and operational reporting on the plant floor.",
    icon: "Factory",
  },
  {
    name: "Healthcare",
    description: "Records, scheduling, patient portals and analytics platforms.",
    icon: "HeartPulse",
  },
  {
    name: "Logistics & Field Ops",
    description:
      "Route planning, mobile workforce apps and offline-first field tooling.",
    icon: "Route",
  },
  {
    name: "Enterprise IT",
    description: "Integration, automation and modernisation of internal systems.",
    icon: "Server",
  },
];

/* ------------------------------------------------------------------ */
/* ABOUT — verified: about.html                                        */
/* ------------------------------------------------------------------ */

export const coreValues = [
  {
    title: "Transparency & Integrity",
    description:
      "We are committed to being ethical, sincere and transparent in all our interactions. Trust lies at the heart of everything we do.",
  },
  {
    title: "Passion For Excellence",
    description:
      "We are dedicated to delivering our best to our customers, inspiring others to pursue excellence along the way.",
  },
  {
    title: "Customer Sovereignty",
    description:
      "We work closely with our customers to deliver superior solutions enriched with added value and tailored to their needs.",
  },
  {
    title: "Leadership By Example",
    description:
      "We set high standards in our business practices and interactions, striving to be a model of excellence for the industry.",
  },
  {
    title: "Responsibility",
    description:
      "We take full ownership of our actions and are committed to exceeding expectations through dedication and excellence.",
  },
  {
    title: "Continuous Learning",
    description:
      "We continuously enhance our skills to effectively adapt to evolving technologies and deliver cutting-edge solutions.",
  },
];

export const leadership = [
  { name: "Rajkeshar Yadav", role: "Founder, Chairman & CEO" },
  { name: "Deepak Yadav", role: "HR Manager" },
  { name: "Pankaj Yadav", role: "Project Manager" },
  { name: "Arun Yadav", role: "Senior Developer" },
  { name: "Akash Yadav", role: "Senior Developer" },
];

/** Portrait sourced from the existing technobren.com about page (ceo-img.svg). */
export const chairmanMessage = {
  photo: "/team/founder.jpg",
  quote:
    "Our team lives, breathes and dreams technology. As visionaries, dreamers, specialists and perfectionists, our strength lies in the diversity, dedication and expertise we bring to every project. Working cohesively with our clients and partners, we are driven by a shared vision to become a global leader in IT solutions and services. Together, we innovate, create and excel.",
  name: "Rajkeshar Yadav",
  role: "Founder, Chairman & CEO",
};

/* ------------------------------------------------------------------ */
/* HIRE A DEVELOPER — verbatim from the old footer + about.html groups  */
/* ------------------------------------------------------------------ */

export const hireGroups = [
  {
    title: "Frontend Developers",
    roles: ["ReactJS", "AngularJS", "VueJS", "HTML5"],
  },
  {
    title: "Backend & Full-Stack Developers",
    roles: ["NodeJS", "PHP", "Python", "Java", "ASP.NET"],
  },
  {
    title: "CMS & eCommerce Developers",
    roles: ["WordPress", "Magento", "Shopify"],
  },
  {
    title: "Mobile App Developers",
    roles: ["Android", "iOS", "Flutter", "React Native"],
  },
  {
    title: "AI & ML Developers",
    roles: ["AI & ML", "Data Engineering"],
  },
];

/** Flat list used by the footer column, matching the old site's footer. */
export const hireRoles = [
  "ReactJS Developers",
  "NodeJS Developers",
  "VueJS Developers",
  "AngularJS Developers",
  "PHP Developers",
  "Laravel Developers",
  "Magento Developers",
  "WordPress Developers",
  "Android App Developers",
  "iOS App Developers",
  "Flutter App Developers",
  "React Native Developers",
  "Python Developers",
  "Java Developers",
  "ASP.NET Developers",
  "HTML5 Developers",
  "Shopify Developers",
  "AI & ML Developers",
];

/* ------------------------------------------------------------------ */
/* CONTACT ASSURANCES — verbatim from contact.html "We're Here to Help" */
/* ------------------------------------------------------------------ */

export const contactAssurances = {
  heading: "We're here to help",
  body: "We understand your needs, analyse your goals and suggest the best development approach to achieve effective results.",
  points: [
    {
      title: "Share your requirement",
      description:
        "Share your requirement and let's take the first step toward building the right solution for your needs.",
      icon: "MessagesSquare",
    },
    {
      title: "Non-Disclosure Agreement (NDA)",
      description:
        "Our NDA ensures your confidential information stays secure and is not shared without consent. This agreement helps establish trust and confidentiality throughout our collaboration.",
      icon: "ShieldCheck",
    },
    {
      title: "Understanding your requirement",
      description:
        "We take the time to listen and understand your needs, ensuring we deliver the best solution for your goals.",
      icon: "UserCheck",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* NAVIGATION                                                          */
/* ------------------------------------------------------------------ */

export type NavChild = { label: string; href: string; description?: string };
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  featured?: boolean;
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Hire Developers", href: "/hire-developers" },
  { label: "Services", href: "/services" },
  { label: "Technology", href: "/technology" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "Methodology", href: "/methodology" },
];

/* ------------------------------------------------------------------ */
/* CONTACT FORM OPTIONS — verified: contact.html form fields           */
/* ------------------------------------------------------------------ */

export const formOptions = {
  services: [
    "Custom Software Development",
    "Enterprise Applications & ERP",
    "Mobile App Development",
    "AI & Machine Learning",
    "Business Intelligence & Analytics",
    "Web & Digital Commerce",
    "Dedicated Team / Offshore Hiring",
    "Other",
  ],
  budgets: [
    "Under $5,000",
    "$5,000 – $15,000",
    "$15,000 – $50,000",
    "$50,000+",
    "Not sure yet",
  ],
  timelines: ["Immediately", "Within 1 month", "1–3 months", "Just exploring"],
};
