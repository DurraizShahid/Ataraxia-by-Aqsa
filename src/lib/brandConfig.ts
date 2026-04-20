// White-label brand configuration — colors, logos, site identity

export interface BrandColors {
  background: string;         // HSL e.g. "0 0% 100%"
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  ring: string;
}

export interface BrandConfig {
  siteName: string;
  logoUrl: string;       // Overrides Image Manager logo when set
  faviconUrl: string;    // Dynamically updates <link rel="icon">
  borderRadius: string;  // CSS value e.g. "0.5rem"
  colors: BrandColors;
}

export const defaultBrandConfig: BrandConfig = {
  siteName: 'Ataraxia by Aqsa',
  logoUrl: '',
  faviconUrl: '',
  borderRadius: '0.5rem',
  colors: {
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    primary: '222.2 47.4% 11.2%',
    primaryForeground: '210 40% 98%',
    secondary: '210 40% 96.1%',
    secondaryForeground: '222.2 47.4% 11.2%',
    accent: '210 40% 96.1%',
    accentForeground: '222.2 47.4% 11.2%',
    muted: '210 40% 96.1%',
    mutedForeground: '215.4 16.3% 46.9%',
    border: '214.3 31.8% 91.4%',
    ring: '222.2 84% 4.9%',
  },
};

/** Apply a BrandConfig to the document's CSS variables instantly */
export const applyBrandConfig = (config: BrandConfig): void => {
  const root = document.documentElement;
  const { colors } = config;

  root.style.setProperty('--background', colors.background);
  root.style.setProperty('--foreground', colors.foreground);
  root.style.setProperty('--card', colors.background);
  root.style.setProperty('--card-foreground', colors.foreground);
  root.style.setProperty('--popover', colors.background);
  root.style.setProperty('--popover-foreground', colors.foreground);
  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--primary-foreground', colors.primaryForeground);
  root.style.setProperty('--secondary', colors.secondary);
  root.style.setProperty('--secondary-foreground', colors.secondaryForeground);
  root.style.setProperty('--muted', colors.muted);
  root.style.setProperty('--muted-foreground', colors.mutedForeground);
  root.style.setProperty('--accent', colors.accent);
  root.style.setProperty('--accent-foreground', colors.accentForeground);
  root.style.setProperty('--border', colors.border);
  root.style.setProperty('--input', colors.border);
  root.style.setProperty('--ring', colors.ring);
  root.style.setProperty('--radius', config.borderRadius);

  // Update favicon if specified
  if (config.faviconUrl) {
    const links = document.querySelectorAll<HTMLLinkElement>("link[rel~='icon']");
    links.forEach((link) => {
      link.href = config.faviconUrl;
    });
    if (!links.length) {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = config.faviconUrl;
      document.head.appendChild(link);
    }
  }

  // Update document title if siteName set
  if (config.siteName) {
    const title = document.querySelector('title');
    if (title && !title.dataset.customized) {
      // Only set base title; individual pages can still override
    }
  }
};

// ── Colour conversion utilities ──────────────────────────────────────────────

/** Convert an HSL string ("222.2 47.4% 11.2%") to a CSS hex colour */
export const hslToHex = (hsl: string): string => {
  try {
    const parts = hsl.trim().split(/[\s,]+/);
    if (parts.length < 3) return '#000000';

    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;

    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const colour = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * colour)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  } catch {
    return '#000000';
  }
};

/** Convert a CSS hex colour to an HSL string ("H S% L%") */
export const hexToHsl = (hex: string): string => {
  try {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '0 0% 0%';

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  } catch {
    return '0 0% 0%';
  }
};
