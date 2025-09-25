import { useEffect, useState, Suspense, lazy } from "react";
import Header from "@/components/Header";
import FullscreenCarousel from "@/components/FullscreenCarousel";
import { motion } from "framer-motion";
import { FadeInSection } from "@/components/FadeSection";
import Loader from "@/components/Loader";

// 👇 Lazy imports
const AboutUs = lazy(() => import("@/components/AboutUs"));
const TopCategories = lazy(() => import("@/components/TopCategories"));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase"));
const SkinResults = lazy(() => import("@/components/SkinResults"));
const WhatWeStandFor = lazy(() => import("@/components/WhatWeStandFor"));
const BeforeAfterComparison = lazy(() => import("@/components/BeforeAfterComparison"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Footer = lazy(() => import("@/components/Footer"));
const NewsletterModal = lazy(() => import("@/components/NewsletterModal"));

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem("newsletter-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShowNewsletterModal(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header دا عادي */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
        <Header />
      </motion.div>

      <Suspense fallback={<Loader />}>
        <main>
          <FadeInSection><FullscreenCarousel /></FadeInSection>
          <FadeInSection><AboutUs /></FadeInSection>
          <FadeInSection><TopCategories /></FadeInSection>
          <ProductShowcase />
          <FadeInSection><SkinResults /></FadeInSection>
          <FadeInSection><WhatWeStandFor /></FadeInSection>
          <FadeInSection><BeforeAfterComparison /></FadeInSection>
          <FadeInSection><Testimonials /></FadeInSection>
        </main>

        <Footer />

        <NewsletterModal
          isOpen={showNewsletterModal}
          onClose={() => setShowNewsletterModal(false)}
        />
      </Suspense>
    </div>
  );
};

export default Index;
