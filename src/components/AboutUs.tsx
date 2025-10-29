import { Button } from "@/components/ui/button";
import { IAbout } from "@/types/Index";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AboutUs = ({ data }: { data: IAbout }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language
  return (
    <section className="py-10 lg:py-12 bg-gradient-hero overflow-x-hidden">
      <div className="container mx-auto px-2 lg:px-6 ">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-bold text-foreground mb-4"
          >
            {t("about.titlePrefix")} {" "}
            <span className="text-primary font-script">{t("about.brandName")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-lg text-primary font-medium"
          >
            {t("about.tagline1")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-base text-primary font-medium"
          >
            {t("about.tagline2")}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6 origin-center"
          >
            <svg
              width="120"
              height="20"
              viewBox="0 0 120 20"
              className="text-primary"
            >
              <path
                d="M10 10 Q30 2, 50 10 Q70 18, 90 10 Q110 2, 110 10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: lang === 'en' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl lg:text-3xl text-center font-bold text-foreground max-lg:text-center">
                {t("about.sectionTitle")}
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed max-lg:text-center">
                <p className="text-base lg:text-lg">
                  {data?.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/shop" className="mx-auto">
                  <Button
                    size="lg"
                    className="btn-gradient text-white font-semibold px-6 sm:px-8 py-4 sm:py-6 text-base mx-auto sm:text-lg"
                  >
                    {t("about.shopCta")}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats & Highlights */}
            <motion.div
              initial={{ opacity: 0, x: lang === 'en' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-3 lg:gap-6 ">
                {data?.features.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center gap-1 lg:gap-3 h-full"
                  >

                    <div className="text-center  w-full  card-elegant p-6 rounded-2xl h-full flex items-center justify-center">
                      <span className="text-lg md:text-xl lg:text-xl font-bold text-primary mb-2">
                        {stat}
                      </span>
                    </div>
                  </motion.div>
                ))}


              </div>


            </motion.div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default AboutUs;
