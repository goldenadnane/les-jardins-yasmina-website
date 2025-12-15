import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export function LakeDescription() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-card/90 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-border shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("lake.title")}
            </h2>

            <p className="text-lg leading-relaxed text-card-foreground">
              {t("lake.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
