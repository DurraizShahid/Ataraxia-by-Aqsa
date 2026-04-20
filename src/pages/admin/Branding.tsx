import { useState, useEffect } from 'react';
import { useBrandConfig } from '@/context/BrandConfigContext';
import type { BrandColors, BrandConfig } from '@/lib/brandConfig';
import { hslToHex, hexToHsl, defaultBrandConfig, applyBrandConfig } from '@/lib/brandConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Save, RotateCcw, Palette, Type, Image as ImageIcon, Eye } from 'lucide-react';

// ── Colour fields ────────────────────────────────────────────────────────────

const COLOR_FIELDS: Array<{
  key: keyof BrandColors;
  label: string;
  description: string;
  group: string;
}> = [
  // Core
  { key: 'background',         label: 'Background',           description: 'Main page background',                      group: 'Core' },
  { key: 'foreground',         label: 'Text / Foreground',    description: 'Default text colour',                       group: 'Core' },
  // Brand
  { key: 'primary',            label: 'Primary',              description: 'Buttons, active states, key highlights',    group: 'Brand' },
  { key: 'primaryForeground',  label: 'Primary Text',         description: 'Text drawn on primary colour backgrounds',  group: 'Brand' },
  // Secondary
  { key: 'secondary',          label: 'Secondary',            description: 'Secondary buttons and backgrounds',         group: 'Secondary' },
  { key: 'secondaryForeground',label: 'Secondary Text',       description: 'Text on secondary backgrounds',             group: 'Secondary' },
  // Accent
  { key: 'accent',             label: 'Accent',               description: 'Hover states and accent highlights',        group: 'Accent' },
  { key: 'accentForeground',   label: 'Accent Text',          description: 'Text on accent backgrounds',                group: 'Accent' },
  // Muted
  { key: 'muted',              label: 'Muted',                description: 'Subtle section backgrounds',                group: 'Muted' },
  { key: 'mutedForeground',    label: 'Muted Text',           description: 'Placeholders and secondary text',           group: 'Muted' },
  // Utility
  { key: 'border',             label: 'Border',               description: 'Borders, dividers and input outlines',      group: 'Utility' },
  { key: 'ring',               label: 'Focus Ring',           description: 'Keyboard-focus ring on interactive elements', group: 'Utility' },
];

const COLOR_GROUPS = ['Core', 'Brand', 'Secondary', 'Accent', 'Muted', 'Utility'];

// ── Border-radius presets ────────────────────────────────────────────────────

const RADIUS_OPTIONS = [
  { label: 'None',   value: '0rem'   },
  { label: 'Small',  value: '0.25rem'},
  { label: 'Medium', value: '0.5rem' },
  { label: 'Large',  value: '0.75rem'},
  { label: 'XL',     value: '1rem'   },
  { label: 'Full',   value: '1.5rem' },
];

// ── Preset themes ────────────────────────────────────────────────────────────

