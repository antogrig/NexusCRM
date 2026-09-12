import { useState } from 'react'

const questions = [
    {
        id: 1,
        category: 'React',
        question: 'Γιατί χρησιμοποιούμε useState αντί για απλή μεταβλητή (π.χ. let clients = []) στη React;',
        options: [
            { text: 'Γιατί η απλή μεταβλητή δεν υποστηρίζει πίνακες (arrays).', isCorrect: false },
            { text: 'Γιατί όταν αλλάζει το state, η React ξαναζωγραφίζει (re-render) αυτόματα την οθόνη με τα νέα δεδομένα.', isCorrect: true },
            { text: 'Γιατί το useState στέλνει τα δεδομένα αυτόματα στη βάση δεδομένων.', isCorrect: false },
        ],
        explanation: 'Το useState ενημερώνει τη React ότι τα δεδομένα άλλαξαν, οπότε πρέπει να ανανεώσει το UI. Μια απλή μεταβλητή δεν μπορεί να προκαλέσει re-render.'
    },
    {
        id: 2,
        category: 'React',
        question: 'Τι σημαίνει το άδειο array [] στο τέλος του useEffect;',
        options: [
            { text: 'Τρέξε τον κώδικα μόνο 1 φορά, μόλις πρωτο-φορτώσει το component.', isCorrect: true },
            { text: 'Μην τρέξεις ποτέ τον κώδικα μέσα στο useEffect.', isCorrect: false },
            { text: 'Τρέξε τον κώδικα κάθε φορά που ο χρήστης πληκτρολογεί κάτι.', isCorrect: false },
        ],
        explanation: 'Το [] ονομάζεται Dependency Array. Όταν είναι άδειο, η React εκτελεί το effect μόνο στο αρχικό "mounting" του component (ιδανικό για αρχικό fetch δεδομένων).'
    },
    {
        id: 3,
        category: 'SPA / Forms',
        question: 'Γιατί καλούμε e.preventDefault() στο submit μιας φόρμας στη React;',
        options: [
            { text: 'Για να καθαρίσει αυτόματα τα input πεδία.', isCorrect: false },
            { text: 'Για να εμποδίσει το παραδοσιακό refresh/reload της σελίδας, διατηρώντας το state ζωντανό.', isCorrect: true },
            { text: 'Για να ελέγξει αν το email είναι έγκυρο.', isCorrect: false },
        ],
        explanation: 'Στα Single Page Applications (SPAs), τα requests γίνονται ασύγχρονα με Axios/Fetch στο παρασκήνιο. Δεν θέλουμε ο browser να κάνει full-page reload.'
    },
    {
        id: 4,
        category: 'REST API',
        question: 'Όταν κάναμε POST /api/clients και δημιουργήθηκε ο πελάτης, τι HTTP Status Code λάβαμε;',
        options: [
            { text: '200 OK', isCorrect: false },
            { text: '201 Created', isCorrect: true },
            { text: '204 No Content', isCorrect: false },
        ],
        explanation: 'Το 201 Created είναι το διεθνές REST standard για επιτυχημένη δημιουργία νέου resource στη βάση.'
    },
    {
        id: 5,
        category: 'Laravel',
        question: 'Γιατί χρησιμοποιούμε Migrations στο Laravel αντί να φτιάχνουμε πίνακες χειροκίνητα;',
        options: [
            { text: 'Γιατί τα Migrations είναι σαν Version Control (Git) για τη βάση δεδομένων και εκτελούνται αυτόματα παντού.', isCorrect: true },
            { text: 'Γιατί η PostgreSQL δεν επιτρέπει να φτιάξεις πίνακες με άλλο τρόπο.', isCorrect: false },
            { text: 'Για να γράφουμε λιγότερο κώδικα στη React.', isCorrect: false },
        ],
        explanation: 'Με τα migrations η αρχιτεκτονική της βάσης ζει στον κώδικα. Οποιοσδήποτε συνάδελφος τρέξει "php artisan migrate", αποκτά την ίδια ακριβώς βάση.'
    },
    {
        id: 6,
        category: 'Laravel Eloquent',
        question: 'Τι προσφέρει η δήλωση protected $fillable μέσα σε ένα Model (π.χ. Client.php);',
        options: [
            { text: 'Ορίζει ποια πεδία είναι υποχρεωτικά.', isCorrect: false },
            { text: 'Προστατεύει τη βάση από κακόβουλα πεδία (Mass Assignment Protection).', isCorrect: true },
            { text: 'Δημιουργεί αυτόματα το migration.', isCorrect: false },
        ],
        explanation: 'Το $fillable λειτουργεί σαν "whitelist": επιτρέπει μόνο στα πεδία που ορίζουμε εμείς να αποθηκευτούν μαζικά, αποτρέποντας hacking επιθέσεις.'
    },
    {
        id: 7,
        category: 'Database / Performance',
        question: 'Τι είναι το "N+1 Problem" όταν φέρνουμε συσχετισμένα δεδομένα (π.χ. πελάτες με projects);',
        options: [
            { text: 'Είναι bug που ρίχνει τον server επειδή λείπει το ID.', isCorrect: false },
            { text: 'Εκτελείται 1 αρχικό query και μετά N ξεχωριστά queries για κάθε εγγραφή, γονατίζοντας τη βάση δεδομένων.', isCorrect: true },
            { text: 'Σημαίνει ότι μια βάση δεδομένων δεν μπορεί να έχει πάνω από N+1 πίνακες.', isCorrect: false },
        ],
        explanation: 'Το N+1 συμβαίνει όταν κάνουμε loop σε πελάτες και ζητάμε τα projects τους ένα-ένα (Lazy Loading), δημιουργώντας περιττά εκατοντάδες queries.'
    },
    {
        id: 8,
        category: 'Laravel Eloquent',
        question: 'Πώς λύνουμε το N+1 problem στο Laravel;',
        options: [
            { text: 'Χρησιμοποιώντας Eager Loading με τη μέθοδο with() (π.χ. Client::with("projects")->get()).', isCorrect: true },
            { text: 'Κάνοντας restart τη βάση δεδομένων.', isCorrect: false },
            { text: 'Διαγράφοντας τα παλιά projects.', isCorrect: false },
        ],
        explanation: 'Το with() λέει στο Eloquent να φέρει όλα τα σχετικά projects σε 1 επιπλέον query με "WHERE client_id IN (...)", κάνοντας μόλις 2 queries συνολικά!'
    },
    {
        id: 9,
        category: 'Laravel Validation',
        question: 'Τι κάνει ο κανόνας validation "client_id => required|exists:clients,id";',
        options: [
            { text: 'Δημιουργεί αυτόματα έναν νέο πελάτη αν δεν υπάρχει.', isCorrect: false },
            { text: 'Ελέγχει αν το client_id υπάρχει ήδη καταχωρημένο στον πίνακα clients της βάσης, αποτρέποντας "ορφανά" δεδομένα.', isCorrect: true },
            { text: 'Κλειδώνει τον πίνακα clients.', isCorrect: false },
        ],
        explanation: 'Ο κανόνας exists εγγυάται τη σχεσιακή ακεραιότητα (Referential Integrity) πριν καν προσπαθήσει η βάση να εκτελέσει το INSERT.'
    },
    {
        id: 10,
        category: 'Authentication / Security',
        question: 'Τι είναι το Bearer Token που επιστρέφει το Laravel Sanctum κατά το login;',
        options: [
            { text: 'Είναι ο κωδικός του χρήστη χωρίς κρυπτογράφηση.', isCorrect: false },
            { text: 'Είναι ένα μοναδικό κρυπτογραφημένο string που αποδεικνύει την ταυτότητα του χρήστη σε κάθε HTTP αίτημα.', isCorrect: true },
            { text: 'Είναι το ID της βάσης δεδομένων.', isCorrect: false },
        ],
        explanation: 'Σε ένα Decoupled API δεν έχουμε cookies συνεδρίας (session). Το Bearer Token αποστέλλεται στο Header Authorization: Bearer <token> για να πιστοποιήσει το αίτημα.'
    },
    {
        id: 11,
        category: 'HTTP Status Codes',
        question: 'Ποιον κωδικό HTTP επιστρέφει το Laravel όταν ένα αίτημα επιχειρεί να διαβάσει προστατευμένα routes χωρίς έγκυρο Token;',
        options: [
            { text: '404 Not Found', isCorrect: false },
            { text: '401 Unauthorized', isCorrect: true },
            { text: '500 Internal Server Error', isCorrect: false },
        ],
        explanation: 'Το 401 Unauthorized δηλώνει ρητά ότι η ταυτότητα του αιτούντος δεν έχει επαληθευτεί ή λείπει το απαραίτητο token.'
    },
    {
        id: 12,
        category: 'React & Browser Storage',
        question: 'Γιατί αποθηκεύουμε το Token στο localStorage του browser;',
        options: [
            { text: 'Για να παραμένει ο χρήστης συνδεδεμένος ακόμα κι αν κλείσει ή ανανεώσει (refresh) την καρτέλα του browser.', isCorrect: true },
            { text: 'Για να μπορεί η βάση δεδομένων να διαβάζει τον browser.', isCorrect: false },
            { text: 'Είναι υποχρεωτικό από τη JavaScript.', isCorrect: false },
        ],
        explanation: 'Το state της React χάνεται σε κάθε page reload. Το localStorage διατηρεί το token στον υπολογιστή του χρήστη μέχρι να πατήσει Logout.'
    },
    {
        id: 13,
        category: 'PHP & Architecture',
        question: 'Τι είναι ένα Trait στην PHP και γιατί χρειάστηκε το "use HasApiTokens" στο User.php;',
        options: [
            { text: 'Είναι μηχανισμός επαναχρησιμοποίησης κώδικα (horizontal reuse) που προσθέτει μεθόδους (όπως το createToken) στην κλάση User.', isCorrect: true },
            { text: 'Είναι τύπος πίνακα στη βάση δεδομένων PostgreSQL.', isCorrect: false },
            { text: 'Είναι μέθοδος της React για το state.', isCorrect: false },
        ],
        explanation: 'Η PHP δεν υποστηρίζει πολλαπλή κληρονομικότητα (multiple inheritance). Τα Traits επιτρέπουν να "εμβολιάζουμε" μεθόδους σε πολλές κλάσεις. Χωρίς το HasApiTokens, το Laravel πετάει Fatal Error: Call to undefined method createToken().'
    },
    {
        id: 14,
        category: 'Laravel 11 Gotchas',
        question: 'Στο Laravel 11, γιατί το Hash::make("admin") μέσα στον Seeder προκάλεσε αποτυχία στο Login;',
        options: [
            { text: 'Επειδή το User model έχει ήδη "password => hashed" στα casts, με αποτέλεσμα ο κωδικός να κρυπτογραφηθεί 2 φορές (Double Hashing).', isCorrect: true },
            { text: 'Επειδή η PostgreSQL δεν υποστηρίζει hashing κωδικών.', isCorrect: false },
            { text: 'Επειδή ο κωδικός admin θεωρείται αδύναμος από το framework.', isCorrect: false },
        ],
        explanation: 'Όταν ένα πεδίο έχει cast "hashed", το Eloquent τρέχει αυτόματα Hash::make() μόλις του αναθέσεις τιμή. Αν καλέσεις και εσύ Hash::make(), γίνεται hash πάνω στο hash, οπότε το Hash::check("admin", ...) αποτυγχάνει!'
    },
    {
        id: 15,
        category: 'Database & Testing',
        question: 'Ποια είναι η χρησιμότητα του DatabaseSeeder και της μεθόδου updateOrCreate();',
        options: [
            { text: 'Εισάγει προκαθορισμένα δεδομένα (όπως ο Demo Admin), εξασφαλίζοντας ότι δεν θα δημιουργηθούν διπλότυπα αν τρέξει πολλές φορές (idempotent).', isCorrect: true },
            { text: 'Διαγράφει όλους τους πίνακες και τα δεδομένα της βάσης.', isCorrect: false },
            { text: 'Αλλάζει τους κωδικούς όλων των χρηστών σε τυχαίους.', isCorrect: false },
        ],
        explanation: 'Τα Seeders εξασφαλίζουν ότι οποιοσδήποτε κατεβάσει το project (ή ένας recruiter) μπορεί να τρέξει "php artisan db:seed" και να έχει άμεσα έτοιμο περιβάλλον δοκιμής.'
    },
    {
        id: 16,
        category: 'Security & Sanctum',
        question: 'Γιατί το Laravel Sanctum αποθηκεύει τα tokens στον πίνακα "personal_access_tokens" στη βάση;',
        options: [
            { text: 'Για να μπορεί ο server να ελέγχει δικαιώματα, λήξεις, και κυρίως να ανακαλεί (revoke) άμεσα το token κατά το Logout.', isCorrect: true },
            { text: 'Για να φαίνονται οι κωδικοί των χρηστών.', isCorrect: false },
            { text: 'Για να συνδέεται με τη React.', isCorrect: false },
        ],
        explanation: 'Σε αντίθεση με τα καθαρά stateless JWTs, τα Sanctum database tokens επιτρέπουν άμεση ακύρωση (revocation): μόλις ο χρήστης πατήσει Logout, η εγγραφή διαγράφεται και το token αχρηστεύεται αμέσως.'
    },
    {
        id: 17,
        category: 'Frontend & Axios',
        question: 'Πώς διασφαλίζουμε στη React ότι όλα τα μελλοντικά HTTP requests θα έχουν το Bearer Token;',
        options: [
            { text: 'Ορίζοντας το global default header: axios.defaults.headers.common["Authorization"] = `Bearer ${token}`.', isCorrect: true },
            { text: 'Περνώντας το token ως παράμετρο στο URL (query param).', isCorrect: false },
            { text: 'Κάνοντας reload τη σελίδα σε κάθε κλικ.', isCorrect: false },
        ],
        explanation: 'Τα defaults του Axios εφαρμόζονται αυτόματα σε όλα τα get, post, delete requests, αποφεύγοντας την ανάγκη να γράφουμε τα headers χειροκίνητα σε κάθε endpoint.'
    },
    {
        id: 18,
        category: 'Dev Workflow & Troubleshooting',
        question: 'Όταν τρέχεις "php artisan serve" και λαμβάνεις το σφάλμα "Could not open input file: artisan", τι φταίει συνήθως;',
        options: [
            { text: 'Το τερματικό σου βρίσκεται σε λάθος φάκελο (πρέπει να είσαι μέσα στον ριζικό φάκελο nexus-crm όπου υπάρχει το αρχείο artisan).', isCorrect: true },
            { text: 'Έχει διαγραφεί η βάση δεδομένων.', isCorrect: false },
            { text: 'Έληξε το token του χρήστη.', isCorrect: false },
        ],
        explanation: 'Το artisan είναι ένα απλό αρχείο PHP που βρίσκεται στον φάκελο του Laravel. Αν το τερματικό σου είναι π.χ. στο C:\\Users\\...\\NexusCRM αντί για το nexus-crm, η PHP δεν το βρίσκει. Λύση: cd nexus-crm.'
    },
    {
        id: 19,
        category: 'Fullstack Architecture',
        question: 'Σε μια Decoupled Fullstack εφαρμογή (Laravel API + React Vite), πώς ξεκινάμε το περιβάλλον εργασίας κάθε μέρα;',
        options: [
            { text: 'Ανοίγουμε 2 ξεχωριστά τερματικά: ένα στο nexus-crm (php artisan serve --port=8080) και ένα στο nexus-frontend (npm run dev).', isCorrect: true },
            { text: 'Τρέχουμε μόνο τη React, το Laravel ξεκινάει αυτόματα μόνο του.', isCorrect: false },
            { text: 'Κάνουμε restart όλο τον υπολογιστή.', isCorrect: false },
        ],
        explanation: 'Επειδή το Backend (API port 8080) και το Frontend (Vite port 5173) είναι δύο ανεξάρτητες εφαρμογές, χρειάζονται δύο αυτόνομα τερματικά να τρέχουν ταυτόχρονα στο παρασκήνιο.'
    },
    {
        id: 20,
        category: 'Databases & OS Services',
        question: 'Αν κλείσεις το παράθυρο του pgAdmin 4 στα Windows (με το κόκκινο X), σταματάει να λειτουργεί η PostgreSQL βάση δεδομένων σου;',
        options: [
            { text: 'Όχι, η PostgreSQL τρέχει αυτόνομα ως Windows Background Service (πόρτα 5432). Το pgAdmin είναι απλά ένα εργαλείο προβολής (GUI).', isCorrect: true },
            { text: 'Ναι, σβήνονται αυτόματα όλα τα δεδομένα της βάσης.', isCorrect: false },
            { text: 'Ναι, το Laravel σταματάει αμέσως να έχει πρόσβαση.', isCorrect: false },
        ],
        explanation: 'Η βάση δεδομένων (PostgreSQL engine) τρέχει μόνιμα ως background service στο σύστημα. Εργαλεία όπως το pgAdmin, TablePlus ή DataGrip είναι απλά "παράθυρα" για να βλέπουμε εμείς τα δεδομένα.'
    },
    {
        id: 21,
        category: 'Laravel Eloquent',
        question: 'Πώς φορτώνουμε συσχετίσεις 3 επιπέδων (Πελάτες ➡️ Projects ➡️ Tasks) στο Laravel αποδοτικά;',
        options: [
            { text: 'Χρησιμοποιώντας dot-notation στο Eager Loading: Client::with("projects.tasks")->get().', isCorrect: true },
            { text: 'Κάνοντας 3 ξεχωριστά foreach loops.', isCorrect: false },
            { text: 'Με raw SQL subqueries σε κάθε controller.', isCorrect: false },
        ],
        explanation: 'Το with("projects.tasks") φορτώνει όλα τα παιδιά και τα εγγόνια (nested relations) με ελάχιστα queries, εξαλείφοντας το N+1 πρόβλημα σε όλο το δέντρο δεδομένων.'
    },
    {
        id: 22,
        category: 'REST API Verbs',
        question: 'Γιατί χρησιμοποιούμε HTTP PATCH αντί για PUT όταν αλλάζουμε μόνο το status ενός Task σε "done";',
        options: [
            { text: 'Το PATCH προορίζεται για μερική τροποποίηση (partial update) ενός πόρου, ενώ το PUT αντικαθιστά ολόκληρο το αντικείμενο.', isCorrect: true },
            { text: 'Το PUT δεν υποστηρίζεται από το Laravel.', isCorrect: false },
            { text: 'Για να είναι πιο γρήγορη η σύνδεση στο internet.', isCorrect: false },
        ],
        explanation: 'Σύμφωνα με το RFC πρότυπο REST: PUT = ολική αντικατάσταση (πρέπει να στείλεις όλα τα πεδία). PATCH = μερική ενημέρωση (στέλνεις μόνο το πεδίο που άλλαξε, π.χ. status).'
    },
    {
        id: 23,
        category: 'Async Architecture & Queues',
        question: 'Ποιος είναι ο κύριος λόγος που στέλνουμε χρονοβόρες εργασίες (όπως αποστολή emails) σε Background Queue;',
        options: [
            { text: 'Για να απαντάει το API αστραπιαία στον χρήστη (σε ms) χωρίς να τον κρατάει να περιμένει με loading spinner.', isCorrect: true },
            { text: 'Επειδή η PHP δεν μπορεί να στείλει email.', isCorrect: false },
            { text: 'Για να γλιτώσουμε χώρο στον σκληρό δίσκο.', isCorrect: false },
        ],
        explanation: 'Το HTTP αίτημα πρέπει να ολοκληρώνεται σε χιλιοστά του δευτερολέπτου. Με τα Queues, η χρονοβόρα αποστολή γίνεται στο παρασκήνιο από έναν Queue Worker χωρίς να μπλοκάρει το UI.'
    },
    {
        id: 24,
        category: 'Automated Testing',
        question: 'Τι είναι ένα Feature Test στο Laravel;',
        options: [
            { text: 'Ένα αυτοματοποιημένο τεστ που προσομοιώνει πραγματικά HTTP αιτήματα (GET, POST), ελέγχοντας ολόκληρη τη διαδρομή (Routes, Controllers, Auth, DB).', isCorrect: true },
            { text: 'Ένα τεστ για την ταχύτητα της οθόνης του υπολογιστή.', isCorrect: false },
            { text: 'Έλεγχος των σχολίων στον κώδικα.', isCorrect: false },
        ],
        explanation: 'Σε αντίθεση με τα Unit tests που ελέγχουν μια μεμονωμένη συνάρτηση, τα Feature tests ελέγχουν τη συνολική λειτουργία ενός endpoint όπως ακριβώς θα το καλούσε το Frontend.'
    },
    {
        id: 25,
        category: 'Testing Best Practices',
        question: 'Τι προσφέρει το trait "use RefreshDatabase" μέσα στα TestCase αρχεία;',
        options: [
            { text: 'Επαναφέρει και καθαρίζει τη δοκιμαστική βάση πριν από κάθε test, ώστε τα δεδομένα ενός test να μην επηρεάζουν τα επόμενα (Test Isolation).', isCorrect: true },
            { text: 'Σβήνει την πραγματική βάση παραγωγής.', isCorrect: false },
            { text: 'Κάνει restart τον web server.', isCorrect: false },
        ],
        explanation: 'Κάθε τεστ πρέπει να είναι αυτόνομο και ανεξάρτητο. Το RefreshDatabase διασφαλίζει καθαρό περιβάλλον σε κάθε μέθοδο δοκιμής.'
    },
    {
        id: 26,
        category: 'Testing Assertions',
        question: 'Τι ελέγχει η εντολή $this->assertDatabaseHas("clients", ["company_name" => "..."]);',
        options: [
            { text: 'Επαληθεύει ότι η συγκεκριμένη εγγραφή αποθηκεύτηκε πραγματικά μέσα στον πίνακα της βάσης δεδομένων.', isCorrect: true },
            { text: 'Διαγράφει τον πελάτη από τη βάση.', isCorrect: false },
            { text: 'Ελέγχει αν το Frontend έχει χρώμα μπλε.', isCorrect: false },
        ],
        explanation: 'Οι ισχυρισμοί βάσης (Database assertions) επιβεβαιώνουν ότι το API δεν επέστρεψε απλώς ένα status code, αλλά εκτέλεσε όντως τη σωστή αποθήκευση στη βάση.'
    },
    {
        id: 27,
        category: 'React & Routing',
        question: 'Γιατί εγκαθιστούμε το "react-router-dom" σε ένα Single Page Application (SPA);',
        options: [
            { text: 'Για να διαχειριζόμαστε πολλαπλές σελίδες και URLs (/crm, /quiz, /portfolio) ακαριαία, χωρίς να κάνει full reload ο browser.', isCorrect: true },
            { text: 'Για να συνδεθούμε με το router του σπιτιού μας.', isCorrect: false },
            { text: 'Επειδή το React δεν μπορεί να εμφανίσει κείμενο χωρίς αυτό.', isCorrect: false },
        ],
        explanation: 'Το react-router-dom επιτρέπει στο Frontend να αλλάζει το URL της γραμμής διευθύνσεων και να προβάλλει το αντίστοιχο component άμεσα, διατηρώντας το React state ζωντανό χωρίς περιττά page reloads.'
    },
    {
        id: 28,
        category: 'Vite & Tooling',
        question: 'Τι προσφέρει το Hot Module Replacement (HMR) του Vite κατά την εντολή "npm run dev";',
        options: [
            { text: 'Ανανεώνει ακαριαία μόνο το component ή το αρχείο που άλλαξες στον browser, χωρίς να χάνεται το state της εφαρμογής.', isCorrect: true },
            { text: 'Κάνει reset ολόκληρο τον υπολογιστή.', isCorrect: false },
            { text: 'Σβήνει τα αρχεία για εξοικονόμηση χώρου.', isCorrect: false },
        ],
        explanation: 'Το HMR (Hot Module Replacement) αντικαθιστά, προσθέτει ή αφαιρεί modules εν ώρα εκτέλεσης της εφαρμογής χωρίς full reload, προσφέροντας ασύγκριτη ταχύτητα στο development.'
    },
    {
        id: 29,
        category: 'React & Routing',
        question: 'Γιατί τοποθετούμε το <BrowserRouter> στην κορυφή της εφαρμογής (στο main.jsx);',
        options: [
            { text: 'Για να παρέχει το Routing Context σε όλο το application tree, αξιοποιώντας το HTML5 History API για URL navigation.', isCorrect: true },
            { text: 'Για να αλλάζει τα χρώματα του CSS.', isCorrect: false },
            { text: 'Για να συνδέεται με τη βάση PostgreSQL.', isCorrect: false },
        ],
        explanation: 'Το <BrowserRouter> λειτουργεί ως Context Provider για το Routing. Χωρίς αυτό στην κορυφή, components όπως <Routes>, <Route>, <NavLink> και hooks όπως το useNavigate() δεν μπορούν να λειτουργήσουν.'
    },
    {
        id: 30,
        category: 'Architecture: React vs Drupal',
        question: 'Σε τι αντιστοιχεί το main.jsx της React στη νοοτροπία του Drupal;',
        options: [
            { text: 'Στο Root Bootstrap & Service Providers (όπως Drupal Kernel & Services), όπου τυλίγουμε την εφαρμογή με καθολικά εργαλεία (Routing, Auth, Theme).', isCorrect: true },
            { text: 'Στο αρχείο robots.txt του server.', isCorrect: false },
            { text: 'Σε ένα απλό CSS theme αρχείο.', isCorrect: false },
        ],
        explanation: 'Όπως στο Drupal το kernel και τα core services παρέχουν καθολική λειτουργικότητα (Path, User Session) σε όλα τα modules, έτσι στο main.jsx της React ορίζουμε τους Global Context Providers (<BrowserRouter>, <AuthProvider>) που αγκαλιάζουν όλο το component tree.'
    },
    {
        id: 31,
        category: 'React Router',
        question: 'Ποια είναι η διαφορά μεταξύ <Routes> και <Route> στο react-router-dom;',
        options: [
            { text: 'Το <Routes> είναι ο κεντρικός διακόπτης (switch container) και περιέχει πολλαπλά <Route>, καθένα από τα οποία συνδέει ένα URL path με ένα συγκεκριμένο component.', isCorrect: true },
            { text: 'Το <Route> είναι για να στέλνουμε emails.', isCorrect: false },
            { text: 'Δεν έχουν καμία διαφορά, είναι συνώνυμα.', isCorrect: false },
        ],
        explanation: 'Το <Routes> ελέγχει το URL του browser και κάνει render μόνο εκείνο το παιδί-<Route> του οποίου το "path" ταιριάζει με την τρέχουσα διεύθυνση.'
    },
    {
        id: 32,
        category: 'React & JSX Debugging',
        question: 'Τι σημαίνει το σφάλμα "Expected corresponding JSX closing tag for div" στο Vite/React;',
        options: [
            { text: 'Ότι άνοιξε ένα <div> tag αλλά ξεχάστηκε να κλείσει με </div> πριν από κάποιο άλλο γονικό ή αδερφικό στοιχείο.', isCorrect: true },
            { text: 'Ότι η PostgreSQL βάση είναι εκτός λειτουργίας.', isCorrect: false },
            { text: 'Ότι ο browser δεν υποστηρίζει JavaScript.', isCorrect: false },
        ],
        explanation: 'Το JSX ακολουθεί αυστηρούς κανόνες XML σύνταξης: κάθε στοιχείο που ανοίγει πρέπει οπωσδήποτε να κλείνει με την ακριβή ιεραρχική σειρά. Αν ένα <div> μείνει ανοιχτό, ο compiler δεν μπορεί να καταλάβει πού τελειώνει το δέντρο του component.'
    },
    {
        id: 33,
        category: 'Developer Productivity & IDEs',
        question: 'Γιατί μια ακριβής αναζήτηση κώδικα (π.χ. στο JetBrains Rider) μπορεί να αποτύχει να εντοπίσει μια γραμμή;',
        options: [
            { text: 'Λόγω διαφορών στα κενά/tabs (whitespace), ή ενεργοποιημένων φίλτρων όπως το Regex (.*) και Match Case (Cc).', isCorrect: true },
            { text: 'Επειδή το IDE απαγορεύει την αναζήτηση σε αρχεία JSX.', isCorrect: false },
            { text: 'Επειδή ο κώδικας δεν έχει γίνει ακόμα commit στο Git.', isCorrect: false },
        ],
        explanation: 'Τα IDEs κάνουν exact character matching. Αν υπάρχει ένα παραπάνω κενό, tab, ή αν είναι ενεργό το κουμπί Regex (.*) όπου τα <, >, / εκλαμβάνονται ως σύμβολα regex, η αναζήτηση αποτυγχάνει. Pro-tip: Αναζητούμε πάντα μικρές μοναδικές λέξεις-κλειδιά όπως path="/" ή to="/crm".'
    },
    {
        id: 34,
        category: 'Architecture & Data Separation',
        question: 'Γιατί διαχωρίζουμε τα δεδομένα (π.χ. projectsData.js) από το component παρουσίασης (Portfolio.jsx);',
        options: [
            { text: 'Γιατί ακολουθούμε την αρχή Separation of Concerns: τα δεδομένα αλλάζουν εύκολα ή αντικαθίστανται με API call, χωρίς να επηρεάζεται το UI layout.', isCorrect: true },
            { text: 'Για να αυξήσουμε τον χρόνο φόρτωσης της σελίδας.', isCorrect: false },
            { text: 'Επειδή η React δεν επιτρέπει arrays μέσα σε components.', isCorrect: false },
        ],
        explanation: 'Το Separation of Concerns επιτρέπει στον κώδικα να είναι συντηρήσιμος (maintainable). Αύριο, αν αντί για τοπικό αρχείο projectsData.js τραβάμε τα έργα από το Laravel REST API (/api/projects), το component Portfolio.jsx θα παραμείνει απαράλλαχτο!'
    },
    {
        id: 35,
        category: 'React State & Array Methods',
        question: 'Πώς υλοποιούμε ακαριαίο φιλτράρισμα λίστας (π.χ. φίλτρο Web / Games) στη React χωρίς reload;',
        options: [
            { text: 'Συνδυάζοντας το useState για την ενεργή κατηγορία με τη μέθοδο Array.filter() της JavaScript κατά το render.', isCorrect: true },
            { text: 'Κάνοντας restart τον Vite development server σε κάθε κλικ.', isCorrect: false },
            { text: 'Εκτελώντας raw SQL queries απευθείας μέσα από το CSS.', isCorrect: false },
        ],
        explanation: 'Όταν ο χρήστης πατάει ένα κουμπί φίλτρου, το setFilter(cat) ενημερώνει το React state. Το component κάνει re-render αυτόματα και η JavaScript μέθοδος .filter() παράγει τη νέα υπο-λίστα στη μνήμη σε κλάσματα του millisecond.'
    },
    {
        id: 36,
        category: 'Authentication & Protected Routes',
        question: 'Γιατί σε ένα Portfolio SPA δεν πρέπει να βάζουμε "if (!token) return <Login />" καθολικά στην κορυφή του App.jsx;',
        options: [
            { text: 'Γιατί κλειδώνει ολόκληρο το site (Αρχική, Portfolio, Quiz, Docs) για τους ανώνυμους επισκέπτες και υποψήφιους εργοδότες.', isCorrect: true },
            { text: 'Γιατί τα tokens καταναλώνουν υπερβολική μνήμη RAM.', isCorrect: false },
            { text: 'Επειδή η React απαγορεύει το login εκτός backend.', isCorrect: false },
        ],
        explanation: 'Σε ένα επαγγελματικό portfolio, οι δημόσιες σελίδες (Home, Portfolio, Docs, Quiz) πρέπει να είναι ανοιχτές σε όλους (Guest / Anonymous). Μόνο η ιδιωτική διαδρομή του CRM (/crm) πρέπει να ελέγχει αν υπάρχει Sanctum token, προβάλλοντας τη φόρμα σύνδεσης μόνο εκεί.'
    },
    {
        id: 37,
        category: 'React Forms & State',
        question: 'Τι είναι ένα Controlled Component σε μια φόρμα React;',
        options: [
            { text: 'Ένα input του οποίου η τιμή (value) ελέγχεται απευθείας από το React state (useState) και ενημερώνεται με onChange.', isCorrect: true },
            { text: 'Ένα component που λειτουργεί μόνο με άδεια του διαχειριστή.', isCorrect: false },
            { text: 'Μια φόρμα που στέλνει τα δεδομένα χωρίς σύνδεση στο internet.', isCorrect: false },
        ],
        explanation: 'Στα Controlled Components, η μοναδική πηγή αλήθειας (Single Source of Truth) για το τι γράφει το input είναι το React state. Αυτό επιτρέπει άμεσο real-time validation, δυναμικό disable του κουμπιού αποστολής και πλήρη έλεγχο των δεδομένων.'
    },
    {
        id: 38,
        category: 'Git & Version Control',
        question: 'Τι κάνει η εντολή "git add ." πριν από το "git commit";',
        options: [
            { text: 'Μεταφέρει όλες τις αλλαγές (τροποποιημένα και νέα αρχεία) στο Staging Area (index) ώστε να συμπεριληφθούν στο επόμενο commit snapshot.', isCorrect: true },
            { text: 'Στέλνει αυτόματα τα αρχεία στον production web server.', isCorrect: false },
            { text: 'Διαγράφει όλα τα αρχεία του project.', isCorrect: false },
        ],
        explanation: 'Το Git λειτουργεί με 3 καταστάσεις: Working Directory ➡️ Staging Area (μέσω git add) ➡️ Local Repository (μέσω git commit). Με το "git add ." επιλέγουμε ποιες αλλαγές είναι έτοιμες να καταγραφούν στο επόμενο μόνιμο snapshot.'
    },
    {
        id: 39,
        category: 'React Modal Architecture',
        question: 'Πώς υλοποιείται ένα Modal popup παράθυρο στη σύγχρονη React;',
        options: [
            { text: 'Χρησιμοποιώντας React State (π.χ. selectedVideo !== null) για Conditional Rendering και event handlers για το κλείσιμο (onClose).', isCorrect: true },
            { text: 'Με παλιές jQuery εντολές όπως $("#modal").show().', isCorrect: false },
            { text: 'Κάνοντας full page reload της σελίδας.', isCorrect: false },
        ],
        explanation: 'Στη React, τα Modals είναι State-driven: όταν το state είναι null δεν φορτώνονται καθόλου στο DOM. Μόλις ο χρήστης πατήσει κλικ, το state παίρνει τιμή, το modal εμφανίζεται με backdrop blur και κλείνει αλλάζοντας ξανά το state σε null.'
    },
    {
        id: 40,
        category: 'Web Standards & iFrames',
        question: 'Γιατί σε ένα <iframe> δεν μπορούμε να βάλουμε κανονικό σύνδεσμο YouTube (π.χ. https://youtu.be/...);',
        options: [
            { text: 'Επειδή το YouTube μπλοκάρει τα κανονικά watch links μέσα σε iframe μέσω του security header "X-Frame-Options: SAMEORIGIN" και απαιτεί το ειδικό URL μορφής embed (/embed/VIDEO_ID).', isCorrect: true },
            { text: 'Επειδή τα iframes της HTML δεν υποστηρίζουν αναπαραγωγή βίντεο.', isCorrect: false },
            { text: 'Επειδή χρειάζεται ειδική πληρωμή στη Google για κάθε προβολή.', isCorrect: false },
        ],
        explanation: 'Για λόγους ασφαλείας (προστασία από Clickjacking επιθέσεις), το YouTube απαγορεύει το embedding των απλών σελίδων του. Επιτρέπει την προβολή μόνο μέσω του επίσημου player endpoint: https://www.youtube-nocookie.com/embed/VIDEO_ID.'
    },
    {
        id: 41,
        category: 'UI Architecture & Data Visualization',
        question: 'Γιατί σε ένα Skills Matrix ομαδοποιούμε τις τεχνολογίες ανά Domain (Web, Game Dev, Database, DevOps);',
        options: [
            { text: 'Για να μειώσουμε το νοητικό φορτίο (Cognitive Load) και να επιτρέψουμε στους τεχνικούς recruiters να αξιολογήσουν στοχευμένα τις δεξιότητες ανά ρόλο.', isCorrect: true },
            { text: 'Επειδή η JavaScript δεν μπορεί να διαβάσει πάνω από 5 skills ταυτόχρονα.', isCorrect: false },
            { text: 'Για να πιάνει λιγότερο χώρο στον σκληρό δίσκο.', isCorrect: false },
        ],
        explanation: 'Στον σχεδιασμό διεπαφών (UX Design), το Domain Grouping επιτρέπει στον υποψήφιο εργοδότη να δει αμέσως την πληρότητα του stack (T-shaped developer profile) χωρίς να χάνεται σε μια ατελείωτη ασύνδετη λίστα λέξεων-κλειδιών.'
    },
    {
        id: 42,
        category: 'UI Architecture & Progress Bars',
        question: 'Πώς σχεδιάζουμε δυναμικά progress bars στη React με Tailwind CSS;',
        options: [
            { text: 'Ορίζοντας το πλάτος (width) δυναμικά μέσω inline style (π.χ. style={{ width: `${skill.level}%` }}) σε συνδυασμό με transition-all.', isCorrect: true },
            { text: 'Με εξωτερικό Flash plugin.', isCorrect: false },
            { text: 'Κάνοντας resize το παράθυρο του browser.', isCorrect: false },
        ],
        explanation: 'Χρησιμοποιώντας inline style style={{ width: `${skill.level}%` }} σε συνδυασμό με transition-all duration-500, η μπάρα προόδου αποκτά ακριβές δυναμικό πλάτος με ομαλό εφέ γεμίσματος (smooth animation).'
    },
    {
        id: 43,
        category: 'React Context API & State',
        question: 'Γιατί χρησιμοποιούμε το React Context API αντί για εξωτερικές βαριές βιβλιοθήκες για τη διαχείριση γλώσσας (i18n);',
        options: [
            { text: 'Γιατί είναι ενσωματωμένο στη React (zero dependencies), αποφεύγει το Prop Drilling και παρέχει άμεση πρόσβαση στη γλώσσα από οποιοδήποτε component.', isCorrect: true },
            { text: 'Επειδή η React απαγορεύει τη χρήση εξωτερικών πακέτων.', isCorrect: false },
            { text: 'Για να αυξήσουμε τον όγκο του JavaScript bundle.', isCorrect: false },
        ],
        explanation: 'Το React Context API είναι το ιδανικό εργαλείο για Global State όπως Language (GR/EN) και Theme. Επιτρέπει σε οποιοδήποτε component (π.χ. Navbar, Card, Footer) να καλέσει useLanguage() χωρίς να χρειάζεται να περνάμε τη γλώσσα ως prop από γονέα σε παιδί.'
    },
    {
        id: 44,
        category: 'Internationalization (i18n)',
        question: 'Πώς λειτουργεί ένα Translation Dictionary (λεξικό μεταφράσεων) στη React;',
        options: [
            { text: 'Είναι ένα αντικείμενο με κλειδιά ανά γλώσσα ({ el: {...}, en: {...} }), απ\' όπου αντλούμε το σωστό κείμενο δυναμικά με translations[lang].section.key.', isCorrect: true },
            { text: 'Καλεί αυτόματα το Google Translate API σε κάθε render.', isCorrect: false },
            { text: 'Αλλάζει το domain name του website.', isCorrect: false },
        ],
        explanation: 'Με ένα δομημένο αντικείμενο translations[lang], η εφαρμογή επιλέγει άμεσα το σωστό κείμενο με βάση την τρέχουσα τιμή του lang ("el" ή "en") χωρίς καθυστέρηση δικτύου ή ανάγκη για εξωτερικά APIs.'
    },
    {
        id: 45,
        category: 'React Context / Architecture',
        question: 'Γιατί τοποθετούμε έναν Context Provider (π.χ. <LanguageProvider>) ψηλά στη ρίζα της εφαρμογής (main.jsx);',
        options: [
            { text: 'Ώστε οποιοδήποτε component μέσα στο δέντρο της εφαρμογής (Navbar, σελίδες, κουμπιά κ.λπ.) να έχει απρόσκοπτη πρόσβαση στο global state μέσω του useLanguage().', isCorrect: true },
            { text: 'Για να συνδεθεί αυτόματα η React με τη βάση δεδομένων PostgreSQL.', isCorrect: false },
            { text: 'Γιατί η JavaScript απαιτεί υποχρεωτικά τουλάχιστον έναν Provider για να ξεκινήσει ο browser.', isCorrect: false },
        ],
        explanation: 'Ένας Context Provider παρέχει τα δεδομένα (state & συναρτήσεις) αποκλειστικά στους απογόνους του (children). Τυλίγοντας την ρίζα της εφαρμογής, κάθε component σε οποιοδήποτε βάθος μπορεί να διαβάσει τη γλώσσα και να την αλλάξει.'
    },
    {
        id: 46,
        category: 'Internationalization (i18n)',
        question: 'Πώς καταναλώνουμε το useLanguage() σε ένα component (π.χ. Navbar) για άμεση εναλλαγή γλώσσας;',
        options: [
            { text: 'Κάνουμε destructure { lang, toggleLanguage } = useLanguage(), αντλούμε τα κείμενα με const t = translations[lang] και συνδέουμε το toggleLanguage στο onClick του κουμπιού.', isCorrect: true },
            { text: 'Κάνουμε window.location.reload() και αλλάζουμε χειροκίνητα το HTML αρχείο.', isCorrect: false },
            { text: 'Κάνουμε SQL query στη βάση δεδομένων για να μας επιστρέψει τα κείμενα του μενού.', isCorrect: false },
        ],
        explanation: 'Με το custom hook useLanguage(), το component έχει άμεση πρόσβαση στο state της γλώσσας. Μόλις εκτελεστεί το toggleLanguage(), η React προκαλεί αυτόματο re-render με το νέο λεξικό translations[lang] χωρίς full-page reload.'
    },
    {
        id: 47,
        category: 'React Architecture / Re-render',
        question: 'Όταν ο χρήστης αλλάζει γλώσσα μέσω του Context, πώς ενημερώνεται η οθόνη;',
        options: [
            { text: 'Η React προκαλεί αυτόματο re-render σε όλα τα components που καταναλώνουν το useLanguage(), σχεδιάζοντάς τα ακαριαία με το νέο λεξικό κειμένων.', isCorrect: true },
            { text: 'Ο browser εκτελεί πλήρες hard reload και κατεβάζει ξανά όλα τα JavaScript bundles από τον server.', isCorrect: false },
            { text: 'Ο Vite server κάνει restart στο παρασκήνιο για να επαναμεταγλωττίσει τα αρχεία.', isCorrect: false },
        ],
        explanation: 'Το React Context API παρακολουθεί τους "συνδρομητές" του. Όταν το state (lang) αλλάξει, όλα τα components που καλούν useLanguage() επανασχεδιάζονται αυτόματα στον virtual DOM, προσφέροντας native SPA εμπειρία χωρίς καθυστερήσεις.'
    },
    {
        id: 48,
        category: 'Data-driven UI & i18n',
        question: 'Ποια είναι η βέλτιστη πρακτική για διεθνοποίηση (i18n) σε σελίδες με δυναμικά δεδομένα (π.χ. Skills ή Timeline);',
        options: [
            { text: 'Συνδυασμός: οι στατικοί τίτλοι/κουμπιά αντλούνται από το translations[lang], ενώ τα αντικείμενα δεδομένων μπορούν να περιέχουν bilingual κλειδιά ή οικουμενικούς τεχνικούς όρους.', isCorrect: true },
            { text: 'Διπλασιασμός όλου του κώδικα σε δύο διαφορετικά components (SkillsEl.jsx και SkillsEn.jsx).', isCorrect: false },
            { text: 'Χρήση if/else σε κάθε γραμμή HTML του server.', isCorrect: false },
        ],
        explanation: 'Διατηρώντας Single Source of Truth, αποφεύγουμε τον διπλασιασμό του JSX layout. Το UI καταναλώνει τα δομικά κείμενα από το translation dictionary, διατηρώντας τον κώδικα DRY (Don\'t Repeat Yourself) και συντηρήσιμο.'
    },
    {
        id: 49,
        category: 'Forms & i18n',
        question: 'Πώς διαχειριζόμαστε labels και placeholders σε φόρμες (π.χ. Contact Form) σε πολυγλωσσικές εφαρμογές;',
        options: [
            { text: 'Περνάμε δυναμικές τιμές στα props (π.χ. placeholder={lang === "el" ? "..." : "..."} ή t.contact.*), διατηρώντας τη φόρμα πλήρως controlled και προσβάσιμη.', isCorrect: true },
            { text: 'Επανεγκαθιστούμε το React Router σε κάθε αλλαγή γλώσσας.', isCorrect: false },
            { text: 'Απαγορεύεται η χρήση placeholders όταν υπάρχει υποστήριξη i18n.', isCorrect: false },
        ],
        explanation: 'Στη React τα attributes των input (όπως placeholder, label, aria-label) δέχονται οποιαδήποτε JavaScript έκφραση. Έτσι, η φόρμα παραμένει ένα ενιαίο, ελεγχόμενο (controlled) component που αλλάζει γλώσσα αυτόματα.'
    },
    {
        id: 50,
        category: 'Architecture Milestone / i18n',
        question: 'Ποιο είναι το συνολικό αρχιτεκτονικό όφελος από τον συνδυασμό React Context + LocalStorage + Translation Dictionaries;',
        options: [
            { text: 'Πλήρης διεθνοποίηση (i18n) με μόνιμη αποθήκευση επιλογής χρήστη, μηδενικές εξωτερικές εξαρτήσεις (zero dependencies), αποφυγή Prop Drilling και ακαριαία ανανέωση του UI.', isCorrect: true },
            { text: 'Απαιτείται επανεκκίνηση του web browser για να εφαρμοστεί η αλλαγή γλώσσας.', isCorrect: false },
            { text: 'Χρειάζεται συνεχές fetching από εξωτερικό μεταφραστικό server που αυξάνει το network latency.', isCorrect: false },
        ],
        explanation: 'Ο συνδυασμός React Context API, LocalStorage persistence και Translation Dictionaries αποτελεί το απόλυτο βιομηχανικό πρότυπο για ταχύτατη, αξιόπιστη και ελαφριά διεθνοποίηση (i18n) σε σύγχρονα Single Page Applications.'
    },
    {
        id: 51,
        category: 'Laravel 11 / Eloquent & Migrations',
        question: 'Τι εξυπηρετεί η σημαία -m στην εντολή "php artisan make:model ContactMessage -m";',
        options: [
            { text: 'Δημιουργεί ταυτόχρονα το Eloquent Model (app/Models) και το αντίστοιχο Database Migration αρχείο (database/migrations) για τη δημιουργία του πίνακα στη βάση δεδομένων.', isCorrect: true },
            { text: 'Εκτελεί άμεσα migrate όλων των πινάκων στον production server.', isCorrect: false },
            { text: 'Ρυθμίζει αυτόματα το Mail service για αποστολή emails.', isCorrect: false },
        ],
        explanation: 'Η σημαία -m (συντομογραφία του --migration) είναι μία από τις πιο χρήσιμες εντολές του Artisan CLI. Διασφαλίζει ότι κάθε νέο Eloquent Model συνοδεύεται αμέσως από το migration αρχείο που θα δημιουργήσει τον πίνακα στη βάση δεδομένων.'
    },
    {
        id: 52,
        category: 'Laravel 11 / Security & Eloquent',
        question: 'Γιατί ορίζουμε το property "protected $fillable = [...]" στα Eloquent Models του Laravel;',
        options: [
            { text: 'Για προστασία από Mass Assignment Vulnerability: Καθορίζει ρητά ποια πεδία επιτρέπεται να συμπληρωθούν μαζικά από HTTP requests (π.χ. ContactMessage::create($data)).', isCorrect: true },
            { text: 'Για να δημιουργηθούν αυτόματα τα foreign keys στη βάση δεδομένων.', isCorrect: false },
            { text: 'Χωρίς το $fillable, το Laravel αρνείται να φορτώσει το route api.php.', isCorrect: false },
        ],
        explanation: 'Το Mass Assignment Protection προστατεύει την εφαρμογή από κακόβουλη έγχυση δεδομένων (over-posting attack). Ορίζοντας το $fillable, επιτρέπουμε ρητά μόνο τα ασφαλή πεδία και αποτρέπουμε αλλοίωση ευαίσθητων στηλών (π.χ. is_admin).'
    },
    {
        id: 53,
        category: 'Laravel 11 / Validation & REST API',
        question: 'Τι συμβαίνει όταν αποτύχει το $request->validate([...]) σε ένα REST API request στο Laravel;',
        options: [
            { text: 'Το Laravel διακόπτει την εκτέλεση και επιστρέφει αυτόματα JSON response με HTTP Status 422 (Unprocessable Entity) και αναλυτικό πίνακα σφαλμάτων για κάθε άκυρο πεδίο.', isCorrect: true },
            { text: 'Η εφαρμογή καταρρέει με 500 Internal Server Error.', isCorrect: false },
            { text: 'Αποθηκεύει τα δεδομένα ως κενά strings στη βάση δεδομένων.', isCorrect: false },
        ],
        explanation: 'Όταν το αίτημα στέλνεται από Axios/SPA με "Accept: application/json", το Laravel αναγνωρίζει αυτόματα το API context και σε περίπτωση σφάλματος validation επιστρέφει άμεσα status 422 με τα validation errors χωρίς session redirects.'
    },
    {
        id: 54,
        category: 'PHP / PSR-4 & Composer Autoloading',
        question: 'Πώς σχετίζεται το namespace μιας κλάσης (π.χ. namespace App\\Http\\Controllers;) με τη θέση του αρχείου;',
        options: [
            { text: 'Βάσει του προτύπου PSR-4, το namespace αντιστοιχεί επακριβώς στη διαδρομή του φακέλου (app/Http/Controllers/Controller.php). Αν το αρχείο βρίσκεται σε διαφορετικό φάκελο, ο Autoloader πετάει "Class not found".', isCorrect: true },
            { text: 'Η PHP ψάχνει αυτόματα σε ολόκληρο το λειτουργικό σύστημα χωρίς να νοιάζεται για φακέλους.', isCorrect: false },
            { text: 'Το namespace καθορίζει μόνο το όνομα της βάσης δεδομένων PostgreSQL.', isCorrect: false },
        ],
        explanation: 'Το PSR-4 αποτελεί το επίσημο βιομηχανικό πρότυπο του Composer για αυτόματη φόρτωση κλάσεων. Κάθε namespace namespace App\\A\\B; επιβάλλει το αρχείο να βρίσκεται στον φυσικό φάκελο app/A/B.php.'
    },
    {
        id: 55,
        category: 'Full-Stack Integration / Axios & Async UX',
        question: 'Ποιο είναι το σωστό pattern διαχείρισης μιας φόρμας κατά την υποβολή της σε REST API με Axios;',
        options: [
            { text: 'Χρήση async/await με try/catch: ενεργοποίηση loading state για αποφυγή διπλών κλικ, εμφάνιση μηνύματος επιτυχίας σε 201 Created, και δυναμική προβολή validation errors σε 422.', isCorrect: true },
            { text: 'Χρήση window.location.reload() αμέσως μόλις πατηθεί το κουμπί.', isCorrect: false },
            { text: 'Αποστολή των δεδομένων με απλό GET request στη γραμμή διευθύνσεων του browser.', isCorrect: false },
        ],
        explanation: 'Η ασύγχρονη διαχείριση (Async State Pattern) με Loading state, Error boundaries και Success feedback αποτελεί τον κανόνα για άψογο UX σε Decoupled Full-Stack εφαρμογές (React + Laravel).'
    },
    {
        id: 56,
        category: 'SEO & Web Standards / Open Graph',
        question: 'Γιατί είναι κρίσιμη η προσθήκη Open Graph (og:*) meta tags σε ένα επαγγελματικό portfolio;',
        options: [
            { text: 'Εξασφαλίζουν ότι πλατφόρμες όπως το LinkedIn, Discord και Slack δημιουργούν πλούσια οπτική προεπισκόπηση (Rich Social Card) με τίτλο, εικόνα και περιγραφή όταν μοιράζεσαι το portfolio σου με recruiters.', isCorrect: true },
            { text: 'Είναι υποχρεωτικά για να συνδεθεί το React με τη βάση δεδομένων.', isCorrect: false },
            { text: 'Επιταχύνουν την ταχύτητα εκτέλεσης της JavaScript στον browser.', isCorrect: false },
        ],
        explanation: 'Το Open Graph protocol (og:title, og:description, og:image) μετατρέπει ένα απλό URL σε ελκυστική κάρτα παρουσίασης στα social media, προσελκύοντας άμεσα το ενδιαφέρον τεχνικών recruiters και συνεργατών.'
    },
    {
        id: 57,
        category: 'React Context / Debugging',
        question: 'Όταν ένα κουμπί στο UI καλεί onClick={toggleLanguage} αλλά δεν αντιδρά, ποια είναι η συνηθέστερη αιτία στο Context API;',
        options: [
            { text: 'Η συνάρτηση toggleLanguage δεν έχει συμπεριληφθεί στο value prop του Context Provider (value={{ lang, setLanguage }} αντί για value={{ lang, toggleLanguage }}), με αποτέλεσμα να επιστρέφει undefined.', isCorrect: true },
            { text: 'Ο υπολογιστής χρειάζεται επανεκκίνηση για να φορτώσει η React.', isCorrect: false },
            { text: 'Το Tailwind CSS μπλοκάρει τις συναρτήσεις click στη React.', isCorrect: false },
        ],
        explanation: 'Όταν κάνουμε destructure { toggleLanguage } από το useLanguage() αλλά ο Provider δεν το παρέχει στο value={{ ... }}, η μεταβλητή παίρνει την τιμή undefined. Το onClick={undefined} δεν πετάει error αλλά δεν κάνει απολύτως τίποτα.'
    },
    {
        id: 58,
        category: 'React i18n / Architectural Design',
        question: 'Ποιο είναι το μεγαλύτερο πλεονέκτημα της χρήσης κεντρικού λεξικού μεταφράσεων (translations[lang]) έναντι των διάσπαρτων ternary operators (π.χ. lang === "el" ? "..." : "...") μέσα στα components;',
        options: [
            { text: 'Single Source of Truth: Όλα τα κείμενα είναι συγκεντρωμένα σε ένα αρχείο, επιτρέποντας εύκολη προσθήκη νέων γλωσσών, αποφυγή σκληροπυρηνικών (hardcoded) κειμένων στα JSX components και απόλυτη συνέπεια στην ορολογία.', isCorrect: true },
            { text: 'Μειώνει το μέγεθος της βάσης δεδομένων PostgreSQL.', isCorrect: false },
            { text: 'Είναι υποχρεωτικό από το Vite για να μπορέσει να κάνει compile.', isCorrect: false },
        ],
        explanation: 'Ένα κεντρικό schema μεταφράσεων ({ el: {...}, en: {...} }) διαχωρίζει πλήρως το Content Layer από το Presentation Layer. Έτσι, τα components παραμένουν καθαρά, επαναχρησιμοποιήσιμα και εύκολα στη συντήρηση.'
    },
    {
        id: 59,
        category: 'CSS Architecture & Layout Design',
        question: 'Γιατί σε ένα σύγχρονο Portfolio / Dashboard project δεν πρέπει να βάζουμε αυστηρό περιορισμό πλάτους (π.χ. max-w-6xl p-10) στο εξωτερικό App wrapper;',
        options: [
            { text: 'Επειδή "πνίγει" τα Hero banners και τα dynamic sections που απαιτούν πλήρες πλάτος οθόνης (Edge-to-Edge). Η σωστή πρακτική είναι το App να είναι 100% full-width, και κάθε σελίδα ή route (π.χ. CRM vs Home) να ορίζει εσωτερικά το δικό της max-w container.', isCorrect: true },
            { text: 'Επειδή το Tailwind CSS δεν επιτρέπει τη χρήση του max-w-6xl σε nested routes.', isCorrect: false },
            { text: 'Επειδή δημιουργεί πρόβλημα στα cookies του browser.', isCorrect: false },
        ],
        explanation: 'Η αρχιτεκτονική "Full-Width Canvas with Inner Containers" επιτρέπει στο Hero Banner να απλώνεται σε ολόκληρο το viewport (με φόντα και patterns), ενώ ταυτόχρονα διατηρεί τα panels του CRM ή του Blog τέλεια κεντραρισμένα και ευανάγνωστα.'
    },
    {
        id: 60,
        category: 'Tailwind CSS / Responsive Systems',
        question: 'Πώς διασφαλίζουμε ότι ένας πίνακας μετρητών (Stats) ή καρτών προσαρμόζεται τέλεια από κινητό σε desktop χωρίς να σπάνε οι διαχωριστικές γραμμές (dividers);',
        options: [
            { text: 'Χρησιμοποιούμε συνδυασμό divide-y lg:divide-y-0 lg:divide-x divide-slate-100, ώστε σε κινητά οι γραμμές να διαχωρίζουν οριζόντια τα στοιχεία (κάθετα στοιβαγμένα) και σε desktop οριζόντια (δίπλα-δίπλα).', isCorrect: true },
            { text: 'Βάζουμε σταθερό πλάτος width: 1200px σε όλα τα elements με inline CSS.', isCorrect: false },
            { text: 'Απενεργοποιούμε το responsive layout για να φαίνεται παντού η έκδοση υπολογιστή.', isCorrect: false },
        ],
        explanation: 'Οι responsive utility classes του Tailwind (π.χ. divide-y σε mobile και lg:divide-x σε desktop) προσαρμόζουν αυτόματα τους visual dividers στη διάταξη του flex/grid χωρίς περιττό custom CSS.'
    },
    {
        id: 61,
        category: 'React 19 / Forms & State Management',
        question: 'Ποιο είναι το ουσιαστικό πλεονέκτημα των Controlled Components (διαχείριση των inputs με React useState) σε σχέση με τα Uncontrolled Inputs;',
        options: [
            { text: 'Single Source of Truth: Το React State ελέγχει άμεσα την τιμή κάθε πεδίου (value={form.name}), επιτρέποντας real-time client validation, δυναμικό enabling/disabling του κουμπιού αποστολής και άμεσο καθαρισμό (reset) της φόρμας μετά την επιτυχή υποβολή.', isCorrect: true },
            { text: 'Τα Controlled Components δεν επιτρέπουν στον χρήστη να πληκτρολογήσει ελληνικούς χαρακτήρες.', isCorrect: false },
            { text: 'Είναι υποχρεωτικά μόνο αν χρησιμοποιούμε βάση δεδομένων MySQL.', isCorrect: false },
        ],
        explanation: 'Στα Controlled Components, κάθε αλλαγή στο input πυροδοτεί το onChange και ενημερώνει το State. Αυτό δίνει απόλυτο έλεγχο στο component για client-side validation, error handling, και άψογο UX πριν σταλούν τα δεδομένα στο REST API.'
    },
    {
        id: 62,
        category: 'SPA Architecture & React Patterns',
        question: 'Ποια είναι η ενδεδειγμένη αρχιτεκτονική για την τοποθέτηση κοινών στοιχείων (όπως Navbar, Footer και Floating Scroll-to-Top) σε μια React Single Page Application;',
        options: [
            { text: 'Τοποθέτησή τους στο κεντρικό Layout (App.jsx) έξω από το <Routes>, ώστε να παραμένουν σταθερά και διαθέσιμα σε όλες τις σελίδες χωρίς περιττό unmounting και re-rendering κατά την πλοήγηση.', isCorrect: true },
            { text: 'Αντιγραφή και επικόλληση του κώδικα του Footer ξεχωριστά σε κάθε αρχείο σελίδας (Home.jsx, Portfolio.jsx, CRM.jsx).', isCorrect: false },
            { text: 'Χρήση HTML <iframe> για να φορτώνεται το footer από τρίτη ιστοσελίδα.', isCorrect: false },
        ],
        explanation: 'Η αρχιτεκτονική "Persistent Shell / Layout Wrapper" τοποθετεί τα global components (Navbar, Footer, Modals, Back-to-Top) έξω από τις διαδρομές των Routes. Αυτό διατηρεί το global state, μειώνει το memory churn και εξασφαλίζει απόλυτη συνέπεια στην πλοήγηση.'
    },
    {
        id: 63,
        category: 'Frontend Performance & UX',
        question: 'Ποιο είναι το ουσιαστικό πλεονέκτημα του Client-Side In-Memory Filtering (μέσω JavaScript Array.filter) σε μια συλλογή έργων portfolio;',
        options: [
            { text: 'Zero Latency & Instant UX: Τα δεδομένα βρίσκονται ήδη στη μνήμη του client, επιτρέποντας ακαριαίο φιλτράρισμα κατηγοριών (0ms) χωρίς καθυστερήσεις δικτύου, HTTP requests ή spinners φόρτωσης.', isCorrect: true },
            { text: 'Το client-side filtering διαγράφει αυτόματα τα αρχεία από το δίσκο του server.', isCorrect: false },
            { text: 'Είναι υποχρεωτικό μόνο αν χρησιμοποιούμε παλιές εκδόσεις της PHP.', isCorrect: false },
        ],
        explanation: 'Για επιλεγμένα collections και portfolios (κάτω από μερικές εκατοντάδες εγγραφές), το In-Memory Client Filtering με React state και pure array methods προσφέρει άμεση αίσθηση ταχύτητας (snappiness), κρατώντας τον recruiter απόλυτα συγκεντρωμένο στα projects.'
    },
    {
        id: 64,
        category: 'React 19 / Debugging & Defensive UI',
        question: 'Όταν μια σελίδα σε React SPA εμφανίζει ξαφνικά λευκή οθόνη (Blank White Screen) μετά από αλλαγή κώδικα, ενώ το Vite build πέρασε με επιτυχία (0 errors), ποια είναι η πιο συνηθισμένη αιτία;',
        options: [
            { text: 'Runtime Uncaught Exception κατά το render phase: Συνήθως απόπειρα ανάγνωσης property από undefined (π.χ. t.skills.title όταν το skills λείπει από το λεξικό translations). Αντιμετωπίζεται με Optional Chaining (t?.skills?.title || fallback) και Error Boundaries.', isCorrect: true },
            { text: 'Ο υπολογιστής ξέμεινε προσωρινά από cookies ή storage.', isCorrect: false },
            { text: 'Το Tailwind CSS μπλοκάρει τις σελίδες που περιέχουν άνω των 50 γραμμών JSX.', isCorrect: false },
        ],
        explanation: 'Τα TypeScript ή bundler compilers ελέγχουν τη σύνταξη, αλλά δεν γνωρίζουν αν ένα runtime αντικείμενο θα έχει όντως το nested property κατά την εκτέλεση. Το Optional Chaining (?.) προστατεύει το component tree από ολική κατάρρευση (white screen of death).'
    },
    {
        id: 65,
        category: 'Web Portfolio & Professional Digital Identity',
        question: 'Ποιες είναι οι βέλτιστες πρακτικές ασφάλειας, SEO και UX κατά την ενσωμάτωση εξωτερικών επαγγελματικών συνδέσμων (LinkedIn, GitHub, GitLab) σε ένα σύγχρονο Developer Portfolio;',
        options: [
            { text: 'Χρήση target="_blank" με rel="noreferrer" (ή rel="noopener noreferrer") για αποφυγή Reverse Tabnabbing επιθέσεων και window.opener leak, κεντρική αποθήκευση URLs στο λεξικό translations για DRY συντηρησιμότητα, και προσθήκη αναγνωρίσιμων SVG εικονιδίων με σαφή aria-labels σε στρατηγικά σημεία (Navbar, Hero, Contact, Footer).', isCorrect: true },
            { text: 'Χρήση αποκλειστικά plain text URLs χωρίς hyperlinks για να μην φεύγει ο recruiter από τη σελίδα.', isCorrect: false },
            { text: 'Φόρτωση των προφίλ μέσα σε <iframe> για να μην ανοίγει ποτέ νέο tab.', isCorrect: false },
        ],
        explanation: 'Το rel="noreferrer" προστατεύει τον χρήστη και την εφαρμογή από reverse tabnabbing (όπου το νέο παράθυρο θα μπορούσε να χειραγωγήσει το window.opener). Η κεντρική διαχείριση στα translations διασφαλίζει ότι ένα μελλοντικό update στο username θα εφαρμοστεί ακαριαία σε ολόκληρο το site.'
    }
]

