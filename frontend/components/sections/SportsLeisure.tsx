import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Waves, Mountain, Ship, Fish, Bike } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function SportsLeisure() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  const activities = [
    {
      icon: Waves,
      name: t('activities.swimming.name'),
      description: t('activities.swimming.description')
    },
    {
      icon: Mountain,
      name: t('activities.hiking.name'),
      description: t('activities.hiking.description')
    },
    {
      icon: Ship,
      name: t('activities.boating.name'),
      description: t('activities.boating.description')
    },
    {
      icon: Fish,
      name: t('activities.fishing.name'),
      description: t('activities.fishing.description')
    },
    {
      icon: Bike,
      name: t('activities.cycling.name'),
      description: t('activities.cycling.description')
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
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
              {t('activities.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('activities.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-border hover:border-primary/50"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{activity.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
