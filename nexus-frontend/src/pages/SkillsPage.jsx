import { useState } from 'react'
import { skillsCategories, experienceTimeline } from '../data/skillsData'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'
import {
    Server,
    Layout,
    Gamepad2,
    Wrench,
    Sparkles,
    Briefcase,
    Calendar,
    CheckCircle2,
    Layers
} from 'lucide-react'

export default function SkillsPage() {
    const { lang } = useLanguage()
    const t = translations[lang]
    const [activeCategory, setActiveCategory] = useState('all')

    const getCategoryIcon = (id) => {
        switch (id) {
            case 'backend': return <Server className="w-5 h-5 text-[#ff014f]" />
            case 'frontend': return <Layout className="w-5 h-5 text-indigo-600" />
            case 'game_dev': return <Gamepad2 className="w-5 h-5 text-amber-500" />
            case 'devops': return <Wrench className="w-5 h-5 text-emerald-600" />
            default: return <Layers className="w-5 h-5 text-slate-600" />
        }
    }

    const filteredCategories = activeCategory === 'all'
        ? skillsCategories
        : skillsCategories.filter(cat => cat.id === activeCategory)

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-16">

            {/* 1. Header Σελίδας */}
            <div className="bg-[#f8f9fa] rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-sm text-center space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#ff014f] uppercase">
                    <span>{t?.skills?.tag || 'TECHNICAL CAPABILITIES'}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                    {t?.skills?.title || (lang === 'el' ? 'Τεχνολογικό Stack & Δεξιότητες' : 'Technology Stack & Skills')}
                </h1>
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                    {t?.skills?.subtitle || (lang === 'el' ? 'Αναλυτική κατανομή δεξιοτήτων σε Full-Stack Web και Unreal Engine 5.' : 'Detailed breakdown of Full-Stack Web and Unreal Engine 5 capabilities.')}
                </p>

                {/* Φίλτρα Domains */}
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-6 py-3 rounded-full text-xs font-bold transition cursor-pointer ${
                            activeCategory === 'all'
                                ? 'bg-[#ff014f] text-white shadow-lg shadow-[#ff014f]/25 transform -translate-y-0.5'
                                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50 shadow-sm'
                        }`}
                    >
                        {t?.skills?.allDomains || (lang === 'el' ? 'Όλοι οι Τομείς' : 'All Domains')}
                    </button>
                    {skillsCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                                activeCategory === cat.id
                                    ? 'bg-[#ff014f] text-white shadow-lg shadow-[#ff014f]/25 transform -translate-y-0.5'
                                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50 shadow-sm'
                            }`}
                        >
                            <span>{cat.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Skills Matrix Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredCategories.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm space-y-6 hover:shadow-xl hover:border-[#ff014f]/40 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                                {getCategoryIcon(cat.id)}
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-900 leading-tight">
                                    {cat.title}
                                </h2>
                                <p className="text-xs text-slate-400 font-medium">
                                    {cat.skills.length} {lang === 'el' ? 'Εξειδικευμένες Τεχνολογίες' : 'Specialized Technologies'}
                                </p>
                            </div>
                        </div>

                        {/* Λίστα Δεξιοτήτων με Progress Bars */}
                        <div className="space-y-5">
                            {cat.skills.map((skill) => (
                                <div key={skill.name} className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-slate-900">{skill.name}</span>
                                        <span className="font-mono text-[#ff014f] font-bold">{skill.level}%</span>
                                    </div>

                                    {/* Dynamic Progress Bar */}
                                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${
                                                cat.id === 'backend' ? 'bg-[#ff014f]' :
                                                    cat.id === 'frontend' ? 'bg-indigo-600' :
                                                        cat.id === 'game_dev' ? 'bg-amber-500' : 'bg-emerald-500'
                                            }`}
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>

                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {skill.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>

            {/* 3. Experience Timeline Section */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#ff014f]/10 text-[#ff014f] flex items-center justify-center">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">
                            {t?.skills?.timelineTitle || (lang === 'el' ? 'Επαγγελματική Πορεία & Ορόσημα' : 'Career Trajectory & Milestones')}
                        </h2>
                        <p className="text-xs text-slate-500">
                            {t?.skills?.timelineSubtitle || (lang === 'el' ? 'Ιστορικό παραγωγής και εξειδίκευσης' : 'Production history and specialization')}
                        </p>
                    </div>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                    {experienceTimeline.map((item, idx) => (
                        <div key={idx} className="relative pl-10 space-y-3">
                            {/* Timeline Bullet */}
                            <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full border-2 border-[#ff014f] bg-white shadow-sm"></div>

                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 text-white">
                                    <Calendar className="w-3 h-3" />
                                    <span>{item.period}</span>
                                </span>
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-[#ff014f] border border-rose-100">
                                    {item.type}
                                </span>
                            </div>

                            <h3 className="text-lg font-black text-slate-900">
                                {item.role} <span className="text-slate-400 font-normal">@ {item.company}</span>
                            </h3>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-1">
                                {item.tags.map((tag) => (
                                    <span key={tag} className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200/60">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}