import { NFT, NFTCollection } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface NFTGridProps {
  nfts: NFT[];
  collections: NFTCollection[];
  className?: string;
}

const rarityColors: Record<string, string> = {
  Legendary: 'bg-warning/20 text-warning border-warning/30',
  Epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Rare: 'bg-primary/20 text-primary border-primary/30',
  Uncommon: 'bg-success/20 text-success border-success/30',
  Common: 'bg-muted text-muted-foreground border-border',
};

export function NFTGrid({ nfts, collections, className }: NFTGridProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Collections Overview */}
      <div className="rounded-lg bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="font-semibold">NFT Collections</h3>
          <span className="text-sm text-muted-foreground font-mono">
            {collections.length} collections
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="h-14 w-14 rounded-lg bg-gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
                {collection.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{collection.name}</p>
                <p className="text-sm text-muted-foreground">
                  {collection.items} items
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono font-medium">{collection.totalValue.toFixed(2)} ETH</p>
                <p className="text-sm text-muted-foreground">
                  Floor: {collection.floorPrice} ETH
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NFT Grid */}
      <div className="rounded-lg bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="font-semibold">Your NFTs</h3>
          <span className="text-sm text-muted-foreground font-mono">
            {nfts.length} items
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="group relative rounded-lg overflow-hidden bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <div className="aspect-square bg-gradient-card flex items-center justify-center">
                <div className="text-3xl font-bold text-gradient">
                  {nft.name.split('#')[1]?.slice(0, 2) || 'NFT'}
                </div>
              </div>
              <div className="p-3 space-y-2">
                <p className="font-medium text-sm truncate">{nft.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground truncate">
                    {nft.collection}
                  </span>
                </div>
                {nft.rarity && (
                  <Badge
                    variant="outline"
                    className={cn("text-xs", rarityColors[nft.rarity])}
                  >
                    {nft.rarity}
                  </Badge>
                )}
                <p className="font-mono text-sm">{nft.floorPrice} ETH</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
