import Navbar from "./components/Navbar";
import MarketCard from "./components/MarketCard";

type USMarket = {
  title: string;
  price: string;
  change: string;
  positive: boolean;
  sparkline: number[];
  featured?: boolean;
  customClass?: string;
  href?: string;
};
type YahooIndexData = {
  price: string;
  change: string;
  positive: boolean;
  sparkline: number[];
};

async function getYahooIndex(symbol: string): Promise<YahooIndexData> {
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

  return {
    price,
    change,
    positive: changePercent >= 0,
    sparkline: prices,
  };
}

export default async function Home() {
  const [sp500, nasdaq, dow, russell, vix, us10y] = await Promise.all([
    getYahooIndex("%5EGSPC"),
    getYahooIndex("%5EIXIC"),
    getYahooIndex("%5EDJI"),
    getYahooIndex("%5ERUT"),
    getYahooIndex("%5EVIX"),
    getYahooIndex("%5ETNX"),
  ]);

  const markets: USMarket[] = [

    {
      title: "🇺🇸 S&P 500",
      price: sp500.price,
      change: sp500.change,
      positive: sp500.positive,
      sparkline: sp500.sparkline,
      featured: true,
      href: "/markets/sp500",
    },
    {
      title: "🇺🇸 Nasdaq",
      price: nasdaq.price,
      change: nasdaq.change,
      positive: nasdaq.positive,
      sparkline: nasdaq.sparkline,
      href: "/markets/nasdaq",
    },
    {
      title: "🇺🇸 Dow Jones",
      price: dow.price,
      change: dow.change,
      positive: dow.positive,
      sparkline: dow.sparkline,
      href: "/markets/dow",
    },
    {
      title: "🇺🇸 Russell 2000",
      price: russell.price,
      change: russell.change,
      positive: russell.positive,
      sparkline: russell.sparkline,
      href: "/markets/russell",
    },
    {
      title: "🇺🇸 VIX",
      price: vix.price,
      change: vix.change,
      positive: vix.positive,
      sparkline: vix.sparkline,
      customClass: "fear",
      href: "/markets/vix",
    },
    {
      title: "🇺🇸 US 10Y",
      price: us10y.price,
      change: us10y.change,
      positive: us10y.positive,
      sparkline: us10y.sparkline,
      href: "/markets/us10y",
    },
  ];
  return (
    <main>
      <Navbar />

      <div className="grid">

        {markets.map((market) => (
          <MarketCard
            key={market.title}
            title={market.title}
            price={market.price}
            change={market.change}
            positive={market.positive}
            sparkline={market.sparkline}
            featured={market.featured}
            customClass={market.customClass}
            href={market.href}
          />
        ))}
      </div>
    </main>
  );
}