const PRESET_THEMES: Array<{ name: string; colors: BrandColors; borderRadius: string }> = [
  {
    name: 'Default (Midnight)',
    borderRadius: '0.5rem',
    colors: defaultBrandConfig.colors,
  },
  {
    name: 'Rose Gold',
    borderRadius: '0.75rem',
    colors: {
      background:          '30 20% 98%',
      foreground:          '15 30% 15%',
      primary:             '340 60% 55%',
      primaryForeground:   '0 0% 100%',
      secondary:           '340 20% 92%',
      secondaryForeground: '340 40% 25%',
      accent:              '340 40% 88%',
      accentForeground:    '340 50% 20%',
      muted:               '30 15% 94%',
      mutedForeground:     '15 15% 50%',
      border:              '340 20% 85%',
      ring:                '340 60% 55%',
    },
  },
  {
    name: 'Forest Green',
    borderRadius: '0.5rem',
    colors: {
      background:          '120 10% 98%',
      foreground:          '140 30% 10%',
      primary:             '150 50% 30%',
      primaryForeground:   '0 0% 100%',
      secondary:           '120 20% 90%',
      secondaryForeground: '140 40% 20%',
      accent:              '150 30% 85%',
      accentForeground:    '150 50% 15%',
      muted:               '120 10% 94%',
      mutedForeground:     '140 10% 50%',
      border:              '120 15% 85%',
      ring:                '150 50% 30%',
    },
  },
  {
    name: 'Ocean Blue',
    borderRadius: '0.5rem',
    colors: {
      background:          '210 25% 98%',
      foreground:          '220 40% 10%',
      primary:             '210 80% 40%',
      primaryForeground:   '0 0% 100%',
      secondary:           '210 30% 90%',
      secondaryForeground: '220 40% 20%',
      accent:              '210 40% 85%',
      accentForeground:    '210 60% 20%',
      muted:               '210 15% 94%',
      mutedForeground:     '210 15% 50%',
      border:              '210 20% 85%',
      ring:                '210 80% 40%',
    },
  },
  {
    name: 'Warm Sand',
    borderRadius: '1rem',
    colors: {
      background:          '40 30% 97%',
      foreground:          '30 25% 15%',
      primary:             '25 60% 45%',
      primaryForeground:   '0 0% 100%',
      secondary:           '40 25% 90%',
      secondaryForeground: '30 30% 25%',
      accent:              '40 35% 85%',
      accentForeground:    '30 40% 20%',
      muted:               '40 20% 93%',
      mutedForeground:     '30 15% 52%',
      border:              '40 20% 84%',
      ring:                '25 60% 45%',
    },
  },
  {
    name: 'Slate Dark',
    borderRadius: '0.5rem',
    colors: {
      background:          '222 20% 10%',
      foreground:          '210 20% 92%',
      primary:             '210 80% 60%',
      primaryForeground:   '222 20% 8%',
      secondary:           '222 15% 18%',
      secondaryForeground: '210 20% 85%',
      accent:              '222 15% 22%',
      accentForeground:    '210 20% 90%',
      muted:               '222 15% 16%',
      mutedForeground:     '210 10% 55%',
      border:              '222 15% 22%',
      ring:                '210 80% 60%',
    },
  },
];

// ── Component ────────────────────────────────────────────────────────────────

