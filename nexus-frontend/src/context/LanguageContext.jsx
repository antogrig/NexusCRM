import { createContext, useContext, useState, useEffect } from 'react'

// 1. Δημιουργία του Context καναλιού
const LanguageContext = createContext(null)

// 2. Provider Component που θα αγκαλιάσει όλη την εφαρμογή
export function LanguageProvider({ children }) {
    // Lazy State: Διαβάζουμε από το LocalStorage μόνο στο αρχικό φόρτωμα
    const [lang, setLangState] = useState(() => {
        const saved = localStorage.getItem('app_language')
        return saved === 'en' || saved === 'el' ? saved : 'el' // Προεπιλογή: Ελληνικά
    })

    // Συνάρτηση αλλαγής γλώσσας με ταυτόχρονη αποθήκευση
    const setLanguage = (newLang) => {
        setLangState(newLang)
        localStorage.setItem('app_language', newLang)
        document.documentElement.lang = newLang
    }

    // Συγχρονισμός του <html lang="..."> tag στο αρχικό mount
    useEffect(() => {
        document.documentElement.lang = lang
    }, [lang])

    return (
        <LanguageContext.Provider value={{ lang, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

// 3. Custom Hook για άμεση χρήση από οποιοδήποτε component
export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('Το useLanguage πρέπει να χρησιμοποιείται μέσα σε ένα LanguageProvider')
    }
    return context
}