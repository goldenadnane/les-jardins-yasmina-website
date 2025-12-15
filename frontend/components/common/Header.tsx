import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTheme } from "@/hooks/useTheme";
import { usePandaAnimation } from "@/hooks/usePandasAnimation";
import { useWindArtAnimation } from "@/hooks/useWinArtAnimation";
import { useFoundationAnimation } from "@/hooks/useFoundationAnimation";

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Références pour les animations
  const logoRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Appliquer les animations
  usePandaAnimation(logoRef);
  useFoundationAnimation(navRef);
  useWindArtAnimation(themeButtonRef);
  useWindArtAnimation(menuButtonRef);
  useFoundationAnimation(desktopNavRef);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Animation au défilement
      if (navRef.current && window.scrollY > 100) {
        navRef.current.classList.add("scroll-animate");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Animation au chargement
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);

    // Animation d'entrée pour les éléments de navigation
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("panda-animate");
      }, index * 100);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const navItems = [
    { path: "/", label: t("common.home") },
    { path: "/rooms", label: t("common.rooms") },
    { path: "/gallery", label: t("common.gallery") },
    { path: "/activities", label: t("common.activities") },
    { path: "/contact", label: t("common.contact") },
  ];

  const headerBg = isScrolled
    ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border contrast-bg-primary"
    : theme === "light"
    ? "bg-background/90 backdrop-blur-sm border-b border-border/50"
    : "bg-background/90 backdrop-blur-sm border-b border-border/50";

  const textColor = isScrolled ? "high-contrast-text" : "high-contrast-text";

  const handleThemeToggle = () => {
    // Animation de clic
    if (themeButtonRef.current) {
      themeButtonRef.current.classList.add("click-animate");
      setTimeout(() => {
        themeButtonRef.current?.classList.remove("click-animate");
      }, 200);
    }

    // Animation de transition de thème
    document.documentElement.classList.add("theme-transition");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 300);

    toggleTheme();
  };

  const handleMenuToggle = () => {
    // Animation de clic
    if (menuButtonRef.current) {
      menuButtonRef.current.classList.add("click-animate");
      setTimeout(() => {
        menuButtonRef.current?.classList.remove("click-animate");
      }, 200);
    }

    if (!isMobileMenuOpen && mobileMenuRef.current) {
      mobileMenuRef.current.classList.add("windart-animate");
    }

    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (path: string) => {
    // Animation de clic sur les liens
    const event = new CustomEvent("pageTransition", {
      detail: { path, timestamp: Date.now() },
    });
    window.dispatchEvent(event);

    // Fermer le menu mobile si ouvert
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg} ${
        isAnimating ? "loading-animate" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* LOGO avec animation Panda */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={() => handleNavClick("/")}
          >
            <span
              ref={logoRef}
              className={`text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent panda-animate ${
                isAnimating ? "animate-pulse-slow" : ""
              }`}
            >
              Les Jardins Yasmina
            </span>
          </Link>

          {/* NAV DESKTOP avec animation Foundation */}
          <nav
            ref={navRef}
            className={`hidden md:flex items-center space-x-8 foundation-animate ${textColor} ${
              isAnimating ? "opacity-100" : ""
            }`}
          >
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item text-sm font-medium transition-all duration-300 hover:text-primary click-animate ${
                  location.pathname === item.path
                    ? "text-primary font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:animate-progress"
                    : textColor
                }`}
                onClick={() => handleNavClick(item.path)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ACTIONS DESKTOP */}
          <div
            ref={desktopNavRef}
            className="hidden md:flex items-center space-x-4 foundation-animate"
          >
            <div className="windart-animate">
              <LanguageSwitcher />
            </div>

            {/* THEME TOGGLE avec animation Wind.Art */}
            <button
              ref={themeButtonRef}
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              className="rounded-full p-2 transition-all duration-300 hover:bg-muted hover:scale-110 windart-animate click-animate contrast-bg-card"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>

            <Button
              asChild
              className="bg-linear-to-r from-primary to-primary/80 hover:shadow-lg transition-all duration-300 click-animate foundation-animate group relative overflow-hidden"
              onClick={() => handleNavClick("/reservation")}
            >
              <Link to="/reservation">
                <span className="relative z-10">{t("common.book_now")}</span>
                {/* Effet de vague au survol */}
                <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-primary/60 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              </Link>
            </Button>
          </div>

          {/* MENU MOBILE avec animation Wind.Art */}
          <button
            ref={menuButtonRef}
            className={`md:hidden rounded-full p-2 transition-all duration-300 hover:bg-muted windart-animate click-animate ${textColor}`}
            onClick={handleMenuToggle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 foundation-animate" />
            ) : (
              <Menu className="h-6 w-6 foundation-animate" />
            )}
          </button>
        </div>

        {/* NAV MOBILE avec animations */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden py-6 border-t border-border bg-background/95 backdrop-blur-xl contrast-bg-primary page-transition"
          >
            <nav className="flex flex-col space-y-4 animate-sequence">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    handleNavClick(item.path);
                    // Animation de clic spécifique
                    const link = document.activeElement as HTMLElement;
                    if (link) {
                      link.classList.add("tap-animate");
                      setTimeout(
                        () => link.classList.remove("tap-animate"),
                        400
                      );
                    }
                  }}
                  className={`nav-item text-base font-medium transition-all duration-300 p-3 rounded-lg hover:bg-accent panda-animate click-animate ${
                    location.pathname === item.path
                      ? "text-primary font-semibold bg-accent"
                      : "text-foreground"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Actions mobiles */}
              <div className="flex items-center justify-between pt-6 border-t border-border mt-4">
                <div className="foundation-animate">
                  <LanguageSwitcher />
                </div>

                <button
                  onClick={handleThemeToggle}
                  aria-label="Toggle theme"
                  className="rounded-full p-3 transition-all duration-300 hover:bg-accent click-animate windart-animate"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-foreground" />
                  ) : (
                    <Moon className="h-5 w-5 text-foreground" />
                  )}
                </button>

                <Button
                  asChild
                  size="default"
                  className="foundation-animate click-animate group relative overflow-hidden"
                  onClick={() => handleNavClick("/reservation")}
                >
                  <Link to="/reservation">
                    <span className="relative z-10">
                      {t("common.book_now")}
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-primary/60 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
