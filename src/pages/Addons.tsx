import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { EngagementAddons } from '@/components/portfolio/EngagementAddons';

const Addons = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <EngagementAddons className="animate-slide-up" />
        </main>
      </div>
    </div>
  );
};

export default Addons;
