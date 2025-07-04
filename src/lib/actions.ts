'use server';

import { z } from 'zod';
import { suggestPriests } from '@/ai/flows/suggest-priests';
import { allPriests } from '@/data/priests';
import { redirect } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from "firebase/firestore"; 

const requestSchema = z.object({
  service: z.string().min(3, 'Service description is too short.'),
  location: z.string().min(2, 'Please provide a valid location.'),
  mobile: z.string().min(10, 'Please provide a valid 10-digit mobile number.').max(15, 'Mobile number is too long.'),
});

export type FormState = {
  message: string;
  priestIds?: string[];
  priests?: typeof allPriests;
  errors?: {
    service?: string[];
    location?: string[];
    mobile?: string[];
  };
};

export async function handlePriestRequest(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const submitAction = formData.get('submit_action');
  
  const validatedFields = requestSchema.safeParse({
    service: formData.get('service'),
    location: formData.get('location'),
    mobile: formData.get('mobile'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (submitAction === 'admin') {
    // In a real app, this would send an email or save to a database.
    console.log('Direct request to admin:', validatedFields.data);
    return {
      message: 'Your request has been submitted successfully. Our team will contact you shortly.',
      priests: [], // Clear any previous priest suggestions
    };
  }
  
  try {
    const { service, location, mobile } = validatedFields.data;
    const result = await suggestPriests({ service, location, mobile });

    if (!result || !result.suggestedPriests || result.suggestedPriests.length === 0) {
      return { message: 'AI could not find any matching priests. Please try a broader search.' };
    }
    
    const suggestedPriestsData = allPriests.filter(p => result.suggestedPriests.includes(p.id) && p.verified);
    
    if (suggestedPriestsData.length === 0) {
        return { message: 'AI found potential matches, but none are currently available or verified. Please try again later.' };
    }

    return {
      message: 'Successfully found priest suggestions!',
      priestIds: result.suggestedPriests,
      priests: suggestedPriestsData,
    };
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred while contacting the AI model. Please try again.' };
  }
}

const contactSchema = z.object({
  phone: z.string().min(10, 'Please provide a valid phone number.'),
  email: z.string().email('Please provide a valid email address.'),
});

export async function handleContactUpdate(
  formData: FormData
): Promise<{ success: boolean; message?: string }> {
  const validatedFields = contactSchema.safeParse({
    phone: formData.get('phone'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message:
        validatedFields.error.flatten().fieldErrors.email?.[0] ||
        validatedFields.error.flatten().fieldErrors.phone?.[0] ||
        'Invalid input.',
    };
  }

  // In a real application, you would update the database here.
  // For this prototype, we'll just log it and simulate success.
  console.log('Updating contact info:', validatedFields.data);

  return { success: true };
}

const reviewSchema = z.object({
    panditId: z.string(),
    name: z.string().min(2, "Name is too short."),
    email: z.string().email("Please provide a valid email."),
    rating: z.coerce.number().min(1, "Please select a rating.").max(5),
    comment: z.string().min(10, "Review is too short.").max(500, "Review is too long."),
});

export type ReviewFormState = {
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        rating?: string[];
        comment?: string[];
    };
    success: boolean;
};

export async function handleReviewSubmit(
    prevState: ReviewFormState,
    formData: FormData
): Promise<ReviewFormState> {
    const validatedFields = reviewSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            message: "Validation failed. Please check your inputs.",
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }

    // In a real app, you would save this to a database.
    console.log("New review submitted:", validatedFields.data);

    return {
        message: "Thank you! Your review has been submitted successfully.",
        success: true,
    };
}


const panditSignupSchema = z.object({
    name: z.string().min(2, "Name is too short."),
    email: z.string().email("Please provide a valid email."),
    phone: z.string().min(10, 'Please provide a valid 10-digit mobile number.').max(15, 'Mobile number is too long.'),
    password: z.string().min(6, "Password must be at least 6 characters."),
    city: z.string().min(1, "Please select a city."),
    location: z.string().min(3, "Please provide a valid location."),
    services: z.string().min(3, "Please list at least one service."),
    qualifications: z.string().optional(),
    bio: z.string().min(20, "Bio is too short."),
    showQualifications: z.preprocess((val) => val === 'on' || val === true, z.boolean()),
});

export type PanditSignupFormState = {
    message: string;
    errors?: z.ZodError<z.infer<typeof panditSignupSchema>>['formErrors']['fieldErrors'];
    success: boolean;
};

export async function handlePanditSignup(
    prevState: PanditSignupFormState,
    formData: FormData
): Promise<PanditSignupFormState> {
    const validatedFields = panditSignupSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            message: "Validation failed. Please check your inputs.",
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }
    
    const { email, password, ...profileData } = validatedFields.data;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Now, save the rest of the profile data to Firestore
        const panditProfile = {
            id: user.uid,
            email,
            ...profileData,
            services: profileData.services.split(',').map(s => s.trim()),
            // Set initial non-form values
            photo: 'https://placehold.co/400x400.png',
            photoHint: 'pandit portrait',
            aadhaarPhoto: 'https://placehold.co/400x250.png',
            aadhaarPhotoHint: 'document placeholder',
            selfiePhoto: 'https://placehold.co/400x400.png',
            selfiePhotoHint: 'selfie placeholder',
            verified: false,
            pendingApproval: true,
            rating: 0,
            reviews: 0,
            featured: false,
        };

        await setDoc(doc(db, "pandits", user.uid), panditProfile);

        return {
            message: "Thank you! Your profile has been created and submitted for verification.",
            success: true,
        };

    } catch (error: any) {
        let errorMessage = "An unknown error occurred during signup.";
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = "This email address is already in use. Please use a different email.";
        }
        console.error("Pandit Signup Error:", error);
        return {
            message: errorMessage,
            success: false,
        };
    }
}
