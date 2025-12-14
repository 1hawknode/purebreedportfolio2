import { StatCard } from '@/components/portfolio/StatCard';
import { SpeciesTokenList } from '@/components/portfolio/SpeciesTokenList';
import { NFTCollections } from '@/components/portfolio/NFTCollections';
import { SettingsDialog } from '@/components/dialogs/SettingsDialog';
import { AddonsDialog } from '@/components/dialogs/AddonsDialog';
import { useSpecies } from '@/hooks/useSpecies';
import { useTheme } from '@/hooks/useTheme';
import { mockPortfolioStats } from '@/lib/mockData';
import { Coins, Image, TrendingUp, Wallet, Sun, Moon, Settings, Sparkles, ExternalLink, Dna } from 'lucide-react';
import { Button } from '@/components/ui/button';

import fcbcWhiteLogo from '@/assets/fcbc_white.png';
import fcbcDarkLogo from '@/assets/fcbc_dark.png';

const Index = () => {
  const { data: species = [], isLoading } = useSpecies(100);
  const { theme, toggleTheme } = useTheme();

  const formatValue = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const logo = theme === 'dark' ? fcbcDarkLogo : fcbcWhiteLogo;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 sm:px-6 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-2">
          <img src={logo} alt="FCBC" className="h-8 w-8" />
          <span className="font-semibold text-sm">FCBC</span>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <AddonsDialog>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Sparkles className="h-4 w-4" />
            </Button>
          </AddonsDialog>
          
          <SettingsDialog>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </SettingsDialog>

          <a href="https://fcbc.fun" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </header>

      <main className="p-4 space-y-4 max-w-4xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="Holdings"
            value={mockPortfolioStats.totalHoldings.toLocaleString()}
            icon={<Wallet className="h-4 w-4" />}
            delay={0}
          />
          <StatCard
            label="NFT Pre-Assets"
            value={mockPortfolioStats.nftPreAssets.toLocaleString()}
            icon={<Image className="h-4 w-4" />}
            delay={100}
          />
          <StatCard
            label="Value"
            value={formatValue(mockPortfolioStats.totalPortfolioValue)}
            icon={<TrendingUp className="h-4 w-4" />}
            delay={200}
          />
          <StatCard
            label="DNA Units"
            value={mockPortfolioStats.totalDNAUnits.toLocaleString()}
            icon={<Dna className="h-4 w-4" />}
            delay={300}
          />
        </div>

        {/* Fyre DNA Pre-Assets List */}
        <SpeciesTokenList species={species} isLoading={isLoading} />

        {/* NFT Collections */}
        <NFTCollections />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-3 px-4 text-center text-xs text-muted-foreground">
        <a href="https://fcbc.fun" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          fcbc.fun
        </a>
      </footer>
    </div>
  );
};

export default Index;