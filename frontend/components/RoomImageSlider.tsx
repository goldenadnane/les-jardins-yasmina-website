import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RoomImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  autoSwitch?: boolean;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export function RoomImageSlider({
  images,
  alt,
  className = "",
  autoSwitch = true,
  currentIndex: externalIndex,
  onIndexChange,
}: RoomImageSliderProps) {
  const [internalIndex, setInternalIndex] = useState(0);

  const currentIndex =
    externalIndex !== undefined ? externalIndex : internalIndex;

  const setCurrentIndex = useCallback(
    (newIndex: number | ((prev: number) => number)) => {
      if (onIndexChange) {
        if (typeof newIndex === "function") {
          onIndexChange((currentIndex + 1) % images.length);
        } else {
          onIndexChange(newIndex);
        }
      } else {
        setInternalIndex(newIndex);
      }
    },
    [onIndexChange, currentIndex, images.length]
  );

  useEffect(() => {
    if (!autoSwitch || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, autoSwitch, setCurrentIndex]);

  const goToIndex = (idx: number) => {
    if (onIndexChange) {
      onIndexChange(idx);
    } else {
      setInternalIndex(idx);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} - ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                goToIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/70"
              }`}
              animate={{ scale: idx === currentIndex ? 1 : 0.8 }}
            />
          ))}
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-white/90 via-transparent to-transparent dark:from-white/90  pointer-events-none" />
    </div>
  );
}
