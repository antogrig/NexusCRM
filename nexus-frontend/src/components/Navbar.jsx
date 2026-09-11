import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Brain, BookOpen, Briefcase, Home, Layers, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function Navbar() {
    const { lang, toggleLanguage } = useLanguage()
    const t = translations[lang]

    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition ${
            isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

                {/* Brand / Logo */}
                <NavLink to="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 transition">
                        AG
                    </div>
                    <div>
                        <div className="font-bold text-sm text-slate-800 leading-tight">Antonis Grigoriadis</div>
                        <div className="text-[10px] text-slate-400 font-mono">Full-Stack & Unreal Dev</div>
                    </div>
                </NavLink>

                {/* Navigation Links & Language Switcher */}
                <div className="flex items-center gap-2">
                    <nav className="flex items-center gap-1">
                        <NavLink to="/" className={linkClass}>
                            <Home className="w-4 h-4" />
                            <span>{t.nav.home}</span>
                        </NavLink>

                        <NavLink to="/portfolio" className={linkClass}>
                            <Briefcase className="w-4 h-4" />
                            <span>{t.nav.portfolio}</span>
                        </NavLink>

                        <NavLink to="/skills" className={linkClass}>
                            <Layers className="w-4 h-4" />
                            <span>{t.nav.skills}</span>
                        </NavLink>

                        <NavLink to="/crm" className={linkClass}>
                            <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                            <span>{t.nav.crm}</span>
                        </NavLink>

                        <NavLink to="/contact" className={linkClass}>
                            <span>{t.nav.contact}</span>
                        </NavLink>

                        <NavLink to="/quiz" className={linkClass}>
                            <Brain className="w-4 h-4 text-blue-500" />
                            <span>{t.nav.quiz}</span>
                        </NavLink>

                        <NavLink to="/docs" className={linkClass}>
                            <BookOpen className="w-4 h-4 text-amber-500" />
                            <span>{t.nav.docs}</span>
                        </NavLink>
                    </nav>

                    {/* Κουμπί Εναλλαγής Γλώσσας (Language Switcher) */}
                    <button
                        onClick={toggleLanguage}
                        aria-label="Toggle language"
                        className="flex items-center gap-1.5 px-3 py-1.5 ml-2 rounded-lg text-xs font-bold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition cursor-pointer shadow-sm hover:border-slate-300"
                        title={lang === 'el' ? 'Switch to English' : 'Αλλαγή σε Ελληνικά'}
                    >
                        <Globe className="w-3.5 h-3.5 text-slate-500" />
                        <span>{lang === 'el' ? '🇬🇷 GR' : '🇬🇧 EN'}</span>
                    </button>
                </div>

            </div>
        </header>
    )
}