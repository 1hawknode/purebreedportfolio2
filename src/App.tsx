import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import { sdk } from "@farcaster/miniapp-sdk";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Call ready() after the app is fully loaded to hide the splash screen
    sdk.actions.ready().catch((error) => {
      console.error("Failed to call sdk.actions.ready():", error);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Index />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;