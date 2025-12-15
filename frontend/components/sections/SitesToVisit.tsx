import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const attractionImages = [
  "https://images.unsplash.com/photo-1585159812596-fac104f2f069",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
];

export function SitesToVisit() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  const attractions = [
    {
      name: t("attractions.musee.name"),
      description: t("attractions.musee.description"),
      image: attractionImages[0],
    },
    {
      name: t("attractions.vallee.name"),
      description: t("attractions.vallee.description"),
      image: attractionImages[1],
    },
    {
      name: t("attractions.cascades.name"),
      description: t("attractions.cascades.description"),
      image: attractionImages[2],
    },
    {
      name: t("attractions.gorges.name"),
      description: t("attractions.gorges.description"),
      image: attractionImages[3],
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("attractions.title")}
            </h2>
            <p className="text-lg">{t("attractions.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {attractions.map((attraction, index) => (
              <Card
                key={index}
                className="group overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`${attraction.image}?w=600&h=400&fit=crop`}
                    alt={attraction.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {attraction.name}
                  </h3>
                  <p className="text-foreground/70">{attraction.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
