import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const faqCategories = [
  {
    title: "Products & Ingredients",
    questions: [
      {
        q: "Are ELIXIR products suitable for sensitive skin?",
        a: "Yes! All our products are dermatologically tested and formulated with gentle, high-quality ingredients. We avoid harsh chemicals, parabens, and sulfates. However, we recommend doing a patch test before full application if you have very sensitive skin.",
      },
      {
        q: "Are your products cruelty-free and vegan?",
        a: "Absolutely! ELIXIR is proud to be 100% cruelty-free and vegan. We never test on animals and none of our products contain animal-derived ingredients.",
      },
      {
        q: "What is the shelf life of your products?",
        a: "Our products have a shelf life of 24-36 months when unopened. Once opened, we recommend using them within 12 months for optimal effectiveness. Always check the PAO (Period After Opening) symbol on the packaging.",
      },
      {
        q: "Can I use multiple ELIXIR products together?",
        a: "Yes! Our products are designed to work synergistically. We recommend following this routine: cleanser → serum → moisturizer → sunscreen (AM). For personalized recommendations, consult our skincare quiz or contact our team.",
      },
    ],
  },
  {
    title: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available at checkout. International orders may take 10-15 business days depending on the destination.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer free standard shipping on all orders over $50. Express shipping is available for an additional fee.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can also track your order status in your account dashboard.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. International customers are responsible for any customs duties or import taxes.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, you can return unused products in their original packaging for a full refund.",
      },
      {
        q: "How do I initiate a return?",
        a: "Contact our customer service team at support@elixir.com with your order number. We'll provide you with a prepaid return label and instructions.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5-7 business days after we receive your return. The refund will be credited to your original payment method.",
      },
      {
        q: "Can I exchange a product?",
        a: "Yes! If you'd like to exchange a product for a different one, please contact our customer service team and we'll arrange the exchange for you.",
      },
    ],
  },
  {
    title: "Account & Payment",
    questions: [
      {
        q: "Do I need an account to place an order?",
        a: "No, you can checkout as a guest. However, creating an account allows you to track orders, save your wishlist, and receive exclusive offers.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes! We use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. After that, your order will be processed and shipped.",
      },
    ],
  },
  {
    title: "Skincare Tips",
    questions: [
      {
        q: "What's the best skincare routine for beginners?",
        a: "Start with the basics: cleanser, moisturizer, and sunscreen. Once your skin adjusts, you can add targeted treatments like serums. Always introduce new products one at a time.",
      },
      {
        q: "How often should I exfoliate?",
        a: "For most skin types, exfoliating 2-3 times per week is sufficient. If you have sensitive skin, start with once a week and gradually increase if needed.",
      },
      {
        q: "When should I apply sunscreen?",
        a: "Apply sunscreen as the last step of your morning skincare routine, 15-20 minutes before sun exposure. Reapply every 2 hours if you're outdoors.",
      },
      {
        q: "Can I use retinol and vitamin C together?",
        a: "It's best to use retinol at night and vitamin C in the morning to avoid irritation and maximize benefits. If you want to use both, introduce them slowly and monitor your skin's response.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-start mb-16">
          <h1 className="font-script text-5xl lg:text-6xl text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our products, shipping, returns, and more.
          </p>
        </div>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  lg:gap-16  ">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="">
              <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    value={`${categoryIndex}-${questionIndex}`}
                    className="card-elegant px-6 border-none"
                  >
                    <AccordionTrigger className="text-left hover:text-primary transition-colors py-5">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center mx-auto card-elegant p-12">
          <Mail className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Can't find the answer you're looking for? Our customer support team is here to help.
          </p>
          <Link to="/contact">
            <Button size="lg" className="btn-gradient">
              Contact Support
            </Button>
          </Link>
        </div>
      </main>

    </div>
  );
};

export default FAQ;
