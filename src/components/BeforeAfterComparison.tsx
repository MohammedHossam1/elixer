import { Button } from "@/components/ui/button";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import transformationImage1 from "@/assets/after.jpg";
import transformationImage2 from "@/assets/before.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ICompare } from "@/types/Index";

const BeforeAfterComparison = ({ data }: { data: ICompare }) => {
  const { t , i18n} = useTranslation();
  if (!data || data.image_after == null || data.image_before == null) return null

  return (
    <section className="py-10 lg:py-12 bg-gradient-subtle overflow-x-hidden">
      <div className="container mx-auto px-2 lg:px-6 ">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            {t('beforeAfterComparison.title')}
            <span className={`block text-primary ${i18n.language === 'en' && "font-script"}  text-4xl lg:text-6xl`}>
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
              <h3>{t('beforeAfterComparison.before')}</h3>
            </div>
            <div className="absolute  z-10 shadow-lg top-5 text-xs md:text-sm  left-5 bg-primary/80 text-white px-4 py-2 rounded">
              <h4>{t('beforeAfterComparison.after')}</h4>
            </div>
            <ReactCompareSlider
            dir="ltr"
              itemOne={
                <ReactCompareSliderImage
                  src={data?.image_after || transformationImage1}
                  alt="After skincare treatment showing improved skin quality"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={data?.image_before || transformationImage2}
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
            <Link to="/contact" >
              <Button
                size="lg"
                className="btn-gradient text-white font-semibold px-8 py-6 text-lg"
              >
                {t('contactUs')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterComparison;