export default function Quiz() {
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [showExplanation, setShowExplanation] = useState({})

    const handleSelect = (questionId, optionIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: optionIndex
        })
        setShowExplanation({
            ...showExplanation,
            [questionId]: true
        })
    }

    const handleReset = () => {
        setSelectedAnswers({})
        setShowExplanation({})
    }

    // Υπολογισμός σκορ
    const answeredCount = Object.keys(selectedAnswers).length
    const correctCount = Object.entries(selectedAnswers).filter(([qId, optIdx]) => {
        const q = questions.find(q => q.id === parseInt(qId))
        return q.options[optIdx].isCorrect
    }).length

    return (
        <div className="space-y-6">
            {/* Header Quiz */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">🧠 Κέντρο Επανάληψης & Αυτοαξιολόγησης</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Τεστ γνώσεων πάνω σε Laravel, REST APIs και React
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">{correctCount}</span>
                        <span className="text-slate-400 text-sm"> / {questions.length}</span>
                        <p className="text-xs text-slate-400">Σωστές Απαντήσεις</p>
                    </div>
                    {answeredCount > 0 && (
                        <button
                            onClick={handleReset}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs px-3 py-2 rounded-lg font-medium transition"
                        >
                            🔄 Επανεκκίνηση
                        </button>
                    )}
                </div>
            </div>

            {/* Λίστα Ερωτήσεων */}
            <div className="space-y-4">
                {questions.map((q, index) => {
                    const selectedOption = selectedAnswers[q.id]
                    const isAnswered = selectedOption !== undefined

                    return (
                        <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {q.category}
                </span>
                                <span className="text-xs text-slate-400">Ερώτηση {index + 1} από {questions.length}</span>
                            </div>

                            <h3 className="font-semibold text-slate-800 text-base mb-4">
                                {q.question}
                            </h3>

                            {/* Επιλογές */}
                            <div className="space-y-2">
                                {q.options.map((opt, optIdx) => {
                                    let btnStyle = "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"

                                    if (isAnswered) {
                                        if (opt.isCorrect) {
                                            btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium"
                                        } else if (selectedOption === optIdx && !opt.isCorrect) {
                                            btnStyle = "border-rose-400 bg-rose-50 text-rose-800"
                                        } else {
                                            btnStyle = "border-slate-200 opacity-50 text-slate-400"
                                        }
                                    }

                                    return (
                                        <button
                                            key={optIdx}
                                            disabled={isAnswered}
                                            onClick={() => handleSelect(q.id, optIdx)}
                                            className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-start justify-between ${btnStyle}`}
                                        >
                                            <span>{opt.text}</span>
                                            {isAnswered && opt.isCorrect && <span className="text-emerald-600 font-bold ml-2">✓</span>}
                                            {isAnswered && selectedOption === optIdx && !opt.isCorrect && <span className="text-rose-600 font-bold ml-2">✗</span>}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Επεξήγηση (Senior Insight) */}
                            {showExplanation[q.id] && (
                                <div className="mt-4 p-3.5 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-900 leading-relaxed">
                                    <span className="font-bold">💡 Senior Note: </span>
                                    {q.explanation}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}