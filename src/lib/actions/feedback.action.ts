'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// 1. Updated Zod schema to handle optional rating correctly
const FeedbackSchema = z.object({
  feedback: z.string().min(10, { message: 'Feedback must be at least 10 characters.' }),
  path: z.string(),
  // Use preprocess to handle empty/null values before validation
  rating: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().min(1).max(5).optional(),
  ),
  type: z.enum(['bug', 'feature', 'praise', 'general']),
});

// Interface for a structured action result
interface ActionResult {
  success: boolean;
  message: string;
}

/**
 * Server action to handle feedback form submissions.
 * @param prevState - The previous state of the form action.
 * @param formData - The data from the submitted form.
 * @returns An ActionResult indicating success or failure.
 */
export async function submitFeedback(
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  // Authenticate the user on the server
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: 'You must be logged in to submit feedback.' };
  }

  // Validate the form data against the updated Zod schema
  const validation = FeedbackSchema.safeParse({
    feedback: formData.get('feedback'),
    path: formData.get('path'),
    rating: formData.get('rating'),
    type: formData.get('type'),
  });

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors[0].message,
    };
  }

  // Destructure the validated data
  const { feedback, path, rating, type } = validation.data;

  // Insert the validated data into the table
  const { error } = await supabase.from('feedback_submissions').insert({
    user_id: user.id,
    content: feedback,
    path: path,
    rating: rating,
    type: type, 
  });

  if (error) {
    console.error('Feedback Submit Error:', error);
    return { success: false, message: 'Database error: Failed to submit feedback.' };
  }

  // On success, revalidate the path and return a success message
  revalidatePath(path);
  return { success: true, message: 'Thank you! Your feedback has been submitted.' };
}