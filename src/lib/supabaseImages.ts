// Supabase-based site image management
import { supabase } from './supabase';
import type { SiteImages } from './siteImages';
import {
  getSiteImages as getLocalImages,
  saveSiteImagesLocally,
  defaultImages,
} from './siteImages';

const SITE_IMAGES_ID = '00000000-0000-0000-0000-000000000002';
const STORAGE_BUCKET = 'site-images';

export const getSiteImages = async (): Promise<SiteImages> => {
  try {
    const { data, error } = await supabase
      .from('site_images')
      .select('content')
      .limit(1)
      .single();

    if (error) {
      return getLocalImages();
    }

    const merged = { ...defaultImages, ...(data.content as SiteImages) };
    saveSiteImagesLocally(merged);
    return merged;
  } catch (error) {
    console.error('Error fetching site images:', error);
    return getLocalImages();
  }
};

export const updateSiteImages = async (images: SiteImages): Promise<boolean> => {
  // Always persist to localStorage first so changes are instant
  saveSiteImagesLocally(images);

  try {
    const { error } = await supabase.from('site_images').upsert({
      id: SITE_IMAGES_ID,
      content: images,
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error syncing site images to Supabase:', error);
    // localStorage already saved, so the change still works locally
    return true;
  }
};

export const uploadImageToStorage = async (
  file: File,
  key: string
): Promise<string | null> => {
  try {
    const ext = file.name.split('.').pop();
    const path = `${key}_${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image to storage:', error);
    return null;
  }
};
