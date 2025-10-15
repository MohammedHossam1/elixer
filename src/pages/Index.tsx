import { FadeInSection } from "@/components/FadeSection";
import FullscreenCarousel from "@/components/FullscreenCarousel";
import Loader from "@/components/Loader";
import { useGetHomePage } from "@/hooks/fetch-hooks";
import { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";

// 👇 Lazy imports
const AboutUs = lazy(() => import("@/components/AboutUs"));
const TopCategories = lazy(() => import("@/components/TopSeller"));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase"));
const SkinResults = lazy(() => import("@/components/SkinResults"));
const WhatWeStandFor = lazy(() => import("@/components/WhatWeStandFor"));
const BeforeAfterComparison = lazy(() => import("@/components/BeforeAfterComparison"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const Index = () => {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const { data } = useGetHomePage(lang)
  return (
    <div className=" bg-background ">
      <Suspense fallback={<Loader />}>
        <main>
          <FadeInSection><FullscreenCarousel data={data?.data?.sliders} /></FadeInSection>
          <FadeInSection stop><AboutUs data={data?.data?.about_office} /></FadeInSection>
          <FadeInSection><TopCategories data={data?.data?.top_products} /></FadeInSection>
          <ProductShowcase />
          <FadeInSection><SkinResults data={data?.data?.real_results} /></FadeInSection>
          <FadeInSection><WhatWeStandFor data={data?.data?.how_we_works} /></FadeInSection>
          <FadeInSection><BeforeAfterComparison data={data?.data?.settings.see_the_transformation} /></FadeInSection>
          <FadeInSection><Testimonials data={data?.data?.customer_rates} /></FadeInSection>
        </main>
      </Suspense>
    </div>
  );
};

export default Index;
