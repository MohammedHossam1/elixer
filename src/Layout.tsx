import { motion } from "framer-motion";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header/Index';
import { useGetHomePage } from './hooks/fetch-hooks';

const Layout = () => {
    const { i18n } = useTranslation();
    const { data } = useGetHomePage(i18n.language || 'en')
    useEffect(() => {
        const isAr = i18n.language === 'ar' || i18n.language.startsWith('ar');
        document.documentElement.lang = isAr ? 'ar' : i18n.language.startsWith('he') ? 'he' : 'en';
        document.documentElement.dir = (i18n.language === 'ar' || i18n.language === 'he' || i18n.language.startsWith('ar') || i18n.language.startsWith('he')) ? 'rtl' : 'ltr';
        document.documentElement.classList.toggle('lang-ar', isAr);
    }, [i18n.language])
  
    return (
        <div>
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
                <Header />
            </motion.div>
            <Outlet />
            <Footer data={data?.data?.settings} />
           
        </div>
    )
}

export default Layout