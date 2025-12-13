import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface NFTCollection {
  id: string;
  name: string;
  items: number;
  floorPrice: number;
  totalValue: number;
  status: 'active' | 'coming-soon';
  openseaUrl?: string;
}

const collections: NFTCollection[] = [
  {
    id: 'fcbrwa-enzyme',
    name: 'FCBRWA Enzyme',
    items: 324,
    floorPrice: 0.85,
    totalValue: 275.4,
    status: 'active',
    openseaUrl: 'https://opensea.io/collection/fcbrwa-enzyme',
  },
  {
    id: 'fcbc-fun-pass',
    name: 'FCBC Fun Pass',
    items: 156,
    floorPrice: 0.42,
    totalValue: 65.52,
    status: 'active',
  },
  {
    id: 'fyre-purebreds',
    name: 'Fyre PureBreeds',
    items: 0,
    floorPrice: 0,
    totalValue: 0,
    status: 'coming-soon',
  },
  {
    id: 'fyre-hybrids',
    name: 'Fyre Hybrids',
    items: 0,
    floorPrice: 0,
    totalValue: 0,
    status: 'coming-soon',
  },
];

interface NFTCollectionsProps {
  className?: string;
}

export function NFTCollections({ className }: NFTCollectionsProps) {
  return (
    <div className={cn("rounded-lg bg-card shadow-card", className)}>
      <div className="flex items-center justify-between border-b border-border p-4">
        <h3 className="font-semibold">NFT Pre-Assets</h3>
        <span className="text-sm text-muted-foreground font-mono">
          {collections.length} collections
        </span>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground mb-4">
          Pre-assets that guarantee your airdrop.{' '}
          <a 
            href="https://farcaster.xyz/warplette" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            Learn more <ExternalLink className="h-3 w-3" />
          </a>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.map((collection) => (
            <a
              key={collection.id}
              href={collection.openseaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-4 p-4 rounded-lg transition-colors group",
                collection.status === 'coming-soon' 
                  ? "bg-muted/20 opacity-70 cursor-default pointer-events-none" 
                  : "bg-muted/30 hover:bg-muted/50 cursor-pointer"
              )}
            >
              <div className={cn(
                "h-14 w-14 rounded-lg flex items-center justify-center text-lg font-bold shrink-0",
                collection.status === 'coming-soon' 
                  ? "bg-muted text-muted-foreground" 
                  : "bg-gradient-primary text-primary-foreground"
              )}>
                {collection.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{collection.name}</p>
                  {collection.status === 'coming-soon' && (
                    <Badge variant="outline" className="text-xs bg-warning/10 text-warning border-warning/30 shrink-0">
                      Coming Soon
                    </Badge>
                  )}
                  {collection.status === 'active' && collection.openseaUrl && (
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {collection.status === 'coming-soon' ? 'TBA' : `${collection.items} items`}
                </p>
              </div>
              {collection.status === 'active' && (
                <div className="text-right shrink-0">
                  <p className="font-mono font-medium">{collection.totalValue.toFixed(2)} ETH</p>
                  <p className="text-sm text-muted-foreground">
                    Floor: {collection.floorPrice} ETH
                  </p>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}