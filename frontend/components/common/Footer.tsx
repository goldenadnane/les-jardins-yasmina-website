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
    <footer className="bg-foreground border-t border-border relative">
      {/* TRAIT HORIZONTAL SUPÉRIEUR */}
      <div className="absolute top-0 left-0 w-full border-t border-gray-300"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-linear-to-r bg-[#B8860B] bg-clip-text text-transparent">
              Les Jardins Yasmina
            </h3>
            <p className="text-sm text-black">{t("footer.description")}</p>
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
                    className="text-sm text-black! hover:text-primary! transition-colors"
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
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-black">
                  {t("contact_page.address_value")}
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-black">
                  + 212 662170223 / + 212 661089226
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-black">lesjardinsyasmina@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">
              {t("footer.follow_us")}
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/lesjardinsyasmina/"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://www.instagram.com/lesjardinsyasmina/"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-black space-y-2">
          <div>
            © {new Date().getFullYear()} Les Jardins Yasmina.{" "}
            {t("footer.rights")}.
          </div>

          <div className="text-l">
            Développé par{" "}
            <a
              href="https://hospitalitywebservices.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400! hover:text-orange-500 font-semibold transition-colors"
            >
              HWS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
