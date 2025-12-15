import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTheme } from "@/hooks/useTheme";

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: t("common.home") },
    { path: "/rooms", label: t("common.rooms") },
    { path: "/gallery", label: t("common.gallery") },
    { path: "/activities", label: t("common.activities") },
    { path: "/contact", label: t("common.contact") },
  ];

  const headerBg = isScrolled
    ? "bg-background/95 backdrop-blur-lg shadow-lg"
    : theme === "light"
    ? "bg-black"
    : "bg-transparent";

  const textColor = isScrolled
    ? "text-foreground"
    : theme === "light"
    ? "text-primary"
    : "text-primary";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Les Jardins Yasmina
            </span>
          </Link>

          {/* NAV DESKTOP */}
          <nav className={`hidden md:flex items-center space-x-8 ${textColor}`}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : textColor
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ACTIONS DESKTOP */}
          <div className="hidden md:flex items-center space-x-4 text-primary">
            <LanguageSwitcher />

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full p-2 transition-all hover:bg-muted hover:scale-110"
            >
              {theme === "dark" ? (
                <Sun className={`h-5 w-5 ${textColor}`} />
              ) : (
                <Moon className={`h-5 w-5 ${textColor}`} />
              )}
            </button>

            <Button
              asChild
              className="bg-linear-to-r from-primary to-primary/80"
            >
              <Link to="/reservation">{t("common.book_now")}</Link>
            </Button>
          </div>

          {/* MENU MOBILE */}
          <button
            className={`md:hidden ${textColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* NAV MOBILE */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <LanguageSwitcher />

                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="rounded-full p-2 transition-all hover:bg-muted"
                >
                  {theme === "dark" ? <Sun /> : <Moon />}
                </button>

                <Button asChild size="sm">
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
