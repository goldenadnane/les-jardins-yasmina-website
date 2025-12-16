export interface HeroSlide {
  id: string;
  image_url: string;
  title_key: string;
  subtitle_key?: string;
  order: number;
}

export interface Room {
  id: string;

  name_fr: string;
  name_en: string;

  description_fr: string;
  description_en: string;

  image_url: string[];

  type_fr: string;
  type_en: string;

  capacity: number;
  surface: number;

  price_per_night: number;
  devise: string;

  status_fr: string;
  status_en: string;

  amenities_fr: string[];
  amenities_en: string[];

  order_position: number;
  created_at: string;
}


export interface GalleryImage {
  id: string;
  image_url: string;
  category: 'rooms' | 'exterior' | 'pool' | 'views' | 'dining';
  alt_key: string;
  order: number;
}

export interface Attraction {
  id: string;
  name_key: string;
  description_key: string;
  image_url: string;
  distance?: string;
  order: number;
}

export interface Activity {
  id: string;
  name_key: string;
  description_key: string;
  icon: string;
  order: number;
}

export interface Service {
  id: string;
  name_key: string;
  icon: string;
  order: number;
}

export interface Testimonial {
  id: string;
  author_name: string;
  content_key: string;
  rating: number;
  date: string;
}

export interface Reservation {
  id?: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  room_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  special_requests?: string;
  created_at?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}
