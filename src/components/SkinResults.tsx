import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { results } from "@/data/Index";
import { useTranslation } from "react-i18next";


const SkinResults = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 lg:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-semibold">
            {t('skinResults.badge')}
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            {t('skinResults.title')} <span className="text-primary font-script">{t('skinResults.titleScript')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('skinResults.description')}
          </p>
        </div>

        {/* Results Grid */}
        <div className="space-y-16 max-w-7xl mx-auto">
          {results.map((result, index) => (
            <div
              key={result.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-cols-2' : ''
              }`}
            >
              {/* Before/After Images */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="grid grid-cols-2 gap-4">
                  {/* Before Image */}
                  <div className="space-y-3">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={result.beforeImage}
                        alt={`Before ${result.title} treatment`}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="destructive" className="text-xs font-semibold">
                          {t('skinResults.before')}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* After Image */}
                  <div className="space-y-3">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={result.afterImage}
                        alt={`After ${result.title} treatment`}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="default" className="text-xs font-semibold bg-green-600 hover:bg-green-700">
                          {t('skinResults.after')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

              
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <Badge variant="outline" className="mb-3 text-primary border-primary">
                    {result.duration}
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {result.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    "{result.testimonial}"
                  </p>
                </div>

                {/* Products Used */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">{t('skinResults.productsUsed')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.products.map((product, productIndex) => (
                      <Badge
                        key={productIndex}
                        variant="secondary"
                        className="px-3 py-1 text-xs bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4  w-fit">
                  <Button 
                    size="lg" 
                    className="btn-gradient text-white font-semibold px-6 py-3 text-base w-fit"
                  >
                    {t('skinResults.getSimilarResults')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

  
      </div>
    </section>
  );
};

export default SkinResults;