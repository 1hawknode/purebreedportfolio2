import { useEffect, useState } from "react";

const REFRESH_INTERVAL = 60_000; // 60 seconds

export function useEthPrice() {
  const [priceUsd, setPriceUsd] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

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

        if (isMounted) {
          setPriceUsd(data.ethereum.usd);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // fetch immediately
    fetchEthPrice();

    // then refresh every 60s
    const intervalId = setInterval(fetchEthPrice, REFRESH_INTERVAL);

    // cleanup on unmount
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return {
    priceUsd,
    isLoading,
    error,
  };
}