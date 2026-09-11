import { useState } from 'react'
import axios from 'axios'
import {
    Mail,
    MapPin,
    Code2,
    Send,
    CheckCircle2,
    Sparkles,
    Clock,
    MessageSquare,
    AlertCircle
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../data/translations'

export default function Contact() {
    const { lang } = useLanguage()
    const t = translations[lang]

    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await axios.post('/api/contact', form)
            setSubmitted(true)
            setForm({ name: '', email: '', subject: '', message: '' })
        } catch (err) {
            console.error('Contact submission error:', err)
            const apiMessage = err.response?.data?.message
            setError(
                apiMessage ||
                (lang === 'el'
                    ? 'Παρουσιάστηκε σφάλμα κατά την αποστολή. Παρακαλώ δοκιμάστε ξανά.'
                    : 'An error occurred while sending your message. Please try again.')
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-16">

            {/* 1. Header */}
            <div className="bg-[#f8f9fa] rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-sm text-center space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#ff014f] uppercase">
                    <span>GET IN TOUCH</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                    {t.contact.title}
                </h1>
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                    {t.contact.subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* 2. Αριστερή Στήλη: Στοιχεία Επικοινωνίας & Status (5 cols) */}
                <div className="space-y-6 lg:col-span-5">

                    {/* Status Card */}
                    <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-3xl p-8 space-y-3">
                        <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                                {t.contact.availabilityTitle}
                            </span>
                        </div>
                        <p className="text-base font-bold text-emerald-950">
                            {t.contact.availabilityDesc}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-emerald-700 pt-1 font-medium">
                            <Clock className="w-4 h-4" />
                            <span>{t.contact.responseTime}</span>
                        </div>
                    </div>

                    {/* Contact Details Card */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-8 space-y-6 shadow-sm">
                        <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">
                            DIRECT CHANNELS
                        </h3>

                        <div className="space-y-4">
                            <a
                                href="mailto:anto.grigoriadis@gmail.com"
                                className="flex items-center gap-4 text-slate-700 hover:text-[#ff014f] transition group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#ff014f] group-hover:border-[#ff014f]/30 shadow-sm transition">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Email</div>
                                    <div className="font-mono text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#ff014f] transition">anto.grigoriadis@gmail.com</div>
                                </div>
                            </a>

                            <a
                                href="tel:+35797695495"
                                className="flex items-center gap-4 text-slate-700 hover:text-[#ff014f] transition group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#ff014f] group-hover:border-[#ff014f]/30 shadow-sm transition">
                                    <Clock className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider">{lang === 'el' ? 'Τηλέφωνο' : 'Phone'}</div>
                                    <div className="font-mono text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#ff014f] transition">+357 97695495</div>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 text-slate-700">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
                                    <MapPin className="w-5 h-5 text-[#ff014f]" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-400 uppercase font-black tracking-wider">
                                        {lang === 'el' ? 'Τοποθεσία' : 'Location'}
                                    </div>
                                    <div className="font-semibold text-xs sm:text-sm text-slate-900">
                                        {lang === 'el' ? 'Λάρνακα, Κύπρος (Διαθέσιμος Remote / Relocation)' : 'Larnaka, Cyprus (Remote & Relocation)'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 3. Δεξιά Στήλη: Φόρμα Επικοινωνίας (7 cols) */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm lg:col-span-7">
                    {submitted ? (
                        <div className="text-center py-12 space-y-4">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">
                                {t.contact.successTitle}
                            </h3>
                            <p className="text-sm text-slate-600 max-w-md mx-auto">
                                {t.contact.successDesc}
                            </p>
                            <button
                                onClick={() => {
                                    setSubmitted(false)
                                    setError(null)
                                }}
                                className="bg-[#ff014f] hover:bg-[#d90042] text-white text-xs font-bold px-6 py-3 rounded-full transition cursor-pointer shadow-md shadow-[#ff014f]/25"
                            >
                                {t.contact.sendAnother}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="w-5 h-5 text-[#ff014f]" />
                                <h3 className="font-black text-slate-900 text-lg">{t.contact.sendMessage}</h3>
                            </div>

                            {/* Προβολή Σφάλματος (Error Alert) */}
                            {error && (
                                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2.5">
                                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                                        {lang === 'el' ? 'Ονοματεπώνυμο *' : 'Full Name *'}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder={lang === 'el' ? 'π.χ. Αντώνης Γρηγοριάδης' : 'e.g. John Doe'}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ff014f]/20 focus:border-[#ff014f] outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                                        {lang === 'el' ? 'Email Επικοινωνίας *' : 'Contact Email *'}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="name@company.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ff014f]/20 focus:border-[#ff014f] outline-none transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                                    {lang === 'el' ? 'Θέμα' : 'Subject'}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    placeholder={lang === 'el' ? 'π.χ. Πρόταση Συνεργασίας για Web / Game Project' : 'e.g. Project Proposal or Engineering Role'}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ff014f]/20 focus:border-[#ff014f] outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                                    {lang === 'el' ? 'Μήνυμα *' : 'Message *'}
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder={lang === 'el' ? 'Περιγράψτε εν συντομία το project ή τη θέση εργασίας...' : 'Briefly describe the project or role opportunities...'}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#ff014f]/20 focus:border-[#ff014f] outline-none transition resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#ff014f] hover:bg-[#d90042] text-white font-bold py-4 px-8 rounded-full text-xs uppercase tracking-wider transition shadow-lg shadow-[#ff014f]/25 disabled:opacity-50 cursor-pointer transform hover:-translate-y-0.5"
                            >
                                <Send className="w-4 h-4" />
                                <span>{loading ? t.contact.sendingBtn : t.contact.sendBtn}</span>
                            </button>
                        </form>
                    )}
                </div>

            </div>

        </div>
    )
}