import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Bed, Bath, Users, Waves } from "lucide-react";

export function PropertyDescription() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  const features = [
    {
      icon: Bed,
      text: t("property.features.bedrooms"),
    },
    {
      icon: Bath,
      text: t("property.features.bathrooms"),
    },
    {
      icon: Users,
      text: t("property.features.capacity"),
    },
    {
      icon: Waves,
      text: t("property.features.pool"),
    },
  ];

  return (
    <section id="property-section" className="py-20 px-4 bg-foreground">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("property.title")}
          </h2>

          <p className="text-lg text-black leading-relaxed mb-12 max-w-4xl mx-auto text-center">
            {t("property.description")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-center font-medium text-white">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
