import { useEffect, useState } from "react";
import Header from "@/components/Header";
import FullscreenCarousel from "@/components/FullscreenCarousel";
import BeforeAfterComparison from "@/components/BeforeAfterComparison";
import SkinResults from "@/components/SkinResults";
import AboutUs from "@/components/AboutUs";
import TopCategories from "@/components/TopCategories";
import ProductShowcase from "@/components/ProductShowcase";
import Testimonials from "@/components/Testimonials";
import NewsletterModal from "@/components/NewsletterModal";
import Footer from "@/components/Footer";

const Index = () => {
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  useEffect(() => {
    // Show newsletter modal after 3 seconds, unless user has dismissed it
    const dismissed = localStorage.getItem("newsletter-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowNewsletterModal(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <FullscreenCarousel />
        <AboutUs />
        <TopCategories />
        <ProductShowcase />
        <SkinResults />
        <BeforeAfterComparison />
        <Testimonials />
      </main>
      <Footer />

      {/* <NewsletterModal
        isOpen={showNewsletterModal}
        onClose={() => setShowNewsletterModal(false)}
      /> */}
    </div>
  );
};

export default Index;
