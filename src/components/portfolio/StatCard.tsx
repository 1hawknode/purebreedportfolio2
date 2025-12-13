import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StatCard({ label, value, change, icon, className, delay = 0 }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg bg-card p-5 shadow-card animate-slide-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold font-mono tracking-tight">{value}</p>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive ? "text-success" : "text-destructive"
            )}>
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-md bg-muted p-2 text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
    </div>
  );
}
