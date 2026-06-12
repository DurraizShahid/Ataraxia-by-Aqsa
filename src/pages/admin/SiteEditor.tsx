import { useState, useMemo, createRef, useEffect } from 'react';
import {
  Loader2,
  Monitor,
  Tablet,
  Smartphone,
  Download,
  RotateCcw,
  Save,
  Upload,
  GripVertical,
  ChevronRight,
  Eye,
  EyeOff,
  Palette,
  Search,
  ImageOff,
  ExternalLink,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/sonner';
import { Reorder } from 'framer-motion';
import {
  LiveEditorProvider,
  useLiveEditor,
} from '@/contexts/LiveEditorContext';
import { PreviewRouter } from '@/components/admin/editor/PreviewRouter';
import { EditorPage } from '@/types/liveEditor';

// Page options for the select dropdown
const PAGE_OPTIONS = [
  {
    groupLabel: 'Public Pages',
    pages: [
      { value: 'home' as EditorPage, label: 'Home' },
      { value: 'about' as EditorPage, label: 'About' },
      { value: 'services' as EditorPage, label: 'Services' },
      { value: 'workshops' as EditorPage, label: 'Workshops' },
      { value: 'journals' as EditorPage, label: 'Journals' },
      { value: 'blog' as EditorPage, label: 'Blog' },
      { value: 'book-call' as EditorPage, label: 'Book Call' },
      { value: 'apply' as EditorPage, label: 'Apply' },
      { value: 'contact' as EditorPage, label: 'Contact' },
      { value: 'privacy-policy' as EditorPage, label: 'Privacy Policy' },
      { value: 'terms-of-use' as EditorPage, label: 'Terms of Use' },
    ],
  },
  {
    groupLabel: 'Shared Elements',
    pages: [
      { value: 'navbar' as EditorPage, label: 'Navigation Bar' },
      { value: 'footer' as EditorPage, label: 'Footer' },
    ],
  },
];

// Font options
const FONT_OPTIONS = [
  'Inter',
  'Roboto',
  'Playfair Display',
  'Merriweather',
  'Space Grotesk',
  'Sora',
  'DM Sans',
  'Lora',
  'Fira Code',
  'Poppins',
  'Raleway',
  'Oswald',
];

// Font weight options
const FONT_WEIGHT_OPTIONS = [300, 400, 500, 600, 700, 800];

// Theme presets
const PRESET_THEMES = [
  {
    name: 'Dark',
    colors: {
      backgroundColor: '#0A0A0A',
      textPrimary: '#F5F0E8',
      textSecondary: '#A09880',
      accentColor: '#B8962E',
      cardBackground: '#0A0A0A',
      cardBorder: '#2A2A2A',
      buttonBackground: '#B8962E',
      buttonText: '#0A0A0A',
    },
  },
  {
    name: 'Light',
    colors: {
      backgroundColor: '#ffffff',
      textPrimary: '#111111',
      textSecondary: '#555555',
      accentColor: '#6366f1',
      cardBackground: '#f9f9f9',
      cardBorder: '#e5e5e5',
      buttonBackground: '#6366f1',
      buttonText: '#ffffff',
    },
  },
];

// Color fields
const COLOR_FIELDS = [
  { key: 'backgroundColor', label: 'Background Color' },
  { key: 'textPrimary', label: 'Primary Text' },
  { key: 'textSecondary', label: 'Secondary Text' },
  { key: 'accentColor', label: 'Accent Color' },
  { key: 'cardBackground', label: 'Card Background' },
  { key: 'cardBorder', label: 'Card Border' },
  { key: 'buttonBackground', label: 'Button Background' },
  { key: 'buttonText', label: 'Button Text' },
];

interface ImageThumbnailProps {
  image: {
    id: string;
    src: string;
    defaultSrc: string;
    alt: string;
    page: EditorPage | 'shared';
    section: string;
    label: string;
  };
  showPageBadge: boolean;
  isBroken: boolean;
  onImageError: () => void;
  onImageLoad: () => void;
  onUpdate: (src: string) => void;
  onResetToDefault: () => void;
}

function ImageThumbnail({
  image,
  showPageBadge,
  isBroken,
  onImageError,
  onImageLoad,
  onUpdate,
  onResetToDefault,
}: ImageThumbnailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempSrc, setTempSrc] = useState(image.src);

  // Get page display name
  const getPageName = () => {
    for (const group of PAGE_OPTIONS) {
      const page = group.pages.find(p => p.value === image.page);
      if (page) return page.label;
    }
    return image.page === 'shared' ? 'Shared' : String(image.page);
  };

  return (
    <div className="group relative rounded-md border border-border overflow-hidden bg-background">
      {/* Image preview / placeholder */}
      <div className="h-[80px] relative">
        {isBroken || !image.src ? (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <ImageOff className="h-8 w-8 text-muted-foreground opacity-50" />
            <Badge
              variant="destructive"
              className="absolute top-1 right-1 text-[10px]"
            >
              Missing
            </Badge>
          </div>
        ) : (
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            onError={onImageError}
            onLoad={onImageLoad}
          />
        )}

        {/* Hover replace button */}
        <Button
          size="sm"
          variant="secondary"
          className="absolute inset-0 m-auto w-[70%] h-[32px] opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => {
            setTempSrc(image.src);
            setIsEditing(true);
          }}
        >
          Replace
        </Button>
      </div>

      {/* Label */}
      <div className="p-2 space-y-1">
        {showPageBadge && (
          <Badge variant="outline" className="text-[10px]">
            {getPageName()}
          </Badge>
        )}
        <p className="text-xs truncate font-medium">{image.label}</p>
      </div>

      {/* Edit dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Label>Image URL</Label>
            <Input
              value={tempSrc}
              onChange={(e) => setTempSrc(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={onResetToDefault}>
              Reset to Default
            </Button>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button onClick={() => {
              onUpdate(tempSrc);
              setIsEditing(false);
            }}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SiteEditorContent() {
  const {
    state,
    isSaving,
    hasUnsavedChanges,
    updateText,
    updateImage,
    updateSection,
    updateTheme,
    updateTypography,
    resetToDefault,
    setCurrentPage,
    setSelectedSection,
    reorderSections,
    resetPageImages,
    resetAllImages,
    resetPageTexts,
    saveToSupabase,
    undo,
    redo,
  } = useLiveEditor();
  const { toast } = useToast();
  
  const [openAccordion, setOpenAccordion] = useState('');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [imageFilter, setImageFilter] = useState<'current' | 'all'>('current');
  const [imageSearch, setImageSearch] = useState('');
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') {
          e.preventDefault();
          saveToSupabase().then(() => toast({ title: 'Saved!' }));
        } else if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          undo();
        } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
          e.preventDefault();
          redo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveToSupabase, undo, redo, toast]);
  
  // All Text panel state
  const [textSearch, setTextSearch] = useState('');
  const [textPage, setTextPage] = useState<EditorPage | 'shared'>(state.currentPage);
  const [flashingTextId, setFlashingTextId] = useState<string | null>(null);

  // Get sections for current page
  const currentSections = useMemo(() => {
    let page: EditorPage | 'shared';
    if (state.currentPage === 'navbar' || state.currentPage === 'footer') {
      page = 'shared';
    } else {
      page = state.currentPage;
    }
    
    return Object.values(state.sections)
      .filter(s => s.page === page)
      .sort((a, b) => a.order - b.order);
  }, [state.sections, state.currentPage]);

  // Get texts for current page/section
  const currentTexts = useMemo(() => {
    let page: EditorPage | 'shared';
    if (state.currentPage === 'navbar' || state.currentPage === 'footer') {
      page = 'shared';
    } else {
      page = state.currentPage;
    }

    return Object.values(state.texts).filter((t) => t.page === page);
  }, [state.texts, state.currentPage]);

  // Get images for current page/section
  const currentImages = useMemo(() => {
    let page: EditorPage | 'shared';
    if (state.currentPage === 'navbar' || state.currentPage === 'footer') {
      page = 'shared';
    } else {
      page = state.currentPage;
    }
    
    return Object.values(state.images).filter((i) => i.page === page);
  }, [state.images, state.currentPage]);

  // Handle export
  const handleExport = () => {
    setShowExportModal(true);
  };

  // Handle import
  const handleImport = () => {
    setImportError('');
    try {
      const imported = JSON.parse(importText);
      // In a real app, we'd validate the imported data
      // For now, we'll just show a success toast
      toast({
        title: 'Import Success',
        description: 'Config imported successfully (placeholder)',
      });
      setShowImportModal(false);
      setImportText('');
    } catch (error) {
        setImportError('Invalid JSON format');
    }
  };

  // Get page label for breadcrumb
  const getPageLabel = () => {
    for (const group of PAGE_OPTIONS) {
      const page = group.pages.find((p) => p.value === state.currentPage);
      if (page) return page.label;
    }
    return 'Home';
  };

  // Get section label for breadcrumb
  const getSectionLabel = () => {
    if (!state.selectedSection) return null;
    const section = state.sections[state.selectedSection];
    return section?.label || null;
  };

  // Get selected section
  const selectedSection = state.selectedSection ? state.sections[state.selectedSection] : null;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left panel - Controls */}
      <div className="w-[380px] overflow-y-auto border-r border-border bg-background flex flex-col">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Site Editor</h2>
            <Badge variant="secondary" className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Live Preview
            </Badge>
          </div>

          {/* Page Selector */}
          <div className="space-y-1">
            <Label htmlFor="page-select">Current Page</Label>
            <Select
              value={state.currentPage}
              onValueChange={(value: EditorPage) => setCurrentPage(value)}
            >
              <SelectTrigger id="page-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_OPTIONS.map((group) => (
                  <div key={group.groupLabel}>
                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                      {group.groupLabel}
                    </div>
                    {group.pages.map((page) => (
                      <SelectItem key={page.value} value={page.value}>
                        {page.label}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground">
            Editing:{' '}
            <span className="font-medium text-foreground">{getPageLabel()}</span>
            {getSectionLabel() && (
              <>
                {' '}
                &gt;{' '}
                <span className="font-medium text-foreground">
                  {getSectionLabel()}
                </span>
              </>
            )}
          </div>

          {/* Unsaved changes indicator */}
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <div className="flex items-center gap-1 text-sm text-orange-500">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Unsaved changes
              </div>
            )}
          </div>
          {/* Action buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={async () => {
                await saveToSupabase();
                toast({ title: 'Saved!', description: 'Your changes have been saved to Supabase' });
              }}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button size="sm" variant="secondary" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setShowImportModal(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset all editor settings to default. Are you sure?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={resetToDefault}>
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Accordion sections */}
        <div className="flex-1 p-4">
          <Accordion
            type="single"
            value={openAccordion}
            onValueChange={(value) => setOpenAccordion(value)}
            collapsible
          >
            {/* Layout & Sections */}
            <AccordionItem value="sections">
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📐</span>
                  <span className="font-medium">Layout & Sections</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {/* Section count */}
                <div className="text-sm text-muted-foreground">
                  {currentSections.length} sections — {currentSections.filter(s => !s.visible).length} hidden
                </div>
                
                {/* Sections list with drag and drop */}
                <Reorder.Group
                  axis="y"
                  values={currentSections}
                  onReorder={(newOrder) => reorderSections(newOrder.map(s => s.id))}
                  className="space-y-2"
                >
                  {currentSections.map((section) => (
                    <Reorder.Item key={section.id} value={section}>
                      <div
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-grab active:cursor-grabbing ${
                          state.selectedSection === section.id
                            ? 'border-accent bg-accent/10'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{section.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() =>
                              updateSection(section.id, { visible: !section.visible })
                            }
                          >
                            {section.visible ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => setSelectedSection(
                              state.selectedSection === section.id ? null : section.id
                            )}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </AccordionContent>
            </AccordionItem>

            {/* Section Properties */}
            {selectedSection && (
              <AccordionItem value="section-props">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    <span className="font-medium">{selectedSection.label} Properties</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  {/* Section visibility toggle */}
                  <div className="flex items-center justify-between">
                    <Label>Visible</Label>
                    <Switch
                      checked={selectedSection.visible}
                      onCheckedChange={(checked) =>
                        updateSection(selectedSection.id, { visible: checked })
                      }
                    />
                  </div>

                  {/* Section background color */}
                  <div className="space-y-2">
                    <Label>Background Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="relative w-10 h-10">
                        <input
                          type="color"
                          value={selectedSection.bgColor}
                          onChange={(e) =>
                            updateSection(selectedSection.id, { bgColor: e.target.value })
                          }
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div
                          className="w-10 h-10 rounded-lg border border-border shadow-sm"
                          style={{ backgroundColor: selectedSection.bgColor }}
                        />
                      </div>
                      <Input
                        type="text"
                        value={selectedSection.bgColor}
                        onChange={(e) =>
                          updateSection(selectedSection.id, { bgColor: e.target.value })
                        }
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Padding top */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Padding Top</Label>
                      <span className="text-sm text-muted-foreground">{selectedSection.paddingTop}px</span>
                    </div>
                    <Slider
                      value={[selectedSection.paddingTop]}
                      onValueChange={(val) =>
                        updateSection(selectedSection.id, { paddingTop: val[0] })
                      }
                      min={0}
                      max={200}
                      step={4}
                    />
                  </div>

                  {/* Padding bottom */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Padding Bottom</Label>
                      <span className="text-sm text-muted-foreground">{selectedSection.paddingBottom}px</span>
                    </div>
                    <Slider
                      value={[selectedSection.paddingBottom]}
                      onValueChange={(val) =>
                        updateSection(selectedSection.id, { paddingBottom: val[0] })
                      }
                      min={0}
                      max={200}
                      step={4}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Text Content */}
            <AccordionItem value="text">
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✏️</span>
                  <span className="font-medium">Text Content</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {currentTexts.map((text) => (
                  <div key={text.id} className="space-y-2">
                    <Label className="text-sm font-semibold">{text.label}</Label>
                    {text.type === 'paragraph' ||
                    text.type === 'subheading' ? (
                      <Textarea
                        value={text.value}
                        onChange={(e) => updateText(text.id, e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <Input
                        value={text.value}
                        onChange={(e) => updateText(text.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Images */}
            <AccordionItem value="images">
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🖼️</span>
                  <span className="font-medium">Images</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {/* Search input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search images..."
                    value={imageSearch}
                    onChange={(e) => setImageSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Segmented control */}
                <div className="flex bg-muted p-1 rounded-md">
                  <Button
                    variant={imageFilter === 'current' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setImageFilter('current')}
                    className="flex-1"
                  >
                    Current Page
                  </Button>
                  <Button
                    variant={imageFilter === 'all' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setImageFilter('all')}
                    className="flex-1"
                  >
                    All Pages
                  </Button>
                </div>

                {/* Images grid */}
                <div className="space-y-4">
                  {(() => {
                    // First get all images
                    let imagesToShow = Object.values(state.images);
                    
                    // Filter by current page if needed
                    if (imageFilter === 'current') {
                      let page: EditorPage | 'shared';
                      if (state.currentPage === 'navbar' || state.currentPage === 'footer') {
                        page = 'shared';
                      } else {
                        page = state.currentPage;
                      }
                      imagesToShow = imagesToShow.filter(i => i.page === page);
                    }

                    // Filter by search term
                    if (imageSearch) {
                      const searchLower = imageSearch.toLowerCase();
                      imagesToShow = imagesToShow.filter(i => 
                        i.label.toLowerCase().includes(searchLower)
                      );
                    }

                    // If all pages, group them by page
                    if (imageFilter === 'all') {
                      // First group images by page
                      const grouped = new Map<EditorPage | 'shared', typeof imagesToShow>();
                      
                      for (const img of imagesToShow) {
                        if (!grouped.has(img.page)) {
                          grouped.set(img.page, []);
                        }
                        grouped.get(img.page)!.push(img);
                      }

                      // Get page display names
                      const pageNameMap = new Map<EditorPage | 'shared', string>();
                      for (const group of PAGE_OPTIONS) {
                        for (const page of group.pages) {
                          pageNameMap.set(page.value, page.label);
                        }
                      }
                      pageNameMap.set('shared', 'Shared');

                      // Render groups
                      return Array.from(grouped.entries()).map(([page, imgs]) => {
                        // Skip if no images for this page
                        if (imgs.length === 0) return null;
                        
                        return (
                          <div key={page} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-tight">
                                {pageNameMap.get(page) || page}
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {imgs.length} {imgs.length === 1 ? 'image' : 'images'}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {imgs.map((image) => (
                                <ImageThumbnail
                                  key={image.id}
                                  image={image}
                                  showPageBadge
                                  isBroken={brokenImages.has(image.id)}
                                  onImageError={() => {
                                    setBrokenImages(prev => new Set([...prev, image.id]));
                                  }}
                                  onImageLoad={() => {
                                    setBrokenImages(prev => {
                                      const newSet = new Set(prev);
                                      newSet.delete(image.id);
                                      return newSet;
                                    });
                                  }}
                                  onUpdate={(src) => updateImage(image.id, src)}
                                  onResetToDefault={() => updateImage(image.id, image.defaultSrc)}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      });
                    } else {
                      // Current page mode - just show grid
                      return (
                        <div className="grid grid-cols-2 gap-2">
                          {imagesToShow.map((image) => (
                            <ImageThumbnail
                              key={image.id}
                              image={image}
                              showPageBadge={false}
                              isBroken={brokenImages.has(image.id)}
                              onImageError={() => {
                                setBrokenImages(prev => new Set([...prev, image.id]));
                              }}
                              onImageLoad={() => {
                                setBrokenImages(prev => {
                                  const newSet = new Set(prev);
                                  newSet.delete(image.id);
                                  return newSet;
                                });
                              }}
                              onUpdate={(src) => updateImage(image.id, src)}
                              onResetToDefault={() => updateImage(image.id, image.defaultSrc)}
                            />
                          ))}
                        </div>
                      );
                    }
                  })()}
                </div>

                {/* Bulk actions */}
                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-auto py-1 text-xs">
                        Reset all images on this page to defaults
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reset Page Images?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will reset all images on the current page to their original defaults.
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            let page: EditorPage | 'shared';
                            if (state.currentPage === 'navbar' || state.currentPage === 'footer') {
                              page = 'shared';
                            } else {
                              page = state.currentPage;
                            }
                            resetPageImages(page);
                          }}
                        >
                          Reset
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-auto py-1 text-xs text-destructive">
                        Reset all images site-wide to defaults
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reset All Images?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will reset every image on every page to their original defaults.
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={resetAllImages}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Reset Everything
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* All Text */}
            <AccordionItem value="text-all">
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📝</span>
                  <span className="font-medium">All Text</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {/* Search input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search text items..."
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Page switcher tabs */}
                <Tabs 
                  value={textPage} 
                  onValueChange={(val) => {
                    if (val === 'shared') {
                      setTextPage('shared');
                    } else {
                      // Check if it's a valid EditorPage
                      setTextPage(val as EditorPage);
                    }
                  }}
                >
                  <div className="overflow-x-auto">
                    <TabsList className="h-auto flex-wrap justify-start min-w-max">
                      {/* Public pages */}
                      {PAGE_OPTIONS[0].pages.map(page => (
                        <TabsTrigger key={page.value} value={page.value} className="text-xs h-8">
                          {page.label}
                        </TabsTrigger>
                      ))}
                      {/* Shared */}
                      <TabsTrigger value="shared" className="text-xs h-8">
                        Shared
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Text content */}
                  <TabsContent value={textPage} className="space-y-4 pt-4">
                    {/* Group texts by section */}
                    {(() => {
                      // Get all texts for this page
                      let textsToShow = Object.values(state.texts);
                      
                      // If textPage is shared, show navbar and footer texts
                      if (textPage === 'shared') {
                        textsToShow = textsToShow.filter(t => t.page === 'shared');
                      } else {
                        textsToShow = textsToShow.filter(t => t.page === textPage);
                      }

                      // Filter by search
                      if (textSearch) {
                        const searchLower = textSearch.toLowerCase();
                        textsToShow = textsToShow.filter(t => 
                          t.label.toLowerCase().includes(searchLower)
                        );
                      }

                      // Group by section
                      const grouped = new Map<string, typeof textsToShow>();
                      for (const text of textsToShow) {
                        if (!grouped.has(text.section)) {
                          grouped.set(text.section, []);
                        }
                        grouped.get(text.section)!.push(text);
                      }

                      // Get section labels for display
                      const getSectionLabel = (sectionId: string) => {
                        const section = Object.values(state.sections).find(s => s.id === sectionId);
                        if (section) return section.label;
                        // Fallback
                        return sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace(/-/g, ' ') + ' Section';
                      };

                      // Render groups
                      return Array.from(grouped.entries()).map(([sectionId, texts]) => (
                        <div key={sectionId} className="space-y-2">
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-tight">
                            {getSectionLabel(sectionId)}
                          </h4>
                          <div className="space-y-3">
                            {texts.map(text => (
                              <div 
                                key={text.id} 
                                className={`space-y-1 border rounded-md p-3 ${flashingTextId === text.id ? 'animate-pulse bg-yellow-50 border-yellow-300' : ''}`}
                              >
                                <div className="flex items-center justify-between">
                                  <Label className="text-xs font-medium">{text.label}</Label>
                                  <button
                                    className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-accent"
                                    onClick={() => {
                                      setFlashingTextId(text.id);
                                      setTimeout(() => setFlashingTextId(null), 1000);
                                      // Scroll to preview (we can implement actual scrolling later, for now just flash)
                                    }}
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    Find in preview
                                  </button>
                                </div>
                                {text.type === 'paragraph' || text.type === 'subheading' ? (
                                  <Textarea
                                    value={text.value}
                                    onChange={(e) => updateText(text.id, e.target.value)}
                                    rows={3}
                                    className="resize-none text-sm"
                                  />
                                ) : (
                                  <Input
                                    value={text.value}
                                    onChange={(e) => updateText(text.id, e.target.value)}
                                    className="text-sm"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ));
                    })()}
                  </TabsContent>
                </Tabs>

                {/* Reset link */}
                <div className="pt-2 border-t border-border">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-auto py-1 text-xs">
                        Reset page text to defaults
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reset Page Text?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will reset all text on this page to their original defaults.
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => resetPageTexts(textPage)}
                        >
                          Reset
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Theme & Colors */}
            <AccordionItem value="theme">
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎨</span>
                  <span className="font-medium">Theme & Colors</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6">
                {/* Theme Presets */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block">
                    Theme Presets
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_THEMES.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => updateTheme(preset.colors)}
                        className="text-left p-3 rounded-lg border border-border hover:border-accent transition-colors bg-background"
                      >
                        <div className="text-sm font-medium mb-2">
                          {preset.name}
                        </div>
                        <div className="flex gap-1">
                          <div
                            className="w-4 h-4 rounded-full border border-border"
                            style={{
                              backgroundColor: preset.colors.backgroundColor,
                            }}
                          />
                          <div
                            className="w-4 h-4 rounded-full border border-border"
                            style={{
                              backgroundColor: preset.colors.textPrimary,
                            }}
                          />
                          <div
                            className="w-4 h-4 rounded-full border border-border"
                            style={{
                              backgroundColor: preset.colors.accentColor,
                            }}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Manual Color Overrides */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block">
                    Manual Color Overrides
                  </Label>
                  <div className="space-y-3">
                    {COLOR_FIELDS.map((field) => (
                      <div
                        key={field.key as keyof typeof state.theme}
                        className="flex items-center gap-3"
                      >
                        <Label className="flex-1 text-sm">{field.label}</Label>
                        <div className="flex items-center gap-2">
                          <div className="relative w-10 h-10">
                            <input
                              type="color"
                              value={
                                state.theme[field.key as keyof typeof state.theme]
                              }
                              onChange={(e) =>
                                updateTheme({
                                  [field.key]: e.target.value,
                                })
                              }
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div
                              className="w-10 h-10 rounded-lg border border-border shadow-sm"
                              style={{
                                backgroundColor:
                                  state.theme[field.key as keyof typeof state.theme],
                              }}
                            />
                          </div>
                          <Input
                            type="text"
                            value={
                              state.theme[field.key as keyof typeof state.theme]
                            }
                            onChange={(e) =>
                              updateTheme({ [field.key]: e.target.value })
                            }
                            className="w-24 font-mono text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Border Radius */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block">
                    Border Radius: {state.theme.borderRadius}px
                  </Label>
                  <Slider
                    value={[state.theme.borderRadius]}
                    onValueChange={(val) =>
                      updateTheme({ borderRadius: val[0] })
                    }
                    max={24}
                    step={1}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Typography */}
            <AccordionItem value="typography">
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔤</span>
                  <span className="font-medium">Typography</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6">
                {/* Font Families */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold">Font Families</Label>

                  {/* Heading Font */}
                  <div className="space-y-2">
                    <Label className="text-sm">Heading Font</Label>
                    <Select
                      value={state.typography.headingFont}
                      onValueChange={(value) =>
                        updateTypography({ headingFont: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_OPTIONS.map((font) => (
                          <SelectItem key={font} value={font}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Body Font */}
                  <div className="space-y-2">
                    <Label className="text-sm">Body Font</Label>
                    <Select
                      value={state.typography.bodyFont}
                      onValueChange={(value) =>
                        updateTypography({ bodyFont: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_OPTIONS.map((font) => (
                          <SelectItem key={font} value={font}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* UI Font */}
                  <div className="space-y-2">
                    <Label className="text-sm">UI Font</Label>
                    <Select
                      value={state.typography.uiFont}
                      onValueChange={(value) =>
                        updateTypography({ uiFont: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_OPTIONS.map((font) => (
                          <SelectItem key={font} value={font}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Line Height */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm font-semibold">
                      Line Height
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {state.typography.lineHeight.toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={[state.typography.lineHeight]}
                    onValueChange={(val) =>
                      updateTypography({ lineHeight: val[0] })
                    }
                    min={1.0}
                    max={2.5}
                    step={0.1}
                  />
                </div>

                <Separator />

                {/* Letter Spacing */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm font-semibold">
                      Letter Spacing
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {state.typography.letterSpacing}px
                    </span>
                  </div>
                  <Slider
                    value={[state.typography.letterSpacing]}
                    onValueChange={(val) =>
                      updateTypography({ letterSpacing: val[0] })
                    }
                    min={-1}
                    max={8}
                    step={0.5}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Right panel - Preview */}
      <div className="flex-1 bg-muted overflow-hidden flex flex-col">
        {/* Preview toolbar */}
        <div className="flex items-center justify-between p-3 border-b border-border bg-background">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Preview</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={viewport === 'desktop' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewport('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={viewport === 'tablet' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewport('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={viewport === 'mobile' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewport('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Preview container */}
        <div className="flex-1 overflow-auto p-4 flex justify-center items-start">
          <div
            className={`bg-white shadow-lg rounded-lg overflow-hidden ${
              viewport === 'desktop' ? 'w-full max-w-6xl' :
              viewport === 'tablet' ? 'w-[768px]' : 'w-[375px]'
            }`}
          >
            <PreviewRouter currentPage={state.currentPage} />
          </div>
        </div>
      </div>

      {/* Export Dialog */}
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Configuration</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Textarea
              value={JSON.stringify(state, null, 2)}
              readOnly
              rows={10}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(state, null, 2))
              }
            >
              Copy to Clipboard
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Configuration</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            <Textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste your configuration JSON here"
              rows={10}
            />
            {importError && (
              <p className="text-destructive text-sm">{importError}</p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleImport}>Import</Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}

export default function SiteEditor() {
  return (
    <LiveEditorProvider>
      <SiteEditorContent />
    </LiveEditorProvider>
  );
}
