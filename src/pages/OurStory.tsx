import heroModel from "@/assets/hero-model.jpg";
import { useTranslation } from "react-i18next";

const OurStory = () => {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen bg-background ">
        {/* Hero Section */}
        <section className="relative pt-32  pb-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-2 lg:px-6 ">
            <div className="text-center ">
              <h1 className="font-script text-5xl lg:text-7xl text-primary mb-6">
                {t("ourStoryPage.heroTitle")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("ourStoryPage.heroSubtitle")}
              </p>
            </div>
          </div>
        </section>
        {/* Story Content */}
        <section className="py-5">
          <div className="container mx-auto px-2 lg:px-6 ">
            {/* Chapter 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-start mb-24  mx-auto">
              <div className="order-2 md:order-1">
                <h2 className="text-4xl font-bold mt-4 mb-6">{t("ourStoryPage.chapter1Title")}</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t("ourStoryPage.chapter1Paragraph1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("ourStoryPage.chapter1Paragraph2")}
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={heroModel}
                    alt={t("ourStoryPage.chapter1ImageAlt")}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
         
          </div>
        </section>
    </main>
  );
};
export default OurStory;