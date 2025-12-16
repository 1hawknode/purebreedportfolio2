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
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
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
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  /* --------------------------------
     REAL ETH BALANCE (SAFE)
  -------------------------------- */
  const { data: ethBalanceData } = useBalance({
    address,
  });

  const ethBalance = ethBalanceData
    ? Number(formatEther(ethBalanceData.value)).toFixed(4)
    : "0.0000";

  /* --------------------------------
     DERIVED PORTFOLIO VALUE (SAFE)
     (ETH only for now)
  -------------------------------- */
  const ETH_PRICE_USD = 3000; // placeholder price
  const portfolioValue = (
    Number(ethBalance) * ETH_PRICE_USD
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const truncateAddress = (addr?: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success("Address copied");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {!isConnected ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => open()}
          >
            <Wallet className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Wallet className="h-4 w-4" />
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          {/* Header */}
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
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Portfolio Value</span>
              <span className="font-mono font-medium">
                {portfolioValue}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ETH Balance</span>
              <span className="font-mono font-medium">
                {ethBalance} ETH
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Ticket className="h-3 w-3" />
                Vote Tickets
              </span>
              <span className="font-mono font-medium">0</span>
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
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Sparkles className="h-3.5 w-3.5" />
                  </Button>
                </AddonsDialog>

                <SettingsDialog>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
