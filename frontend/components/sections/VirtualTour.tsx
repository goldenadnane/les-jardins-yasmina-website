import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function VirtualTour() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const [showVideo, setShowVideo] = useState(true);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("virtual_tour.title")}
            </h2>
            <p className="text-lg text-white mb-2">
              {t("virtual_tour.subtitle")}
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden group aspect-video">
            {showVideo ? (
              <video
                src="/videos/lesjardinsyasmine.mp4"
                autoPlay
                muted
                loop
                controls
                playsInline
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=675&fit=crop"
                alt="Virtual Tour"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            {!showVideo && (
              <div
                className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center cursor-pointer"
                onClick={() => setShowVideo(true)}
              >
                <div className="text-center">
                  <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full mb-4 inline-block">
                    <Play className="h-12 w-12 text-white fill-white" />
                  </div>
                  <Button size="lg" className="text-black-important bg-primary">
                    {t("virtual_tour.start_tour")}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="text-center mt-6 max-w-3xl mx-auto">
            {t("virtual_tour.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
