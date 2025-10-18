import { useState } from 'react';
import { getJournals, createJournal, updateJournal, deleteJournal, Journal } from '@/lib/localData';
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
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminJournals = () => {
  const [journals, setJournals] = useState<Journal[]>(getJournals());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState<Journal | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

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
    format: 'PDF',
    isBundle: false,
  });

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
      format: 'PDF',
      isBundle: false,
    });
    setEditingJournal(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(formData.price);
    const regularPrice = parseFloat(formData.regularPrice);
    const salePrice = formData.salePrice ? parseFloat(formData.salePrice) : undefined;

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
    };

    if (editingJournal) {
      updateJournal(editingJournal.id, journalData);
      toast({
        title: 'Success',
        description: 'Journal updated successfully',
      });
    } else {
      createJournal(journalData);
      toast({
        title: 'Success',
        description: 'Journal created successfully',
      });
    }

    setJournals(getJournals());
    handleCloseDialog();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteJournal(id);
      setJournals(getJournals());
      toast({
        title: 'Success',
        description: 'Journal deleted successfully',
      });
    }
  };

  const filteredJournals = journals.filter(journal =>
    journal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    journal.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    journal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
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
                      <span>💰 ${journal.price}</span>
                      <span>📄 {journal.pageCount} pages</span>
                      <span>📋 {journal.format}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {journal.isBundle && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          Bundle
                        </span>
                      )}
                      {journal.onSale && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

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

            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="onSale"
                    checked={formData.onSale}
                    onCheckedChange={(checked) => setFormData({ ...formData, onSale: checked as boolean })}
                  />
                  <Label htmlFor="onSale">On Sale</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isBundle"
                    checked={formData.isBundle}
                    onCheckedChange={(checked) => setFormData({ ...formData, isBundle: checked as boolean })}
                  />
                  <Label htmlFor="isBundle">Is Bundle</Label>
                </div>
              </div>
            </div>

            {formData.onSale && (
              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price</Label>
                <Input
                  id="salePrice"
                  type="number"
                  step="0.01"
                  value={formData.salePrice}
                  onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                />
              </div>
            )}

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
                <Input
                  id="format"
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                  placeholder="PDF"
                  required
                />
              </div>
            </div>

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

