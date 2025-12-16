import { Wifi, Tv, Coffee, Fan, Bed, Airplay } from 'lucide-react';
import { ComponentType } from 'react';

type Amenity = string;

const amenityMap: Record<string, ComponentType<any>> = {
  wifi: Wifi,
  tv: Tv,
  coffee: Coffee, // si Coffee n’existe pas dans ta version Lucide, utilise un autre ou supprime-le
  fan: Fan,
  bed: Bed,
  airplay: Airplay, // exemple pour une autre commodité
  // ajoute ici toutes les commodités disponibles dans Lucide
};

export function getAmenityIcon(amenity: Amenity) {
  const key = amenity.toLowerCase().replace(/\s+/g, '');
  return amenityMap[key] || Bed; // icône par défaut
}
