import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    author: "Greenpeace",
    date: "May 2025",
    rating: 5,
    text: `Hôtel situé dans un emplacement époustouflant, chambres spacieuses.
Petit déjeuner et dîner à la hauteur.
J’ai admiré également l’accueil du personnel et surtout Ilham.
Je recommande vivement cet établissement.
Note : 10/10`,
    stay: "April 2025",
  },
  {
    author: "Rocco",
    rating: 4,
    text: `La chambre d’hôte se trouve en pleine campagne dans un endroit paisible.
Le cadre est agréable pour se détendre.
Chambres confortables et spacieuses.
Personnel très accueillant.
Petit déjeuner traditionnel, copieux, produits locaux et faits maison.`,
  },
  {
    author: "Alex Ger",
    rating: 5,
    text: `Coin de verdure au milieu des montagnes de l’Atlas.
Calme et sérénité au rendez-vous.
Accueil très chaleureux.
Repas merveilleux, dîner et petit déjeuner.`,
  },
];

export function Testimonial() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

  const next = () =>
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  const review = reviews[index];

  return (
    <section className="py-20 px-4 bg-foreground">
      <div className="container mx-auto max-w-4xl">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* TITRE */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("testimonials.title")}
            </h2>
            <p className="text-lg text-black">{t("testimonials.subtitle")}</p>
          </div>

          {/* SLIDER */}
          <Card className="p-8 md:p-12 relative overflow-hidden bg-foreground border-red-200">
            <Quote className="absolute top-4 left-4 h-16 w-16 text-black" />
            <Quote className="absolute bottom-4 right-4 h-16 w-16 text-black rotate-180" />

            <div className="relative z-10 transition-all duration-500">
              {/* STARS */}
              <div className="flex justify-center mb-6 ">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* TEXT */}
              <p className="text-lg leading-relaxed text-center mb-6 italic text-black whitespace-pre-line">
                “{review.text}”
              </p>

              {/* AUTHOR */}
              <div className="text-center">
                <p className="font-semibold text-foreground/70">
                  {review.author}
                </p>
                {review.date && (
                  <p className="text-sm text-foreground/60">
                    {review.date} • Séjour : {review.stay}
                  </p>
                )}
              </div>
            </div>

            {/* CONTROLS */}
            <div className="absolute top-35 inset-x-0 flex justify-between items-center px-4 z-20">
              <Button
                variant="ghost"
                size="icon"
                onClick={prev}
                aria-label="Previous review"
                className="bg-black hover:bg-white shadow-md"
              >
                <ChevronLeft className="h-12 w-12 text-yellow-500" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={next}
                aria-label="Next review"
                className="bg-black hover:bg-white shadow-md"
              >
                <ChevronRight className="h-12 w-12 text-yellow-500" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
