import { useState, useEffect } from 'react';
import { getJournals, Journal } from '@/lib/supabaseData';
import JournalCard from '@/components/ataraxia/JournalCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

const Journals = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [filterFormat, setFilterFormat] = useState<'all' | 'digital' | 'physical' | 'bundle'>('all');
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getJournals();
      setJournals(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  
  const filteredAndSortedJournals = [...journals]
    .filter(journal => {
      if (filterFormat === 'all') return true;
      if (filterFormat === 'digital') return journal.format.toLowerCase() === 'digital';
      if (filterFormat === 'physical') return journal.format.toLowerCase() === 'physical';
      if (filterFormat === 'bundle') return journal.isBundle || journal.format.toLowerCase().includes('bundle');
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        // Assuming getJournals already orders by created_at, but just in case
        return 0; 
      } else if (sortBy === 'price-low') {
        const aPrice = a.onSale && a.salePrice ? a.salePrice : a.price;
        const bPrice = b.onSale && b.salePrice ? b.salePrice : b.price;
        return aPrice - bPrice;
      } else {
        const aPrice = a.onSale && a.salePrice ? a.salePrice : a.price;
        const bPrice = b.onSale && b.salePrice ? b.salePrice : b.price;
        return bPrice - aPrice;
      }
    });
  
  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Journals & Workbooks</h1>
          <p className="text-[#A09880] text-lg max-w-2xl mx-auto">
            Transform your journey with our carefully curated collection of journals, workbooks, and digital planners
          </p>
        </div>
        
        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={(v) => setFilterFormat(v as any)}>
            <TabsList className="bg-[#111111] border border-[#2A2A2A]">
              <TabsTrigger value="all">All Formats</TabsTrigger>
              <TabsTrigger value="digital">Digital</TabsTrigger>
              <TabsTrigger value="physical">Physical</TabsTrigger>
              <TabsTrigger value="bundle">Bundles</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Select defaultValue="newest" onValueChange={(v) => setSortBy(v as any)}>
            <SelectTrigger className="w-full md:w-[200px] bg-[#111111] border-[#2A2A2A]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-[#2A2A2A]">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-12 w-12 text-[#D4AF37] animate-spin" />
          </div>
        ) : filteredAndSortedJournals.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-2xl font-semibold mb-3">No journals available right now</h3>
            <p className="text-[#A09880]">Check back soon for new releases!</p>
          </div>
        ) : (
          /* Grid of Journals */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedJournals.map(journal => (
              <JournalCard key={journal.id} journal={journal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Journals;
