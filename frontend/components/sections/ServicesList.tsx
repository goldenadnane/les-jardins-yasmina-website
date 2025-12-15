import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Clock, Waves, Utensils, Wind, Wifi, CarFront } from "lucide-react";

export function ServicesList() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  const services = [
    { icon: Clock, name: t("services.reception") },
    { icon: Waves, name: t("services.pool") },
    { icon: Utensils, name: t("services.kitchen") },
    { icon: Wind, name: t("services.ac") },
    { icon: Wifi, name: t("services.wifi") },
    { icon: CarFront, name: t("services.parking") },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("services.title")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium text-sm text-foreground">
                    {service.name}
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
