import { FadeInSection } from "@/components/FadeSection";
import FullscreenCarousel from "@/components/FullscreenCarousel";
import Loader from "@/components/Loader";
import { useGetHomePage } from "@/hooks/fetch-hooks";
import { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

// 👇 Lazy imports
const AboutUs = lazy(() => import("@/components/AboutUs"));
const TopCategories = lazy(() => import("@/components/TopSeller"));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase"));
const SkinResults = lazy(() => import("@/components/SkinResults"));
const WhatWeStandFor = lazy(() => import("@/components/WhatWeStandFor"));
const BeforeAfterComparison = lazy(() => import("@/components/BeforeAfterComparison"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const Index = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { data } = useGetHomePage(lang);

  const SITE_URL = import.meta.env.VITE_SITE_URL || "https://elixir.com";
  const SITE_NAME = "ELIXIR";

  const settings = data?.data?.settings;

  return (
    <div className="bg-background">
      <Helmet>
        <title>{t("home.title") }</title>
        <meta
          name="description"
          content={t("home.description")}
        />
        <meta
          name="keywords"
          content="Elixir, skincare, cosmetics, beauty, moisturizer, serum, cleanser, natural products"
        />
        <meta name="author" content={SITE_NAME} />
        <link rel="canonical" href={SITE_URL} />

        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("home.title") || SITE_NAME} />
        <meta
          property="og:description"
          content={t("home.description")}
        />
        <meta property="og:image" content={settings?.logo || "/logo.png"} />
        <meta property="og:url" content={SITE_URL} />
        <meta
          property="og:locale"
          content={lang === "ar" ? "ar_AR" : lang === "he" ? "he_IL" : "en_US"}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("home.title") || SITE_NAME} />
        <meta
          name="twitter:description"
          content={t("home.description") || "Premium skincare and beauty products for all skin types."}
        />
        <meta name="twitter:image" content={settings?.logo || "/logo.png"} />

        {/* 🧾 Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BeautySupplyStore",
            name: SITE_NAME,
            url: SITE_URL,
            image: settings?.logo || "/logo.png",
            description:
              t("home.description") ||
              "Premium skincare and beauty products for all skin types.",
            telephone: settings?.contact?.mobile ,
            email: settings?.contact?.email || "info@elixir.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: settings?.address || "123 Beauty Street",
              addressLocality: "Ramallah",
              addressCountry: "PS",
            },
            openingHours: "Mo-Sa 09:00-21:00",
            priceRange: "$$",
            sameAs: [
              settings?.social_media?.facebook || "https://www.facebook.com/elixir",
              settings?.social_media?.instagram || "https://www.instagram.com/elixir",
              settings?.social_media?.twitter || "https://twitter.com/elixir",
            ],
          })}
        </script>

        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      {/* 🧩 Page Sections */}
      <Suspense fallback={<Loader />}>
        <main>
          <FadeInSection>
            <FullscreenCarousel data={data?.data?.sliders} />
          </FadeInSection>
          <FadeInSection stop>
            <AboutUs data={data?.data?.about_office} />
          </FadeInSection>
          <FadeInSection>
            <TopCategories data={data?.data?.top_products} />
          </FadeInSection>
          <ProductShowcase />
          <FadeInSection>
            <SkinResults data={data?.data?.real_results} />
          </FadeInSection>
          <FadeInSection>
            <WhatWeStandFor data={data?.data?.why_choose_us} />
          </FadeInSection>
          <FadeInSection>
            <BeforeAfterComparison data={settings?.see_the_transformation} />
          </FadeInSection>
          <FadeInSection>
            <Testimonials data={data?.data?.customer_rates} />
          </FadeInSection>
        </main>
      </Suspense>
    </div>
  );
};

export default Index;
