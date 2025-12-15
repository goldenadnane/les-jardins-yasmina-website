import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['all', 'rooms', 'exterior', 'pool', 'views', 'dining'] as const;

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', category: 'rooms' },
  { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b', category: 'rooms' },
  { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d', category: 'exterior' },
  { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6', category: 'pool' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', category: 'exterior' },
  { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', category: 'views' },
  { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', category: 'rooms' },
  { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b', category: 'dining' },
  { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d', category: 'views' },
  { url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154', category: 'pool' },
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', category: 'exterior' },
  { url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea', category: 'dining' },
  { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d', category: 'rooms' },
  { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3', category: 'views' },
  { url: 'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5', category: 'pool' }
];

export default function Gallery() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('gallery_page.title')}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t('gallery_page.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-primary/80'
                    : ''
                }
              >
                {t(`gallery_page.categories.${category}`)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={`${image.url}?w=400&h=400&fit=crop`}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {t(`gallery_page.categories.${image.category}`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
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
  );
}
