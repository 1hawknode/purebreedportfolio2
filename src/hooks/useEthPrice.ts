import { useEffect, useState } from "react";

const CACHE_KEY = "eth_price_usd";
const CACHE_TTL = 60 * 1000; // 60 seconds

export function useEthPrice() {
  const [priceUsd, setPriceUsd] = useState<number | null>(null);
  const [previousPriceUsd, setPreviousPriceUsd] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Computed price change %
  const priceChangePercent =
    previousPriceUsd && priceUsd
      ? ((priceUsd - previousPriceUsd) / previousPriceUsd) * 100
      : null;

  useEffect(() => {
    const loadCachedPrice = () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return false;

        const { price, timestamp } = JSON.parse(cached);
        const isFresh = Date.now() - timestamp < CACHE_TTL;

        if (isFresh) {
          setPriceUsd(price);
          setIsLoading(false);
          return true;
        }

        return false;
      } catch {
        return false;
      }
    };

    const fetchEthPrice = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch ETH price");
        }

        const data = await res.json();
        const newPrice = data.ethereum.usd;

        // Track previous price
        setPreviousPriceUsd(priceUsd);
        setPriceUsd(newPrice);

        // Update cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            price: newPrice,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    const hasFreshCache = loadCachedPrice();

    if (!hasFreshCache) {
      fetchEthPrice();
    }

    // Auto-refresh every 60s
    const interval = setInterval(fetchEthPrice, 60 * 1000);

    return () => clearInterval(interval);
  }, [priceUsd]);

  return {
    priceUsd,
    previousPriceUsd,
    priceChangePercent,
    isLoading,
    error,
  };
}