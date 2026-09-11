export const projectsData = [
    {
        id: 'nexus-crm',
        title: 'NexusCRM - Enterprise Business Suite',
        category: 'web',
        categoryLabel: 'Full-Stack Web & CRM',
        badgeColor: 'blue',
        summary: 'Πλήρες Decoupled CRM σύστημα για διαχείριση πελατών, projects και εργασιών με πραγματικό backend.',
        description: 'Αρχιτεκτονική enterprise επιπέδου με REST API σε Laravel 11, ασφάλεια με Laravel Sanctum token authentication, PostgreSQL βάση, αυτόματα Feature Tests και Single Page Application σε React 19.',
        techStack: ['Laravel 11', 'React 19', 'PostgreSQL', 'Sanctum Auth', 'Tailwind CSS', 'PHPUnit', 'Docker'],
        features: [
            'Token-based Authentication (Login/Logout)',
            'Διαχείριση Πελατών & Nested Projects / Tasks',
            'Αυτόματο REST API με HTTP Status Codes (201, 204)',
            '100% Κάλυψη με Αυτοματοποιημένα Feature Tests'
        ],
        liveDemoUrl: '/crm', // Εσωτερικό link που ανοίγει κατευθείαν το demo!
        isInternalDemo: true
    },
    {
        id: 'unreal-gas-rpg',
        title: 'Unreal Engine 5 - RPG Gameplay Ability System',
        category: 'game',
        categoryLabel: 'Unreal Engine & C++',
        badgeColor: 'amber',
        summary: 'Modular σύστημα μάχης και ικανοτήτων βασισμένο στο Gameplay Ability System (GAS) της Epic Games.',
        description: 'Υλοποίηση σε C++ για βέλτιστη απόδοση. Περιλαμβάνει διαχείριση Attributes (Health, Mana, Stamina), Gameplay Effects, Gameplay Tags, και AI εχθρούς με Behavior Trees και Blackboard.',
        techStack: ['Unreal Engine 5', 'C++', 'GAS', 'Behavior Trees', 'Blueprints', 'Motion Warping'],
        features: [
            'Gameplay Ability System (GAS) σε C++',
            'Attribute Sets με Gameplay Effects & Modifiers',
            'AI Behavior Trees με Perception System',
            'Combo Attack System με Root Motion'
        ],
        liveDemoUrl: null,
        isInternalDemo: false
    },
    {
        id: 'unreal-mobile-pipeline',
        title: 'Unreal Engine 5 - Mobile Optimization Pipeline',
        category: 'game',
        categoryLabel: 'Unreal Engine & Mobile',
        badgeColor: 'amber',
        summary: 'Βελτιστοποίηση γραφικών και touch μηχανισμών για mobile συσκευές σε Unreal Engine.',
        description: 'Πλήρες pipeline για mobile gaming: profiling με Unreal Insights, μείωση Draw Calls, υλοποίηση LODs, touch input controls και packaging για Android/iOS.',
        techStack: ['UE5 Mobile', 'C++', 'Mobile Shaders', 'Unreal Insights', 'Android NDK'],
        features: [
            'Σταθερά 60 FPS σε Mid-range Mobile συσκευές',
            'Dynamic Resolution & Scalability Settings',
            'Custom Virtual Touch Joysticks',
            'Μείωση Draw Calls & Memory Optimization'
        ],
        liveDemoUrl: null,
        isInternalDemo: false
    },
    {
        id: 'drupal-headless-portal',
        title: 'Drupal Decoupled Enterprise Portal',
        category: 'web',
        categoryLabel: 'Drupal & Architecture',
        badgeColor: 'blue',
        summary: 'Headless Content Architecture με Drupal backend και reactive frontend κατανάλωση.',
        description: 'Σχεδιασμός custom Paragraphs και Content Types στο Drupal, έκθεση δεδομένων μέσω JSON:API, caching στρατηγική και διασύνδεση με σύγχρονα frontend components.',
        techStack: ['Drupal 10', 'PHP 8.2', 'JSON:API', 'MySQL', 'Headless CMS'],
        features: [
            'Custom Content Entities & Paragraphs Architecture',
            'REST / JSON:API Endpoints με OAuth2',
            'Dynamic Taxonomy & Advanced Filtering',
            'High-performance Caching Tags & Bubbling'
        ],
        liveDemoUrl: null,
        isInternalDemo: false
    }
]