import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
import Quiz from './Quiz'
import Docs from './Docs'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import SkillsPage from './pages/SkillsPage'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
    // 1. Auth States (Διαβάζουμε από το LocalStorage)
    const [token, setToken] = useState(localStorage.getItem('nexus_token') || null)
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('nexus_user') || 'null')
    )

    const [activeTab, setActiveTab] = useState('clients')
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Φόρμες
    const [clientForm, setClientForm] = useState({ company_name: '', vat_number: '', email: '', phone: '' })
    const [projectForm, setProjectForm] = useState({ client_id: '', title: '', status: 'open' })
    const [taskForm, setTaskForm] = useState({ project_id: '', title: '', status: 'todo' })
    const [submittingTask, setSubmittingTask] = useState(false)
    const [submittingClient, setSubmittingClient] = useState(false)
    const [submittingProject, setSubmittingProject] = useState(false)

    // Ρύθμιση Authorization Header στο Axios
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            fetchClients()
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    }, [token])

    const fetchClients = () => {
        setLoading(true)
        axios.get('/api/clients')
            .then((res) => {
                setClients(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                // Αν το token έληξε ή είναι άκυρο, αποσύνδεση
                if (err.response?.status === 401) {
                    handleLogout()
                } else {
                    setError('Αποτυχία φόρτωσης δεδομένων.')
                }
                setLoading(false)
            })
    }

    // Χειρισμός επιτυχούς Login
    const handleLoginSuccess = (receivedToken, receivedUser) => {
        localStorage.setItem('nexus_token', receivedToken)
        localStorage.setItem('nexus_user', JSON.stringify(receivedUser))
        setToken(receivedToken)
        setUser(receivedUser)
    }

    // Χειρισμός Logout
    const handleLogout = () => {
        if (token) {
            axios.post('/api/logout').catch(() => {})
        }
        localStorage.removeItem('nexus_token')
        localStorage.removeItem('nexus_user')
        setToken(null)
        setUser(null)
        setClients([])
    }

    // Submit Πελάτη
    const handleClientSubmit = (e) => {
        e.preventDefault()
        setSubmittingClient(true)

        axios.post('/api/clients', clientForm)
            .then(() => {
                fetchClients()
                setClientForm({ company_name: '', vat_number: '', email: '', phone: '' })
                setSubmittingClient(false)
            })
            .catch(() => {
                alert('Σφάλμα αποθήκευσης.')
                setSubmittingClient(false)
            })
    }

    // Submit Project
    const handleProjectSubmit = (e) => {
        e.preventDefault()
        if (!projectForm.client_id) return alert('Επιλέξτε πελάτη!')
        setSubmittingProject(true)

        axios.post('/api/projects', projectForm)
            .then(() => {
                fetchClients()
                setProjectForm({ client_id: '', title: '', status: 'open' })
                setSubmittingProject(false)
            })
            .catch(() => {
                alert('Σφάλμα αποθήκευσης.')
                setSubmittingProject(false)
            })
    }

    // 1. Αποστολή νέου Task στο Laravel (POST /api/tasks)
    const handleTaskSubmit = (e) => {
        e.preventDefault()
        if (!taskForm.project_id) return alert('Επιλέξτε Project!')
        setSubmittingTask(true)

        axios.post('/api/tasks', taskForm)
            .then(() => {
                fetchClients() // Ξανατραβάμε τα δεδομένα για να εμφανιστεί το νέο task
                setTaskForm({ project_id: '', title: '', status: 'todo' }) // Καθαρίζουμε τη φόρμα
                setSubmittingTask(false)
            })
            .catch(() => setSubmittingTask(false))
    }

    // 2. Εναλλαγή κατάστασης todo <-> done (PATCH /api/tasks/{id})
    const handleToggleTask = (task) => {
        // Αν είναι done το κάνουμε todo, αλλιώς done
        const nextStatus = task.status === 'done' ? 'todo' : 'done'

        axios.patch(`/api/tasks/${task.id}`, { status: nextStatus })
            .then(() => {
                fetchClients() // Ανανεώνουμε το UI
            })
            .catch((err) => console.error(err))
    }

    // Συγκεντρώνουμε όλα τα projects όλων των πελατών σε μία ενιαία λίστα για το Dropdown
    const allProjects = clients.flatMap((c) =>
        (c.projects || []).map((p) => ({ ...p, client_name: c.company_name }))
    )

    // Αν ΥΠΑΡΧΕΙ Token, δείχνουμε το Dashboard!
    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col w-full">
            {/* Full-Width Sticky Navbar */}
            <Navbar />

            {/* Full-Width Main Content */}
            <main className="flex-1 w-full">
                <Routes>
                    {/* Διαδρομή για το CRM */}
                    <Route path="/crm" element={
                        !token ? (
                            <div className="max-w-6xl mx-auto p-6 md:p-10">
                                <Login onLoginSuccess={handleLoginSuccess} />
                            </div>
                        ) : (
                            <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-6">
                                {/* Top Header με User Profile & Logout μόνο μέσα στο CRM */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h1 className="text-2xl font-bold text-slate-800">NexusCRM Dashboard</h1>
                                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                Sanctum Auth
                                            </span>
                                        </div>
                                        <p className="text-slate-500 text-sm">Fullstack Laravel + React Portfolio</p>
                                    </div>

                                    <div className="flex items-center gap-3 flex-wrap">
                                        <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <span>👤 {user?.name || 'User'}</span>
                                            <span className="bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.5 rounded text-[10px] uppercase">
                                                {user?.role || 'admin'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="text-xs bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 transition cursor-pointer"
                                        >
                                            🚪 Αποσύνδεση
                                        </button>
                                    </div>
                                </div>

                                {/* Φόρμες CRM */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Φόρμα Task */}
                                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                                        <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                            <span>📝</span> Νέο Task
                                        </h2>
                                        <form onSubmit={handleTaskSubmit} className="space-y-2.5">
                                            <select
                                                required
                                                value={taskForm.project_id}
                                                onChange={(e) => setTaskForm({ ...taskForm, project_id: e.target.value })}
                                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                            >
                                                <option value="">-- Επιλογή Project --</option>
                                                {allProjects.map((p) => (
                                                    <option key={p.id} value={p.id}>
                                                        {p.title} ({p.client_name})
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="text"
                                                required
                                                value={taskForm.title}
                                                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                                                placeholder="Τίτλος Task *"
                                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                            <button
                                                type="submit"
                                                disabled={submittingTask || allProjects.length === 0}
                                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg text-xs transition disabled:opacity-50 cursor-pointer"
                                            >
                                                {submittingTask ? 'Αποθήκευση...' : '+ Προσθήκη Task'}
                                            </button>
                                        </form>
                                    </div>

                                    {/* Φόρμα Πελάτη */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                        <h2 className="text-base font-bold text-slate-700 mb-4 flex items-center gap-2">
                                            <span>🏢</span> Προσθήκη Νέου Πελάτη
                                        </h2>
                                        <form onSubmit={handleClientSubmit} className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-600 mb-1">Όνομα Εταιρείας *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={clientForm.company_name}
                                                    onChange={(e) => setClientForm({ ...clientForm, company_name: e.target.value })}
                                                    placeholder="π.χ. CyTech Systems"
                                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-600 mb-1">ΑΦΜ (VAT)</label>
                                                    <input
                                                        type="text"
                                                        value={clientForm.vat_number}
                                                        onChange={(e) => setClientForm({ ...clientForm, vat_number: e.target.value })}
                                                        placeholder="CY12345678X"
                                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-600 mb-1">Τηλέφωνο</label>
                                                    <input
                                                        type="text"
                                                        value={clientForm.phone}
                                                        onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                                                        placeholder="+357..."
                                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-600 mb-1">Email Επικοινωνίας</label>
                                                <input
                                                    type="email"
                                                    value={clientForm.email}
                                                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                                                    placeholder="info@cytech.com"
                                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={submittingClient}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition mt-2 disabled:opacity-50 cursor-pointer"
                                            >
                                                {submittingClient ? 'Αποθήκευση...' : '+ Δημιουργία Πελάτη'}
                                            </button>
                                        </form>
                                    </div>

                                    {/* Φόρμα Project */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                        <h2 className="text-base font-bold text-slate-700 mb-4 flex items-center gap-2">
                                            <span>📂</span> Ανάθεση Νέου Project
                                        </h2>
                                        <form onSubmit={handleProjectSubmit} className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-medium text-slate-600 mb-1">Επιλογή Πελάτη *</label>
                                                <select
                                                    required
                                                    value={projectForm.client_id}
                                                    onChange={(e) => setProjectForm({ ...projectForm, client_id: e.target.value })}
                                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                                >
                                                    <option value="">-- Επιλέξτε Εταιρεία --</option>
                                                    {clients.map((c) => (
                                                        <option key={c.id} value={c.id}>
                                                            {c.company_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-600 mb-1">Τίτλος Project *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={projectForm.title}
                                                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                                    placeholder="π.χ. E-shop Redesign"
                                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-600 mb-1">Κατάσταση (Status)</label>
                                                <select
                                                    value={projectForm.status}
                                                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                                >
                                                    <option value="open">🟢 Open</option>
                                                    <option value="in_progress">🟡 In Progress</option>
                                                    <option value="completed">🔵 Completed</option>
                                                </select>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={submittingProject || clients.length === 0}
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-sm transition mt-2 disabled:opacity-50 cursor-pointer"
                                            >
                                                {submittingProject ? 'Αποθήκευση...' : '+ Ανάθεση Project'}
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                {/* Πίνακας Πελατών & Projects */}
                                {loading && <div className="text-center py-6 text-slate-500">Φόρτωση...</div>}
                                {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>}

                                {!loading && !error && (
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                        <div className="px-6 py-4 border-b border-slate-200">
                                            <h2 className="font-semibold text-slate-700">
                                                🏢 Πελάτες & Projects ({clients.length})
                                            </h2>
                                        </div>

                                        <table className="w-full text-left border-collapse text-sm">
                                            <thead>
                                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase font-medium">
                                                <th className="px-6 py-3">Εταιρεία</th>
                                                <th className="px-6 py-3">Στοιχεία Επικοινωνίας</th>
                                                <th className="px-6 py-3">Projects & Tasks</th>
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                            {clients.map((client) => (
                                                <tr key={client.id} className="hover:bg-slate-50/80 transition">
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-slate-800">{client.company_name}</div>
                                                        <div className="text-xs text-slate-400">ΑΦΜ: {client.vat_number || '-'}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-slate-700">{client.email || '-'}</div>
                                                        <div className="text-xs text-slate-400">{client.phone || '-'}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {client.projects && client.projects.length > 0 ? (
                                                            <div className="space-y-3">
                                                                {client.projects.map((proj) => (
                                                                    <div
                                                                        key={proj.id}
                                                                        className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-2 text-xs"
                                                                    >
                                                                        <div className="flex items-center justify-between gap-2">
                                                                                <span className="font-semibold text-slate-800 flex items-center gap-1">
                                                                                    <span>🚀</span> {proj.title}
                                                                                </span>
                                                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                                                                proj.status === 'completed'
                                                                                    ? 'bg-blue-100 text-blue-700'
                                                                                    : proj.status === 'in_progress'
                                                                                        ? 'bg-amber-100 text-amber-700'
                                                                                        : 'bg-emerald-100 text-emerald-700'
                                                                            }`}>
                                                                                    {proj.status}
                                                                                </span>
                                                                        </div>

                                                                        <div className="space-y-1 pt-1">
                                                                            {proj.tasks && proj.tasks.length > 0 ? (
                                                                                proj.tasks.map((task) => {
                                                                                    const isDone = task.status === 'done'
                                                                                    return (
                                                                                        <div
                                                                                            key={task.id}
                                                                                            onClick={() => handleToggleTask(task)}
                                                                                            className="flex items-center gap-2 bg-white p-1.5 rounded border border-slate-200/80 hover:border-blue-300 transition cursor-pointer text-xs"
                                                                                        >
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={isDone}
                                                                                                readOnly
                                                                                                className="rounded text-blue-600 cursor-pointer"
                                                                                            />
                                                                                            <span className={`flex-1 ${isDone ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                                                                                                    {task.title}
                                                                                                </span>
                                                                                            <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold uppercase ${
                                                                                                isDone ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600'
                                                                                            }`}>
                                                                                                    {task.status}
                                                                                                </span>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            ) : (
                                                                                <p className="text-[11px] text-slate-400 italic">
                                                                                    Κανένα task ακόμα.
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-slate-400 italic">
                                                                    Κανένα project
                                                                </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )
                    } />

                    {/* Διαδρομές Quiz & Docs */}
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/docs" element={<Docs />} />

                    {/* Σελίδες Portfolio */}
                    <Route path="/" element={<Home />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/skills" element={<SkillsPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/crm" replace />} />
                </Routes>
            </main>
            <main className="w-full flex-1">
                <Routes>
                    {/* ... όλα τα routes ... */}
                </Routes>
            </main>

            {/* Global Reeni Footer & Scroll-To-Top */}
            <Footer />
        </div>
    )
}

export default App