import {
  Wallet,
  Copy,
  ExternalLink,
  LogOut,
  Settings,
  Sparkles,
  Sun,
  Moon,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { base } from "wagmi/chains";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";
import { SettingsDialog } from "@/components/dialogs/SettingsDialog";
import { AddonsDialog } from "@/components/dialogs/AddonsDialog";
import { formatEther } from "viem";

export function WalletPopover() {
  const { theme, toggleTheme } = useTheme();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  const { data: ethBalance } = useBalance({
    address,
    chainId: base.id,
  });

  const ETH_PRICE_USD = 3000; // temporary, static

  const portfolioValue = ethBalance
    ? (Number(ethBalance.formatted) * ETH_PRICE_USD).toLocaleString()
    : null;

  const truncateAddress = (addr?: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  };

  const voteTickets = 0;

  const copyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  return (
    <Popover>
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

      {isConnected && (
        <PopoverContent className="w-72" align="end">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Wallet Connected</span>
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

            {/* Address */}
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

            {/* Balances */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Portfolio Value</span>
                <span className="font-mono font-medium">
                  {portfolioValue ? `$${portfolioValue}` : "—"}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ETH Balance</span>
                  <span className="font-mono font-medium">
                    {ethBalance
                      ? Number(formatEther(ethBalance.value)).toFixed(4)
                      : "—"}{" "}
                    ETH
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Ticket className="h-3 w-3" />
                    Vote Tickets
                  </span>
                  <span className="font-mono font-medium">
                    {voteTickets}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                    </Button>
                  </AddonsDialog>

                  <SettingsDialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                    >
                      <Settings className="h-3.5 w-3.5" />
                    </Button>
                  </SettingsDialog>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
