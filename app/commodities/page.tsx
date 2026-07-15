import Navbar from "../components/Navbar";
import MarketCard from "../components/MarketCard";

type CommodityMarket = {
  title: string;
  price: string;
  change: string;
  positive: boolean;
  href?: string;
};

type YahooCommodityData = {
  price: string;
  change: string;
  positive: boolean;
};

async function getYahooCommodity(symbol: string): Promise<YahooCommodityData> {
  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
    {
      next: { revalidate: 60 },
    }
  );

  const data = await res.json();
  const meta = data.chart.result[0].meta;

  const price = meta.regularMarketPrice.toLocaleString("en-US");

  const changePercent =
    ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100;

  const change = `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`;

  return {
    price,
    change,
    positive: changePercent >= 0,
  };
}


export default async function CommoditiesPage() {
  const [gold, silver, wti, naturalGas, copper] = await Promise.all([
    getYahooCommodity("GC=F"),
    getYahooCommodity("SI=F"),
    getYahooCommodity("CL=F"),
    getYahooCommodity("NG=F"),
    getYahooCommodity("HG=F"),
  ]);

  const markets: CommodityMarket[] = [
    {
      title: "🥇 Gold",
      price: gold.price,
      change: gold.change,
      positive: gold.positive,
      href: "/markets/gold",
    },
    {
      title: "🥈 Silver",
      price: silver.price,
      change: silver.change,
      positive: silver.positive,
      href: "/markets/silver",
    },
    {
      title: "🛢️ WTI Oil",
      price: wti.price,
      change: wti.change,
      positive: wti.positive,
      href: "/markets/wti",
    },
    {
      title: "🔥 Natural Gas",
      price: naturalGas.price,
      change: naturalGas.change,
      positive: naturalGas.positive,
      href: "/markets/naturalgas",
    },
    {
      title: "🔩 Copper",
      price: copper.price,
      change: copper.change,
      positive: copper.positive,
      href: "/markets/copper",
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
            href={market.href}
          />
        ))}
      </div>
    </main>
  );
}