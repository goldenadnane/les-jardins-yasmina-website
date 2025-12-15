import { useEffect, useRef, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { usePandaAnimation } from "@/hooks/usePandasAnimation";
import { useWindArtAnimation } from "@/hooks/useWinArtAnimation";
import { useFoundationAnimation } from "@/hooks/useFoundationAnimation";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Appliquer toutes les animations
  usePandaAnimation(pageRef);
  useWindArtAnimation(pageRef);
  useFoundationAnimation(pageRef);

  useEffect(() => {
    // Animation de transition de page
    if (pageRef.current) {
      pageRef.current.classList.add("page-transition");

      // Animation de chargement séquentiel
      const elements = pageRef.current.querySelectorAll("[data-animate]");
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("panda-animate");
        }, index * 100);
      });
    }

    // Gestionnaire d'événement pour les transitions de page
    const handlePageTransition = () => {
      if (pageRef.current) {
        pageRef.current.classList.remove("page-transition");
        void pageRef.current.offsetWidth; // Trigger reflow
        pageRef.current.classList.add("page-transition");
      }
    };

    window.addEventListener("pageTransition", handlePageTransition);

    return () => {
      window.removeEventListener("pageTransition", handlePageTransition);
    };
  }, [location.pathname]);

  return (
    <div
      ref={pageRef}
      className={`min-h-screen w-full ${className} scrollbar-contrast`}
      data-page={location.pathname}
    >
      <div ref={contentRef} className="animate-sequence">
        {children}
      </div>

      {/* Particules d'arrière-plan */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
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
    </div>
  );
}
