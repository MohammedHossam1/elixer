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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

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
    console.log(data);  
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24-48 hours.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "support@elixir.com",
      link: "mailto:support@elixir.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Beauty Avenue, Los Angeles, CA 90001",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-start mb-16">
          <h1 className="font-script text-5xl lg:text-6xl text-primary mb-4">
            Get In Touch
          </h1>
          <p className="text-muted-foreground  mx-auto text-lg">
            Have a question or need assistance? We're here to help you achieve your best skin.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12  mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className=" text-2xl lg:text-3xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Reach out to us through any of these channels and our team will respond promptly.
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

            {/* Business Hours */}
            <div className="card-elegant p-4 lg:p-6">
              <h3 className="font-semibold mb-4 text-lg">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday:</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-elegant p-4 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-6">Send Us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
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
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
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
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
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
                      <FormLabel>Subject *</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" {...field} />
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
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more about your inquiry..."
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
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-8">
            Looking for quick answers? Check out our FAQ section for common inquiries.
          </p>
          <Link to="/faq">
            <Button variant="outline" size="lg" className="btn-outline">
              View FAQ
            </Button>
          </Link>
        </div>
      </main>

    </div>
  );
};

export default ContactUs;
