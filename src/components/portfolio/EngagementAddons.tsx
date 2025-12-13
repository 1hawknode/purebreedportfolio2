import { cn } from '@/lib/utils';
import { 
  Bell, 
  Zap, 
  TrendingUp, 
  Users, 
  Gift, 
  Shield,
  BarChart3,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Addon {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'available' | 'coming';
}

const addons: Addon[] = [
  {
    id: 'alerts',
    name: 'Price Alerts',
    description: 'Get notified on significant price movements',
    icon: <Bell className="h-5 w-5" />,
    status: 'available',
  },
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    description: 'Deep dive into your portfolio performance',
    icon: <BarChart3 className="h-5 w-5" />,
    status: 'active',
  },
  {
    id: 'whale',
    name: 'Whale Tracking',
    description: 'Follow top holders and their moves',
    icon: <TrendingUp className="h-5 w-5" />,
    status: 'available',
  },
  {
    id: 'social',
    name: 'Social Feed',
    description: 'Connect with other FCBC holders',
    icon: <Users className="h-5 w-5" />,
    status: 'coming',
  },
  {
    id: 'rewards',
    name: 'Rewards Hub',
    description: 'Earn rewards for holding and staking',
    icon: <Gift className="h-5 w-5" />,
    status: 'available',
  },
  {
    id: 'insurance',
    name: 'Portfolio Insurance',
    description: 'Protect your assets against losses',
    icon: <Shield className="h-5 w-5" />,
    status: 'coming',
  },
];

interface EngagementAddonsProps {
  className?: string;
}

export function EngagementAddons({ className }: EngagementAddonsProps) {
  return (
    <div className={cn("rounded-lg bg-card shadow-card", className)}>
      <div className="flex items-center justify-between border-b border-border p-4">
        <h3 className="font-semibold">Suggested Add-ons</h3>
        <Zap className="h-4 w-4 text-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className={cn(
              "relative p-4 rounded-lg border transition-all",
              addon.status === 'active'
                ? "border-primary/50 bg-primary/5"
                : "border-border hover:border-primary/30 hover:bg-muted/30"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "rounded-md p-2",
                addon.status === 'active' ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {addon.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{addon.name}</p>
                  {addon.status === 'active' && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                  {addon.status === 'coming' && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      Soon
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {addon.description}
                </p>
              </div>
            </div>
            {addon.status === 'available' && (
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full text-xs"
              >
                Enable
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
