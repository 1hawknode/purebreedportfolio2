import { useEffect, useState } from "react";

const CACHE_KEY = "eth_price_usd";
const CACHE_TTL = 60 * 1000; // 60 seconds
const REFRESH_INTERVAL = 60 * 1000; // 60 seconds

export function useEthPrice() {
  const [priceUsd, setPriceUsd] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Helper: fetch from API and update state + cache
  const fetchPrice = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );

      if (!res.ok) throw new Error("Failed to fetch ETH price");

      const data = await res.json();
      const price = data.ethereum.usd;

      setPriceUsd(price);
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ price, timestamp: Date.now() })
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1️⃣ Initial load: try cache first
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

    const hasFreshCache = loadCachedPrice();

    // Fetch immediately if cache is missing or stale
    if (!hasFreshCache) fetchPrice();

    // 2️⃣ Interval refresh: always fetch every 60s
    const interval = setInterval(fetchPrice, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { priceUsd, isLoading, error };
}