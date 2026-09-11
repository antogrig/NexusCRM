import { useState } from 'react'
import {
    Mail,
    MapPin,
    Code2,
    Send,
    CheckCircle2,
    Sparkles,
    Clock,
    MessageSquare
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        // Προσομοίωση αποστολής (στο επόμενο Phase θα συνδεθεί με το Laravel REST API)
        setTimeout(() => {
            setLoading(false)
            setSubmitted(true)
            setForm({ name: '', email: '', subject: '', message: '' })
        }, 800)
    }

    return (
        <div className="space-y-8 py-4 max-w-5xl mx-auto">

            {/* 1. Header */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t.contact.tag}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {t.contact.title}
                </h1>
                <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
                    {t.contact.subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* 2. Αριστερή Στήλη: Στοιχεία Επικοινωνίας & Status */}
                <div className="space-y-4 md:col-span-1">

                    {/* Status Card */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                                {t.contact.availabilityTitle}
                            </span>
                        </div>
                        <p className="text-sm font-semibold text-emerald-900">
                            {t.contact.availabilityDesc}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-700 pt-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{t.contact.responseTime}</span>
                        </div>
                    </div>

                    {/* Contact Details Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                            {t.contact.channels}
                        </h3>

                        <div className="space-y-4 text-xs">
                            <a
                                href="mailto:adogrig89@gmail.com"
                                className="flex items-start gap-3 text-slate-600 hover:text-blue-600 transition group"
                            >
                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-400 uppercase font-bold">Email</div>
                                    <div className="font-semibold text-slate-800">adogrig89@gmail.com</div>
                                </div>
                            </a>

                            <div className="flex items-start gap-3 text-slate-600">
                                <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-400 uppercase font-bold">
                                        {lang === 'el' ? 'Τοποθεσία' : 'Location'}
                                    </div>
                                    <div className="font-semibold text-slate-800">
                                        {lang === 'el' ? 'Ελλάδα (Διαθέσιμος Remote)' : 'Greece (Available for Remote)'}
                                    </div>
                                </div>
                            </div>

                            <a
                                href="https://github.com/antogrig"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-start gap-3 text-slate-600 hover:text-slate-900 transition group"
                            >
                                <div className="p-2 rounded-lg bg-slate-900 text-white group-hover:bg-blue-600 transition">
                                    <Code2 className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-400 uppercase font-bold">GitHub</div>
                                    <div className="font-semibold text-slate-800">github.com/antogrig</div>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

                {/* 3. Δεξιά Στήλη: Φόρμα Επικοινωνίας (Controlled Form) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm md:col-span-2">
                    {submitted ? (
                        <div className="text-center py-12 space-y-4">
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">
                                {t.contact.successTitle}
                            </h3>
                            <p className="text-sm text-slate-500 max-w-md mx-auto">
                                {t.contact.successDesc}
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
                            >
                                {t.contact.sendAnother}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="w-4 h-4 text-blue-600" />
                                <h3 className="font-bold text-slate-800 text-base">{t.contact.sendMessage}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        {lang === 'el' ? 'Ονοματεπώνυμο *' : 'Full Name *'}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder={lang === 'el' ? 'π.χ. Γιάννης Παπαδόπουλος' : 'e.g. John Doe'}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        {lang === 'el' ? 'Email Επικοινωνίας *' : 'Contact Email *'}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="name@company.com"
                                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    {lang === 'el' ? 'Θέμα' : 'Subject'}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    placeholder={lang === 'el' ? 'π.χ. Πρόταση Συνεργασίας για Web / Game Project' : 'e.g. Project Proposal or Engineering Role'}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    {lang === 'el' ? 'Μήνυμα *' : 'Message *'}
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder={lang === 'el' ? 'Περιγράψτε εν συντομία το project ή τη θέση εργασίας...' : 'Briefly describe the project or role opportunities...'}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-xs transition shadow-sm disabled:opacity-50 cursor-pointer"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>{loading ? t.contact.sendingBtn : t.contact.sendBtn}</span>
                            </button>
                        </form>
                    )}
                </div>

            </div>

        </div>
    )
}