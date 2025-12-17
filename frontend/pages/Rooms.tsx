import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AnimatedLayout } from "@/components/layout/AnimatedLayout";
import { RoomCard } from "@/components/RoomCard";
import { Room } from "@/types";
import {  RefreshCw } from "lucide-react";
import { supabase } from "@/services/supabaseClient";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Rooms() {
  const { t, i18n } = useTranslation();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtres
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [rooms, selectedType, selectedCapacity, priceRange, selectedAmenities]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("order_position", { ascending: true });
      if (error) throw error;
      setRooms(data || []);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des chambres");
    } finally {
      setLoading(false);
    }
  };

  const getName = (room: Room) =>
    i18n.language === "fr" ? room.name_fr : room.name_en;
  const getType = (room: Room) =>
    i18n.language === "fr" ? room.type_fr : room.type_en;
  const getStatus = (room: Room) =>
    i18n.language === "fr" ? room.status_fr : room.status_en;

  // Données pour filtres
  const allTypes = Array.from(new Set(rooms.map(getType)));
  const allCapacities = Array.from(new Set(rooms.map((r) => r.capacity))).sort(
    (a, b) => a - b
  );
  const allAmenities = Array.from(
    new Set(rooms.flatMap((r) => r.amenities_fr || []))
  );

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const applyFilters = () => {
    let filtered = [...rooms];
    if (selectedType)
      filtered = filtered.filter((r) => getType(r) === selectedType);
    if (selectedCapacity)
      filtered = filtered.filter((r) => r.capacity >= selectedCapacity);
    filtered = filtered.filter(
      (r) =>
        r.price_per_night >= priceRange[0] && r.price_per_night <= priceRange[1]
    );
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((r) =>
        selectedAmenities.every((a) => r.amenities_fr?.includes(a))
      );
    }
    setFilteredRooms(filtered);
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedCapacity(null);
    setPriceRange([0, 1000]);
    setSelectedAmenities([]);
  };

  if (error) {
    return (
      <AnimatedLayout pageType="rooms">
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-4"
          >
            <p className="text-destructive text-lg">{error}</p>
            <Button
              variant="outline"
              className="gap-2 border-primary/50 hover:bg-primary/10"
              onClick={fetchRooms}
            >
              <RefreshCw className="h-4 w-4" />
              {t("common.retry") || "Réessayer"}
            </Button>
          </motion.div>
        </div>
      </AnimatedLayout>
    );
  }

  return (
    <AnimatedLayout pageType="contact">
      <div className="min-h-screen py-30 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              <span className="text-foreground">
                {t("rooms_page.title")
                  ? t("rooms_page.title").split(" ")[0]
                  : "Nos"}{" "}
              </span>
              <span className="text-gradient-gold text-[#B8860B]">
                {t("rooms_page.title")
                  ? t("rooms_page.title").split(" ").slice(1).join(" ")
                  : "Chambres"}
              </span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              {t("rooms_page.subtitle") ||
                "Découvrez nos chambres confortables et élégantes"}
            </motion.p>
          </motion.div>

          {/* Rooms grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredRooms.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                index={index}
                getName={getName}
                getType={getType}
                getStatus={getStatus}
                showButton
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedLayout>
  );
}
