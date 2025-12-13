import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { NFTGrid } from '@/components/portfolio/NFTGrid';
import { mockNFTs, mockNFTCollections } from '@/lib/mockData';

const NFTs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <NFTGrid
            nfts={mockNFTs}
            collections={mockNFTCollections}
            className="animate-slide-up"
          />
        </main>
      </div>
    </div>
  );
};

export default NFTs;
