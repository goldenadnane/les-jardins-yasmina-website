import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { HeroCarousel } from "../components/sections/HeroCarousel";
import { ReservationWidget } from "../components/sections/ReservationWidget";
import { PropertyDescription } from "../components/sections/PropertyDescription";
import { PhotoGallery } from "../components/sections/PhotoGallery";
import { LakeDescription } from "../components/sections/LakeDescription";
import { SitesToVisit } from "../components/sections/SitesToVisit";
import { SportsLeisure } from "../components/sections/SportsLeisure";
import { Testimonial } from "../components/sections/Testimonial";
import { VirtualTour } from "../components/sections/VirtualTour";
import { ServicesList } from "../components/sections/ServicesList";
import { useFoundationAnimation } from "@/hooks/useFoundationAnimation";
import { usePandaAnimation } from "@/hooks/usePandasAnimation";
import { useWindArtAnimation } from "@/hooks/useWinArtAnimation";
import { AnimatedLayout } from "@/components/layout/AnimatedLayout";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFloatingReservation, setShowFloatingReservation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Références pour animations
  const heroRef = useRef<HTMLDivElement>(null);
  const reservationWidgetRef = useRef<HTMLDivElement>(null);
  const propertyRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const lakeRef = useRef<HTMLDivElement>(null);
  const sitesRef = useRef<HTMLDivElement>(null);
  const sportsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const tourRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<HTMLButtonElement>(null);
  const floatingBtnRef = useRef<HTMLDivElement>(null);

  // Appliquer animations Panda (entrée principale)
  usePandaAnimation(heroRef);
  usePandaAnimation(propertyRef);
  usePandaAnimation(galleryRef);
  usePandaAnimation(sitesRef);
  usePandaAnimation(tourRef);

  // Appliquer animations Wind.Art (éléments interactifs)
  useWindArtAnimation(reservationWidgetRef);
  useWindArtAnimation(sportsRef);
  useWindArtAnimation(scrollTopRef);
  useWindArtAnimation(floatingBtnRef);

  // Appliquer animations Foundation (sections de contenu)
  useFoundationAnimation(lakeRef);
  useFoundationAnimation(servicesRef);
  useFoundationAnimation(testimonialRef);

  useEffect(() => {
    // Animation de chargement initiale
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Appliquer animations après chargement
      setTimeout(() => {
        document.querySelectorAll(".animate-on-load").forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("panda-animate");
          }, index * 100);
        });
      }, 100);
    }, 800);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      setShowFloatingReservation(window.scrollY > 800);

      // Animation d'apparition progressive
      const sections = [
        heroRef,
        reservationWidgetRef,
        propertyRef,
        galleryRef,
        lakeRef,
        sitesRef,
        sportsRef,
        servicesRef,
        testimonialRef,
        tourRef,
      ];

      sections.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.85;

          if (isVisible && !ref.current.classList.contains("animated")) {
            ref.current.classList.add("animated");

            // Appliquer différentes animations selon la section
            const delay = index * 150;
            setTimeout(() => {
              if (index % 3 === 0) {
                ref.current?.classList.add("panda-animate");
              } else if (index % 3 === 1) {
                ref.current?.classList.add("foundation-animate");
              } else {
                ref.current?.classList.add("windart-animate");
              }
            }, delay);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Déclencher une fois au chargement
    setTimeout(handleScroll, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    // Animation de clic
    if (scrollTopRef.current) {
      scrollTopRef.current.classList.add("click-animate");
      setTimeout(() => {
        scrollTopRef.current?.classList.remove("click-animate");
      }, 300);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFloatingButtonClick = () => {
    // Animation de clic
    if (floatingBtnRef.current) {
      floatingBtnRef.current.classList.add("tap-animate");
      setTimeout(() => {
        floatingBtnRef.current?.classList.remove("tap-animate");
      }, 400);
    }
  };

  return (
    <AnimatedLayout pageType="home">
      <div
        className={`min-h-screen ${
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }`}
      >
        {/* Hero Carousel avec animation */}
        <div ref={heroRef} className="animate-on-load">
          <HeroCarousel />
        </div>

        {/* Widget de réservation avec animation */}
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div
              ref={reservationWidgetRef}
              className="animate-on-load foundation-animate"
              data-animate-delay="100"
            >
              <ReservationWidget />
            </div>
          </div>
        </div>

        {/* Sections avec animations séquentielles */}
        <div
          ref={propertyRef}
          className="animate-on-load"
          data-animate-delay="200"
        >
          <PropertyDescription />
        </div>

        <div
          ref={galleryRef}
          className="animate-on-load"
          data-animate-delay="300"
        >
          <PhotoGallery />
        </div>

        <div ref={lakeRef} className="animate-on-load" data-animate-delay="400">
          <LakeDescription />
        </div>

        <div
          ref={sitesRef}
          className="animate-on-load"
          data-animate-delay="500"
        >
          <SitesToVisit />
        </div>

        <div
          ref={sportsRef}
          className="animate-on-load"
          data-animate-delay="600"
        >
          <SportsLeisure />
        </div>

        <div
          ref={servicesRef}
          className="animate-on-load"
          data-animate-delay="700"
        >
          <ServicesList />
        </div>

        <div
          ref={testimonialRef}
          className="animate-on-load"
          data-animate-delay="800"
        >
          <Testimonial />
        </div>

        <div ref={tourRef} className="animate-on-load" data-animate-delay="900">
          <VirtualTour />
        </div>

        {/* Bouton Scroll to Top avec animations */}
        {showScrollTop && (
          <button
            ref={scrollTopRef}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 windart-animate click-animate hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}

        {/* Bouton flottant réservation avec animations */}
        {showFloatingReservation && (
          <div
            ref={floatingBtnRef}
            className="fixed bottom-8 left-8 z-40 hidden lg:block animate-in slide-in-from-left duration-300 windart-animate"
            onClick={handleFloatingButtonClick}
          >
            <Button
              size="lg"
              className="bg-linear-to-r from-primary to-primary/80 shadow-2xl hover:shadow-3xl transition-all foundation-animate click-animate group relative overflow-hidden"
              asChild
            >
              <a href="/reservation">
                <span className="relative z-10">Réserver</span>
                {/* Effet de vague au survol */}
                <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-primary/60 -translate-x-full group-hover:translate-x-0 "></div>
              </a>
            </Button>
          </div>
        )}

        {/* Effets de particules en arrière-plan */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Overlay de chargement */}
        {isLoading && (
          <div className="fixed inset-0 bg-background flex items-center justify-center z-50 transition-opacity duration-500">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-foreground/70">
                Chargement des expériences...
              </p>
            </div>
          </div>
        )}
      </div>
    </AnimatedLayout>
  );
}
