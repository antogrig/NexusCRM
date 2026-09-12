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
                ? 'bg-[#ff014f] text-white shadow-sm shadow-[#ff014f]/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

                {/* Brand / Logo */}
                <NavLink to="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm group-hover:bg-[#ff014f] transition">
                        AG
                    </div>
                    <div>
                        <div className="font-bold text-sm text-slate-800 leading-tight">Antonis Grigoriadis</div>
                        <div className="text-[10px] text-slate-400 font-mono">Full-Stack & Unreal Dev</div>
                    </div>
                </NavLink>

                {/* Navigation Links, Socials & Language Switcher */}
                <div className="flex items-center gap-3">
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
                            <LayoutDashboard className="w-4 h-4 text-emerald-500" />
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

                    {/* Social Quick Links */}
                    <div className="hidden md:flex items-center gap-1.5 pl-3 border-l border-slate-200">
                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/antonis-grigoriadis/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn Profile"
                            title="LinkedIn: Antonis Grigoriadis"
                            className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white text-slate-600 flex items-center justify-center transition shadow-sm"
                        >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/antogrig"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub Profile"
                            title="GitHub: antogrig"
                            className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-900 hover:border-slate-900 hover:text-white text-slate-600 flex items-center justify-center transition shadow-sm"
                        >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>

                        {/* GitLab */}
                        <a
                            href="https://gitlab.com/antogrig"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitLab Profile"
                            title="GitLab: antogrig"
                            className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-[#fc6d26] hover:border-[#fc6d26] hover:text-white text-slate-600 flex items-center justify-center transition shadow-sm"
                        >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M22.65 14.39L20 6.21a.75.75 0 00-1.42 0l-2.65 8.18H8.07L5.42 6.21a.75.75 0 00-1.42 0L1.35 14.39a1.5 1.5 0 00.54 1.68l10.11 7.34a1.5 1.5 0 001.78 0l10.11-7.34a1.5 1.5 0 00.54-1.68z" />
                            </svg>
                        </a>
                    </div>

                    {/* Κουμπί Εναλλαγής Γλώσσας (Language Switcher) */}
                    <button
                        onClick={toggleLanguage}
                        aria-label="Toggle language"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition cursor-pointer shadow-sm hover:border-slate-300"
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