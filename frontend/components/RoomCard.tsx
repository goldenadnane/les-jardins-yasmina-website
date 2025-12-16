import { AnimatePresence, motion } from "framer-motion";
import { Users, Maximize, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Room } from "@/types";
import { useState, useEffect } from "react";

interface RoomCardProps {
  room: Room;
  index: number;
  getName: (room: Room) => string;
  getType: (room: Room) => string;
  getStatus: (room: Room) => string;
  showButton?: boolean;
}

export function RoomCard({
  room,
  index,
  getName,
  getType,
  getStatus,
  showButton,
}: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % room.image_url.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + room.image_url.length) % room.image_url.length
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group relative cursor-pointer"
    >
      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200">
        {/* Image */}
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={room.image_url[currentImageIndex]}
              alt={`${getName(room)} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>

          {/* Price badge */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full room-gold text-white text-sm font-semibold shadow">
            {room.price_per_night} {room.devise}{" "}
            <span className="text-xs font-normal">/nuit</span>
          </div>

          {/* Slider navigation */}
          {room.image_url.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 text-black p-2 rounded-full shadow hover:bg-white transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 text-black p-2 rounded-full shadow hover:bg-white transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3">
          <h3 className="text-xl sm:text-2xl font-bold text-black line-clamp-1">
            {getName(room)}
          </h3>

          {/* Capacity & Surface badges */}
          <div className="flex flex-wrap gap-2 mt-1">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full room-gold text-white text-sm font-medium shadow">
              <Users className="h-4 w-4" /> {room.capacity} pers.
            </div>
            {room.surface && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full room-gold text-white text-sm font-medium shadow">
                <Maximize className="h-4 w-4" /> {room.surface} m²
              </div>
            )}
          </div>

          {showButton && (
            <Link to={`/room/${room.id}`}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 mt-2 rounded-xl bg-linear-to-r room-gold text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Voir plus <ChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
