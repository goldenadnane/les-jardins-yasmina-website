// components/animation/WithAnimation.tsx
import { ReactNode, useRef, useEffect } from 'react';

type AnimationType = 'panda' | 'foundation' | 'windart';

interface WithAnimationProps {
  children: ReactNode;
  type?: AnimationType;
  delay?: number;
}

export function WithAnimation({ children, type = 'panda', delay = 0 }: WithAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.classList.add(`${type}-animate`);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [type, delay]);

  return (
    <div ref={ref} className="opacity-0">
      {children}
    </div>
  );
}