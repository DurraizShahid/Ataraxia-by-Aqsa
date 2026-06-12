import { useState, useEffect } from 'react';
import { getJournals, createJournal, updateJournal, deleteJournal, Journal, getOrders } from '@/lib/supabaseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const AdminJournals = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState<Journal | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [journalsData, ordersData] = await Promise.all([
      getJournals(),
      getOrders(),
    ]);
    setJournals(journalsData);
    setOrders(ordersData);
    setIsLoading(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    featuredImage: '',
    price: '',
    regularPrice: '',
    salePrice: '',
    onSale: false,
    tags: '',
    features: '',
    pageCount: '',
    format: 'Digital',
    isBundle: false,
    includedJournalIds: [] as string[],
  });

  const [errors, setErrors] = useState<{
    salePrice?: string;
  }>({});

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      shortDescription: '',
      featuredImage: '',
      price: '',
      regularPrice: '',
      salePrice: '',
      onSale: false,
      tags: '',
      features: '',
      pageCount: '',
      format: 'Digital',
      isBundle: false,
      includedJournalIds: [],
    });
    setEditingJournal(null);
    setErrors({});
  };

  const handleOpenDialog = (journal?: Journal) => {
    if (journal) {
      setEditingJournal(journal);
      setFormData({
        name: journal.name,
        slug: journal.slug,
        description: journal.description,
        shortDescription: journal.shortDescription,
        featuredImage: journal.featuredImage,
        price: journal.price.toString(),
        regularPrice: journal.regularPrice.toString(),
        salePrice: journal.salePrice?.toString() || '',
        onSale: journal.onSale,
        tags: journal.tags.join(', '),
        features: journal.features.join('\n'),
        pageCount: journal.pageCount.toString(),
        format: journal.format,
        isBundle: journal.isBundle,
        includedJournalIds: journal.includedJournalIds,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const validateForm = () => {
    const newErrors: { salePrice?: string } = {};
    const regularPrice = parseFloat(formData.regularPrice);
    const salePrice = formData.salePrice ? parseFloat(formData.salePrice) : undefined;

    if (formData.onSale) {
      if (!formData.salePrice) {
        newErrors.salePrice = 'Sale price is required when on sale';
      } else if (salePrice && regularPrice && salePrice >= regularPrice) {
        newErrors.salePrice = 'Sale price must be less than regular price';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const regularPrice = parseFloat(formData.regularPrice);
    const salePrice = formData.salePrice ? parseFloat(formData.salePrice) : undefined;
    const price = formData.onSale && salePrice ? salePrice : regularPrice;

    const journalData = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description,
      shortDescription: formData.shortDescription,
      featuredImage: formData.featuredImage || '/placeholder.svg',
      price,
      regularPrice,
      salePrice,
      onSale: formData.onSale,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      features: formData.features.split('\n').map(item => item.trim()).filter(Boolean),
      pageCount: parseInt(formData.pageCount),
      format: formData.format,
      isBundle: formData.isBundle,
      isDeleted: false,
      includedJournalIds: formData.includedJournalIds,
    };

    try {
      if (editingJournal) {
        await updateJournal(editingJournal.id, journalData);
        toast({
          title: 'Success',
          description: 'Journal updated successfully',
        });
      } else {
        await createJournal(journalData);
        toast({
          title: 'Success',
          description: 'Journal created successfully',
        });
      }

      await fetchData();
      handleCloseDialog();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save journal',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const ordersWithJournal = orders.filter(order =>
      order.items.some((item: any) => item.id === id)
    );

    const confirmMessage = ordersWithJournal.length > 0
      ? `This journal is in ${ordersWithJournal.length} existing orders. Deleting it will not affect those orders, but the journal will be removed from the catalog. Are you sure you want to delete "${name}"?`
      : `Are you sure you want to delete "${name}"?`;

    if (window.confirm(confirmMessage)) {
      const success = await deleteJournal(id);
      if (success) {
        await fetchData();
        toast({
          title: 'Success',
          description: 'Journal deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete journal',
          variant: 'destructive',
        });
      }
    }
  };

  const filteredJournals = journals.filter(journal =>
    journal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    journal.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    journal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const availableJournalsForBundle = journals.filter(j =>
    !editingJournal || j.id !== editingJournal.id
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Journals</h1>
          <p className="text-muted-foreground mt-1">Manage your healing journals</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add New Journal
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search journals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Journals List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading journals...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredJournals.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No journals found</p>
            </CardContent>
          </Card>
        ) : (
          filteredJournals.map((journal) => (
            <Card key={journal.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{journal.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{journal.shortDescription}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                      <span>💰 {formatCurrency(journal.price)}</span>
                      <span>📄 {journal.pageCount} pages</span>
                      <span>📋 {journal.format}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {journal.isBundle && (
                        <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                          Bundle
                        </span>
                      )}
                      {journal.onSale && (
                        <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                          On Sale
                        </span>
                      )}
                      {journal.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenDialog(journal)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(journal.id, journal.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingJournal ? 'Edit Journal' : 'Add New Journal'}</DialogTitle>
            <DialogDescription>
              {editingJournal ? 'Update the journal details' : 'Create a new journal'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (optional)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated-slug"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description (HTML) *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                required
                placeholder="<p>Your description here...</p>"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input
                id="featuredImage"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                placeholder="/placeholder.svg"
              />
            </div>

            {/* Price Section */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-4">Pricing</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="regularPrice">Regular Price *</Label>
                  <Input
                    id="regularPrice"
                    type="number"
                    step="0.01"
                    value={formData.regularPrice}
                    onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="onSale"
                    checked={formData.onSale}
                    onCheckedChange={(checked) => setFormData({ ...formData, onSale: checked as boolean })}
                  />
                  <Label htmlFor="onSale">On Sale</Label>
                </div>
              </div>

              {formData.onSale && (
                <div className="space-y-2 mb-4">
                  <Label htmlFor="salePrice">Sale Price *</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    step="0.01"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    className={errors.salePrice ? 'border-red-500' : ''}
                  />
                  {errors.salePrice && (
                    <p className="text-red-500 text-sm">{errors.salePrice}</p>
                  )}
                </div>
              )}

              {/* Live Preview */}
              <div className="p-3 bg-muted rounded-lg">
                <Label className="text-sm text-muted-foreground">Price Preview</Label>
                <div className="text-2xl font-bold mt-1">
                  {formData.onSale && parseFloat(formData.salePrice) ? (
                    <div className="flex items-center gap-2">
                      <span className="line-through text-muted-foreground">
                        {formatCurrency(parseFloat(formData.regularPrice))}
                      </span>
                      <span className="text-accent">
                        {formatCurrency(parseFloat(formData.salePrice))}
                      </span>
                    </div>
                  ) : (
                    <span>{formatCurrency(parseFloat(formData.regularPrice || 0))}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Format & Bundle Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pageCount">Page Count *</Label>
                <Input
                  id="pageCount"
                  type="number"
                  value={formData.pageCount}
                  onChange={(e) => setFormData({ ...formData, pageCount: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Format *</Label>
                <Select
                  value={formData.format}
                  onValueChange={(value) => setFormData({ ...formData, format: value })}
                >
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Digital">Digital</SelectItem>
                    <SelectItem value="Physical">Physical</SelectItem>
                    <SelectItem value="Bundle">Bundle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isBundle"
                  checked={formData.isBundle}
                  onCheckedChange={(checked) => setFormData({ ...formData, isBundle: checked as boolean })}
                />
                <Label htmlFor="isBundle">Is Bundle</Label>
              </div>
            </div>

            {formData.isBundle && (
              <div className="space-y-2">
                <Label>Included Journals</Label>
                <div className="border rounded-lg p-3 grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {availableJournalsForBundle.map(j => (
                    <div key={j.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.includedJournalIds.includes(j.id)}
                        onCheckedChange={(checked) => {
                          const currentIds = [...formData.includedJournalIds];
                          if (checked) {
                            currentIds.push(j.id);
                          } else {
                            const index = currentIds.indexOf(j.id);
                            if (index > -1) currentIds.splice(index, 1);
                          }
                          setFormData({ ...formData, includedJournalIds: currentIds });
                        }}
                      />
                      <Label className="cursor-pointer">{j.name}</Label>
                    </div>
                  ))}
                  {availableJournalsForBundle.length === 0 && (
                    <p className="text-muted-foreground text-sm">No other journals available</p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Inner Child, Healing, Self-Love"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={5}
                placeholder="Guided therapeutic prompts&#10;NLP-based exercises&#10;..."
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingJournal ? 'Update' : 'Create'} Journal
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJournals;
