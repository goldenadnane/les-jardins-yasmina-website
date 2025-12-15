import { useEffect, RefObject } from 'react';

export function useWindArtAnimation<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Animation typique de Wind.Art - Morva Labs
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('windart-animate');
            setTimeout(() => {
              element.classList.add('windart-animate-complete');
            }, 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);
}