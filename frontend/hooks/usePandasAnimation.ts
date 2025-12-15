import { useEffect, RefObject } from 'react';

export function usePandaAnimation<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Animation typique de Panda - Ace Design Agency
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('panda-animate');
            setTimeout(() => {
              element.classList.add('panda-animate-complete');
            }, 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);
}