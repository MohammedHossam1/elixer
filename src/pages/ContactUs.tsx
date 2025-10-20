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
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { contactSchema } from "@/schemas";
import toast from "react-hot-toast";




const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language
  const { data } = useGetHomePage(lang)
  const mutation = usePostContact()
  const contactData = data?.data?.settings
  const schema = contactSchema(t)
  type ContactFormData = z.infer<typeof schema>;

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
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
    mutation.mutate(data)
    // Simulate form submission
    setTimeout(() => {
      toast.success(t('contact.toast.successDesc'), { duration: 3000 });
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
                    <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
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
