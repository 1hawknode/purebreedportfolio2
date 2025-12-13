import { cn } from '@/lib/utils';
import { NavLink } from '@/components/NavLink';
import {
  LayoutDashboard,
  Coins,
  Image,
  Settings,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Tokens', href: '/tokens', icon: Coins },
  { label: 'NFTs', href: '/nfts', icon: Image },
  { label: 'Add-ons', href: '/addons', icon: Sparkles },
  { label: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">FC</span>
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">FCBC</h1>
            <p className="text-xs text-muted-foreground">Portfolio Manager</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              activeClassName="bg-sidebar-accent text-sidebar-foreground"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-sidebar-border">
          <a
            href="https://fcbc.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="text-sm">Visit fcbc.fun</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
