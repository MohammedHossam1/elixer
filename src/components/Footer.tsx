import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { footerLinks } from "@/data/Index";
import { ISettings } from "@/types/Index";
import { useTranslation } from "react-i18next";

const Footer = ({ data }: { data: ISettings }) => {
  const { t } = useTranslation();


  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-12 gap-5 xl:gap-10 ">
          {/* Brand Section */}
          <div className="space-y-6 col-span-12 lg:col-span-4 ">
            <div>
              <h3 className="font-script text-4xl text-primary font-bold mb-2">
                {t('brand.name')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('footer.tagline1')} {t('footer.tagline2')}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-rose-gold flex-shrink-0" />
                <span className="text-muted-foreground">{data?.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-rose-gold flex-shrink-0" />
                <span className="text-muted-foreground">{data?.contact.mobile}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-rose-gold flex-shrink-0" />
                <span className="text-muted-foreground">{data?.contact.email}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 w-full  gap-x-2 gap-y-6  col-span-12 lg:col-span-8  ">
            {/* Footer Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="">
                <h4 className="font-semibold text-lg text-foreground">{title}</h4>
                <ul className="space-y-3 mt-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-start">
              <h4 className="font-semibold text-lg text-foreground mb-2">
                {t('footer.stayInLoop')}
              </h4>
              <p className="text-muted-foreground">
                {t('footer.subscribeCopy')}
              </p>
            </div>

            <div className="flex w-full lg:w-auto max-w-sm gap-2">
              <Input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1"
              />
              <Button className="btn-gradient text-white px-6">
                {t('footer.subscribeCta')}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {t('footer.madeWith')}  <Heart className="h-4 w-4 text-rose-gold fill-rose-gold" />{t('footer.by')}

              <Link to="https://qadi-tech.com/home" target="_blank">Qadi-tech</Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="/legals/privacy" className="hover:text-primary transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="/legals/terms" className="hover:text-primary transition-colors">
                {t('footer.terms')}
              </a>
              <a href="/legals/disclaimer" className="hover:text-primary transition-colors">
                {t('footer.disclaimer')}
              </a>
            </div>
          </div>

          <div className="text-center mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2025 Qadi-tech . {t('footer.allRightsReserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;