import { useTranslation } from "react-i18next";
import { Waves, Mountain, Ship, Fish, Bike, MapPin } from "lucide-react";
import { Link, Link as RouterLink } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { AnimatedLayout } from "@/components/layout/AnimatedLayout";

export default function Activities() {
  const { t } = useTranslation();

  const activities = [
    {
      icon: Waves,
      name: t("activities.swimming.name"),
      description: t("activities.swimming.description"),
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7",
    },
    {
      icon: Mountain,
      name: t("activities.hiking.name"),
      description: t("activities.hiking.description"),
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    },
    {
      icon: Ship,
      name: t("activities.boating.name"),
      description: t("activities.boating.description"),
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    },
    {
      icon: Fish,
      name: t("activities.fishing.name"),
      description: t("activities.fishing.description"),
      image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9",
    },
    {
      icon: Bike,
      name: t("activities.cycling.name"),
      description: t("activities.cycling.description"),
      image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
    },
  ];

  const attractions = [
    {
      name: t("attractions.musee.name"),
      description: t("attractions.musee.description"),
      image: "https://images.unsplash.com/photo-1585159812596-fac104f2f069",
    },
    {
      name: t("attractions.vallee.name"),
      description: t("attractions.vallee.description"),
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
    },
    {
      name: t("attractions.cascades.name"),
      description: t("attractions.cascades.description"),
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    },
    {
      name: t("attractions.gorges.name"),
      description: t("attractions.gorges.description"),
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
  ];

  return (
    <AnimatedLayout pageType="activities">
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("activities_page.title")}
            </h1>
            <p className="text-lg text-foreground/70">
              {t("activities_page.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <Card
                  key={index}
                  className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`${activity.image}?w=600&h=400&fit=crop`}
                      alt={activity.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-primary">
                      {activity.name}
                    </h3>
                    <p className="text-foreground">{activity.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("activities_page.nearby_title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {attractions.map((attraction, index) => (
                <Link key={index} to="/contact" className="block">
                  <Card
                    key={index}
                    className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={`${attraction.image}?w=800&h=500&fit=crop`}
                        alt={attraction.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-primary">
                        <MapPin className="h-5 w-5 text-primary" />
                        {attraction.name}
                      </h3>
                      <p className="text-foreground/70">
                        {attraction.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedLayout>
  );
}
