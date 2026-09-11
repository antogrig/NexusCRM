import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext'// Ρύθμιση Base URL: Χρησιμοποιεί το Live Render API (ή το τοπικό αν οριστεί)

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://nexuscrm-aotu.onrender.com'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <LanguageProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </LanguageProvider>
    </StrictMode>,
)