// Mock data for FCBC portfolio
export interface Token {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  price: number;
  change24h: number;
  value: number;
}

export interface NFT {
  id: string;
  name: string;
  collection: string;
  image: string;
  floorPrice: number;
  rarity?: string;
}

export interface NFTCollection {
  id: string;
  name: string;
  items: number;
  floorPrice: number;
  totalValue: number;
  image: string;
}

export interface PortfolioStats {
  totalValue: number;
  change24h: number;
  change7d: number;
  tokenCount: number;
  nftCount: number;
}

// Generate mock tokens (1200+ tokens as mentioned)
const tokenNames = [
  { name: 'FCBC Token', symbol: 'FCBC' },
  { name: 'Fun Coin', symbol: 'FUN' },
  { name: 'Meme Gem', symbol: 'MGEM' },
  { name: 'Degen Dollar', symbol: 'DGND' },
  { name: 'Based Ape', symbol: 'BAPE' },
  { name: 'Moon Shot', symbol: 'MOON' },
  { name: 'Pixel Punk', symbol: 'PXPK' },
  { name: 'Rare Pepe', symbol: 'PEPE' },
  { name: 'Wojak', symbol: 'WOJ' },
  { name: 'Chad Coin', symbol: 'CHAD' },
];

export const generateTokens = (count: number): Token[] => {
  const tokens: Token[] = [];
  for (let i = 0; i < count; i++) {
    const base = tokenNames[i % tokenNames.length];
    const multiplier = Math.floor(i / tokenNames.length) || 1;
    tokens.push({
      id: `token-${i}`,
      name: multiplier > 1 ? `${base.name} ${multiplier}` : base.name,
      symbol: multiplier > 1 ? `${base.symbol}${multiplier}` : base.symbol,
      balance: Math.random() * 100000 + 100,
      price: Math.random() * 10 + 0.001,
      change24h: (Math.random() - 0.5) * 40,
      value: 0,
    });
  }
  return tokens.map(t => ({ ...t, value: t.balance * t.price }))
    .sort((a, b) => b.value - a.value);
};

export const mockTokens = generateTokens(1200);

export const mockNFTCollections: NFTCollection[] = [
  {
    id: 'fcbc-genesis',
    name: 'FCBC Genesis',
    items: 324,
    floorPrice: 0.85,
    totalValue: 275.4,
    image: '/placeholder.svg',
  },
  {
    id: 'fcbc-fun-pass',
    name: 'FCBC Fun Pass',
    items: 156,
    floorPrice: 0.42,
    totalValue: 65.52,
    image: '/placeholder.svg',
  },
];

export const mockNFTs: NFT[] = [
  { id: 'nft-1', name: 'Genesis #0001', collection: 'FCBC Genesis', image: '/placeholder.svg', floorPrice: 2.5, rarity: 'Legendary' },
  { id: 'nft-2', name: 'Genesis #0042', collection: 'FCBC Genesis', image: '/placeholder.svg', floorPrice: 1.2, rarity: 'Rare' },
  { id: 'nft-3', name: 'Genesis #0128', collection: 'FCBC Genesis', image: '/placeholder.svg', floorPrice: 0.85, rarity: 'Common' },
  { id: 'nft-4', name: 'Fun Pass #0007', collection: 'FCBC Fun Pass', image: '/placeholder.svg', floorPrice: 0.65, rarity: 'Epic' },
  { id: 'nft-5', name: 'Fun Pass #0089', collection: 'FCBC Fun Pass', image: '/placeholder.svg', floorPrice: 0.42, rarity: 'Common' },
  { id: 'nft-6', name: 'Genesis #0256', collection: 'FCBC Genesis', image: '/placeholder.svg', floorPrice: 0.9, rarity: 'Uncommon' },
];

export const mockPortfolioStats: PortfolioStats = {
  totalValue: mockTokens.slice(0, 100).reduce((acc, t) => acc + t.value, 0) + 
    mockNFTCollections.reduce((acc, c) => acc + c.totalValue, 0),
  change24h: 5.42,
  change7d: 12.8,
  tokenCount: 1200,
  nftCount: 480,
};

export const mockChartData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  value: mockPortfolioStats.totalValue * (0.8 + Math.random() * 0.4) * (0.9 + i * 0.004),
}));

export const holdingsBreakdown = [
  { name: 'Top Tokens', value: 65, color: 'hsl(175, 70%, 50%)' },
  { name: 'NFTs', value: 20, color: 'hsl(200, 70%, 50%)' },
  { name: 'Other Tokens', value: 15, color: 'hsl(220, 15%, 35%)' },
];
