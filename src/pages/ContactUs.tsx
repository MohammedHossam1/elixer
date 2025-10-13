import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetHomePage, usePostContact } from "@/hooks/fetch-hooks";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import { useTranslation } from "react-i18next";

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" })
    .optional()
    .or(z.literal("")),
  subject: z.string()
    .trim()
    .min(3, { message: "Subject must be at least 3 characters" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");
  const { data } = useGetHomePage(lang || "en")
  const mutation = usePostContact()
  const contactData = data?.data?.settings
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const finalData = {
      ...data, city: "x", appointment_type_id: "1", date: "22-8-2026"

    }
    mutation.mutate(finalData)
    console.log(finalData);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t('contact.toast.successTitle'),
        description: t('contact.toast.successDesc'),
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      content: contactData.contact.email,
      link: `mailto:${contactData.contact.email}`,
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: contactData.contact.mobile,
      link: `tel:${contactData.contact.mobile}`,
    },
    {
      icon: MapPin,
      title: t('contact.address'),
      content: contactData.address,
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-2 lg:px-6  pb-10 pt-32">
        {/* Hero Section */}
        <div className="text-start mb-16">
          <h1 className="font-script text-5xl lg:text-6xl text-primary mb-4">
            {t('contact.heroTitle')}
          </h1>
          <p className="text-muted-foreground  mx-auto text-lg">
            {t('contact.heroSub')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12  mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className=" text-2xl lg:text-3xl font-bold mb-4">{t('contact.infoTitle')}</h2>
              <p className="text-muted-foreground mb-8">
                {t('contact.infoSub')}
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="card-elegant p-4 lg:p-6 flex items-start gap-4 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Contact Form */}
          <div className="card-elegant p-4 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-6">{t('contact.sendMessageTitle')}</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.nameLabel')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('contact.form.namePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.emailLabel')}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={t('contact.form.emailPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.phoneLabel')}</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder={t('contact.form.phonePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.subjectLabel')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('contact.form.subjectPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.messageLabel')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('contact.form.messagePlaceholder')}
                          className="min-h-[150px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gradient"
                >
                  {isSubmitting ? (
                    t('contact.form.sending')
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t('contact.form.sendMessageCta')}
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t('contact.faqTitle')}</h2>
          <p className="text-muted-foreground mb-8">
            {t('contact.faqSub')}
          </p>
          <Link to="/faq">
            <Button variant="outline" size="lg" className="btn-outline">
              {t('contact.viewFaq')}
            </Button>
          </Link>
        </div>
      </main>

    </div>
  );
};

export default ContactUs;
