// Supabase-based site content management
import { supabase } from './supabase';
import type { SiteContent } from './siteContent';

// Default content (same as before)
import { getSiteContent as getLocalSiteContent } from './siteContent';

const SITE_CONTENT_ID = '00000000-0000-0000-0000-000000000001'; // Fixed UUID for single row

export const getSiteContent = async (): Promise<SiteContent> => {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .limit(1)
      .single();
    
    if (error) {
      console.log('No site content found, using defaults');
      return getLocalSiteContent();
    }
    
    return data.content as SiteContent;
  } catch (error) {
    console.error('Error fetching site content:', error);
    return getLocalSiteContent();
  }
};

export const updateSiteContent = async (content: SiteContent): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('site_content')
      .upsert({
        id: SITE_CONTENT_ID,
        content: content,
      });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating site content:', error);
    return false;
  }
};

export const resetSiteContent = async (): Promise<boolean> => {
  const defaultContent = getLocalSiteContent();
  return await updateSiteContent(defaultContent);
};

// Initialize site content with defaults if not exists
export const initializeSiteContent = async (): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('id')
      .limit(1)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking site content:', error);
    }
    
    if (!data) {
      // Insert default content
      const defaultContent = getLocalSiteContent();
      const success = await updateSiteContent(defaultContent);
      if (success) {
        console.log('✅ Initialized site content with defaults');
      } else {
        console.error('❌ Failed to initialize site content');
      }
    } else {
      console.log('Site content already exists in database');
    }
  } catch (error) {
    console.error('Error in initializeSiteContent:', error);
    // Try to create it anyway
    const defaultContent = getLocalSiteContent();
    await updateSiteContent(defaultContent);
  }
};

