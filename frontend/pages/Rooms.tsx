import { useTranslation } from "react-i18next";
import { Users, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedLayout } from "@/components/layout/AnimatedLayout";

const roomsData = [
  {
    id: "1",
    name_key: "Chambre Atlas",
    description_key:
      "Spacious room with mountain views and traditional Berber decor",
    price: 120,
    capacity: 2,
    size: 30,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    amenities: ["King Bed", "Mountain View", "Air Conditioning", "WiFi"],
  },
  {
    id: "2",
    name_key: "Suite Lac",
    description_key:
      "Luxury suite with panoramic lake views and private balcony",
    price: 180,
    capacity: 3,
    size: 45,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    amenities: ["King Bed", "Lake View", "Balcony", "Mini Bar", "WiFi"],
  },
  {
    id: "3",
    name_key: "Chambre Familiale",
    description_key: "Family room with two bedrooms and shared living area",
    price: 200,
    capacity: 4,
    size: 55,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    amenities: ["2 Bedrooms", "Living Area", "Garden View", "WiFi"],
  },
];

export default function Rooms() {
  const { t } = useTranslation();

  return (
    <AnimatedLayout pageType="rooms">
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("rooms_page.title")}
            </h1>
            <p className="text-lg text-foreground/70">
              {t("rooms_page.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {roomsData.map((room, index) => (
              <Card
                key={room.id}
                className="overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={`${room.image}?w=800&h=600&fit=crop`}
                    alt={room.name_key}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-white px-4 py-2 text-lg">
                      €{room.price} {t("common.per_night")}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{room.name_key}</h3>
                  <p className="text-foreground/70 mb-4">
                    {room.description_key}
                  </p>

                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>
                        {room.capacity} {t("common.guests")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="h-4 w-4 text-primary" />
                      <span>
                        {room.size} {t("rooms_page.sqm")}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold mb-2">
                      {t("rooms_page.amenities")}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-primary/30"
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-linear-to-r from-primary to-primary/80"
                    asChild
                  >
                    <a href="/reservation">{t("common.book_now")}</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AnimatedLayout>
  );
}
