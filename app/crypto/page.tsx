import Navbar from "../components/Navbar";
import MarketCard from "../components/MarketCard";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
};

export default async function CryptoPage() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,ripple,binancecoin&order=market_cap_desc&sparkline=true&price_change_percentage=24h",
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
            logo={`/crypto/${coin.symbol}.svg`}
            name={coin.name}
            title={
              coin.name.toLowerCase() === coin.symbol.toLowerCase()
                ? ""
                : coin.symbol.toUpperCase()
            }
            price={`$${coin.current_price.toLocaleString()}`}
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