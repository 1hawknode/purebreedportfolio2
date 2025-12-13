import { cn } from '@/lib/utils';
import { Wallet, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [copied, setCopied] = useState(false);
  const walletAddress = '0x742d...F8e9';
  const fullAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438F8e9';

  const copyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-background/80 backdrop-blur-md border-b border-border",
        className
      )}
    >
      <div>
        <h2 className="text-lg font-semibold">Portfolio Overview</h2>
        <p className="text-sm text-muted-foreground">Track your FCBC holdings</p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="gap-2 font-mono text-sm"
          onClick={copyAddress}
        >
          <Wallet className="h-4 w-4" />
          {walletAddress}
          {copied ? (
            <Check className="h-3.5 w-3.5 text-success" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </header>
  );
}
