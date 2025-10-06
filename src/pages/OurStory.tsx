import heroModel from "@/assets/hero-model.jpg";
const OurStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="relative py-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-5">
              <h1 className="font-script text-5xl lg:text-7xl text-primary mb-6">
                Our Story
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A journey of passion, science, and dedication to transforming skincare
              </p>
            </div>
          </div>
        </section>
        {/* Story Content */}
        <section className="py-5">
          <div className="container mx-auto px-4">
            {/* Chapter 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-start mb-24 max-w-6xl mx-auto">
              <div className="order-2 md:order-1">
                <h2 className="text-4xl font-bold mt-4 mb-6">Where It All Started</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  In 2020, our founder discovered the transformative power of combining
                  natural ingredients with modern science. Frustrated by products filled
                  with harsh chemicals and empty promises, she embarked on a mission to
                  create something different.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  What started in a small laboratory with a handful of formulations has
                  grown into a movement. A movement that believes skincare should be
                  effective, sustainable, and accessible to everyone who dreams of
                  healthy, radiant skin.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={heroModel}
                    alt="Our founder's journey"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
         
          </div>
        </section>
      </main>
    </div>
  );
};
export default OurStory;