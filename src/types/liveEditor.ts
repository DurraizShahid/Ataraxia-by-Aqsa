export interface EditableText {
  id: string;
  value: string;
  defaultValue: string;
  page: string;
  section: string;
  label: string;
  type: 'heading' | 'subheading' | 'paragraph' | 'button' | 'label' | 'link' | 'caption';
  fontSizeMin: number;
  fontSizeMax: number;
}

export interface EditableImage {
  id: string;
  src: string;
  defaultSrc: string;
  alt: string;
  page: string;
  section: string;
  label: string;
}

export interface EditableSection {
  id: string;
  page: string;
  label: string;
  order: number;
  visible: boolean;
  bgColor: string;
  paddingTop: number;
  paddingBottom: number;
  isDeletable: boolean;
}

export interface SiteTheme {
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
  spacing: 'compact' | 'normal' | 'spacious';
  containerWidth: number;
}

export interface SiteTypography {
  headingFont: string;
  bodyFont: string;
  uiFont: string;
  fontSizes: Record<string, number>;
  fontWeights: Record<string, number>;
  lineHeight: number;
  letterSpacing: number;
  alignments: Record<string, 'left' | 'center' | 'right'>;
}

export type EditorPage =
  | "home"
  | "about"
  | "services"
  | "workshops"
  | "journals"
  | "blog"
  | "book-call"
  | "apply"
  | "contact"
  | "privacy-policy"
  | "terms-of-use"
  | "navbar"
  | "footer";

export interface LiveEditorState {
  texts: Record<string, EditableText>;
  images: Record<string, EditableImage>;
  sections: Record<string, EditableSection>;
  theme: SiteTheme;
  typography: SiteTypography;
  lastSaved: string | null;
  currentPage: EditorPage;
  selectedSection: string | null;
}
