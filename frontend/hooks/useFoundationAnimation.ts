import { useEffect, RefObject } from 'react';

export function useFoundationAnimation<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Animation Foundation - synchronized
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('foundation-animate');
            setTimeout(() => {
              element.classList.add('foundation-animate-complete');
            }, 200);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);
}