import { footerLinks } from "@/data/Index";
import { ISettings } from "@/types/Index";
import { Heart, Mail, MapPin, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Image from "./shared/Image";

const Footer = ({ data }: { data: ISettings }) => {
  const { t } = useTranslation();


  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-2 lg:px-6 ">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-12 gap-5 xl:gap-10 ">
          {/* Brand Section */}
          <div className="space-y-6 col-span-12 lg:col-span-4 ">
            <div className="space-y-3">
              <Link to="/">
                <Image src={data?.logo} alt="Logo" className="w-1/2" />
              </Link>
              <p className="text-muted-foreground leading-relaxed">
                {t('footer.tagline1')} {t('footer.tagline2')}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {data?.address && <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-rose-gold flex-shrink-0" />
                <span className="text-muted-foreground">{data?.address}</span>
              </div>}
              {data?.contact.mobile && <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-rose-gold flex-shrink-0" />
                <span className="text-muted-foreground">{data?.contact.mobile}</span>
              </div>}
              {data?.contact.email && <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-rose-gold flex-shrink-0" />
                <span className="text-muted-foreground">{data?.contact.email}</span>
              </div>}
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              {data?.social_media?.facebook && (
                <Link to={data.social_media.facebook} target="_blank">
                  <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-200" />
                </Link>
              )}
              {data?.social_media?.instagram && (
                <Link to={data.social_media.instagram} target="_blank">
                  <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-200" />
                </Link>
              )}
              {data?.social_media?.twitter && (
                <Link to={data.social_media.twitter} target="_blank">
                  <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-200" />
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 w-full  gap-x-2 gap-y-6  col-span-12 lg:col-span-8  ">
            {/* Footer Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="">
                <h4 className="font-semibold text-lg text-foreground">{t(title)}</h4>
                <ul className="space-y-3 mt-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {t(link.name)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>


        {/* Bottom Section */}
        <div className=" relative py-6 border-t border-border">
          <div className="absolute left-1/2 -top-5 -translate-x-1/2">
            <ScrollToTop />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {t('footer.madeWith')}  <Heart className="h-4 w-4 text-rose-gold fill-rose-gold" />{t('footer.by')}
              <Link to="https://qadi-tech.com/home" target="_blank">Qadi-tech</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Elixir . {t('footer.allRightsReserved')}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;