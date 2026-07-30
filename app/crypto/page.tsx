import Navbar from "../components/Navbar";
import MarketCard from "../components/MarketCard";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
};

const coinIds = [
  "bitcoin",
  "ethereum",
  "solana",
  "ripple",
  "binancecoin",
  "cardano",
  "dogecoin",
  "tron",
  "chainlink",
  "avalanche-2",
  "stellar",
  "sui",
  "hedera-hashgraph",
  "litecoin",
  "shiba-inu",
  "polkadot",
  "bitcoin-cash",
  "uniswap",
  "pepe",
  "near",
  "aave",
  "aptos",
  "internet-computer",
  "crypto-com-chain",
  "bittensor",
  "arbitrum",
  "render-token",
  "cosmos",
  "filecoin",
  "optimism",
].join(",");

function formatCryptoPrice(price: number): string {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: price < 1 ? 2 : 0,
    maximumFractionDigits:
      price < 0.01
        ? 8
        : price < 1
          ? 4
          : 2,
  });
}

export default async function CryptoPage() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`,
    {
      next: { revalidate: 60 },
    }
  );

  const coins: Coin[] = await res.json();
 
  return (
    <main>
      <Navbar />

      <div className="grid">

        {coins.map((coin: Coin) => (
          <MarketCard
            key={coin.id}
            logo={coin.image}
            name={coin.name}
            title={
              coin.name.toLowerCase() === coin.symbol.toLowerCase()
                ? ""
                : coin.symbol.toUpperCase()
            }
            price={`$${formatCryptoPrice(coin.current_price)}`}
            change={`${coin.price_change_percentage_24h.toFixed(2)}%`}
            positive={coin.price_change_percentage_24h >= 0}
            sparkline={coin.sparkline_in_7d.price}
            href={`/markets/${coin.id}`}

          />
        ))}

      </div>
      <Navbar bottom />
    </main>
  );
}