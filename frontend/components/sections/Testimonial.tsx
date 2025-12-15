import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Quote, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function Testimonial() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('testimonials.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <Card className="p-8 md:p-12 relative overflow-hidden">
            <Quote className="absolute top-4 left-4 h-16 w-16 text-primary/10" />
            <Quote className="absolute bottom-4 right-4 h-16 w-16 text-primary/10 rotate-180" />

            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-lg leading-relaxed text-center mb-6 italic">
                "{t('testimonials.main')}"
              </p>

              <div className="text-center">
                <p className="font-semibold">Sophie & Marc</p>
                <p className="text-sm text-muted-foreground">France</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
