import { useState } from 'react'
import { docsCommands } from './data/docsCommands'

export default function Docs() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('ALL')
    const [copiedId, setCopiedId] = useState(null)

    const categories = ['ALL', ...new Set(docsCommands.map(c => c.category))]

    const filtered = docsCommands.filter(item => {
        const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory
        const matchesSearch = item.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.purpose.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCat && matchesSearch
    })

    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className="space-y-6">
            {/* Header Docs */}
            <div
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
                data-aos="fade-up"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">📖 Live Terminal & Architecture Docs</h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Αυτόματη καταγραφή κάθε εντολής, flag και αρχιτεκτονικής απόφασης κατά την εξέλιξη του project.
                        </p>
                    </div>
                    <div className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 font-semibold rounded-lg border border-blue-200 self-start md:self-auto">
                        {docsCommands.length} {docsCommands.length === 1 ? 'Καταγεγραμμένη Εντολή' : 'Καταγεγραμμένες Εντολές'}
                    </div>
                </div>

                {/* Φίλτρα & Αναζήτηση */}
                <div className="mt-6 flex flex-col md:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="🔍 Αναζήτηση εντολής ή έννοιας..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                                    selectedCategory === cat
                                        ? 'bg-slate-900 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                <span className="font-mono text-xs">{cat}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Λίστα Εντολών */}
            <div className="space-y-4">
                {filtered.map(item => (
                    <div
                        key={item.id}
                        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition"
                        data-aos="fade-up"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                {item.category}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">ID: #{item.id}</span>
                        </div>

                        <h3 className="font-bold text-slate-800 text-base mb-1">
                            {item.purpose}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                            {item.description}
                        </p>

                        {/* Command Snippet with Copy */}
                        <div className="bg-slate-900 text-emerald-400 font-mono text-sm p-4 rounded-lg flex items-center justify-between gap-4 overflow-x-auto">
                            <code>{item.command}</code>
                            <button
                                onClick={() => handleCopy(item.id, item.command)}
                                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded font-sans shrink-0 transition"
                            >
                                {copiedId === item.id ? '✓ Αντιγράφηκε!' : '📋 Αντιγραφή'}
                            </button>
                        </div>

                        {/* Breakdown / Flags */}
                        {item.breakdown && item.breakdown.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                    Ανάλυση Εντολής:
                                </h4>
                                <div className="space-y-1.5">
                                    {item.breakdown.map((b, idx) => (
                                        <div key={idx} className="flex items-start text-xs text-slate-600 gap-2">
                                            <span className="font-mono bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded shrink-0">
                                                {b.part}
                                            </span>
                                            <span>➡️ {b.meaning}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Example */}
                        {item.example && (
                            <div className="mt-3 p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 border border-slate-100">
                                <span className="font-sans font-semibold text-slate-500 block mb-1">Παράδειγμα χρήσης στον κώδικα:</span>
                                <pre className="whitespace-pre-wrap">{item.example}</pre>
                            </div>
                        )}
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500 text-sm">
                        Δεν βρέθηκαν εντολές που να ταιριάζουν στην αναζήτησή σου.
                    </div>
                )}
            </div>
        </div>
    )
}
