import { useState } from 'react'
import axios from 'axios'

export default function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // 1. Κανονικό Submit φόρμας
    const handleSubmit = async (e) => {
        e.preventDefault()
        performLogin(email, password)
    }

    // 2. Η συνάρτηση που καλεί το Laravel API
    const performLogin = async (loginEmail, loginPassword) => {
        setLoading(true)
        setError(null)

        try {
            const response = await axios.post('http://127.0.0.1:8080/api/login', {
                email: loginEmail,
                password: loginPassword,
            })

            // Λάβαμε το Token και τα στοιχεία του χρήστη!
            onLoginSuccess(response.data.access_token, response.data.user)
        } catch (err) {
            console.error(err)
            setError(
                err.response?.data?.message || 'Αποτυχία σύνδεσης. Ελέγξτε τα στοιχεία σας.'
            )
        } finally {
            setLoading(false)
        }
    }

    // 3. Μαγικό Κουμπί: 1-Click Demo Login (Recruiter Friendly!)
    const handleQuickDemoLogin = () => {
        setEmail('admin@nexus.cy')
        setPassword('admin')
        performLogin('admin@nexus.cy', 'admin')
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">

                {/* Header */}
                <div className="text-center space-y-1">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-3 shadow-md shadow-blue-200">
                        N
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">NexusCRM</h1>
                    <p className="text-slate-500 text-sm">Παρακαλώ συνδεθείτε για να συνεχίσετε</p>
                </div>

                {/* Demo Credentials Box (για Recruiter/CV) */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
              <span>💼</span> Portfolio Demo Access
            </span>
                        <span className="text-[10px] bg-blue-200 text-blue-900 font-semibold px-2 py-0.5 rounded-full">
              Recruiters
            </span>
                    </div>

                    <div className="text-xs text-blue-900 space-y-1 font-mono bg-white/70 p-2.5 rounded-lg border border-blue-100">
                        <p><span className="text-blue-500 font-sans">Email:</span> admin@nexus.cy</p>
                        <p><span className="text-blue-500 font-sans">Password:</span> admin</p>
                    </div>

                    <button
                        type="button"
                        onClick={handleQuickDemoLogin}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                    >
                        <span>⚡</span>
                        <span>{loading ? 'Σύνδεση...' : 'Άμεση Είσοδος ως Demo Admin'}</span>
                    </button>
                </div>

                {error && (
                    <div className="bg-rose-50 text-rose-600 text-xs p-3 rounded-lg border border-rose-200 font-medium">
                        {error}
                    </div>
                )}

                {/* Φόρμα Login */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@nexus.cy"
                            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Κωδικός (Password)</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-lg text-sm transition disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Έλεγχος στοιχείων...' : 'Σύνδεση'}
                    </button>
                </form>

            </div>
        </div>
    )
}