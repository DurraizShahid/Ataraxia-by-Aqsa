import { useState, useEffect } from 'react';
import { getCourses, createCourse, updateCourse, deleteCourse, Course } from '@/lib/supabaseData';
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

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    const data = await getCourses();
    setCourses(data);
    setIsLoading(false);
  };

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    featuredImage: '',
    price: '',
    regularPrice: '',
    salePrice: '',
    onSale: false,
    duration: '',
    lessons: '',
    level: '',
    tags: '',
    syllabus: '',
    requirements: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      shortDescription: '',
      featuredImage: '',
      price: '',
      regularPrice: '',
      salePrice: '',
      onSale: false,
      duration: '',
      lessons: '',
      level: '',
      tags: '',
      syllabus: '',
      requirements: '',
    });
    setEditingCourse(null);
  };

  const handleOpenDialog = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        slug: course.slug,
        description: course.description,
        shortDescription: course.shortDescription,
        featuredImage: course.featuredImage,
        price: course.price.toString(),
        regularPrice: course.regularPrice.toString(),
        salePrice: course.salePrice?.toString() || '',
        onSale: course.onSale,
        duration: course.duration,
        lessons: course.lessons.toString(),
        level: course.level,
        tags: course.tags.join(', '),
        syllabus: course.syllabus.join('\n'),
        requirements: course.requirements.join('\n'),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(formData.price);
    const regularPrice = parseFloat(formData.regularPrice);
    const salePrice = formData.salePrice ? parseFloat(formData.salePrice) : undefined;

    const courseData = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description,
      shortDescription: formData.shortDescription,
      featuredImage: formData.featuredImage || '/placeholder.svg',
      price,
      regularPrice,
      salePrice,
      onSale: formData.onSale,
      duration: formData.duration,
      lessons: parseInt(formData.lessons),
      level: formData.level,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      syllabus: formData.syllabus.split('\n').map(item => item.trim()).filter(Boolean),
      requirements: formData.requirements.split('\n').map(item => item.trim()).filter(Boolean),
    };

    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, courseData);
        toast({
          title: 'Success',
          description: 'Course updated successfully',
        });
      } else {
        await createCourse(courseData);
        toast({
          title: 'Success',
          description: 'Course created successfully',
        });
      }

      await fetchCourses();
      handleCloseDialog();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save course',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const success = await deleteCourse(id);
      if (success) {
        await fetchCourses();
        toast({
          title: 'Success',
          description: 'Course deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete course',
          variant: 'destructive',
        });
      }
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground mt-1">Manage your courses</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add New Course
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Courses List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredCourses.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No courses found</p>
            </CardContent>
          </Card>
        ) : (
          filteredCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{course.shortDescription}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                      <span>💰 ${course.price}</span>
                      <span>⏱️ {course.duration}</span>
                      <span>📚 {course.lessons} lessons</span>
                      <span>📊 {course.level}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {course.onSale && (
                        <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                          On Sale
                        </span>
                      )}
                      {course.tags.map((tag) => (
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
                      onClick={() => handleOpenDialog(course)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(course.id, course.title)}
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
            <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
            <DialogDescription>
              {editingCourse ? 'Update the course details' : 'Create a new course'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="8 weeks"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lessons">Lessons *</Label>
                <Input
                  id="lessons"
                  type="number"
                  value={formData.lessons}
                  onChange={(e) => setFormData({ ...formData, lessons: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level *</Label>
                <Input
                  id="level"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  placeholder="All Levels"
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
                placeholder="Healing, Meditation, Self-Love"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="syllabus">Syllabus (one per line)</Label>
              <Textarea
                id="syllabus"
                value={formData.syllabus}
                onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                rows={6}
                placeholder="Week 1: Introduction&#10;Week 2: Deep Dive&#10;..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements (one per line)</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={3}
                placeholder="Open heart&#10;Willingness to learn&#10;..."
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingCourse ? 'Update' : 'Create'} Course
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourses;

