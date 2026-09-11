import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Mail,
    Phone,
    MapPin,
    ArrowUp,
    Send,
    CheckCircle2
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function Footer() {
    const { lang } = useLanguage()
    const t = translations[lang]

    const [newsletterEmail, setNewsletterEmail] = useState('')
    const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

    // Floating Scroll-to-Top Progress
    const [scrollProgress, setScrollProgress] = useState(0)
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100
                setScrollProgress(Math.min(100, Math.max(0, progress)))
            }
            setShowScrollTop(window.scrollY > 250)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (newsletterEmail) {
            setNewsletterSubscribed(true)
            setTimeout(() => {
                setNewsletterSubscribed(false)
                setNewsletterEmail('')
            }, 3500)
        }
    }

    return (
        <footer className="w-full bg-[#f8f9fa] border-t border-slate-200/80 pt-16 pb-12 mt-20 relative text-slate-700">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Column 1: Brand, Tagline & Newsletter (5 cols) */}
                    <div className="md:col-span-12 lg:col-span-5 space-y-6">
                        {/* Brand Logo */}
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff014f] to-rose-400 flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#ff014f]/25">
                                AG
                            </div>
                            <span className="text-xl font-black text-slate-900 tracking-tight">
                                Antonis <span className="text-[#ff014f]">Grigoriadis</span>
                            </span>
                        </div>

                        {/* Headline */}
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                            {lang === 'el' ? 'Get Ready To Create Great' : 'Get Ready To Create Great'}
                        </h3>
                        <p className="text-slate-600 text-sm max-w-md leading-relaxed">
                            {lang === 'el'
                                ? 'Εξειδίκευση σε Full-Stack Web Applications (Laravel 11, React 19, PostgreSQL) και Unreal Engine 5 Gameplay Mechanics.'
                                : 'Specializing in Full-Stack Web Applications (Laravel 11, React 19, PostgreSQL) and Unreal Engine 5 Gameplay Mechanics.'}
                        </p>

                        {/* Newsletter Quick Input */}
                        <div className="pt-2">
                            {newsletterSubscribed ? (
                                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-xs font-semibold">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    <span>{lang === 'el' ? 'Ευχαριστώ για την επικοινωνία!' : 'Thank you for connecting!'}</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="relative max-w-sm">
                                    <input
                                        type="email"
                                        required
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        placeholder={lang === 'el' ? 'Το Email σας...' : 'Email Address'}
                                        className="w-full bg-white border border-slate-200/90 rounded-full pl-5 pr-14 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff014f] focus:ring-2 focus:ring-[#ff014f]/20 shadow-sm transition"
                                    />
                                    <button
                                        type="submit"
                                        aria-label="Subscribe"
                                        className="absolute right-1.5 top-1.5 bottom-1.5 w-10 bg-[#ff014f] hover:bg-[#d90042] text-white rounded-full flex items-center justify-center shadow-md shadow-[#ff014f]/20 transition transform hover:scale-105 cursor-pointer"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Column 2: Quick Links (3 cols) */}
                    <div className="md:col-span-6 lg:col-span-3 space-y-4">
                        <h4 className="text-base font-black text-slate-900 tracking-wide uppercase text-sm">
                            {lang === 'el' ? 'Γρήγοροι Σύνδεσμοι' : 'Quick Link'}
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/" className="text-slate-600 hover:text-[#ff014f] transition">
                                    {lang === 'el' ? 'Αρχική (About Me)' : 'Home (About Me)'}
                                </Link>
                            </li>
                            <li>
                                <Link to="/skills" className="text-slate-600 hover:text-[#ff014f] transition">
                                    {lang === 'el' ? 'Υπηρεσίες & Δεξιότητες' : 'Service & Skills'}
                                </Link>
                            </li>
                            <li>
                                <Link to="/portfolio" className="text-slate-600 hover:text-[#ff014f] transition">
                                    {lang === 'el' ? 'Έργα (Portfolio)' : 'Portfolio Case Studies'}
                                </Link>
                            </li>
                            <li>
                                <Link to="/crm" className="text-slate-600 hover:text-[#ff014f] transition">
                                    {lang === 'el' ? 'Live CRM Demo' : 'Live CRM Platform'}
                                </Link>
                            </li>
                            <li>
                                <Link to="/quiz" className="text-slate-600 hover:text-[#ff014f] transition">
                                    {lang === 'el' ? 'Tech Quiz (62 Ερωτήσεις)' : 'Tech Quiz (62 Questions)'}
                                </Link>
                            </li>
                            <li>
                                <Link to="/docs" className="text-slate-600 hover:text-[#ff014f] transition">
                                    {lang === 'el' ? 'Live Interactive Docs' : 'Live Documentation'}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info & Socials (4 cols) */}
                    <div className="md:col-span-6 lg:col-span-4 space-y-4">
                        <h4 className="text-base font-black text-slate-900 tracking-wide uppercase text-sm">
                            {lang === 'el' ? 'Επικοινωνία' : 'Contact'}
                        </h4>
                        <div className="space-y-3.5 text-sm">
                            <a
                                href="mailto:anto.grigoriadis@gmail.com"
                                className="flex items-center gap-3 text-slate-600 hover:text-[#ff014f] transition group"
                            >
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#ff014f] group-hover:border-[#ff014f]/30 shadow-sm transition">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="font-mono text-xs sm:text-sm">{t.contact.email}</span>
                            </a>

                            <div className="flex items-center gap-3 text-slate-600">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
                                    <MapPin className="w-4 h-4 text-[#ff014f]" />
                                </div>
                                <span className="text-xs sm:text-sm font-medium">{t.contact.location}</span>
                            </div>

                            <a
                                href="tel:+35797695495"
                                className="flex items-center gap-3 text-slate-600 hover:text-[#ff014f] transition group"
                            >
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#ff014f] group-hover:border-[#ff014f]/30 shadow-sm transition">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="font-mono text-xs sm:text-sm">{t.contact.phone}</span>
                            </a>
                        </div>

                        {/* Social Icons Row */}
                        <div className="pt-3 flex items-center gap-3">
                            {/* GitLab */}
                            <a
                                href="https://gitlab.com/antogrig"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitLab"
                                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#ff014f] hover:border-[#ff014f]/30 shadow-sm transition transform hover:-translate-y-0.5"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M22.65 14.39L20 6.21a.75.75 0 00-1.42 0l-2.65 8.18H8.07L5.42 6.21a.75.75 0 00-1.42 0L1.35 14.39a1.5 1.5 0 00.54 1.68l10.11 7.34a1.5 1.5 0 001.78 0l10.11-7.34a1.5 1.5 0 00.54-1.68z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#ff014f] hover:border-[#ff014f]/30 shadow-sm transition transform hover:-translate-y-0.5 font-bold text-xs"
                            >
                                in
                            </a>

                            {/* GitHub */}
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#ff014f] hover:border-[#ff014f]/30 shadow-sm transition transform hover:-translate-y-0.5"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                            </a>

                            {/* Email Button */}
                            <a
                                href="mailto:anto.grigoriadis@gmail.com"
                                aria-label="Email Antonis"
                                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#ff014f] hover:border-[#ff014f]/30 shadow-sm transition transform hover:-translate-y-0.5"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200/90 pt-8 mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
                    <div>
                        © Antonis Grigoriadis 2026 | All Rights Reserved
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-[#ff014f] transition cursor-pointer">Terms & Conditions</span>
                        <span className="hover:text-[#ff014f] transition cursor-pointer">Privacy Policy</span>
                        <Link to="/contact" className="hover:text-[#ff014f] transition">Contact Us</Link>
                    </div>
                </div>

            </div>

            {/* =================================================================
                FLOATING SCROLL-TO-TOP WIDGET (REENI PERCENTAGE RING)
               ================================================================= */}
            {showScrollTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Scroll to top"
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group cursor-pointer border border-slate-700/50"
                >
                    {/* Dynamic SVG Progress Circle */}
                    <svg className="w-full h-full -rotate-90 absolute inset-0 p-1" viewBox="0 0 36 36">
                        <path
                            className="text-slate-800"
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                            className="text-[#ff014f] transition-all duration-150"
                            strokeDasharray={`${scrollProgress}, 100`}
                            strokeWidth="3"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <ArrowUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform duration-200 z-10" />
                </button>
            )}
        </footer>
    )
}