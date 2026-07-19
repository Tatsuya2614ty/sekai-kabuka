import Navbar from "../components/Navbar";
import MarketCard from "../components/MarketCard";

type ForexPair = {
  title: string;
  price: string;
  change: string;
  positive: boolean;
  sparkline: number[];
  href: string;
};

type YahooForexData = {
  price: string;
  change: string;
  positive: boolean;
  sparkline: number[];
}

async function getYahooForex(symbol: string): Promise<YahooForexData> {
  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=5m`,
    {
      next: { revalidate: 60 },
    }
  );

  const data = await res.json();
  const meta = data.chart.result[0].meta;
  const prices = data.chart.result[0].indicators.quote[0].close;
  const price = meta.regularMarketPrice.toLocaleString("en-US");
  const changePercent =
    ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100;
  const change = `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`;

  // Return price, change, and chart data
  return {
    price,
    change,
    positive: changePercent >= 0,
    sparkline: prices,
  };
}

export default async function ForexPage() {

  // Get real Forex data from Yahoo Finance
  const [usdjpy, eurusd, gbpusd, usdcad] = await Promise.all([
    getYahooForex("JPY=X"),
    getYahooForex("EURUSD=X"),
    getYahooForex("GBPUSD=X"),
    getYahooForex("CAD=X"),
  ]);

  const pairs: ForexPair[] = [
    {
      title: "🇺🇸🇯🇵 USD/JPY",
      price: usdjpy.price,
      change: usdjpy.change,
      positive: usdjpy.positive,
      sparkline: usdjpy.sparkline,
      href: "/markets/usdjpy",
    },
    {
      title: "🇪🇺🇺🇸 EUR/USD",
      price: eurusd.price,
      change: eurusd.change,
      positive: eurusd.positive,
      sparkline: eurusd.sparkline,
      href: "/markets/eurusd",
    },
    {
      title: "🇬🇧🇺🇸 GBP/USD",
      price: gbpusd.price,
      change: gbpusd.change,
      positive: gbpusd.positive,
      sparkline: gbpusd.sparkline,
      href: "/markets/gbpusd",
    },
    {
      title: "🇺🇸🇨🇦 USD/CAD",
      price: usdcad.price,
      change: usdcad.change,
      positive: usdcad.positive,
      sparkline: usdcad.sparkline,
      href: "/markets/usdcad",
    },
  ];

  return (
    <main>
      <Navbar />
      <div className="grid">

        {pairs.map((pair) => {
          return (
            <MarketCard
              key={pair.title}
              title={pair.title}
              price={pair.price}
              change={pair.change}
              positive={pair.positive}
              sparkline={pair.sparkline}
              href={pair.href}
            />
          );
        })}
      </div>
    </main>
  );
}