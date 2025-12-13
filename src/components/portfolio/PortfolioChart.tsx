import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';
import { topPerformers } from '@/lib/mockData';
import { TrendingUp, ShoppingCart, Layers, ArrowDownToLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChartDataPoint {
  date: string;
  value: number;
}

interface PortfolioChartProps {
  data: ChartDataPoint[];
  className?: string;
}

export function PortfolioChart({ data, className }: PortfolioChartProps) {
  const formatValue = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[0]?.value || 0;
  const changePercent = ((currentValue - previousValue) / previousValue * 100).toFixed(2);

  return (
    <div className={cn("rounded-lg bg-card shadow-card p-4 space-y-4", className)}>
      {/* Header with Value & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{formatValue(currentValue)}</span>
            <span className={cn(
              "text-sm font-medium",
              Number(changePercent) >= 0 ? "text-success" : "text-destructive"
            )}>
              {Number(changePercent) >= 0 ? '+' : ''}{changePercent}%
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="gap-1.5">
            <ShoppingCart className="h-4 w-4" />
            Quick Buy
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <Layers className="h-4 w-4" />
            MultiBuy
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <ArrowDownToLine className="h-4 w-4" />
            Sell
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Performance</h3>
        <div className="flex gap-1">
          {['7D', '30D', '90D', 'ALL'].map((period, i) => (
            <button
              key={period}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                i === 1
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(221, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(221, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              dy={5}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              tickFormatter={formatValue}
              dx={-5}
              width={45}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-card)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', marginBottom: '4px' }}
              formatter={(value: number) => [formatValue(value), 'Value']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(221, 100%, 50%)"
              strokeWidth={2}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performers */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-success" />
          <h4 className="font-semibold text-sm">Top 10 Performers (24h)</h4>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {topPerformers.slice(0, 10).map((token, i) => (
            <div 
              key={token.id} 
              className="flex items-center justify-between p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono w-4">{i + 1}</span>
                <div className="h-6 w-6 rounded-full bg-gradient-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                  {token.symbol.slice(0, 2)}
                </div>
                <span className="text-sm font-medium truncate max-w-[80px]">${token.symbol}</span>
              </div>
              <span className="text-xs font-medium text-success">+{token.change24h}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}