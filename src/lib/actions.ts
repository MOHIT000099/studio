'use server';

import { z } from 'zod';
import { suggestPriests } from '@/ai/flows/suggest-priests';
import { allPriests } from '@/data/priests';
import { redirect } from 'next/navigation';

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

export async function handleSimpleAuth(formData: FormData) {
  console.log('Form submitted:', Object.fromEntries(formData.entries()));
  // In a real app, you would handle auth logic here. For now, we'll just redirect
  // to show that the form submission is working. A toast could also be used.
  return redirect('/priests');
}
