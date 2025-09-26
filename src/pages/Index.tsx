import { FadeInSection } from "@/components/FadeSection";
import FullscreenCarousel from "@/components/FullscreenCarousel";
import Loader from "@/components/Loader";
import { Suspense, lazy, useEffect, useState } from "react";

// 👇 Lazy imports
const AboutUs = lazy(() => import("@/components/AboutUs"));
const TopCategories = lazy(() => import("@/components/TopCategories"));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase"));
const SkinResults = lazy(() => import("@/components/SkinResults"));
const WhatWeStandFor = lazy(() => import("@/components/WhatWeStandFor"));
const BeforeAfterComparison = lazy(() => import("@/components/BeforeAfterComparison"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

 
  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
   
      <Suspense fallback={<Loader />}>
        <main>
          <FadeInSection><FullscreenCarousel /></FadeInSection>
          <FadeInSection stop><AboutUs /></FadeInSection>
          <FadeInSection><TopCategories /></FadeInSection>
          <ProductShowcase />
          <FadeInSection><SkinResults /></FadeInSection>
          <FadeInSection><WhatWeStandFor /></FadeInSection>
          <FadeInSection><BeforeAfterComparison /></FadeInSection>
          <FadeInSection><Testimonials /></FadeInSection>
        </main>
      </Suspense>
    </div>
  );
};

export default Index;
