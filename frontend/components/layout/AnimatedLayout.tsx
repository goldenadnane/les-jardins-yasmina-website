import { ReactNode } from 'react';
import { WithAnimation } from '../animation/WithAnimation';

interface AnimatedLayoutProps {
  children: ReactNode;
  pageType?: 'home' | 'reservation' | 'contact' | 'rooms' | 'gallery' | 'activities';
}

export function AnimatedLayout({ children, pageType = 'home' }: AnimatedLayoutProps) {
  // Définir les animations par type de page
  const getAnimations = () => {
    switch (pageType) {
      case 'home':
        return 'panda';
      case 'reservation':
      case 'contact':
        return 'foundation';
      default:
        return 'windart';
    }
  };

  return (
    <div className="min-h-screen page-transition">
      <WithAnimation type={getAnimations()} delay={100}>
        {children}
      </WithAnimation>
    </div>
  );
}