import { useState } from 'react';
import { ShoppingCart, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Recommendation {
  id: string;
  name: string;
  ticker: string;
  stars: number;
  mcap: string;
}

// Generate stable recommendations
const recommendations: Recommendation[] = [
  { id: '1', name: 'Golden Retriever', ticker: 'GOLDEN', stars: 5, mcap: '$2.4M' },
  { id: '2', name: 'Arctic Fox', ticker: 'ARCTIC', stars: 5, mcap: '$1.8M' },
  { id: '3', name: 'Bengal Tiger', ticker: 'BENGAL', stars: 4, mcap: '$1.5M' },
  { id: '4', name: 'Snow Leopard', ticker: 'SNOW', stars: 4, mcap: '$1.2M' },
  { id: '5', name: 'Red Panda', ticker: 'REDP', stars: 4, mcap: '$980K' },
  { id: '6', name: 'Blue Whale', ticker: 'BLUE', stars: 3, mcap: '$850K' },
  { id: '7', name: 'Phoenix Bird', ticker: 'PHNX', stars: 3, mcap: '$720K' },
  { id: '8', name: 'Silver Wolf', ticker: 'SILVER', stars: 3, mcap: '$650K' },
  { id: '9', name: 'Emerald Dragon', ticker: 'EMRLD', stars: 3, mcap: '$580K' },
  { id: '10', name: 'Crystal Unicorn', ticker: 'CRYST', stars: 2, mcap: '$420K' },
];

interface QuickBuyDialogProps {
  children: React.ReactNode;
}

export function QuickBuyDialog({ children }: QuickBuyDialogProps) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(recommendations.length / itemsPerPage);
  const currentRecs = recommendations.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const handleBuyAll = () => {
    toast.success(`Bought ${currentRecs.length} pre-assets!`);
  };

  const handleBuySingle = (ticker: string) => {
    toast.success(`Bought $${ticker}!`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            QuickBuy Recommendations
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {currentRecs.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {rec.ticker.slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium text-sm">{rec.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">${rec.ticker}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rec.stars }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{rec.mcap}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleBuySingle(rec.ticker)}>
                  Buy
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
            >
              Prev
            </Button>
            <span className="text-sm text-muted-foreground">
              {page + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages - 1}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
          <Button onClick={handleBuyAll} className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Buy All ({currentRecs.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
