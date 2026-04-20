import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Pencil,
  Trash2,
  RotateCcw,
  Upload,
  RefreshCw,
  ImageIcon,
  Check,
  X,
  Link as LinkIcon,
} from 'lucide-react';
import type { SiteImages } from '@/lib/siteImages';
import { IMAGE_DEFINITIONS, defaultImages } from '@/lib/siteImages';
import { getSiteImages, updateSiteImages, uploadImageToStorage } from '@/lib/supabaseImages';
import { useSiteImages } from '@/context/SiteImagesContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

// ─── Replace dialog ───────────────────────────────────────────────────────────

interface ReplaceDialogProps {
  open: boolean;
  label: string;
  currentUrl: string;
  isSaving: boolean;
  onClose: () => void;
  onApply: (url: string) => void;
}

const ReplaceDialog = ({
  open,
  label,
  currentUrl,
  isSaving,
  onClose,
  onApply,
}: ReplaceDialogProps) => {
  const [urlInput, setUrlInput] = useState(currentUrl);
  const [preview, setPreview] = useState(currentUrl);
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setUrlInput(currentUrl);
      setPreview(currentUrl);
      setUploadError('');
    }
  }, [open, currentUrl]);

  const handleUrlApply = () => {
    if (!urlInput.trim()) {
      toast.error('Please enter a URL');
      return;
    }
    onApply(urlInput.trim());
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError('');
    setIsUploading(true);
    const url = await uploadImageToStorage(file, label.toLowerCase().replace(/\s+/g, '_'));
    setIsUploading(false);
    if (url) {
      setUrlInput(url);
      setPreview(url);
      toast.success('File uploaded — click Apply to save.');
    } else {
      setUploadError(
        'Upload failed. The "site-images" bucket may not exist in Supabase Storage. You can paste an external URL instead.'
      );
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Dialog open={open} onOpenChange={val => !val && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Replace — {label}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="url">
          <TabsList className="w-full">
            <TabsTrigger value="url" className="flex-1">
              <LinkIcon className="h-3.5 w-3.5 mr-1.5" />
              Paste URL
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex-1">
              <Upload className="h-3.5 w-3.5 mr-1.5" />
              Upload File
            </TabsTrigger>
          </TabsList>

          {/* URL tab */}
          <TabsContent value="url" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label>Image URL</Label>
              <Input
                value={urlInput}
                onChange={e => {
                  setUrlInput(e.target.value);
                  setPreview(e.target.value);
                }}
                placeholder="https://example.com/image.jpg"
                autoFocus
                onKeyDown={e => e.key === 'Enter' && handleUrlApply()}
              />
            </div>
            {preview && (
              <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden border">
                <img
                  key={preview}
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </TabsContent>

          {/* Upload tab */}
          <TabsContent value="upload" className="mt-4 space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div
              className="w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploading ? (
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Uploading…
                </span>
              ) : preview && preview !== currentUrl ? (
                <img
                  src={preview}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center px-4">
                    Click to select an image from your device
                  </p>
                  <p className="text-xs text-muted-foreground">JPG, PNG, WebP, GIF, SVG</p>
                </>
              )}
            </div>
            {uploadError && (
              <p className="text-xs text-destructive">{uploadError}</p>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-1.5" />
            Cancel
          </Button>
          <Button onClick={handleUrlApply} disabled={isSaving || isUploading || !urlInput.trim()}>
            {isSaving ? (
              <RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />
            ) : (
              <Check className="h-4 w-4 mr-1.5" />
            )}
            Apply Change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const ImageManager = () => {
  const { refreshImages } = useSiteImages();
  const [images, setImages] = useState<SiteImages>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<keyof SiteImages | null>(null);

  // Replace dialog state
  const [replaceTarget, setReplaceTarget] = useState<{
    key: keyof SiteImages;
    label: string;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await getSiteImages();
      setImages(data);
      setIsLoading(false);
    };
    load();
  }, []);

  // Save a single image immediately
  const saveOne = async (key: keyof SiteImages, url: string) => {
    setSavingKey(key);
    const updated = { ...images, [key]: url };
    setImages(updated);
    const success = await updateSiteImages(updated);
    setSavingKey(null);
    if (success) {
      await refreshImages();
      toast.success('Image updated successfully.');
    } else {
      toast.error('Failed to save. Change is stored locally.');
    }
    setReplaceTarget(null);
  };

  // Delete = clear the image URL (empty → shows no image / placeholder)
  const deleteOne = async (key: keyof SiteImages) => {
    await saveOne(key, '');
    toast.success('Image removed.');
  };

  // Reset one key back to its shipped default
  const resetOne = async (key: keyof SiteImages) => {
    await saveOne(key, defaultImages[key]);
    toast.success('Image reset to default.');
  };

  const pages = [...new Set(IMAGE_DEFINITIONS.map(d => d.page))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
        Loading images…
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Image Manager</h1>
        <p className="text-muted-foreground mt-1">
          Click <strong>Replace</strong> on any image to swap it. Click <strong>Delete</strong> to
          remove it. Changes save immediately.
        </p>
      </div>

      {/* Image groups */}
      {pages.map(page => (
        <section key={page} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold">{page}</h2>
            <Badge variant="secondary">
              {IMAGE_DEFINITIONS.filter(d => d.page === page).length} images
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {IMAGE_DEFINITIONS.filter(d => d.page === page).map(def => {
              const currentUrl = images[def.key];
              const isDefault = currentUrl === defaultImages[def.key];
              const isSavingThis = savingKey === def.key;
              const isEmpty = !currentUrl;

              return (
                <Card
                  key={def.key}
                  className={!isDefault ? 'ring-2 ring-primary/30' : ''}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm font-semibold leading-tight">
                        {def.label}
                      </CardTitle>
                      {!isDefault && !isEmpty && (
                        <Badge variant="outline" className="text-xs shrink-0 text-primary border-primary/40">
                          Modified
                        </Badge>
                      )}
                      {isEmpty && (
                        <Badge variant="outline" className="text-xs shrink-0 text-destructive border-destructive/40">
                          Deleted
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{def.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Thumbnail */}
                    <div className="relative w-full h-36 bg-gray-100 rounded-md overflow-hidden border">
                      {isSavingThis && (
                        <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                          <RefreshCw className="h-5 w-5 text-white animate-spin" />
                        </div>
                      )}
                      {currentUrl ? (
                        <img
                          src={currentUrl}
                          alt={def.label}
                          className="w-full h-full object-cover"
                          onError={e => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                          <ImageIcon className="h-8 w-8" />
                          <span className="text-xs">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Current URL (read-only, for reference) */}
                    {currentUrl && (
                      <p
                        className="text-xs text-muted-foreground truncate"
                        title={currentUrl}
                      >
                        {currentUrl}
                      </p>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      {/* Replace */}
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          setReplaceTarget({ key: def.key, label: def.label })
                        }
                        disabled={isSavingThis}
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1.5" />
                        Replace
                      </Button>

                      {/* Delete */}
                      {currentUrl && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                              disabled={isSavingThis}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete this image?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove <strong>{def.label}</strong> from the site. The slot will
                                show empty until you replace it.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive hover:bg-destructive/90"
                                onClick={() => deleteOne(def.key)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}

                      {/* Reset to default (only when modified) */}
                      {!isDefault && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-muted-foreground"
                              disabled={isSavingThis}
                              title="Reset to default"
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Reset to default?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will restore <strong>{def.label}</strong> back to its original
                                shipped image.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => resetOne(def.key)}>
                                Reset
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ))}

      {/* Replace dialog */}
      {replaceTarget && (
        <ReplaceDialog
          open
          label={replaceTarget.label}
          currentUrl={images[replaceTarget.key]}
          isSaving={savingKey === replaceTarget.key}
          onClose={() => setReplaceTarget(null)}
          onApply={url => saveOne(replaceTarget.key, url)}
        />
      )}
    </div>
  );
};

export default ImageManager;
