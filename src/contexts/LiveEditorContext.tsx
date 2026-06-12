import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { LiveEditorState, EditableSection, SiteTheme, SiteTypography, EditorPage } from '../types/liveEditor';
import { getDefaultEditorState } from '../lib/liveEditorDefaults';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface LiveEditorContextType {
  state: LiveEditorState;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  updateText: (id: string, value: string) => void;
  updateImage: (id: string, src: string) => void;
  updateSection: (id: string, updates: Partial<EditableSection>) => void;
  updateTheme: (updates: Partial<SiteTheme>) => void;
  updateTypography: (updates: Partial<SiteTypography>) => void;
  resetToDefault: () => void;
  getTextStyle: (id: string) => React.CSSProperties;
  setCurrentPage: (page: EditorPage) => void;
  setSelectedSection: (sectionId: string | null) => void;
  reorderSections: (newOrderIds: string[]) => void;
  resetPageImages: (page: EditorPage | 'shared') => void;
  resetAllImages: () => void;
  resetPageTexts: (page: EditorPage | 'shared') => void;
  saveToSupabase: () => Promise<void>;
  undo: () => void;
  redo: () => void;
}

const LiveEditorContext = createContext<LiveEditorContextType | undefined>(undefined);

export function LiveEditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LiveEditorState>(getDefaultEditorState);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<LiveEditorState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedState, setSavedState] = useState<LiveEditorState | null>(null);

  // Fetch initial config on mount
  useEffect(() => {
    async function fetchConfig() {
      try {
        const { data, error } = await supabase
          .from('config')
          .select('*')
          .eq('key', 'live_editor_config')
          .single();

        if (!error && data?.value) {
          const initialState = data.value as LiveEditorState;
          setState(initialState);
          setSavedState(initialState);
        }
      } catch (err) {
        // Fall back to default
        const defaultState = getDefaultEditorState();
        setState(defaultState);
        setSavedState(defaultState);
      }
    }
    fetchConfig();
  }, []);

  // Save to history when state changes
  const saveToHistory = useCallback((newState: LiveEditorState) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newState);
      // Keep last 50 states
      if (newHistory.length > 50) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const hasUnsavedChanges = savedState ? JSON.stringify(state) !== JSON.stringify(savedState) : false;

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setState(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setState(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const saveToSupabase = useCallback(async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('config')
        .upsert({
          key: 'live_editor_config',
          value: state,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Failed to save to Supabase:', error);
      } else {
        setSavedState(state);
      }
    } catch (err) {
      console.error('Failed to save to Supabase:', err);
    } finally {
      setIsSaving(false);
    }
  }, [state]);

  const updateText = useCallback((id: string, value: string) => {
    setState(prev => {
      const newState = ({
        ...prev,
        texts: {
          ...prev.texts,
          [id]: {
            ...prev.texts[id],
            value,
          },
        },
        lastSaved: new Date().toISOString(),
      });
      saveToHistory(newState);
      return newState;
    });
  }, [saveToHistory]);

  const updateImage = useCallback((id: string, src: string) => {
    setState(prev => {
      const newState = ({
        ...prev,
        images: {
          ...prev.images,
          [id]: {
            ...prev.images[id],
            src,
          },
        },
        lastSaved: new Date().toISOString(),
      });
      saveToHistory(newState);
      return newState;
    });
  }, [saveToHistory]);

  const updateSection = useCallback((id: string, updates: Partial<EditableSection>) => {
    setState(prev => {
      const newState = ({
        ...prev,
        sections: {
          ...prev.sections,
          [id]: {
            ...prev.sections[id],
            ...updates,
          },
        },
        lastSaved: new Date().toISOString(),
      });
      saveToHistory(newState);
      return newState;
    });
  }, [saveToHistory]);

  const updateTheme = useCallback((updates: Partial<SiteTheme>) => {
    setState(prev => {
      const newState = ({
        ...prev,
        theme: {
          ...prev.theme,
          ...updates,
        },
        lastSaved: new Date().toISOString(),
      });
      saveToHistory(newState);
      return newState;
    });
  }, [saveToHistory]);

  const updateTypography = useCallback((updates: Partial<SiteTypography>) => {
    setState(prev => {
      const newState = ({
        ...prev,
        typography: {
          ...prev.typography,
          ...updates,
        },
        lastSaved: new Date().toISOString(),
      });
      saveToHistory(newState);
      return newState;
    });
  }, [saveToHistory]);

  const resetToDefault = useCallback(() => {
    const newState = getDefaultEditorState();
    setState(newState);
    saveToHistory(newState);
  }, [saveToHistory]);

  const setCurrentPage = useCallback((page: EditorPage) => {
    setState(prev => ({
      ...prev,
      currentPage: page,
      selectedSection: null,
    }));
  }, []);

  const setSelectedSection = useCallback((sectionId: string | null) => {
    setState(prev => ({
      ...prev,
      selectedSection: sectionId,
    }));
  }, []);

  const reorderSections = useCallback((newOrderIds: string[]) => {
    setState(prev => {
      const newSections = { ...prev.sections };
      newOrderIds.forEach((id, index) => {
        if (newSections[id]) {
          newSections[id] = { ...newSections[id], order: index + 1 };
        }
      });
      return {
        ...prev,
        sections: newSections,
        lastSaved: new Date().toISOString(),
      };
    });
  }, []);

  const resetPageImages = useCallback((page: EditorPage | 'shared') => {
    setState(prev => {
      const defaultState = getDefaultEditorState();
      const newImages = { ...prev.images };
      
      for (const id in newImages) {
        if (newImages[id].page === page) {
          const defaultImg = defaultState.images[id];
          if (defaultImg) {
            newImages[id] = { ...newImages[id], src: defaultImg.defaultSrc };
          }
        }
      }

      return {
        ...prev,
        images: newImages,
        lastSaved: new Date().toISOString(),
      };
    });
  }, []);

  const resetAllImages = useCallback(() => {
    setState(prev => {
      const defaultState = getDefaultEditorState();
      const newImages = { ...prev.images };
      
      for (const id in newImages) {
        const defaultImg = defaultState.images[id];
        if (defaultImg) {
          newImages[id] = { ...newImages[id], src: defaultImg.defaultSrc };
        }
      }

      return {
        ...prev,
        images: newImages,
        lastSaved: new Date().toISOString(),
      };
    });
  }, []);

  const resetPageTexts = useCallback((page: EditorPage | 'shared') => {
    setState(prev => {
      const defaultState = getDefaultEditorState();
      const newTexts = { ...prev.texts };
      
      for (const id in newTexts) {
        if (newTexts[id].page === page) {
          const defaultText = defaultState.texts[id];
          if (defaultText) {
            newTexts[id] = { ...newTexts[id], value: defaultText.defaultValue };
          }
        }
      }

      return {
        ...prev,
        texts: newTexts,
        lastSaved: new Date().toISOString(),
      };
    });
  }, []);

  const getTextStyle = useCallback((id: string): React.CSSProperties => {
    const text = state.texts[id];
    if (!text) return {};
    return {
      fontFamily: text.type === 'heading' ? state.typography.headingFont : state.typography.bodyFont,
      color: state.theme.textPrimary,
      lineHeight: state.typography.lineHeight,
      letterSpacing: `${state.typography.letterSpacing}px`,
    };
  }, [state.texts, state.typography, state.theme]);

  return (
    <LiveEditorContext.Provider
      value={{
        state,
        isSaving,
        hasUnsavedChanges,
        updateText,
        updateImage,
        updateSection,
        updateTheme,
        updateTypography,
        resetToDefault,
        getTextStyle,
        setCurrentPage,
        setSelectedSection,
        reorderSections,
        resetPageImages,
        resetAllImages,
        resetPageTexts,
        saveToSupabase,
        undo,
        redo,
      }}
    >
      {children}
    </LiveEditorContext.Provider>
  );
}

export function useLiveEditor() {
  const context = useContext(LiveEditorContext);
  if (!context) {
    throw new Error('useLiveEditor must be used within LiveEditorProvider');
  }
  return context;
}
