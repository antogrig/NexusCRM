import { createContext, useContext, useState, useEffect } from 'react'

// 1. Δημιουργία του Context
const LanguageContext = createContext(null)

// 2. Provider Component
export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        const saved = localStorage.getItem('app_language')
        return saved === 'en' || saved === 'el' ? saved : 'el' // Προεπιλογή: Ελληνικά
    })

    const setLanguage = (newLang) => {
        setLangState(newLang)
        localStorage.setItem('app_language', newLang)
        document.documentElement.lang = newLang
    }

    // Συνάρτηση toggle που καλεί το Navbar
    const toggleLanguage = () => {
        setLanguage(lang === 'el' ? 'en' : 'el')
    }

    useEffect(() => {
        document.documentElement.lang = lang
    }, [lang])

    return (
        <LanguageContext.Provider value={{ lang, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

// 3. Custom Hook
export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('Το useLanguage πρέπει να χρησιμοποιείται μέσα σε ένα LanguageProvider')
    }
    return context
}