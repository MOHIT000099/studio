export interface Priest {
  id: string;
  name: string;
  photo: string;
  photoHint: string;
  location: string;
  city: string;
  services: string[];
  bio: string;
  phone: string;
  whatsapp: string;
  verified: boolean;
  pendingApproval?: boolean;
  qualifications: string;
  showQualifications: boolean;
  featured?: boolean;
  rating: number;
  reviews: number;
}

export interface Review {
  id: string;
  panditId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
