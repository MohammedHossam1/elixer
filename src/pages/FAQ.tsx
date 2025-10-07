import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useGetFAQ } from "@/hooks/fetch-hooks";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";



const FAQ = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetFAQ(i18n.language);
  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-start mb-16">
          <h1 className="font-script text-5xl lg:text-6xl text-primary mb-4">
            {t("faqTitle")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("faqDesc")}
          </p>
        </div>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  lg:gap-16  ">
          {data?.data.items.map((item, index) => (
            <div key={index} className="">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  key={index}
                  value={index.toString()}
                  className="card-elegant px-6 border-none"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    <p dangerouslySetInnerHTML={{ __html: item.answer }} />

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center mx-auto card-elegant p-12">
          <Mail className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">{t("faqContactTitle")}</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            {t("faqContactDesc")}
          </p>
          <Link to="/contact">
            <Button size="lg" className="btn-gradient">
              {t("faqContactBtn")}
            </Button>
          </Link>
        </div>
      </main>

    </div>
  );
};

export default FAQ;
