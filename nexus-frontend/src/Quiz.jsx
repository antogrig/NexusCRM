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