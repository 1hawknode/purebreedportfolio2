import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';

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

  return (
    <div className={cn("rounded-lg bg-card shadow-card p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Portfolio Performance</h3>
        <div className="flex gap-2">
          {['7D', '30D', '90D', 'ALL'].map((period, i) => (
            <button
              key={period}
              className={cn(
                "px-3 py-1 rounded-md text-sm transition-colors",
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
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(175, 70%, 50%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(175, 70%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 55%)', fontSize: 12 }}
              tickFormatter={formatValue}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220, 18%, 10%)',
                border: '1px solid hsl(220, 15%, 18%)',
                borderRadius: '8px',
                boxShadow: '0 4px 24px -4px rgba(0,0,0,0.4)',
              }}
              labelStyle={{ color: 'hsl(210, 20%, 95%)', marginBottom: '4px' }}
              formatter={(value: number) => [formatValue(value), 'Value']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(175, 70%, 50%)"
              strokeWidth={2}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
