export interface Priest {
  id: string; // This will be the UID from Firebase Auth
  name: string;
  email: string;
  photo: string;
  photoHint: string;
  aadhaarPhoto: string;
  aadhaarPhotoHint: string;
  selfiePhoto: string;
  selfiePhotoHint: string;
  location: string;
  city: string;
  services: string[];
  bio: string;
  phone: string;
  whatsapp?: string; // This field is not in the signup form
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
