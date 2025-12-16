import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedLayout } from "@/components/layout/AnimatedLayout";
import { supabase } from "@/services/supabaseClient";

const categories = [
  "all",
  "rooms",
  "exterior",
  "pool",
  "views",
  "dining",
] as const;
const SPEED = 0.3;

export default function Gallery() {
  const { t } = useTranslation();

  const [galleryImages, setGalleryImages] = useState<
    { image_url: string; category: string; id: string }[]
  >([]);

  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  // ---------- FETCH SUPABASE ----------
  useEffect(() => {
    async function fetchGallery() {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id, image_url, category")
        .order("order_position", { ascending: true });

      if (error) console.error(error);
      else setGalleryImages(data || []);
    }

    fetchGallery();
  }, []);

  // ---------- FILTER IMAGES ----------
  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const loopImages = [...filteredImages, ...filteredImages];

  // ---------- CONTINUOUS ANIMATION ----------
  useEffect(() => {
    if (!trackRef.current) return;
    offsetRef.current = 0;

    const animate = () => {
      if (!trackRef.current) return;

      offsetRef.current += SPEED;
      const halfWidth = trackRef.current.scrollWidth / 2;

      if (offsetRef.current >= halfWidth) offsetRef.current = 0;

      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [filteredImages]);

  // ---------- RENDER ----------
  return (
    <AnimatedLayout pageType="gallery">
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("gallery_page.title")}
            </h1>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {t(`gallery_page.categories.${category}`)}
                </Button>
              ))}
            </div>
          </div>

          {/* MARQUEE GALLERY */}
          <div className="overflow-hidden">
            <div ref={trackRef} className="flex gap-4 will-change-transform">
              {loopImages.map((image) => (
                <div
                  key={image.id}
                  className="w-64 shrink-0 cursor-pointer"
                  onClick={() => setSelectedImage(image.image_url)}
                >
                  <div className="aspect-square rounded-lg overflow-hidden group">
                    <img
                      src={`${image.image_url}?w=600&h=600&fit=crop`}
                      alt="Gallery"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <img
              src={`${selectedImage}?w=1200&q=90`}
              alt="Gallery"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </AnimatedLayout>
  );
}
