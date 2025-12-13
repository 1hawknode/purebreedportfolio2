import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface BreakdownItem {
  name: string;
  value: number;
  color: string;
}

interface HoldingsBreakdownProps {
  data: BreakdownItem[];
  className?: string;
}

export function HoldingsBreakdown({ data, className }: HoldingsBreakdownProps) {
  return (
    <div className={cn("rounded-lg bg-card shadow-card p-4", className)}>
      <h3 className="font-semibold mb-4">Holdings Breakdown</h3>
      <div className="flex items-center gap-6">
        <div className="h-[160px] w-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-mono text-sm">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
