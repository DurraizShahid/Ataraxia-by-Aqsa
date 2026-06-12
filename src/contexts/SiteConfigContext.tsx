import React, { createContext, useContext, useState, useEffect, CSSProperties } from 'react';
import { LiveEditorState } from '../types/liveEditor';
import { getDefaultEditorState } from '../lib/liveEditorDefaults';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SiteConfigContextValue {
  editorState: LiveEditorState;
  isLoading: boolean;
  getText: (id: string) => string;
  getImage: (id: string) => { src: string; alt: string };
  getThemeStyle: () => CSSProperties;
  getTextStyle: (id: string) => CSSProperties;
  getCardStyle: () => CSSProperties;
  getButtonStyle: () => CSSProperties;
}

const SiteConfigContext = createContext<SiteConfigContextValue | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [editorState, setEditorState] = useState<LiveEditorState>(getDefaultEditorState());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const { data, error } = await supabase
          .from('config')
          .select('*')
          .eq('key', 'live_editor_config')
          .single();

        if (error || !data || !data.value) {
          setEditorState(getDefaultEditorState());
        } else {
          setEditorState(data.value as LiveEditorState);
        }
      } catch (err) {
        setEditorState(getDefaultEditorState());
      } finally {
        setIsLoading(false);
      }
    }

    fetchConfig();
  }, []);

  const getText = (id: string) => editorState.texts[id]?.value || '';

  const getImage = (id: string) => ({
    src: editorState.images[id]?.src || '/placeholder.svg',
    alt: editorState.images[id]?.alt || 'Image',
  });

  const getThemeStyle = () => ({
    backgroundColor: editorState.theme.backgroundColor,
    color: editorState.theme.textPrimary,
  });

  const getTextStyle = (id: string): CSSProperties => {
    const text = editorState.texts[id];
    const style: CSSProperties = {
      fontFamily: text?.type === 'heading'
        ? editorState.typography.headingFont
        : editorState.typography.bodyFont,
      color: editorState.theme.textPrimary,
      lineHeight: editorState.typography.lineHeight,
      letterSpacing: `${editorState.typography.letterSpacing}px`,
    };
    return style;
  };

  const getCardStyle = () => ({
    backgroundColor: editorState.theme.cardBackground,
    borderColor: editorState.theme.cardBorder,
  });

  const getButtonStyle = () => ({
    backgroundColor: editorState.theme.buttonBackground,
    color: editorState.theme.buttonText,
  });

  return (
    <SiteConfigContext.Provider
      value={{
        editorState,
        isLoading,
        getText,
        getImage,
        getThemeStyle,
        getTextStyle,
        getCardStyle,
        getButtonStyle,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within SiteConfigProvider');
  }
  return context;
}
