// src/lib/supabase/storage.ts
'use client';

import { supabase } from '~/lib/supabase/client';

export async function uploadAvatar(userId: string, file: File) {
  console.log('[storage.ts] Starting avatar upload for user:', userId);
  const fileExtension = file.name.split('.').pop();
  const filePath = `avatars/${userId}/avatar.${fileExtension}`;
  console.log('[storage.ts] Uploading to path:', filePath);

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file, {
      upsert: true,
      cacheControl: '3600',
    });

  if (uploadError) {
    console.error('[storage.ts] Supabase Storage Error:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage.from('images').getPublicUrl(filePath);
  console.log('[storage.ts] Successfully uploaded. Public URL:', data.publicUrl);
  
  return data.publicUrl;
}