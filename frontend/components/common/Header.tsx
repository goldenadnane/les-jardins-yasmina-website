import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: t("common.home") },
    { path: "/rooms", label: t("common.rooms") },
    { path: "/gallery", label: t("common.gallery") },
    { path: "/activities", label: t("common.activities") },
    { path: "/contact", label: t("common.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 section-light backdrop-blur-lg border-b border-border shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* LOGO - COULEUR FIXE ET VISIBLE */}
          <Link to="/" className="flex items-center">
            <motion.img
              src="/images/jardins_yasmina_logo.png"
              alt="Les Jardins Yasmina"
              className="h-20 w-auto object-contain"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: [0, -2, 0],
                scale: 1,
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              whileHover={{ scale: 1.05 }}
            />
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-[#B8860B] font-semibold"
                    : "text-gray-800 hover:text-[#B8860B] dark:text-gray-200 dark:hover:text-[#FFD700]"
                }`}
                onClick={handleNavClick}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* BOUTON RÉSERVER DESKTOP */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              className="bg-[#B8860B] text-black transition-colors font-semibold"
            >
              <Link to="/reservation">{t("common.book_now")}</Link>
            </Button>
          </div>

          {/* BOUTON MENU MOBILE - COULEUR FIXE POUR ÊTRE VISIBLE */}
          <button
            className="md:hidden p-3 bg-[#B8860B] text-black rounded-lg hover:bg-[#D4AF37] transition-colors"
            onClick={handleMenuToggle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* MENU MOBILE - FOND FONCÉ POUR CONTRASTE */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`text-base font-medium p-4 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-[#B8860B] text-black font-semibold"
                      : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* BOUTON RÉSERVER MOBILE */}
              <div className="pt-4 mt-2 border-t border-gray-300 dark:border-gray-700">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#B8860B] text-black hover:bg-[#D4AF37] font-bold py-4"
                >
                  <Link to="/reservation">{t("common.book_now")}</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
