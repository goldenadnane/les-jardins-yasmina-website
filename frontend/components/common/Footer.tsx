import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { path: "/", label: t("common.home") },
    { path: "/rooms", label: t("common.rooms") },
    { path: "/gallery", label: t("common.gallery") },
    { path: "/activities", label: t("common.activities") },
    { path: "/contact", label: t("common.contact") },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Les Jardins Yasmina
            </h3>
            <p className="text-sm text-foreground/70">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">
              {t("footer.quick_links")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">
              {t("contact_page.info_title")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground/70">
                  {t("contact_page.address_value")}
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground/70">+212 XXX XXX XXX</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground/70">
                  contact@jardinsyasmina.com
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">
              {t("footer.follow_us")}
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/70">
          © {new Date().getFullYear()} Les Jardins Yasmina. {t("footer.rights")}
          .
        </div>
      </div>
    </footer>
  );
}
