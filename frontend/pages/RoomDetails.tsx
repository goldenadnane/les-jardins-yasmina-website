import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Maximize,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Room } from "@/types";
import { getAmenityIcon } from "@/lib/amenityIcons";
import { supabase } from "../services/supabaseClient";

export function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) fetchRoom(id);
  }, [id]);

  const fetchRoom = async (roomId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", roomId)
        .single();

      if (error) throw error;
      setRoom(data as Room);
    } catch (err) {
      console.error("Error fetching room:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (room)
      setCurrentImageIndex((prev) => (prev + 1) % room.image_url.length);
  };

  const prevImage = () => {
    if (room)
      setCurrentImageIndex(
        (prev) => (prev - 1 + room.image_url.length) % room.image_url.length
      );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-destructive text-lg">Chambre non trouvée</p>
        <Button onClick={() => navigate("/rooms")}>Retour aux chambres</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-16 px-4 max-w-7xl mx-auto">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/rooms")}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-2xl group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={room.image_url[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {room.image_url.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm">
              {currentImageIndex + 1} / {room.image_url.length}
            </div>
          </div>

          {room.image_url.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {room.image_url.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`aspect-video rounded-lg overflow-hidden transition-all ${
                    idx === currentImageIndex
                      ? "ring-4 ring-primary scale-105"
                      : "hover:scale-105 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Room Info */}
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">{room.type_fr}</p>

          {/* Price */}
          <div className="flex items-baseline gap-2 p-4 bg-linear-to-r room-gold rounded-xl text-primary-foreground font-bold text-2xl md:text-4xl">
            {room.price_per_night} {room.devise}
            <span className="text-base md:text-lg font-normal ml-1">/nuit</span>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Capacité</p>
                <p className="font-bold text-foreground">
                  {room.capacity} personnes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
              <Maximize className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Surface</p>
                <p className="font-bold text-foreground">{room.surface} m²</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 bg-muted/20 rounded-xl">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-muted-foreground">{room.description_fr}</p>
          </div>

          {/* Amenities */}
          {room.amenities_fr && room.amenities_fr.length > 0 && (
            <div className="p-4 bg-card rounded-xl border border-border">
              <h2 className="text-xl font-bold mb-2">Équipements</h2>
              <div className="grid grid-cols-2 gap-2">
                {room.amenities_fr.map((amenity, idx) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm">{amenity}</span>
                      <Check className="h-4 w-4 text-green-500 ml-auto" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bouton de réservation */}
          <Button
            asChild
            size="lg"
            className="w-full py-4 text-lg bg-linear-to-r room-gold hover:opacity-90 transition-all"
          >
            <Link
              to={`/reservation?room=${room.id}`}
              className="text-black-important"
            >
              Réserver maintenant
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
