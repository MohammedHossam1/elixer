import heroModel from "@/assets/hero-model.jpg";
import Loader from "@/components/Loader";
import Image from "@/components/shared/Image";
import { useGetHomePage } from "@/hooks/fetch-hooks";
import { useTranslation } from "react-i18next";

const OurStory = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading } = useGetHomePage(lang);
  if (isLoading) return <Loader />;
  if (!data) return null;
  const finalData = data?.data?.our_story
  return (
    <main className="min-h-screen bg-background ">
      {/* Hero Section */}
      <section className="relative pt-32  pb-10 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-2 lg:px-6 ">
          <div className="text-center ">
            <h1 className="font-script text-5xl lg:text-7xl text-primary mb-6">
              {finalData?.title}
            </h1>
          </div>
        </div>
      </section>
      {/* Story Content */}
      <section className="py-5">
        <div className="container mx-auto px-2 lg:px-6 ">
          {/* Chapter 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-24  mx-auto">
            <div className="order-2 md:order-1">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {finalData?.description}
              </p>
          
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={finalData?.image || heroModel}
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