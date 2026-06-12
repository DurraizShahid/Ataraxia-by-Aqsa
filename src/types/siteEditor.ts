export interface SiteEditorConfig {
  // LAYOUT
  layoutStyle: 'single-column' | 'two-column' | 'full-width' | 'magazine-grid';
  containerWidth: number;
  sectionOrder: string[];
  sectionVisibility: Record<string, boolean>;
  spacing: 'compact' | 'normal' | 'spacious';

  // TYPOGRAPHY
  headingFont: string;
  bodyFont: string;
  uiFont: string;
  heroFontSize: number;
  sectionHeadingSize: number;
  bodyFontSize: number;
  cardTitleSize: number;
  buttonFontSize: number;
  headingWeight: number;
  bodyWeight: number;
  lineHeight: number;
  letterSpacing: number;
  heroAlignment: 'left' | 'center' | 'right';
  sectionAlignment: 'left' | 'center' | 'right';

  // THEME
  activePreset: string;
  backgroundColor: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  cardBackground: string;
  cardBorder: string;
  buttonBackground: string;
  buttonText: string;
  borderRadius: number;

  // CONTENT
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  heroCtaUrl: string;
  section1Title: string;
  section1Body: string;
  section2Title: string;
  section2Body: string;
  section3Title: string;
  section3Body: string;
  footerText: string;
  customSections: Array<{ id: string; title: string; body: string; visible: boolean }>;
}
