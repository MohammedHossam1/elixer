import { Button } from "@/components/ui/button";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import transformationImage1 from "@/assets/after.jpg";
import transformationImage2 from "@/assets/before.png";
import { useTranslation } from "react-i18next";

const BeforeAfterComparison = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 lg:py-24 bg-gradient-subtle overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            {t('beforeAfterComparison.title')}
            <span className="block text-primary font-script text-4xl lg:text-6xl">
              {t('beforeAfterComparison.titleScript')}
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('beforeAfterComparison.description')}
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl shadow-elegant overflow-hidden relative">
            <div className="absolute  z-10 shadow-lg top-5 text-xs md:text-sm right-5 bg-primary/80 text-white px-4 py-2 rounded">
              <h4>{t('beforeAfterComparison.before')}</h4>
            </div>
            <div className="absolute  z-10 shadow-lg top-5 text-xs md:text-sm  left-5 bg-primary/80 text-white px-4 py-2 rounded">
              <h4>{t('beforeAfterComparison.after')}</h4>
            </div>
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src={transformationImage1}
                  alt="After skincare treatment showing improved skin quality"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={transformationImage2}
                  alt="Skincare transformation results showing before and after comparison"
                />
              }
            />
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              {t('beforeAfterComparison.cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('beforeAfterComparison.cta.description')}
            </p>
            <Button 
              size="lg" 
              className="btn-gradient text-white font-semibold px-8 py-6 text-lg"
            >
              {t('beforeAfterComparison.cta.button')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterComparison;
