import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projectsData } from '../data/projectsData'
import VideoModal from '../components/VideoModal'
import { useLanguage } from '../context/LanguageContext'
import {
    Code2,
    Gamepad2,
    Layers,
    ArrowRight,
    CheckCircle2,
    Play,
    Brain,
    LayoutDashboard
} from 'lucide-react'

export default function Portfolio() {
    const { lang } = useLanguage()
    const [activeFilter, setActiveFilter] = useState('all')
    const [activeVideoProject, setActiveVideoProject] = useState(null)

    // In-Memory Client-Side Filtering
    const filteredProjects = activeFilter === 'all'
        ? projectsData
        : projectsData.filter((p) => p.category === activeFilter)

    const filterBtnClass = (cat) => {
        const isActive = activeFilter === cat
        return `px-6 py-3 rounded-full text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            isActive
                ? 'bg-[#ff014f] text-white shadow-lg shadow-[#ff014f]/25 transform -translate-y-0.5'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
        }`
    }

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-16">

            {/* =================================================================
                1. REENI PORTFOLIO HEADER & FILTER PILLS
               ================================================================= */}
            <div className="bg-[#f8f9fa] rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#ff014f] uppercase">
                        <span>PORTFOLIO & CASE STUDIES</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        {lang === 'el' ? 'Επιλεγμένα Έργα & Αρχιτεκτονική' : 'Curated Projects & Architecture'}
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {lang === 'el'
                            ? 'Decoupled web εφαρμογές με Laravel 11 & React 19, βάσεις PostgreSQL, καθώς και εξειδικευμένα συστήματα μάχης σε Unreal Engine 5 με C++ & GAS.'
                            : 'Decoupled web applications with Laravel 11 & React 19, PostgreSQL databases, and specialized gameplay combat systems in Unreal Engine 5 with C++ & GAS.'}
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-3">
                    <button onClick={() => setActiveFilter('all')} className={filterBtnClass('all')}>
                        <span>{lang === 'el' ? 'Όλα' : 'All'}</span>
                        <span className="text-[11px] opacity-75 font-mono">({projectsData.length})</span>
                    </button>
                    <button onClick={() => setActiveFilter('web')} className={filterBtnClass('web')}>
                        <Code2 className="w-4 h-4" />
                        <span>Web & CRM</span>
                        <span className="text-[11px] opacity-75 font-mono">
                            ({projectsData.filter(p => p.category === 'web').length})
                        </span>
                    </button>
                    <button onClick={() => setActiveFilter('game')} className={filterBtnClass('game')}>
                        <Gamepad2 className="w-4 h-4" />
                        <span>Unreal Engine 5</span>
                        <span className="text-[11px] opacity-75 font-mono">
                            ({projectsData.filter(p => p.category === 'game').length})
                        </span>
                    </button>
                </div>
            </div>

            {/* =================================================================
                2. PROJECTS GRID (BENTO REENI STYLE CARDS)
               ================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredProjects.map((project) => {
                    const isWeb = project.category === 'web'

                    return (
                        <div
                            key={project.id}
                            className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-[#ff014f]/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group"
                        >
                            <div className="space-y-6">
                                {/* Top Category & Status Badges */}
                                <div className="flex items-center justify-between gap-2">
                                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                        isWeb
                                            ? 'bg-rose-50 text-[#ff014f] border border-rose-100'
                                            : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                    }`}>
                                        {isWeb ? <Code2 className="w-3.5 h-3.5" /> : <Gamepad2 className="w-3.5 h-3.5" />}
                                        <span>{project.categoryLabel}</span>
                                    </span>

                                    {project.isInternalDemo ? (
                                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 animate-pulse flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            Live Demo
                                        </span>
                                    ) : project.videoUrl ? (
                                        <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-200">
                                            Gameplay Video
                                        </span>
                                    ) : null}
                                </div>

                                {/* Title & Description */}
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black text-slate-900 group-hover:text-[#ff014f] transition-colors leading-snug">
                                        {project.title}
                                    </h2>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Key Features */}
                                <div className="space-y-2.5 pt-2">
                                    <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                        {lang === 'el' ? 'Βασικά Χαρακτηριστικά' : 'Key Capabilities'}
                                    </div>
                                    <div className="space-y-2">
                                        {project.features.map((feat, idx) => (
                                            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                                                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isWeb ? 'text-[#ff014f]' : 'text-indigo-600'}`} />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech Stack Pills */}
                                <div className="pt-2">
                                    <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                                        {lang === 'el' ? 'Τεχνολογίες & Εργαλεία' : 'Tech Stack & Tools'}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-mono text-xs font-medium border border-slate-200/60"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Reeni Action Button */}
                            <div className="pt-8 mt-8 border-t border-slate-100">
                                {project.isInternalDemo ? (
                                    <Link
                                        to={project.liveDemoUrl}
                                        className="w-full inline-flex items-center justify-center gap-2.5 bg-[#ff014f] hover:bg-[#d90042] text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider transition shadow-md shadow-[#ff014f]/25 transform hover:-translate-y-0.5"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        <span>{lang === 'el' ? 'Άνοιγμα Live Interactive Demo' : 'Launch Interactive Demo'}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ) : project.videoUrl ? (
                                    <button
                                        onClick={() => setActiveVideoProject(project)}
                                        className="w-full inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider transition shadow-md transform hover:-translate-y-0.5 cursor-pointer"
                                    >
                                        <Play className="w-4 h-4 fill-current text-indigo-400" />
                                        <span>{lang === 'el' ? 'Προβολή Gameplay Video' : 'Watch Gameplay Showcase'}</span>
                                    </button>
                                ) : (
                                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-4 py-3 rounded-full border border-slate-200 w-full justify-center">
                                        <Layers className="w-4 h-4 text-emerald-500" />
                                        <span>Enterprise Architecture Case Study</span>
                                    </div>
                                )}
                            </div>

                        </div>
                    )
                })}
            </div>

            {/* =================================================================
                3. BOTTOM INTERACTIVE HUB REMINDER
               ================================================================= */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center md:text-left">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                        Validation & Technical Mastery
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black">
                        {lang === 'el' ? 'Θέλετε να εξερευνήσετε τις αρχιτεκτονικές λεπτομέρειες;' : 'Want to explore the architectural details?'}
                    </h3>
                    <p className="text-slate-300 text-sm max-w-xl">
                        {lang === 'el'
                            ? 'Δοκιμάστε το Tech Quiz 63 ερωτήσεων ή εξερευνήστε τα Live Interactive Docs για αναλυτικές επεξηγήσεις.'
                            : 'Test your knowledge with the 63-question Tech Quiz or explore the Live Interactive Docs for in-depth insights.'}
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 shrink-0">
                    <Link
                        to="/quiz"
                        className="inline-flex items-center gap-2 bg-[#ff014f] hover:bg-[#d90042] text-white text-xs font-bold px-6 py-3.5 rounded-full transition shadow-lg shadow-[#ff014f]/25"
                    >
                        <Brain className="w-4 h-4" />
                        <span>{lang === 'el' ? 'Tech Quiz' : 'Tech Quiz'}</span>
                    </Link>
                    <Link
                        to="/crm"
                        className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-bold px-6 py-3.5 rounded-full transition"
                    >
                        <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                        <span>{lang === 'el' ? 'Live CRM Demo' : 'Live CRM Demo'}</span>
                    </Link>
                </div>
            </div>

            {/* Video Modal Component */}
            <VideoModal
                project={activeVideoProject}
                onClose={() => setActiveVideoProject(null)}
            />
        </div>
    )
}