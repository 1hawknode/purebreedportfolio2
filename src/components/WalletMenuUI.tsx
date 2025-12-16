import { useBalance } from "wagmi";
import { base } from "wagmi/chains";

import {
  Wallet,
  Copy,
  ExternalLink,
  LogOut,
  Settings,
  Sparkles,
  Sun,
  Moon,
  Search,
  Ticket,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";
import { SettingsDialog } from "@/components/dialogs/SettingsDialog";
import { AddonsDialog } from "@/components/dialogs/AddonsDialog";

export function WalletPopover() {
  const { theme, toggleTheme } = useTheme();
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({
   address,
   chainId: base.id,
});
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  // --- helpers ---
  const truncateAddress = (addr?: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  };

  const ETH_PRICE_USD = 3000; // temporary, static

  const portfolioValue =
    ethBalance
      ? (Number(ethBalance.formatted) * ETH_PRICE_USD).toLocaleString()
      : null;

  const voteTickets = 0;

  const copyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  return (
    <Popover>
      {/* 🔘 WALLET ICON BUTTON */}
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            if (!isConnected) open();
          }}
        >
          <Wallet className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      {/* 📦 POPOVER CONTENT (ONLY MEANINGFUL WHEN CONNECTED) */}
      {isConnected && (
        <PopoverContent className="w-72" align="end">
          <div className="space-y-4">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Connected Wallet</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-destructive hover:text-destructive"
                onClick={() => disconnect()}
              >
                <LogOut className="h-3 w-3 mr-1" />
                Disconnect
              </Button>
            </div>

            {/* ADDRESS ROW */}
            <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                W
              </div>

              <div className="flex-1">
                <p className="font-mono text-sm">
                  {truncateAddress(address)}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={copyAddress}
              >
                <Copy className="h-3 w-3" />
              </Button>

              <a
                href={`https://basescan.org/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </a>
            </div>

            {/* PLACEHOLDER STATS (SAFE TO KEEP STATIC FOR NOW) */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Portfolio Value</span>
                <span className="font-mono font-medium">
                  {portfolioValue ? `$${portfolioValue}` : "—"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ETH Balance</span>
                <span className="font-mono font-medium">
                  {ethBalance
                    ? `${Number(ethBalance.formatted).toFixed(4)} ${ethBalance.symbol}`
                    : "—"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Ticket className="h-3 w-3" />
                  Vote Tickets
                </span>
                <span className="font-mono font-medium">
                  {voteTickets}
                </span>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Quick Actions
                </span>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={toggleTheme}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-3.5 w-3.5" />
                    ) : (
                      <Moon className="h-3.5 w-3.5" />
                    )}
                  </Button>

                  <AddonsDialog>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Sparkles className="h-3.5 w-3.5" />
                    </Button>
                  </AddonsDialog>

                  <SettingsDialog>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Settings className="h-3.5 w-3.5" />
                    </Button>
                  </SettingsDialog>

                  <a
                    href="https://fcbc.fun"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
