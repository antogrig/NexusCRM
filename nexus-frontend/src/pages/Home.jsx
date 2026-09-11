import { Link } from 'react-router-dom'
import {
    Code2,
    Gamepad2,
    Layers,
    Database,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    LayoutDashboard,
    Brain,
    BookOpen
} from 'lucide-react'

export default function Home() {
    return (
        <div className="space-y-12 py-4">

            {/* 1. Hero Section */}
            <section className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm relative overflow-hidden">
                {/* Διακοσμητικό φόντο */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 to-indigo-50 rounded-full blur-3xl -z-0 opacity-70"></div>

                <div className="relative z-10 max-w-3xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Full-Stack Web & Real-Time Engine Developer</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Γεφυρώνοντας το <span className="text-blue-600">Enterprise Web</span> με το <span className="text-amber-500">Unreal Engine</span>.
                    </h1>

                    <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                        Είμαι ο <strong>Αντώνης Γρηγοριάδης</strong>. Εξειδικεύομαι στην ανάπτυξη σύγχρονων Web εφαρμογών & CRM (Laravel 11, React 19, PostgreSQL, Drupal) και διαδραστικών simulations / game mechanics σε Unreal Engine 4/5 (C++, Blueprints, Gameplay Ability System).
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Link
                            to="/crm"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 text-sm transition"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Δες το Live CRM Demo</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl text-sm transition border border-slate-200"
                        >
                            <Layers className="w-4 h-4 text-slate-500" />
                            <span>Έργα & Case Studies</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Bento Grid: Οι Δύο Πυλώνες Εξειδίκευσης */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Κάρτα 1: Full-Stack Web & CRM Architecture */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Code2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">
                        Full-Stack Web & CRM Systems
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Αρχιτεκτονική enterprise εφαρμογών με Decoupled λογική (REST API + React SPA), ασφάλεια με Laravel Sanctum, βάσεις PostgreSQL / MySQL και legacy εμπειρία σε Drupal CMS.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {['Laravel 11', 'React 19', 'PostgreSQL', 'Drupal', 'Tailwind CSS', 'Docker'].map((tech) => (
                            <span key={tech} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-medium">
                {tech}
              </span>
                        ))}
                    </div>
                </div>

                {/* Κάρτα 2: Unreal Engine 4/5 Specialist */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-amber-300 transition">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Gamepad2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">
                        Unreal Engine 4/5 & Interactive
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Ανάπτυξη gameplay συστημάτων σε C++ και Blueprints, υλοποίηση Gameplay Ability System (GAS), AI συμπεριφορές με Behavior Trees, State Trees και real-time optimization.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {['Unreal Engine 5', 'C++', 'GAS', 'Behavior Trees', 'Blueprints', 'Mobile Game Dev'].map((tech) => (
                            <span key={tech} className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 font-mono text-xs font-medium border border-amber-100">
                {tech}
              </span>
                        ))}
                    </div>
                </div>

            </section>

            {/* 3. Interactive Hub: Quiz & Live Docs */}
            <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-8 md:p-10 shadow-lg">
                <div className="max-w-3xl space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                        <span>Proof of Mastery & Transparency</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Διαδραστική Τεκμηρίωση & Αυτοαξιολόγηση
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Κάθε γραμμή κώδικα και αρχιτεκτονική απόφαση σε αυτό το portfolio συνοδεύεται από ζωντανή τεκμηρίωση και διαδραστικό quiz γνώσεων.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            to="/quiz"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition"
                        >
                            <Brain className="w-4 h-4" />
                            <span>Δοκίμασε το Tech Quiz</span>
                        </Link>
                        <Link
                            to="/docs"
                            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-bold px-5 py-2.5 rounded-lg transition"
                        >
                            <BookOpen className="w-4 h-4 text-amber-400" />
                            <span>Άνοιξε τα Live Docs</span>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}