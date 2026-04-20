import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SiteImages } from '@/lib/siteImages';
import { getSiteImages as getLocalImages } from '@/lib/siteImages';
import { getSiteImages as fetchRemoteImages } from '@/lib/supabaseImages';

interface SiteImagesContextType {
  images: SiteImages;
  refreshImages: () => Promise<void>;
}

const SiteImagesContext = createContext<SiteImagesContextType | null>(null);

export const SiteImagesProvider = ({ children }: { children: ReactNode }) => {
  // Start synchronously from localStorage so there is no loading flash
  const [images, setImages] = useState<SiteImages>(getLocalImages);

  const refreshImages = async () => {
    const data = await fetchRemoteImages();
    setImages(data);
  };

  useEffect(() => {
    // Hydrate from Supabase in the background
    refreshImages();
  }, []);

  return (
    <SiteImagesContext.Provider value={{ images, refreshImages }}>
      {children}
    </SiteImagesContext.Provider>
  );
};

export const useSiteImages = (): SiteImagesContextType => {
  const ctx = useContext(SiteImagesContext);
  if (!ctx) throw new Error('useSiteImages must be used inside SiteImagesProvider');
  return ctx;
};
