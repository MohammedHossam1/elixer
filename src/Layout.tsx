import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from "framer-motion";
import Header from './components/Header/Index';
import NewsletterModal from './components/NewsletterModal';
import Footer from './components/Footer';
import { useGetHomePage } from './hooks/fetch-hooks';
import { useTranslation } from 'react-i18next';

const Layout = () => {
    const [showNewsletterModal, setShowNewsletterModal] = useState(false);
    const { i18n } = useTranslation();
    const { data } = useGetHomePage(i18n.language || 'en')
    useEffect(() => {
        const isAr = i18n.language === 'ar' || i18n.language.startsWith('ar');
        document.documentElement.lang = isAr ? 'ar' : i18n.language.startsWith('he') ? 'he' : 'en';
        document.documentElement.dir = (i18n.language === 'ar' || i18n.language === 'he' || i18n.language.startsWith('ar') || i18n.language.startsWith('he')) ? 'rtl' : 'ltr';
        document.documentElement.classList.toggle('lang-ar', isAr);
    }, [i18n.language])
    useEffect(() => {
        const dismissed = localStorage.getItem("newsletter-dismissed");
        if (!dismissed) {
            const timer = setTimeout(() => setShowNewsletterModal(true), 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
                <Header />
            </motion.div>
            <Outlet />
            <Footer data={data?.data?.settings} />
            <NewsletterModal
                isOpen={showNewsletterModal}
                onClose={() => setShowNewsletterModal(false)}
            />
        </div>
    )
}

export default Layout