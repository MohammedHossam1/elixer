import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from "framer-motion";
import Header from './components/Header/Index';
import NewsletterModal from './components/NewsletterModal';
import Footer from './components/Footer';

const Layout = () => {
    const [showNewsletterModal, setShowNewsletterModal] = useState(false);

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
            <Footer />

            <NewsletterModal
                isOpen={showNewsletterModal}
                onClose={() => setShowNewsletterModal(false)}
            />
        </div>
    )
}

export default Layout