import { useState, useMemo } from 'react';
import { Layers, Search, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface PreAsset {
  id: string;
  name: string;
  ticker: string;
  mcap: string;
}

// Generate list of pre-assets for selection
const allPreAssets: PreAsset[] = [
  { id: '1', name: 'Golden Retriever', ticker: 'GOLDEN', mcap: '$2.4M' },
  { id: '2', name: 'Arctic Fox', ticker: 'ARCTIC', mcap: '$1.8M' },
  { id: '3', name: 'Bengal Tiger', ticker: 'BENGAL', mcap: '$1.5M' },
  { id: '4', name: 'Snow Leopard', ticker: 'SNOW', mcap: '$1.2M' },
  { id: '5', name: 'Red Panda', ticker: 'REDP', mcap: '$980K' },
  { id: '6', name: 'Blue Whale', ticker: 'BLUE', mcap: '$850K' },
  { id: '7', name: 'Phoenix Bird', ticker: 'PHNX', mcap: '$720K' },
  { id: '8', name: 'Silver Wolf', ticker: 'SILVER', mcap: '$650K' },
  { id: '9', name: 'Emerald Dragon', ticker: 'EMRLD', mcap: '$580K' },
  { id: '10', name: 'Crystal Unicorn', ticker: 'CRYST', mcap: '$420K' },
  { id: '11', name: 'Shadow Panther', ticker: 'SHADOW', mcap: '$380K' },
  { id: '12', name: 'Thunder Horse', ticker: 'THNDR', mcap: '$350K' },
  { id: '13', name: 'Frost Bear', ticker: 'FROST', mcap: '$320K' },
  { id: '14', name: 'Fire Salamander', ticker: 'FIRE', mcap: '$290K' },
  { id: '15', name: 'Ocean Dolphin', ticker: 'OCEAN', mcap: '$260K' },
  { id: '16', name: 'Storm Eagle', ticker: 'STORM', mcap: '$240K' },
  { id: '17', name: 'Jade Turtle', ticker: 'JADE', mcap: '$220K' },
  { id: '18', name: 'Ruby Falcon', ticker: 'RUBY', mcap: '$200K' },
  { id: '19', name: 'Sapphire Owl', ticker: 'SAPHR', mcap: '$180K' },
  { id: '20', name: 'Obsidian Raven', ticker: 'OBSDN', mcap: '$160K' },
];

interface MultiBuyDialogProps {
  children: React.ReactNode;
}

export function MultiBuyDialog({ children }: MultiBuyDialogProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filteredAssets = useMemo(() => {
    if (!search) return allPreAssets;
    const term = search.toLowerCase();
    return allPreAssets.filter(
      a => a.name.toLowerCase().includes(term) || a.ticker.toLowerCase().includes(term)
    );
  }, [search]);

  const toggleAsset = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 100) {
        next.add(id);
      } else {
        toast.error('Maximum 100 pre-assets allowed');
      }
      return next;
    });
  };

  const removeAsset = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleBuyAll = () => {
    if (selected.size === 0) {
      toast.error('Select at least one pre-asset');
      return;
    }
    toast.success(`Bought ${selected.size} pre-assets in 1 click!`);
    setSelected(new Set());
  };

  const selectedAssets = allPreAssets.filter(a => selected.has(a.id));

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            MultiBuy Pre-Assets
          </DialogTitle>
        </DialogHeader>

        {/* Selected Items */}
        {selected.size > 0 && (
          <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-muted">
            {selectedAssets.map((asset) => (
              <Badge
                key={asset.id}
                variant="secondary"
                className="gap-1 pr-1"
              >
                ${asset.ticker}
                <button
                  onClick={() => removeAsset(asset.id)}
                  className="ml-1 p-0.5 rounded hover:bg-background/50"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or ticker..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Asset List */}
        <ScrollArea className="flex-1 max-h-[300px]">
          <div className="space-y-1 pr-4">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                onClick={() => toggleAsset(asset.id)}
              >
                <Checkbox checked={selected.has(asset.id)} />
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {asset.ticker.slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{asset.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">${asset.ticker}</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{asset.mcap}</span>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">
            {selected.size} / 100 selected
          </span>
          <Button onClick={handleBuyAll} disabled={selected.size === 0} className="gap-2">
            <Check className="h-4 w-4" />
            Buy All ({selected.size})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
