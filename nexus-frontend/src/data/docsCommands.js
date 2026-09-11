export const docsCommands = [
  {
    id: 1,
    command: 'npm install react-router-dom lucide-react',
    category: 'NPM & Dependencies',
    purpose: 'Εγκατάσταση Client-Side Routing και Icon Library',
    description: 'Εγκαθιστά στο project δύο βασικές βιβλιοθήκες: το react-router-dom για διαχείριση διαδρομών (URLs) χωρίς reload, και το lucide-react για μοντέρνα, ελαφριά SVG εικονίδια.',
    breakdown: [
      { part: 'npm install', meaning: 'Κατεβάζει και καταγράφει τα packages στο node_modules και στο package.json' },
      { part: 'react-router-dom', meaning: 'Βιβλιοθήκη πλοήγησης (BrowserRouter, Routes, Route, NavLink)' },
      { part: 'lucide-react', meaning: 'Συλλογή 1000+ optimized React icon components' }
    ],
    example: 'import { BrowserRouter, Routes, Route } from "react-router-dom";\nimport { Code, Database } from "lucide-react";'
  },
  {
    id: 2,
    command: 'npm run dev',
    category: 'Vite & Tooling',
    purpose: 'Εκκίνηση τοπικού Development Server (HMR)',
    description: 'Εκκινεί τον τοπικό web server του Vite (συνήθως στο http://localhost:5173) με υποστήριξη Hot Module Replacement (HMR). Επιτρέπει να βλέπεις ζωντανά τις αλλαγές στον κώδικα χωρίς να χάνεται η κατάσταση της εφαρμογής.',
    breakdown: [
      { part: 'npm run', meaning: 'Εκτελεί ένα προκαθορισμένο script από το πεδίο "scripts" του package.json' },
      { part: 'dev', meaning: 'Το όνομα του script ("vite") που σηκώνει τον server ανάπτυξης' }
    ],
    example: 'npm run dev\n# Output: Local: http://localhost:5173/'
  },
  {
    id: 3,
    command: 'git add . && git commit -m "feat: your descriptive message"',
    category: 'Git & Version Control',
    purpose: 'Σταδιοποίηση και μόνιμη καταγραφή αλλαγών (Snapshot)',
    description: 'Το "git add ." προετοιμάζει όλες τις τροποποιήσεις στο staging index και το "git commit" δημιουργεί ένα νέο μόνιμο snapshot στο ιστορικό του κώδικα, συνοδευόμενο από επεξηγηματικό μήνυμα.',
    breakdown: [
      { part: 'git add .', meaning: 'Προσθέτει όλα τα νέα, τροποποιημένα ή διεγραμμένα αρχεία στο Staging Area' },
      { part: 'git commit', meaning: 'Καταγράφει οριστικά το snapshot στο τοπικό Git repository' },
      { part: '-m "..."', meaning: 'Ορίζει το περιγραφικό μήνυμα (commit message) χωρίς να ανοίξει εξωτερικό editor' }
    ],
    example: 'git add .\ngit commit -m "feat(portfolio): add contact page and routing"'
  },
  {
    id: 4,
    command: 'npm run build',
    category: 'Build & Production',
    purpose: 'Παραγωγή βελτιστοποιημένου Production Bundle',
    description: 'Εκτελεί το "vite build" μεταγλωττίζοντας όλα τα React JSX αρχεία σε minified, production-ready JavaScript και CSS assets στο φάκελο dist/, κάνοντας tree-shaking και gzip optimization.',
    breakdown: [
      { part: 'npm run', meaning: 'Εκτελεί προκαθορισμένο script από το package.json' },
      { part: 'build', meaning: 'Καλεί τον Vite compiler ("vite build")' },
      { part: 'dist/', meaning: 'Ο τελικός στατικός φάκελος που περιέχει τα compiled HTML/CSS/JS αρχεία έτοιμα για deployment (Vercel, Netlify, Render)' }
    ],
    example: 'npm run build\n# Output: ✓ built in 481ms (dist/assets/index-*.js)'
  },
  {
    id: 5,
    command: 'php artisan make:model ContactMessage -m',
    category: 'Laravel Artisan & CLI',
    purpose: 'Δημιουργία Eloquent Model & Database Migration',
    description: 'Δημιουργεί ταυτόχρονα το Eloquent Model (app/Models/ContactMessage.php) και το αρχείο migration στη βάση δεδομένων (database/migrations/xxxx_create_contact_messages_table.php).',
    breakdown: [
      { part: 'php artisan', meaning: 'Το επίσημο Command-Line Interface (CLI) εργαλείο του Laravel' },
      { part: 'make:model ContactMessage', meaning: 'Δημιουργεί την κλάση μοντέλου στο φάκελο app/Models/' },
      { part: '-m (ή --migration)', meaning: 'Flag που δημιουργεί αυτόματα το σχετικό migration αρχείο για τον πίνακα της βάσης' }
    ],
    example: 'php artisan make:model ContactMessage -m\n# INFO Model [app/Models/ContactMessage.php] created successfully.\n# INFO Migration [database/migrations/..._create_contact_messages_table.php] created successfully.'
  },
  {
    id: 6,
    command: 'php artisan migrate',
    category: 'Database & Migrations',
    purpose: 'Εκτέλεση όλων των εκκρεμών migrations στη βάση δεδομένων',
    description: 'Ελέγχει τον πίνακα "migrations" στη βάση δεδομένων (PostgreSQL) και εκτελεί τη μέθοδο up() για όλα τα νέα αρχεία migration, δημιουργώντας με ασφάλεια τους πίνακες, τα foreign keys και τα indexes.',
    breakdown: [
      { part: 'php artisan', meaning: 'Το CLI εργαλείο του Laravel' },
      { part: 'migrate', meaning: 'Εκτελεί τη μέθοδο up() σε όλα τα μη εκτελεσμένα migration αρχεία' },
      { part: 'Batch tracking', meaning: 'Το Laravel αποθηκεύει τον αριθμό batch στον πίνακα migrations επιτρέποντας rollback' }
    ],
    example: 'php artisan migrate\n# 2026_09_11_xxxxxx_create_contact_messages_table .. RUNNING\n# 2026_09_11_xxxxxx_create_contact_messages_table .. 12.45ms DONE'
  },
  {
    id: 7,
    command: 'php artisan make:controller Api/ContactController',
    category: 'Controllers & Routing',
    purpose: 'Δημιουργία Controller για REST API Endpoints',
    description: 'Δημιουργεί έναν API Controller στο φάκελο app/Http/Controllers/Api/ για τη διαχείριση της επικύρωσης (Validation) των δεδομένων φόρμας και την αποθήκευση στη βάση μέσω Eloquent.',
    breakdown: [
      { part: 'php artisan', meaning: 'Το CLI εργαλείο του Laravel' },
      { part: 'make:controller', meaning: 'Εντολή παραγωγής controller boilerplate κώδικα' },
      { part: 'Api/ContactController', meaning: 'Δημιουργεί το αρχείο μέσα στο υποφάκελο app/Http/Controllers/Api/' }
    ],
    example: 'php artisan make:controller Api/ContactController\n# INFO Controller [app/Http/Controllers/Api/ContactController.php] created successfully.'
  },
  {
    id: 8,
    command: 'php artisan route:list --path=contact',
    category: 'Debugging & Routing',
    purpose: 'Επιθεώρηση και επαλήθευση καταχωρημένων API διαδρομών',
    description: 'Εμφανίζει αναλυτικό πίνακα με όλα τα ενεργά endpoints, τα HTTP verbs (GET, POST κ.λπ.), τα middlewares προστασίας και τις συνδεδεμένες μεθόδους των Controllers.',
    breakdown: [
      { part: 'php artisan route:list', meaning: 'Εκτυπώνει το routing table της εφαρμογής' },
      { part: '--path=contact', meaning: 'Φίλτρο αναζήτησης για προβολή μόνο των σχετικών endpoints' }
    ],
    example: 'php artisan route:list --path=contact\n# POST api/contact .. Api\\ContactController@store\n# GET|HEAD api/contacts .. Api\\ContactController@index'
  },
  {
    id: 9,
    command: 'php artisan make:resource ContactResource --collection',
    category: 'Architecture: Drupal to Laravel',
    purpose: 'Αρχιτεκτονική Μετάβαση: Από Monolithic Drupal σε Decoupled Laravel 11 & React 19',
    description: 'Σύγκριση της μετάβασης από παραδοσιακό CMS (Drupal 9/10 Entity Hooks & Twig) σε σύγχρονη Decoupled αρχιτεκτονική (Laravel 11 REST API + React 19 SPA). Το Laravel παρέχει καθαρό Controller-Action pattern, granular API Resources, Request Validation και ταχύτατο response time (υποδιαίρεση των 50ms) σε σχέση με το βαρύ Drupal bootstrap.',
    breakdown: [
      { part: 'Drupal CMS Paradigm', meaning: 'Βαριά Entity-Field αρχιτεκτονική, Hooks, Taxonomy, ιδανικό για editorial portals αλλά σύνθετο για custom web apps' },
      { part: 'Laravel 11 Decoupled API', meaning: 'Καθαρό separation of concerns: Routes, Eloquent Models, Form Requests, και Resource JSON transformations' },
      { part: 'React 19 SPA Consumer', meaning: 'Stateless consumption μέσω Axios, τοπικό Client-Side Routing, και zero server-side HTML rendering overhead' }
    ],
    example: '// Laravel API Resource Transformation:\npublic function toArray(Request $request): array {\n    return [\'id\' => $this->id, \'name\' => $this->name, \'email\' => $this->email];\n}'
  },
  {
    id: 10,
    command: "window.addEventListener('scroll', handleScroll, { passive: true })",
    category: 'Performance & Frontend UX',
    purpose: 'Hardware-Accelerated Scroll Listeners & Dynamic SVG Progress Indicators',
    description: 'Χρήση του passive: true flag στα scroll event listeners για εξάλειψη του main thread jank (60-120fps scrolling) και δυναμικός υπολογισμός του scroll progress percentage για τον κυκλικό δείκτη (Back-to-Top Widget) με SVG strokeDasharray.',
    breakdown: [
      { part: '{ passive: true }', meaning: 'Δηλώνει στον browser ότι το listener δεν θα καλέσει preventDefault(), εκτελώντας το scroll άμεσα στο compositor thread χωρίς καθυστέρηση' },
      { part: 'scrollHeight - innerHeight', meaning: 'Υπολογισμός του συνολικού δυναμικού ύψους κύλισης της σελίδας για εξαγωγή ακριβούς ποσοστού 0% - 100%' },
      { part: 'strokeDasharray={`${progress}, 100`}', meaning: 'Μοντέρνα SVG τεχνική για dynamic ring fill χωρίς βαριές εξωτερικές βιβλιοθήκες' }
    ],
    example: "window.addEventListener('scroll', handleScroll, { passive: true });\nreturn () => window.removeEventListener('scroll', handleScroll);"
  }
];
