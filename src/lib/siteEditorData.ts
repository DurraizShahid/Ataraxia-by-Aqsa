// Supabase table creation SQL:
// 
// CREATE TABLE site_editor_config (
//   id INT PRIMARY KEY DEFAULT 1,
//   config JSONB NOT NULL DEFAULT '{}'::jsonb,
//   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// );
// 
// -- Ensure only one row exists
// CREATE UNIQUE INDEX site_editor_config_single_row_idx ON site_editor_config ((1));
// 
// -- Add a trigger to auto-update updated_at
// CREATE OR REPLACE FUNCTION update_updated_at_column()
// RETURNS TRIGGER AS $$
// BEGIN
//   NEW.updated_at = NOW();
//   RETURN NEW;
// END;
// $$ language 'plpgsql';
// 
// CREATE TRIGGER update_site_editor_config_updated_at
//   BEFORE UPDATE ON site_editor_config
//   FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

import { supabase } from './supabase';
import type { SiteEditorConfig } from '@/types/siteEditor';

const SITE_EDITOR_CONFIG_ID = 1;
const LOCAL_STORAGE_KEY = 'ataraxia_site_editor_config';

export const getDefaultSiteEditorConfig = (): SiteEditorConfig => {
  return {
    // LAYOUT
    layoutStyle: 'full-width',
    containerWidth: 1200,
    sectionOrder: ['hero', 'section1', 'section2', 'section3', 'services', 'courses', 'journals', 'testimonials', 'footer'],
    sectionVisibility: {
      hero: true,
      section1: true,
      section2: true,
      section3: true,
      services: true,
      courses: true,
      journals: true,
      testimonials: true,
      footer: true,
    },
    spacing: 'normal',

    // TYPOGRAPHY
    headingFont: 'Inter, system-ui, sans-serif',
    bodyFont: 'Inter, system-ui, sans-serif',
    uiFont: 'Inter, system-ui, sans-serif',
    heroFontSize: 64,
    sectionHeadingSize: 36,
    bodyFontSize: 16,
    cardTitleSize: 20,
    buttonFontSize: 16,
    headingWeight: 700,
    bodyWeight: 400,
    lineHeight: 1.6,
    letterSpacing: 0,
    heroAlignment: 'center',
    sectionAlignment: 'center',

    // THEME
    activePreset: 'default',
    backgroundColor: '0 0% 3%',
    textPrimary: '0 0% 95%',
    textSecondary: '0 0% 65%',
    accentColor: '43 60% 52%',
    cardBackground: '0 0% 12%',
    cardBorder: '0 0% 18%',
    buttonBackground: '0 0% 95%',
    buttonText: '0 0% 4%',
    borderRadius: 8,

    // CONTENT
    heroHeadline: 'Welcome to Ataraxia',
    heroSubheadline: 'Find your inner peace and transform your life',
    heroCtaText: 'Get Started',
    heroCtaUrl: '/services',
    section1Title: 'About Us',
    section1Body: 'We are dedicated to helping you find balance and harmony in your life.',
    section2Title: 'Our Mission',
    section2Body: 'To provide accessible tools and resources for personal growth and well-being.',
    section3Title: 'Why Choose Us',
    section3Body: 'Expert guidance, proven methods, and a supportive community.',
    footerText: '© 2026 Ataraxia by Aqsa. All rights reserved.',
    customSections: [],
  };
};

export const getSiteEditorConfig = async (): Promise<SiteEditorConfig> => {
  // 1. Try localStorage for immediate hydration (no flash)
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...getDefaultSiteEditorConfig(),
        ...parsed,
      };
    }
  } catch {
    // ignore parse errors
  }

  // 2. Fetch from Supabase
  try {
    const { data, error } = await supabase
      .from('site_editor_config')
      .select('config')
      .eq('id', SITE_EDITOR_CONFIG_ID)
      .single();

    if (error || !data) return getDefaultSiteEditorConfig();

    const config: SiteEditorConfig = {
      ...getDefaultSiteEditorConfig(),
      ...(data.config as Partial<SiteEditorConfig>),
    };

    // Cache locally
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
    return config;
  } catch {
    return getDefaultSiteEditorConfig();
  }
};

export const saveSiteEditorConfig = async (config: SiteEditorConfig): Promise<void> => {
  // Save to localStorage first for instant access
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));

  // Then save to Supabase
  try {
    const { error } = await supabase
      .from('site_editor_config')
      .upsert({ id: SITE_EDITOR_CONFIG_ID, config });

    if (error) throw error;
  } catch (err) {
    console.error('Error saving site editor config:', err);
    throw err;
  }
};
