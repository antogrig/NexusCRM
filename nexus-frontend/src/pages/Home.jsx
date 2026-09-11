import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Code2,
    Gamepad2,
    Layers,
    ArrowRight,
    LayoutDashboard,
    Brain,
    BookOpen,
    Mail,
    Award,
    ExternalLink,
    Calendar,
    User,
    Phone,
    MapPin,
    CheckCircle2
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function Home() {
    const { lang } = useLanguage()
    const t = translations[lang]

    // Reeni Typewriter Effect
    const typewriterWords = [
        'Full-Stack Developer',
        'Laravel & React Engineer',
        'Unreal Engine 5 Specialist',
        'Drupal 9/10 Architect',
        'PostgreSQL Specialist',
        'Gameplay Programmer'
    ]

    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentText, setCurrentText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    // Form State (Controlled Component)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        const fullWord = typewriterWords[currentWordIndex]
        const typingSpeed = isDeleting ? 40 : 90

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setCurrentText(fullWord.slice(0, currentText.length + 1))
                if (currentText === fullWord) {
                    setTimeout(() => setIsDeleting(true), 1800)
                }
            } else {
                setCurrentText(fullWord.slice(0, currentText.length - 1))
                if (currentText === '') {
                    setIsDeleting(false)
                    setCurrentWordIndex((prev) => (prev + 1) % typewriterWords.length)
                }
            }
        }, typingSpeed)

        return () => clearTimeout(timer)
    }, [currentText, isDeleting, currentWordIndex])

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setIsSubmitted(true)
        setTimeout(() => {
            setIsSubmitted(false)
            setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
        }, 4000)
    }

    return (
        <div className="w-full space-y-16">

            {/* =================================================================
                1. REENI HERO BANNER ONE (100% FULL WIDTH EDGE-TO-EDGE)
               ================================================================= */}
            <section
                className="w-full bg-cover bg-center bg-no-repeat border-b border-slate-200/80 relative overflow-hidden py-16 sm:py-24 lg:py-28"
                style={{ backgroundImage: "url('/banner-bg.jpg')" }}
            >
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Αριστερή Στήλη: HELLO, Τίτλος, Typewriter & CTAs (7 cols) */}
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

                            {/* Eyebrow "HELLO" */}
                            <div className="text-xs sm:text-sm font-extrabold tracking-[0.3em] text-slate-800 uppercase">
                                HELLO
                            </div>

                            {/* Headline & Typewriter */}
                            <div className="space-y-2">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                                    {lang === 'el' ? "είμαι ο " : "i'm "}
                                    <span className="text-slate-900">Antonis Grigoriadis</span>
                                    <span className="block text-slate-900 font-extrabold text-2xl sm:text-4xl lg:text-5xl mt-2">
                                        {lang === 'el' ? 'ένας ' : 'a '}
                                        <span className="text-[#ff014f] font-black inline-block">
                                            {currentText}
                                        </span>
                                        <span className="text-[#ff014f] font-normal animate-pulse">|</span>
                                    </span>
                                </h1>
                            </div>

                            {/* Bio Paragraph */}
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                                {t.hero.description}
                            </p>

                            {/* Reeni Buttons */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                                <Link
                                    to="/portfolio"
                                    className="inline-flex items-center gap-2.5 bg-[#ff014f] hover:bg-[#d90042] text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-[#ff014f]/25 text-sm transition transform hover:-translate-y-0.5"
                                >
                                    <span>View Portfolio</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                <Link
                                    to="/crm"
                                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-4 rounded-full shadow-md text-sm transition transform hover:-translate-y-0.5"
                                >
                                    <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                                    <span>Live CRM Demo</span>
                                </Link>

                                <a
                                    href="#contact-section"
                                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-7 py-4 rounded-full border border-slate-200 shadow-sm text-sm transition transform hover:-translate-y-0.5"
                                >
                                    <Mail className="w-4 h-4 text-slate-500" />
                                    <span>{t.hero.ctaContact}</span>
                                </a>
                            </div>
                        </div>

                        {/* Δεξιά Στήλη: Watermark Outline Text & Προσωπογραφία (5 cols) */}
                        <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">

                            {/* Giant Watermark Text Outline πίσω από τη φωτογραφία */}
                            <div className="absolute -top-10 -left-12 lg:-left-20 select-none pointer-events-none z-0 opacity-15">
                                <span className="banner-big-text-watermark text-7xl sm:text-8xl lg:text-9xl font-black block tracking-tighter">
                                    DEVELOPER
                                </span>
                            </div>

                            {/* Portrait Container */}
                            <div className="relative z-10 w-72 sm:w-80 lg:w-96">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white group">
                                    <img
                                        src="/antonis.jpg"
                                        alt="Antonis Grigoriadis"
                                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                                </div>

                                {/* Floating Experience Badge */}
                                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 z-20">
                                    <div className="w-12 h-12 rounded-xl bg-[#ff014f]/10 text-[#ff014f] flex items-center justify-center font-black text-xl">
                                        6+
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                                            {lang === 'el' ? 'Χρόνια Εμπειρίας' : 'Years Experience'}
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium">
                                            Istology & Game Dev
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =================================================================
                2. INNER CONSTRAINED CONTAINER
               ================================================================= */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">

                {/* 2.1 4 CORE SERVICES CARDS */}
                <section className="space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <div className="text-xs font-black tracking-widest text-[#ff014f] uppercase">
                            {t.services.badge}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            {t.services.title}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Service 1: Full-Stack Web */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#ff014f]/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group">
                            <div className="space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#ff014f]/10 text-[#ff014f] flex items-center justify-center group-hover:bg-[#ff014f] group-hover:text-white transition-colors duration-300">
                                    <Code2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#ff014f] transition-colors">
                                    {t.services.webTitle}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {t.services.webDesc}
                                </p>
                            </div>
                            <div className="pt-6">
                                <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#ff014f] transition-colors">01 / WEB APPS</span>
                            </div>
                        </div>

                        {/* Service 2: Unreal Engine 5 */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#ff014f]/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group">
                            <div className="space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                    <Gamepad2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    {t.services.unrealTitle}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {t.services.unrealDesc}
                                </p>
                            </div>
                            <div className="pt-6">
                                <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">02 / GAME DEV</span>
                            </div>
                        </div>

                        {/* Service 3: Drupal 9/10 */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#ff014f]/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group">
                            <div className="space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                    <Layers className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                    {t.services.drupalTitle}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {t.services.drupalDesc}
                                </p>
                            </div>
                            <div className="pt-6">
                                <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">03 / ARCHITECTURE</span>
                            </div>
                        </div>

                        {/* Service 4: Performance & Scalability */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#ff014f]/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group">
                            <div className="space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                                    <Award className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                                    {t.services.perfTitle}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {t.services.perfDesc}
                                </p>
                            </div>
                            <div className="pt-6">
                                <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-amber-600 transition-colors">04 / OPTIMIZATION</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2.2 4 EXPERIENCE MILESTONE COUNTERS */}
                <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-center">
                        <div className="space-y-2 p-4">
                            <div className="text-4xl sm:text-5xl font-black text-[#ff014f] tracking-tight">{t.counters.expValue}</div>
                            <div className="text-xs sm:text-sm font-semibold text-slate-600">{t.counters.expLabel}</div>
                        </div>
                        <div className="space-y-2 p-4">
                            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">{t.counters.projectsValue}</div>
                            <div className="text-xs sm:text-sm font-semibold text-slate-600">{t.counters.projectsLabel}</div>
                        </div>
                        <div className="space-y-2 p-4">
                            <div className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight">{t.counters.gasValue}</div>
                            <div className="text-xs sm:text-sm font-semibold text-slate-600">{t.counters.gasLabel}</div>
                        </div>
                        <div className="space-y-2 p-4">
                            <div className="text-4xl sm:text-5xl font-black text-emerald-600 tracking-tight">{t.counters.perfValue}</div>
                            <div className="text-xs sm:text-sm font-semibold text-slate-600">{t.counters.perfLabel}</div>
                        </div>
                    </div>
                </section>

                {/* 2.3 EXPERIENCES TIMELINE (2-COLUMN REENI STYLE) */}
                <section className="space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <div className="text-xs font-black tracking-widest text-[#ff014f] uppercase">
                            {t.experiences.badge}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            {t.experiences.title}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

                        {/* Αριστερή Στήλη: Φωτογραφία & Senior Badge (5 cols) */}
                        <div className="lg:col-span-5 sticky top-24 space-y-6">
                            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 relative group">
                                <img
                                    src="/antonis.jpg"
                                    alt="Antonis Grigoriadis"
                                    className="w-full h-[460px] object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                                    <div className="inline-block bg-[#ff014f] text-white text-[11px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                                        Istology Lead Expertise
                                    </div>
                                    <h4 className="text-xl font-bold">Antonis Grigoriadis</h4>
                                    <p className="text-slate-300 text-xs leading-relaxed">
                                        {lang === 'el'
                                            ? '6+ χρόνια σχεδιασμού, αρχιτεκτονικής βάσεων PostgreSQL και ανάπτυξης decoupled web εφαρμογών και UE5 συστημάτων.'
                                            : '6+ years designing, architecting PostgreSQL databases, and developing decoupled web apps and UE5 systems.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Δεξιά Στήλη: Timeline Cards (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* Job 1: Istology Senior */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#ff014f]/40 transition duration-300 space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-rose-50 text-[#ff014f] border border-rose-100">
                                        {t.experiences.job1Badge}
                                    </span>
                                    <span className="text-xs font-mono text-slate-400 font-semibold">2020 – 2026</span>
                                </div>
                                <h3 className="text-xl font-black text-slate-900">{t.experiences.job1Role}</h3>
                                <div className="text-sm font-bold text-slate-700">{t.experiences.job1Company}</div>
                                <p className="text-slate-600 text-sm leading-relaxed pt-1">
                                    {t.experiences.job1Desc}
                                </p>
                            </div>

                            {/* Project: Diploma Thesis RPG */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-500/40 transition duration-300 space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                                        {t.experiences.thesisBadge}
                                    </span>
                                    <span className="text-xs font-mono text-slate-400 font-semibold">Project ATEI</span>
                                </div>
                                <h3 className="text-xl font-black text-slate-900">{t.experiences.thesisRole}</h3>
                                <div className="text-sm font-bold text-slate-700">{t.experiences.thesisCompany}</div>
                                <p className="text-slate-600 text-sm leading-relaxed pt-1">
                                    {t.experiences.thesisDesc}
                                </p>
                            </div>

                            {/* Job 2: Freelance */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition duration-300 space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                        {t.experiences.job2Badge}
                                    </span>
                                    <span className="text-xs font-mono text-slate-400 font-semibold">2018 – 2019</span>
                                </div>
                                <h3 className="text-xl font-black text-slate-900">{t.experiences.job2Role}</h3>
                                <div className="text-sm font-bold text-slate-700">{t.experiences.job2Company}</div>
                                <p className="text-slate-600 text-sm leading-relaxed pt-1">
                                    {t.experiences.job2Desc}
                                </p>
                            </div>

                            {/* Job 3: Internship */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition duration-300 space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                        {t.experiences.job3Badge}
                                    </span>
                                    <span className="text-xs font-mono text-slate-400 font-semibold">2016 – 2017</span>
                                </div>
                                <h3 className="text-xl font-black text-slate-900">{t.experiences.job3Role}</h3>
                                <div className="text-sm font-bold text-slate-700">{t.experiences.job3Company}</div>
                                <p className="text-slate-600 text-sm leading-relaxed pt-1">
                                    {t.experiences.job3Desc}
                                </p>
                            </div>

                        </div>

                    </div>
                </section>

                {/* 2.4 3-CARD SHOWCASE GRID (CASE STUDIES) */}
                <section className="space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <div className="text-xs font-black tracking-widest text-[#ff014f] uppercase">
                            FEATURED CASE STUDIES
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            {lang === 'el' ? 'Κορυφαία Έργα & Αρχιτεκτονική' : 'Flagship Projects & Engineering'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Project 1: NexusCRM */}
                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#ff014f]/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col group">
                            <div className="aspect-video bg-slate-900 flex items-center justify-center relative overflow-hidden animate-zoom-hover">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-slate-900/50"></div>
                                <div className="relative z-10 text-center space-y-2 p-6">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/30 flex items-center justify-center mx-auto">
                                        <LayoutDashboard className="w-6 h-6" />
                                    </div>
                                    <span className="text-white font-mono font-bold text-sm tracking-wide block">NexusCRM Platform</span>
                                </div>
                            </div>
                            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#ff014f]" /> Antonis</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-indigo-500" /> Laravel 11 + React 19</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#ff014f] transition-colors leading-snug">
                                        Decoupled Enterprise CRM με PostgreSQL Database & REST API
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Πλήρες σύστημα διαχείρισης πελατών, διαχείριση leads, real-time αναζήτηση και PostgreSQL database schema.
                                    </p>
                                </div>
                                <Link
                                    to="/crm"
                                    className="inline-flex items-center gap-2 text-[#ff014f] hover:text-[#d90042] font-black text-xs tracking-wider uppercase pt-4 border-t border-slate-100"
                                >
                                    <span>LAUNCH LIVE CRM DEMO</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Project 2: Project ATEI RPG */}
                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#ff014f]/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col group">
                            <div className="aspect-video bg-slate-900 flex items-center justify-center relative overflow-hidden animate-zoom-hover">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-slate-900/50"></div>
                                <div className="relative z-10 text-center space-y-2 p-6">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center mx-auto">
                                        <Gamepad2 className="w-6 h-6" />
                                    </div>
                                    <span className="text-white font-mono font-bold text-sm tracking-wide block">Project ATEI RPG</span>
                                </div>
                            </div>
                            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#ff014f]" /> Antonis</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-500" /> UE5 / C++</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#ff014f] transition-colors leading-snug">
                                        Action RPG Gameplay Systems με Gameplay Ability System (GAS) & AI
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        C++ σύστημα μάχης, Root Motion animation pipelines, Behavior Trees και 3D Level Design σε Unreal Engine 4/5.
                                    </p>
                                </div>
                                <Link
                                    to="/portfolio"
                                    className="inline-flex items-center gap-2 text-[#ff014f] hover:text-[#d90042] font-black text-xs tracking-wider uppercase pt-4 border-t border-slate-100"
                                >
                                    <span>VIEW GAMEPLAY FOOTAGE</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Project 3: Istology Production Ecosystem */}
                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#ff014f]/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col group">
                            <div className="aspect-video bg-slate-900 flex items-center justify-center relative overflow-hidden animate-zoom-hover">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 to-slate-900/50"></div>
                                <div className="relative z-10 text-center space-y-2 p-6">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center mx-auto">
                                        <Layers className="w-6 h-6" />
                                    </div>
                                    <span className="text-white font-mono font-bold text-sm tracking-wide block">Istology 30+ Sites</span>
                                </div>
                            </div>
                            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#ff014f]" /> Antonis</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-500" /> 6+ Years</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#ff014f] transition-colors leading-snug">
                                        30+ Production Platforms, E-Commerce & Booking Engines
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        epirustours.gr, vivavanrentals.gr, antares-innovation.com. Custom Drupal modules, 90+ Lighthouse και high-concurrency architecture.
                                    </p>
                                </div>
                                <Link
                                    to="/portfolio"
                                    className="inline-flex items-center gap-2 text-[#ff014f] hover:text-[#d90042] font-black text-xs tracking-wider uppercase pt-4 border-t border-slate-100"
                                >
                                    <span>EXPLORE PRODUCTION SITES</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 2.5 INTERACTIVE HUB (Quiz & Live Docs - ΠΟΥ ΚΡΑΤΑΜΕ ΜΟΝΙΜΑ!) */}
                <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
                    <div className="max-w-3xl space-y-4">
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                            <span>Proof of Mastery & Transparency</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                            {lang === 'el' ? 'Διαδραστική Τεκμηρίωση & Αυτοαξιολόγηση' : 'Interactive Documentation & Knowledge Validation'}
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            {lang === 'el'
                                ? 'Κάθε γραμμή κώδικα και αρχιτεκτονική απόφαση σε αυτό το portfolio συνοδεύεται από ζωντανή τεκμηρίωση και διαδραστικό quiz γνώσεων.'
                                : 'Every line of code and architectural decision in this portfolio is backed by live documentation and an interactive knowledge quiz.'}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                to="/quiz"
                                className="inline-flex items-center gap-2 bg-[#ff014f] hover:bg-[#d90042] text-white text-xs font-bold px-6 py-3 rounded-full transition shadow-lg shadow-[#ff014f]/25"
                            >
                                <Brain className="w-4 h-4" />
                                <span>{lang === 'el' ? 'Δοκίμασε το Tech Quiz' : 'Explore Tech Quiz'}</span>
                            </Link>
                            <Link
                                to="/docs"
                                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-bold px-6 py-3 rounded-full transition"
                            >
                                <BookOpen className="w-4 h-4 text-amber-400" />
                                <span>{lang === 'el' ? 'Άνοιξε τα Live Docs' : 'Open Live Docs'}</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* =================================================================
                    2.6 GET IN TOUCH (Contact Section - Reeni Style)
                   ================================================================= */}
                <section id="contact-section" className="bg-[#f8f9fa] rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-sm relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                        {/* Αριστερή Στήλη: Eyebrow, Τίτλος & Στοιχεία Επικοινωνίας */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#ff014f] uppercase">
                                <span>{t.contact.badge}</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                                {t.contact.title}
                            </h2>

                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {t.contact.subtitle}
                            </p>

                            {/* Direct Contact Chips */}
                            <div className="pt-4 space-y-3">
                                <a
                                    href="mailto:anto.grigoriadis@gmail.com"
                                    className="flex items-center gap-3 text-sm text-slate-700 hover:text-[#ff014f] transition group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#ff014f] group-hover:border-[#ff014f]/30 shadow-sm transition">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="font-mono text-xs sm:text-sm">{t.contact.email}</span>
                                </a>

                                <a
                                    href="tel:+35797695495"
                                    className="flex items-center gap-3 text-sm text-slate-700 hover:text-[#ff014f] transition group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#ff014f] group-hover:border-[#ff014f]/30 shadow-sm transition">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span className="font-mono text-xs sm:text-sm">{t.contact.phone}</span>
                                </a>

                                <div className="flex items-center gap-3 text-sm text-slate-700">
                                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
                                        <MapPin className="w-4 h-4 text-[#ff014f]" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium text-slate-600">{t.contact.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Δεξιά Στήλη: Form Inputs (2x2 Grid + Textarea + Reeni Button) */}
                        <div className="lg:col-span-7">
                            {isSubmitted ? (
                                <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-md">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900">
                                        {lang === 'el' ? 'Το μήνυμά σας εστάλη επιτυχώς!' : 'Your message has been sent!'}
                                    </h3>
                                    <p className="text-slate-600 text-sm max-w-md mx-auto">
                                        {lang === 'el'
                                            ? 'Ευχαριστώ για την επικοινωνία. Θα επανέλθω σύντομα στο email σας.'
                                            : 'Thank you for reaching out. I will get back to you shortly.'}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleFormChange}
                                                placeholder={t.contact.nameLabel}
                                                className="w-full bg-white border border-slate-200/90 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff014f] focus:ring-2 focus:ring-[#ff014f]/20 transition shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleFormChange}
                                                placeholder={t.contact.phoneLabel}
                                                className="w-full bg-white border border-slate-200/90 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff014f] focus:ring-2 focus:ring-[#ff014f]/20 transition shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleFormChange}
                                                placeholder={t.contact.emailLabel}
                                                className="w-full bg-white border border-slate-200/90 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff014f] focus:ring-2 focus:ring-[#ff014f]/20 transition shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleFormChange}
                                                placeholder={t.contact.subjectLabel}
                                                className="w-full bg-white border border-slate-200/90 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff014f] focus:ring-2 focus:ring-[#ff014f]/20 transition shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <textarea
                                            name="message"
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={handleFormChange}
                                            placeholder={t.contact.messageLabel}
                                            className="w-full bg-white border border-slate-200/90 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff014f] focus:ring-2 focus:ring-[#ff014f]/20 transition shadow-sm resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#ff014f] hover:bg-[#d90042] text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-[#ff014f]/25 text-sm tracking-wide transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
                                    >
                                        <span>{t.contact.submitBtn}</span>
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </section>

            </div>
        </div>
    )
}