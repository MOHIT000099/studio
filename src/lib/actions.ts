'use server';

import { z } from 'zod';
import { suggestPriests } from '@/ai/flows/suggest-priests';
import { allPriests } from '@/data/priests';

const requestSchema = z.object({
  service: z.string().min(3, 'Service description is too short.'),
  location: z.string().min(2, 'Please provide a valid location.'),
});

export type FormState = {
  message: string;
  priestIds?: string[];
  priests?: typeof allPriests;
  errors?: {
    service?: string[];
    location?: string[];
  };
};

export async function handlePriestRequest(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = requestSchema.safeParse({
    service: formData.get('service'),
    location: formData.get('location'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const { service, location } = validatedFields.data;
    const result = await suggestPriests({ service, location });

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
