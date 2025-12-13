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
  status: 'active' | 'coming-soon';
  openseaUrl?: string;
}

export interface PortfolioStats {
  totalHoldings: number;
  nftPreAssets: number;
  totalPortfolioValue: number;
  totalDNAUnits: number;
}

export interface TopPerformer {
  id: string;
  name: string;
  symbol: string;
  change24h: number;
  price: number;
  marketCap: number;
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
    id: 'fcbrwa-enzyme',
    name: 'FCBRWA Enzyme',
    items: 324,
    floorPrice: 0.85,
    totalValue: 275.4,
    image: '/placeholder.svg',
    status: 'active',
    openseaUrl: 'https://opensea.io/collection/fcbrwa-enzyme',
  },
  {
    id: 'fcbc-fun-pass',
    name: 'FCBC Fun Pass',
    items: 156,
    floorPrice: 0.42,
    totalValue: 65.52,
    image: '/placeholder.svg',
    status: 'active',
  },
  {
    id: 'fyre-purebreds',
    name: 'Fyre PureBreeds',
    items: 0,
    floorPrice: 0,
    totalValue: 0,
    image: '/placeholder.svg',
    status: 'coming-soon',
  },
  {
    id: 'fyre-hybrids',
    name: 'Fyre Hybrids',
    items: 0,
    floorPrice: 0,
    totalValue: 0,
    image: '/placeholder.svg',
    status: 'coming-soon',
  },
];

export const mockNFTs: NFT[] = [
  { id: 'nft-1', name: 'Enzyme #0001', collection: 'FCBRWA Enzyme', image: '/placeholder.svg', floorPrice: 2.5, rarity: 'Legendary' },
  { id: 'nft-2', name: 'Enzyme #0042', collection: 'FCBRWA Enzyme', image: '/placeholder.svg', floorPrice: 1.2, rarity: 'Rare' },
  { id: 'nft-3', name: 'Enzyme #0128', collection: 'FCBRWA Enzyme', image: '/placeholder.svg', floorPrice: 0.85, rarity: 'Common' },
  { id: 'nft-4', name: 'Fun Pass #0007', collection: 'FCBC Fun Pass', image: '/placeholder.svg', floorPrice: 0.65, rarity: 'Epic' },
  { id: 'nft-5', name: 'Fun Pass #0089', collection: 'FCBC Fun Pass', image: '/placeholder.svg', floorPrice: 0.42, rarity: 'Common' },
  { id: 'nft-6', name: 'Enzyme #0256', collection: 'FCBRWA Enzyme', image: '/placeholder.svg', floorPrice: 0.9, rarity: 'Uncommon' },
];

export const mockPortfolioStats: PortfolioStats = {
  totalHoldings: 1247,
  nftPreAssets: 480,
  totalPortfolioValue: mockTokens.slice(0, 100).reduce((acc, t) => acc + t.value, 0) + 
    mockNFTCollections.filter(c => c.status === 'active').reduce((acc, c) => acc + c.totalValue, 0),
  totalDNAUnits: 156842,
};

export const topPerformers: TopPerformer[] = [
  { id: '1', name: 'Fyre Alpha', symbol: 'FYRE', change24h: 45.2, price: 0.0234, marketCap: 2340000 },
  { id: '2', name: 'Dragon Scale', symbol: 'DRSC', change24h: 38.7, price: 0.0189, marketCap: 1890000 },
  { id: '3', name: 'Phoenix Rise', symbol: 'PHNX', change24h: 32.1, price: 0.0156, marketCap: 1560000 },
  { id: '4', name: 'Thunder Cat', symbol: 'THDR', change24h: 28.9, price: 0.0142, marketCap: 1420000 },
  { id: '5', name: 'Storm Eagle', symbol: 'STEG', change24h: 25.4, price: 0.0128, marketCap: 1280000 },
  { id: '6', name: 'Frost Wolf', symbol: 'FWLF', change24h: 22.8, price: 0.0115, marketCap: 1150000 },
  { id: '7', name: 'Blaze Lion', symbol: 'BLZN', change24h: 19.5, price: 0.0098, marketCap: 980000 },
  { id: '8', name: 'Shadow Hawk', symbol: 'SHWK', change24h: 17.2, price: 0.0087, marketCap: 870000 },
  { id: '9', name: 'Crystal Bear', symbol: 'CRBR', change24h: 15.8, price: 0.0076, marketCap: 760000 },
  { id: '10', name: 'Venom Snake', symbol: 'VSNK', change24h: 14.1, price: 0.0065, marketCap: 650000 },
];

export const mockChartData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  value: mockPortfolioStats.totalPortfolioValue * (0.8 + Math.random() * 0.4) * (0.9 + i * 0.004),
}));

export const holdingsBreakdown = [
  { name: 'DNA Pre-Assets', value: 55, color: 'hsl(221, 100%, 50%)' },
  { name: 'NFT Pre-Assets', value: 25, color: 'hsl(240, 100%, 60%)' },
  { name: 'Other Holdings', value: 20, color: 'hsl(220, 9%, 46%)' },
];