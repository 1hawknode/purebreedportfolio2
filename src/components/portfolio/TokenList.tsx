import { useState } from 'react';
import { Token } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TokenListProps {
  tokens: Token[];
  className?: string;
}

export function TokenList({ tokens, className }: TokenListProps) {
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);

  const filteredTokens = tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const displayedTokens = filteredTokens.slice(0, visibleCount);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className={cn("rounded-lg bg-card shadow-card", className)}>
      <div className="flex items-center justify-between border-b border-border p-4">
        <h3 className="font-semibold">Token Holdings</h3>
        <span className="text-sm text-muted-foreground font-mono">
          {tokens.length.toLocaleString()} tokens
        </span>
      </div>
      
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tokens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-muted border-0"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-sm text-muted-foreground">
              <th className="p-4 font-medium">Token</th>
              <th className="p-4 font-medium text-right">Balance</th>
              <th className="p-4 font-medium text-right">Price</th>
              <th className="p-4 font-medium text-right">24h</th>
              <th className="p-4 font-medium text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {displayedTokens.map((token, i) => (
              <tr
                key={token.id}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium">{token.name}</p>
                      <p className="text-sm text-muted-foreground">{token.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right font-mono">
                  {formatNumber(token.balance)}
                </td>
                <td className="p-4 text-right font-mono text-muted-foreground">
                  {formatPrice(token.price)}
                </td>
                <td className="p-4 text-right">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 font-mono text-sm",
                      token.change24h >= 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {token.change24h >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {token.change24h >= 0 ? '+' : ''}
                    {token.change24h.toFixed(2)}%
                  </span>
                </td>
                <td className="p-4 text-right font-mono font-medium">
                  ${formatNumber(token.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleCount < filteredTokens.length && (
        <div className="p-4 border-t border-border">
          <button
            onClick={() => setVisibleCount((c) => c + 20)}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Load more ({filteredTokens.length - visibleCount} remaining)</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
