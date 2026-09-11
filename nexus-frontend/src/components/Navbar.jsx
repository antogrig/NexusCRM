import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Brain, BookOpen, Briefcase, Home } from 'lucide-react'

export default function Navbar() {
    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition ${
            isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

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

                {/* Navigation Links */}
                <nav className="flex items-center gap-1">
                    <NavLink to="/" className={linkClass}>
                        <Home className="w-4 h-4" />
                        <span>Αρχική</span>
                    </NavLink>

                    <NavLink to="/portfolio" className={linkClass}>
                        <Briefcase className="w-4 h-4" />
                        <span>Portfolio</span>
                    </NavLink>

                    <NavLink to="/skills" className={linkClass}>
                        <Layers className="w-4 h-4" />
                        <span>Δεξιότητες</span>
                    </NavLink>

                    <NavLink to="/crm" className={linkClass}>
                        <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                        <span>Live CRM Demo</span>
                    </NavLink>

                    <NavLink to="/contact" className={linkClass}>
                        <span>Επικοινωνία</span>
                    </NavLink>

                    <NavLink to="/quiz" className={linkClass}>
                        <Brain className="w-4 h-4 text-blue-500" />
                        <span>Tech Quiz</span>
                    </NavLink>

                    <NavLink to="/docs" className={linkClass}>
                        <BookOpen className="w-4 h-4 text-amber-500" />
                        <span>Docs</span>
                    </NavLink>
                </nav>

            </div>
        </header>
    )
}