import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { TokenList } from '@/components/portfolio/TokenList';
import { mockTokens } from '@/lib/mockData';

const Tokens = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <TokenList tokens={mockTokens} className="animate-slide-up" />
        </main>
      </div>
    </div>
  );
};

export default Tokens;
