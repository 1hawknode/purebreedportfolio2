import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/portfolio/StatCard';
import { TokenList } from '@/components/portfolio/TokenList';
import { NFTGrid } from '@/components/portfolio/NFTGrid';
import { PortfolioChart } from '@/components/portfolio/PortfolioChart';
import { HoldingsBreakdown } from '@/components/portfolio/HoldingsBreakdown';
import { EngagementAddons } from '@/components/portfolio/EngagementAddons';
import {
  mockTokens,
  mockNFTs,
  mockNFTCollections,
  mockPortfolioStats,
  mockChartData,
  holdingsBreakdown,
} from '@/lib/mockData';
import { Coins, Image, TrendingUp, Wallet } from 'lucide-react';

const Index = () => {
  const formatValue = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Portfolio Value"
              value={formatValue(mockPortfolioStats.totalValue)}
              change={mockPortfolioStats.change24h}
              icon={<Wallet className="h-5 w-5" />}
              delay={0}
            />
            <StatCard
              label="Token Holdings"
              value={mockPortfolioStats.tokenCount.toLocaleString()}
              icon={<Coins className="h-5 w-5" />}
              delay={100}
            />
            <StatCard
              label="NFT Holdings"
              value={mockPortfolioStats.nftCount.toLocaleString()}
              icon={<Image className="h-5 w-5" />}
              delay={200}
            />
            <StatCard
              label="7D Performance"
              value={`${mockPortfolioStats.change7d >= 0 ? '+' : ''}${mockPortfolioStats.change7d}%`}
              change={mockPortfolioStats.change7d}
              icon={<TrendingUp className="h-5 w-5" />}
              delay={300}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <PortfolioChart data={mockChartData} className="lg:col-span-2 animate-slide-up" />
            <HoldingsBreakdown data={holdingsBreakdown} className="animate-slide-up" />
          </div>

          {/* Token List */}
          <TokenList tokens={mockTokens} className="animate-slide-up" />

          {/* NFT Section */}
          <NFTGrid
            nfts={mockNFTs}
            collections={mockNFTCollections}
            className="animate-slide-up"
          />

          {/* Engagement Add-ons */}
          <EngagementAddons className="animate-slide-up" />
        </main>
      </div>
    </div>
  );
};

export default Index;
