import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6 space-y-6 max-w-2xl">
          {/* Notifications */}
          <div className="rounded-lg bg-card shadow-card p-6 animate-slide-up">
            <h3 className="font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="price-alerts">Price Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified on significant price changes
                  </p>
                </div>
                <Switch id="price-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="portfolio-updates">Portfolio Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily summary of your portfolio performance
                  </p>
                </div>
                <Switch id="portfolio-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="new-tokens">New Token Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new tokens are added
                  </p>
                </div>
                <Switch id="new-tokens" />
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="rounded-lg bg-card shadow-card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h3 className="font-semibold mb-4">Display</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Show more data in less space
                  </p>
                </div>
                <Switch id="compact-mode" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="hide-small">Hide Small Balances</Label>
                  <p className="text-sm text-muted-foreground">
                    Hide tokens worth less than $1
                  </p>
                </div>
                <Switch id="hide-small" defaultChecked />
              </div>
            </div>
          </div>

          {/* Wallet Settings */}
          <div className="rounded-lg bg-card shadow-card p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="font-semibold mb-4">Wallet</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="wallet-address">Connected Wallet</Label>
                <Input
                  id="wallet-address"
                  value="0x742d35Cc6634C0532925a3b844Bc454e4438F8e9"
                  readOnly
                  className="mt-2 font-mono text-sm bg-muted"
                />
              </div>
              <Button variant="outline" className="w-full">
                Disconnect Wallet
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
