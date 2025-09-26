import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, CheckCircle } from "lucide-react";
import { results } from "@/data/Index";


const SkinResults = () => {
 

  return (
    <section className="py-16 lg:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-semibold">
            Real Results
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Proven <span className="text-primary font-script">Skin Transformations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See real before and after results from our customers who trusted ELIXIR skincare products. 
            These transformations speak for themselves - visible results that build confidence.
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
                          BEFORE
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
                          AFTER
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center card-elegant p-4 rounded-xl">
                    <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-sm font-semibold text-foreground">{result.duration}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center card-elegant p-4 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-foreground">{result.improvement}</div>
                    <div className="text-xs text-muted-foreground">Improvement</div>
                  </div>
                  <div className="text-center card-elegant p-4 rounded-xl">
                    <div className="flex justify-center mb-2">
                      {[...Array(result.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm font-semibold text-foreground">5.0</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <Badge variant="outline" className="mb-3 text-primary border-primary">
                    {result.concern}
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
                  <h4 className="font-semibold text-foreground">Products Used:</h4>
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
                    Get Similar Results
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