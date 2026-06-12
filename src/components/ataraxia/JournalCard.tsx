import { useState } from 'react';
import Image from "./Image";
import { Journal } from '@/lib/supabaseData';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

type JournalCardProps = {
  journal: Journal;
};

const JournalCard = ({ journal }: JournalCardProps) => {
  const { addToCart, isInCart, items } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const cartItem = items.find(item => item.journalId === journal.id);
  
  const activePrice = journal.onSale && journal.salePrice ? journal.salePrice : journal.price;
  
  const handleAddToCart = () => {
    addToCart(journal);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };
  
  const inCart = isInCart(journal.id);
  
  return (
    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden flex flex-col">
      <div className="relative h-72 rounded-t-xl overflow-hidden">
        <Image
          src={journal.featuredImage}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          alt={journal.name}
        />
        {journal.onSale && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-red-600 hover:bg-red-700 text-white">Sale</Badge>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="bg-[#2A2A2A] text-[#F5F0E8]">
            {journal.format}
          </Badge>
          {journal.pageCount > 0 && (
            <Badge variant="outline" className="border-[#2A2A2A] text-[#A09880]">
              {journal.pageCount} pages
            </Badge>
          )}
        </div>
        <h3 className="text-[#F5F0E8] text-xl font-semibold">{journal.name}</h3>
        <p className="text-[#A09880] mt-3 flex-grow">{journal.shortDescription}</p>
        
        <div className="mt-4 flex items-center gap-3">
          <span className="text-[#D4AF37] text-xl font-bold">
            ${activePrice.toFixed(2)}
          </span>
          {journal.onSale && (
            <span className="text-[#A09880] line-through text-lg">
              ${journal.regularPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="mt-5 space-y-3">
          <Button
            onClick={handleAddToCart}
            disabled={inCart}
            className="w-full bg-[#D4AF37] hover:bg-[#C19E30] text-[#0A0A0A] font-semibold"
          >
            {isAdded ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Added ✓
              </>
            ) : inCart ? (
              <>
                <Check className="mr-2 h-4 w-4" /> In Cart ✓
                {cartItem && <span className="ml-2 bg-[#0A0A0A] text-[#F5F0E8] px-2 py-0.5 rounded-full text-xs">{cartItem.quantity}</span>}
              </>
            ) : (
              'Add to Cart'
            )}
          </Button>
          
          <Button asChild variant="secondary" className="w-full border-[#2A2A2A] text-[#A09880] hover:text-[#F5F0E8] hover:bg-[#2A2A2A]">
            <Link to={`/journals/${journal.slug}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
