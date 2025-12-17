import { useEffect, useState } from "react";

export function useEthPrice() {
  const [priceUsd, setPriceUsd] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
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
        setPriceUsd(data.ethereum.usd);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEthPrice();
  }, []);

  return {
    priceUsd,
    isLoading,
    error,
  };
}