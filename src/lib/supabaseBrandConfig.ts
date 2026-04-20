// Supabase persistence for white-label brand configuration
import { supabase } from './supabase';
import type { BrandConfig } from './brandConfig';
import { defaultBrandConfig } from './brandConfig';

const BRAND_CONFIG_ID = '00000000-0000-0000-0000-000000000002';
const LOCAL_STORAGE_KEY = 'ataraxia_brand_config';

/** Load brand config — localStorage first for instant render, then Supabase */
export const getBrandConfig = async (): Promise<BrandConfig> => {
  // 1. Try localStorage for immediate hydration (no flash)
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Deep merge with defaults so new fields added later get defaults
      return {
        ...defaultBrandConfig,
        ...parsed,
        colors: { ...defaultBrandConfig.colors, ...(parsed.colors ?? {}) },
      };
    }
  } catch {
    // ignore parse errors
  }

  // 2. Fetch from Supabase
  try {
    const { data, error } = await supabase
      .from('brand_config')
      .select('config')
      .limit(1)
      .single();

    if (error || !data) return defaultBrandConfig;

    const config: BrandConfig = {
      ...defaultBrandConfig,
      ...(data.config as Partial<BrandConfig>),
      colors: {
        ...defaultBrandConfig.colors,
        ...((data.config as any)?.colors ?? {}),
      },
    };

    // Cache locally
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
    return config;
  } catch {
    return defaultBrandConfig;
  }
};

/** Save brand config to Supabase and update localStorage cache */
export const updateBrandConfig = async (config: BrandConfig): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('brand_config')
      .upsert({ id: BRAND_CONFIG_ID, config });

    if (error) throw error;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (err) {
    console.error('Error saving brand config:', err);
    return false;
  }
};

/** Reset brand config to factory defaults */
export const resetBrandConfig = async (): Promise<boolean> => {
  return updateBrandConfig(defaultBrandConfig);
};
