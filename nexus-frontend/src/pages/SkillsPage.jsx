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
            case 'backend': return <Server className="w-5 h-5 text-blue-600" />
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
        <div className="space-y-12 py-4">

            {/* 1. Header Σελίδας */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t.skills.tag}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {t.skills.title}
                </h1>
                <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
                    {t.skills.subtitle}
                </p>

                {/* Φίλτρα Domains */}
                <div className="flex flex-wrap justify-center gap-2 pt-4">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                            activeCategory === 'all'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {t.skills.allDomains}
                    </button>
                    {skillsCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                activeCategory === cat.id
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            <span>{cat.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Skills Matrix Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCategories.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm space-y-6 hover:border-slate-300 transition"
                    >
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                                {getCategoryIcon(cat.id)}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 leading-tight">
                                    {cat.title}
                                </h2>
                                <p className="text-xs text-slate-400">
                                    {cat.skills.length} {lang === 'el' ? 'Εξειδικευμένες Τεχνολογίες' : 'Specialized Technologies'}
                                </p>
                            </div>
                        </div>

                        {/* Λίστα Δεξιοτήτων με Progress Bars */}
                        <div className="space-y-4">
                            {cat.skills.map((skill) => (
                                <div key={skill.name} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-slate-800">{skill.name}</span>
                                        <span className="font-mono text-slate-400 font-semibold">{skill.level}%</span>
                                    </div>

                                    {/* Dynamic Progress Bar */}
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${
                                                cat.id === 'backend' ? 'bg-blue-600' :
                                                    cat.id === 'frontend' ? 'bg-indigo-600' :
                                                        cat.id === 'game_dev' ? 'bg-amber-500' : 'bg-emerald-500'
                                            }`}
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>

                                    <p className="text-[11px] text-slate-500 leading-relaxed">
                                        {skill.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>

            {/* 3. Experience Timeline Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            {t.skills.timelineTitle}
                        </h2>
                        <p className="text-xs text-slate-500">
                            {t.skills.timelineSubtitle}
                        </p>
                    </div>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                    {experienceTimeline.map((item, idx) => (
                        <div key={idx} className="relative pl-9 space-y-2">
                            {/* Timeline Bullet */}
                            <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full border-2 border-blue-600 bg-white shadow-sm"></div>

                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                                    <Calendar className="w-3 h-3" />
                                    <span>{item.period}</span>
                                </span>
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                    {item.type}
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-slate-800">
                                {item.role} <span className="text-slate-400 font-normal">@ {item.company}</span>
                            </h3>

                            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {item.tags.map((tag) => (
                                    <span key={tag} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
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