export const skillsCategories = [
    {
        id: 'backend',
        title: 'Backend & Architecture',
        color: 'blue',
        skills: [
            { name: 'Laravel 11', level: 90, desc: 'REST API, Sanctum Auth, Eloquent ORM, Migrations, Policies' },
            { name: 'PHP 8.x', level: 90, desc: 'OOP, Type Safety, Dependency Injection, Design Patterns' },
            { name: 'PostgreSQL & MySQL', level: 85, desc: 'Relational Schema Design, Foreign Keys, Indexing, Performance' },
            { name: 'Drupal 9/10 Architecture', level: 85, desc: 'Custom Modules, Paragraphs, REST/JSON:API, Decoupled CMS' },
            { name: 'RESTful API Design', level: 95, desc: 'Resource Controllers, Proper HTTP Codes, Payload Validation' }
        ]
    },
    {
        id: 'frontend',
        title: 'Modern Frontend & SPAs',
        color: 'indigo',
        skills: [
            { name: 'React 19', level: 88, desc: 'Hooks, Component Lifecycle, Reusable Blocks, Controlled Forms' },
            { name: 'React Router v7', level: 90, desc: 'Client-side Routing, Protected Routes, Dynamic Navigation' },
            { name: 'Tailwind CSS v4', level: 92, desc: 'Utility-first UI, Responsive Breakpoints, Custom Design Tokens' },
            { name: 'Vite & Modern Tooling', level: 90, desc: 'Hot Module Replacement (HMR), Build Optimization, Bundling' },
            { name: 'Axios & Async State', level: 90, desc: 'HTTP Interceptors, Token Headers, Asynchronous Data Fetching' }
        ]
    },
    {
        id: 'game_dev',
        title: 'Unreal Engine 5 & C++',
        color: 'amber',
        skills: [
            { name: 'Unreal Engine 4/5', level: 85, desc: 'Engine Architecture, Blueprints, C++ Integration, Profiling' },
            { name: 'C++ Gameplay Programming', level: 80, desc: 'Memory Management, Pointers, Unreal Macros (UFUNCTION, UPROPERTY)' },
            { name: 'Gameplay Ability System (GAS)', level: 80, desc: 'Gameplay Attributes, Gameplay Effects, Gameplay Tags' },
            { name: 'AI & Behavior Trees', level: 82, desc: 'Blackboard Data, Decorators, Services, AI Perception System' },
            { name: 'Mobile Optimization', level: 80, desc: 'Draw Calls Reduction, Mobile Shaders, Dynamic Resolution, LODs' }
        ]
    },
    {
        id: 'devops',
        title: 'Testing, Tools & DevOps',
        color: 'emerald',
        skills: [
            { name: 'Automated Testing (PHPUnit)', level: 85, desc: 'Feature Tests, Database Assertions, RefreshDatabase Trait' },
            { name: 'Git & Version Control', level: 90, desc: 'Feature Branching, Staging Index, Commit Conventions, GitHub' },
            { name: 'Docker & Containers', level: 78, desc: 'Containerized PHP & Nginx Environments, Dockerfiles' },
            { name: 'Cloud Deployments', level: 82, desc: 'Vercel (Frontend), Render & Neon Tech PostgreSQL (Backend)' }
        ]
    }
]

export const experienceTimeline = [
    {
        period: '2025 - Παρόν',
        role: 'Full-Stack Software Engineer & Architecture Specialist',
        company: 'NexusCRM & Enterprise Solutions',
        type: 'Web & Enterprise Systems',
        description: 'Σχεδιασμός και υλοποίηση του NexusCRM, μιας Decoupled enterprise πλατφόρμας με Laravel 11 REST API, PostgreSQL, Sanctum Auth και React 19 SPA, με 100% αυτοματοποιημένη κάλυψη Feature Tests.',
        tags: ['Laravel 11', 'React 19', 'PostgreSQL', 'Sanctum', 'PHPUnit']
    },
    {
        period: '2024 - 2025',
        role: 'Unreal Engine Gameplay Developer',
        company: 'Real-Time Simulations & Mobile Gaming',
        type: 'Game Development',
        description: 'Ανάπτυξη συστημάτων μάχης με Gameplay Ability System (GAS) σε C++, σχεδιασμός τεχνητής νοημοσύνης (AI Behavior Trees) και βελτιστοποίηση επιδόσεων για mobile συσκευές.',
        tags: ['UE5', 'C++', 'GAS', 'AI Behavior Trees', 'Mobile Optimization']
    },
    {
        period: '2021 - 2024',
        role: 'Senior Web & Drupal Specialist',
        company: 'Web Engineering & Digital Architecture',
        type: 'CMS & Headless Architecture',
        description: 'Αρχιτεκτονική enterprise πυλώνων σε Drupal 9/10, κατασκευή custom modules, υλοποίηση Paragraphs και έκθεση REST / JSON:API endpoints για κατανάλωση από σύγχρονα frontend συστήματα.',
        tags: ['Drupal 10', 'PHP 8', 'JSON:API', 'MySQL', 'Custom Modules']
    }
]