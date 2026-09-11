import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projectsData } from '../data/projectsData'
import {
    Code2,
    Gamepad2,
    Layers,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    ExternalLink
} from 'lucide-react'

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all')

    // Φιλτράρισμα των έργων στη μνήμη (Array.filter)
    const filteredProjects = activeFilter === 'all'
        ? projectsData
        : projectsData.filter((p) => p.category === activeFilter)

    const filterBtnClass = (cat) =>
        `px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeFilter === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
        }`

    return (
        <div className="space-y-8 py-4">

            {/* 1. Header Σελίδας */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Curated Engineering Portfolio</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Επιλεγμένα Έργα & Case Studies
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Enterprise συστήματα Web & CRM και διαδραστικά simulations σε Unreal Engine 5.
                    </p>
                </div>

                {/* 2. Κουμπιά Φίλτρων */}
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => setActiveFilter('all')} className={filterBtnClass('all')}>
                        <span>Όλα</span>
                        <span className="text-[10px] opacity-75">({projectsData.length})</span>
                    </button>
                    <button onClick={() => setActiveFilter('web')} className={filterBtnClass('web')}>
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Web & CRM</span>
                        <span className="text-[10px] opacity-75">
              ({projectsData.filter(p => p.category === 'web').length})
            </span>
                    </button>
                    <button onClick={() => setActiveFilter('game')} className={filterBtnClass('game')}>
                        <Gamepad2 className="w-3.5 h-3.5" />
                        <span>Unreal Engine 5</span>
                        <span className="text-[10px] opacity-75">
              ({projectsData.filter(p => p.category === 'game').length})
            </span>
                    </button>
                </div>
            </div>

            {/* 3. Grid με τα Έργα (Bento Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => {
                    const isWeb = project.category === 'web'

                    return (
                        <div
                            key={project.id}
                            className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                {/* Badge Κατηγορίας & Εικονίδιο */}
                                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      isWeb
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    {isWeb ? <Code2 className="w-3 h-3" /> : <Gamepad2 className="w-3 h-3" />}
                      <span>{project.categoryLabel}</span>
                  </span>

                                    {project.isInternalDemo && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 animate-pulse">
                      Live App
                    </span>
                                    )}
                                </div>

                                {/* Τίτλος & Περιγραφή */}
                                <h2 className="text-xl font-bold text-slate-900 leading-snug">
                                    {project.title}
                                </h2>
                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Βασικά Χαρακτηριστικά (Features) */}
                                <div className="space-y-1.5 pt-2">
                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        Βασικά Χαρακτηριστικά:
                                    </div>
                                    {project.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isWeb ? 'text-blue-500' : 'text-amber-500'}`} />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Tech Stack Pills */}
                                <div className="pt-2">
                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        Τεχνολογίες:
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] font-medium"
                                            >
                        {tech}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Button στο κάτω μέρος */}
                            <div className="pt-6 mt-6 border-t border-slate-100">
                                {project.isInternalDemo ? (
                                    <Link
                                        to={project.liveDemoUrl}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-sm"
                                    >
                                        <span>Άνοιγμα Live Interactive Demo</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                ) : (
                                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 w-full justify-center">
                                        <span>Unreal Engine 5 Case Study</span>
                                    </div>
                                )}
                            </div>

                        </div>
                    )
                })}
            </div>

        </div>
    )
}