const AdminBranding = () => {
  const { brandConfig, updateBrandConfig, resetBrandConfig } = useBrandConfig();
  const [local, setLocal] = useState<BrandConfig>(brandConfig);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Keep local state in sync when context loads from Supabase
  useEffect(() => {
    setLocal(brandConfig);
  }, [brandConfig]);

  // Live-preview as user tweaks values
  useEffect(() => {
    applyBrandConfig(local);
  }, [local]);

  const setColor = (key: keyof BrandColors, hex: string) => {
    setLocal(prev => ({
      ...prev,
      colors: { ...prev.colors, [key]: hexToHsl(hex) },
    }));
  };

  const applyPreset = (preset: typeof PRESET_THEMES[0]) => {
    setLocal(prev => ({
      ...prev,
      colors: preset.colors,
      borderRadius: preset.borderRadius,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const ok = await updateBrandConfig(local);
    setIsSaving(false);
    toast(
      ok
        ? { title: 'Saved', description: 'Branding settings saved successfully' }
        : { title: 'Error', description: 'Failed to save — check console', variant: 'destructive' },
    );
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all branding to default? This cannot be undone.')) return;
    await resetBrandConfig();
    setLocal(defaultBrandConfig);
    toast({ title: 'Reset', description: 'Branding restored to defaults' });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Branding &amp; Theme</h1>
          <p className="text-muted-foreground mt-1">
            Customise your site's visual identity. Changes preview instantly — click Save to persist.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={isSaving}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" /> {isSaving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* ── Site Identity ─────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5 text-primary" />
            <CardTitle>Site Identity</CardTitle>
          </div>
          <CardDescription>Name, logo and favicon for your website</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Site Name</Label>
            <Input
              value={local.siteName}
              onChange={e => setLocal(p => ({ ...p, siteName: e.target.value }))}
              placeholder="My Brand"
            />
            <p className="text-xs text-muted-foreground">Shown in the admin sidebar</p>
          </div>

          <div className="space-y-2">
            <Label>Logo URL</Label>
            <Input
              value={local.logoUrl}
              onChange={e => setLocal(p => ({ ...p, logoUrl: e.target.value }))}
              placeholder="https://… or /logo.svg"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use the logo from Image Manager
            </p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Favicon URL</Label>
            <Input
              value={local.faviconUrl}
              onChange={e => setLocal(p => ({ ...p, faviconUrl: e.target.value }))}
              placeholder="https://… or /favicon.ico"
            />
            <p className="text-xs text-muted-foreground">
              Overrides the favicon in the browser tab dynamically
            </p>
          </div>

          {/* Logo preview */}
          {local.logoUrl && (
            <div className="md:col-span-2 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Preview:</span>
              <img
                src={local.logoUrl}
                alt="Logo preview"
                className="h-10 w-auto border border-border rounded p-1 bg-white"
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Quick Presets ──────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <CardTitle>Quick Presets</CardTitle>
          </div>
          <CardDescription>
            Apply a ready-made colour scheme as a starting point — you can still tweak individual colours below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {PRESET_THEMES.map(preset => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary transition-colors"
              >
                {/* Mini colour swatch */}
                <div className="flex gap-1">
                  {(['background', 'primary', 'secondary', 'accent'] as const).map(k => (
                    <div
                      key={k}
                      className="w-5 h-5 rounded-full border border-border/40"
                      style={{ backgroundColor: `hsl(${preset.colors[k]})` }}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-center leading-tight">{preset.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Colour Palette ─────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <CardTitle>Colour Palette</CardTitle>
          </div>
          <CardDescription>
            Click a swatch to open the colour picker. The page previews changes instantly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {COLOR_GROUPS.map(group => {
            const fields = COLOR_FIELDS.filter(f => f.group === group);
            return (
              <div key={group}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {group}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fields.map(({ key, label, description }) => {
                    const hex = hslToHex(local.colors[key]);
                    return (
                      <div key={key} className="flex items-center gap-3">
                        {/* Colour swatch + hidden native picker */}
                        <div className="relative shrink-0">
                          <div
                            className="w-12 h-12 rounded-lg border-2 border-border shadow-sm overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                            style={{ backgroundColor: `hsl(${local.colors[key]})` }}
                            title={`Pick ${label}`}
                          >
                            <input
                              type="color"
                              value={hex}
                              onChange={e => setColor(key, e.target.value)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-none">{label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                          <p className="text-xs font-mono text-muted-foreground/70 mt-1 truncate">
                            hsl({local.colors[key]})
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Separator className="mt-5" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* ── Border Radius ──────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Shape &amp; Radius</CardTitle>
          <CardDescription>Control the roundness of buttons, cards and inputs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label className="mb-3 block">
              Border Radius:{' '}
              <span className="font-mono text-primary">{local.borderRadius}</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {RADIUS_OPTIONS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setLocal(p => ({ ...p, borderRadius: value }))}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    local.borderRadius === value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border hover:bg-muted'
                  }`}
                  style={{ borderRadius: value }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Live preview */}
          <div className="p-5 bg-muted rounded-lg space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live Preview</p>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                className="px-4 py-2 text-sm bg-primary text-primary-foreground font-medium"
                style={{ borderRadius: local.borderRadius }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 text-sm bg-secondary text-secondary-foreground border border-border"
                style={{ borderRadius: local.borderRadius }}
              >
                Secondary
              </button>
              <div
                className="px-4 py-2 text-sm bg-card text-card-foreground border border-border shadow-sm"
                style={{ borderRadius: local.borderRadius }}
              >
                Card
              </div>
              <input
                className="px-3 py-2 text-sm border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring"
                style={{ borderRadius: local.borderRadius }}
                placeholder="Input field"
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Colour Swatches Overview ────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <CardTitle>Palette Overview</CardTitle>
          </div>
          <CardDescription>All active colours at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {(Object.entries(local.colors) as [keyof BrandColors, string][]).map(([key, hsl]) => {
              const field = COLOR_FIELDS.find(f => f.key === key);
              return (
                <div key={key} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-10 h-10 rounded-md border border-border shadow-sm"
                    style={{ backgroundColor: `hsl(${hsl})` }}
                    title={`${key}: hsl(${hsl})`}
                  />
                  <span className="text-center leading-tight" style={{ fontSize: '9px', maxWidth: 56 }}>
                    {field?.label ?? key}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bottom save bar */}
      <div className="flex justify-end gap-2 pb-6">
        <Button variant="outline" onClick={handleReset} disabled={isSaving}>
          <RotateCcw className="mr-2 h-4 w-4" /> Reset to Default
        </Button>
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          <Save className="mr-2 h-4 w-4" /> {isSaving ? 'Saving…' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default AdminBranding;
