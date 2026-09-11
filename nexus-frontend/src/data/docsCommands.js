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
  }
];
