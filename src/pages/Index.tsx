import { FadeInSection } from "@/components/FadeSection";
import FullscreenCarousel from "@/components/FullscreenCarousel";
import Loader from "@/components/Loader";
import { useGetHomePage } from "@/hooks/fetch-hooks";
import { Suspense, lazy } from "react";

// 👇 Lazy imports
const AboutUs = lazy(() => import("@/components/AboutUs"));
const TopCategories = lazy(() => import("@/components/TopSeller"));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase"));
const SkinResults = lazy(() => import("@/components/SkinResults"));
const WhatWeStandFor = lazy(() => import("@/components/WhatWeStandFor"));
const BeforeAfterComparison = lazy(() => import("@/components/BeforeAfterComparison"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const Index = () => {
  const lang = localStorage.getItem('lang')
  const { data } = useGetHomePage(lang)
  return (
    <div className=" bg-background ">
      <Suspense fallback={<Loader />}>
        <main>
          <FadeInSection><FullscreenCarousel data={data?.data?.sliders} /></FadeInSection>
          <FadeInSection stop><AboutUs  data={data?.data?.about_office} /></FadeInSection>
          <FadeInSection><TopCategories    /></FadeInSection>
          <ProductShowcase   />
          <FadeInSection><SkinResults   /></FadeInSection>
          <FadeInSection><WhatWeStandFor data={data?.data?.how_we_works}   /></FadeInSection>
          <FadeInSection><BeforeAfterComparison   /></FadeInSection>
          <FadeInSection><Testimonials   /></FadeInSection>
        </main>
      </Suspense>
    </div>
  );
};

export default Index;
