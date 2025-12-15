import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { HeroCarousel } from '../components/sections/HeroCarousel';
import { ReservationWidget } from '../components/sections/ReservationWidget';
import { PropertyDescription } from '../components/sections/PropertyDescription';
import { PhotoGallery } from '../components/sections/PhotoGallery';
import { LakeDescription } from '../components/sections/LakeDescription';
import { SitesToVisit } from '../components/sections/SitesToVisit';
import { SportsLeisure } from '../components/sections/SportsLeisure';
import { Testimonial } from '../components/sections/Testimonial';
import { VirtualTour } from '../components/sections/VirtualTour';
import { ServicesList } from '../components/sections/ServicesList';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFloatingReservation, setShowFloatingReservation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      setShowFloatingReservation(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-2xl mx-auto">
          <ReservationWidget />
        </div>
      </div>

      <PropertyDescription />
      <PhotoGallery />
      <LakeDescription />
      <SitesToVisit />
      <SportsLeisure />
      <ServicesList />
      <Testimonial />
      <VirtualTour />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 z-40"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}

      {showFloatingReservation && (
        <div className="fixed bottom-8 left-8 z-40 hidden lg:block animate-in slide-in-from-left duration-300">
          <Button
            size="lg"
            className="bg-linear-to-r from-primary to-primary/80 shadow-2xl hover:shadow-3xl transition-all"
            asChild
          >
            <a href="/reservation">Réserver</a>
          </Button>
        </div>
      )}
    </div>
  );
}
