import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { BrandConfig } from '@/lib/brandConfig';
import { defaultBrandConfig, applyBrandConfig } from '@/lib/brandConfig';
import {
  getBrandConfig,
  updateBrandConfig as saveBrandConfig,
  resetBrandConfig as resetConfig,
} from '@/lib/supabaseBrandConfig';

interface BrandConfigContextType {
  brandConfig: BrandConfig;
  updateBrandConfig: (config: BrandConfig) => Promise<boolean>;
  resetBrandConfig: () => Promise<boolean>;
  isLoading: boolean;
}

const BrandConfigContext = createContext<BrandConfigContextType | null>(null);

export const BrandConfigProvider = ({ children }: { children: ReactNode }) => {
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(defaultBrandConfig);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const config = await getBrandConfig();
      setBrandConfig(config);
      applyBrandConfig(config);
      setIsLoading(false);
    };
    load();
  }, []);

  const updateBrandConfig = async (config: BrandConfig): Promise<boolean> => {
    const success = await saveBrandConfig(config);
    if (success) {
      setBrandConfig(config);
      applyBrandConfig(config);
    }
    return success;
  };

  const resetBrandConfig = async (): Promise<boolean> => {
    const success = await resetConfig();
    if (success) {
      setBrandConfig(defaultBrandConfig);
      applyBrandConfig(defaultBrandConfig);
    }
    return success;
  };

  return (
    <BrandConfigContext.Provider value={{ brandConfig, updateBrandConfig, resetBrandConfig, isLoading }}>
      {children}
    </BrandConfigContext.Provider>
  );
};

export const useBrandConfig = (): BrandConfigContextType => {
  const ctx = useContext(BrandConfigContext);
  if (!ctx) throw new Error('useBrandConfig must be used inside BrandConfigProvider');
  return ctx;
};
