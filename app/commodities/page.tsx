import Navbar from "../components/Navbar";
import MarketCard from "../components/MarketCard";
import { title } from "process";

type CommodityMarket = {
  title: string;
  price: string;
  change: string;
  positive: boolean;
  sparkline: number[];
  href?: string;
};

type YahooCommodityData = {
  price: string;
  change: string;
  positive: boolean;
  sparkline: number[];
};

function createCommodity(
  title: string,
  data: YahooCommodityData,
  href: string
): CommodityMarket {
  return {
    title,
    price: data.price,
    change: data.change,
    positive: data.positive,
    sparkline: data.sparkline,
    href,
  };
}
async function getYahooCommodity(symbol: string): Promise<YahooCommodityData> {
  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=5d&interval=15m`,
    {
      next: { revalidate: 60 },
    }
  );

  const data = await res.json();
  const meta = data.chart.result[0].meta;
  const rawPrices =
  data.chart.result[0].indicators.quote?.[0]?.close ?? [];

  const prices = rawPrices
    .filter(
      (price: number | null): price is number =>
        typeof price === "number" && Number.isFinite(price)
    )
    .slice(-96);
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


export default async function CommoditiesPage() {
  const [
  gold,
  silver,
  wti,
  naturalGas,
  copper,
  platinum,
  palladium,
  brent,
  heatingOil,
  gasoline,
  corn,
  wheat,
  soybeans,
  soybeanMeal,
  soybeanOil,
  oats,
  roughRice,
  kcWheat,
  liveCattle,
  leanHogs,
  feederCattle,
  coffee,
  cocoa,
  sugar,
  cotton,
  orangeJuice,
  lumber,
  agricultureEtf,
  commodityEtf,
  uraniumEtf,
] = await Promise.all([
  getYahooCommodity("GC=F"),
  getYahooCommodity("SI=F"),
  getYahooCommodity("CL=F"),
  getYahooCommodity("NG=F"),
  getYahooCommodity("HG=F"),
  getYahooCommodity("PL=F"),
  getYahooCommodity("PA=F"),
  getYahooCommodity("BZ=F"),
  getYahooCommodity("HO=F"),
  getYahooCommodity("RB=F"),
  getYahooCommodity("ZC=F"),
  getYahooCommodity("ZW=F"),
  getYahooCommodity("ZS=F"),
  getYahooCommodity("ZM=F"),
  getYahooCommodity("ZL=F"),
  getYahooCommodity("ZO=F"),
  getYahooCommodity("ZR=F"),
  getYahooCommodity("KE=F"),
  getYahooCommodity("LE=F"),
  getYahooCommodity("HE=F"),
  getYahooCommodity("GF=F"),
  getYahooCommodity("KC=F"),
  getYahooCommodity("CC=F"),
  getYahooCommodity("SB=F"),
  getYahooCommodity("CT=F"),
  getYahooCommodity("OJ=F"),
  getYahooCommodity("LBS=F"),
  getYahooCommodity("DBA"),
  getYahooCommodity("DBC"),
  getYahooCommodity("URA"),
]);

  const markets: CommodityMarket[] = [
  createCommodity("🥇 Gold", gold, "/markets/gold"),
  createCommodity("🥈 Silver", silver, "/markets/silver"),
  createCommodity("🛢️ WTI Oil", wti, "/markets/wti"),
  createCommodity("🔥 Natural Gas", naturalGas, "/markets/naturalgas"),
  createCommodity("🔩 Copper", copper, "/markets/copper"),
  createCommodity("⚪ Platinum", platinum, "/markets/platinum"),
  createCommodity("⚙️ Palladium", palladium, "/markets/palladium"),
  createCommodity("🛢️ Brent Oil", brent, "/markets/brent"),
  createCommodity("🔥 Heating Oil", heatingOil, "/markets/heatingoil"),
  createCommodity("⛽ Gasoline", gasoline, "/markets/gasoline"),
  createCommodity("🌽 Corn", corn, "/markets/corn"),
  createCommodity("🌾 Chicago Wheat", wheat, "/markets/wheat"),
  createCommodity("🫘 Soybeans", soybeans, "/markets/soybeans"),
  createCommodity("🫘 Soybean Meal", soybeanMeal, "/markets/soybeanmeal"),
  createCommodity("🫗 Soybean Oil", soybeanOil, "/markets/soybeanoil"),
  createCommodity("🌾 Oats", oats, "/markets/oats"),
  createCommodity("🍚 Rough Rice", roughRice, "/markets/roughrice"),
  createCommodity("🌾 KC Wheat", kcWheat, "/markets/kcwheat"),
  createCommodity("🐄 Live Cattle", liveCattle, "/markets/livecattle"),
  createCommodity("🐖 Lean Hogs", leanHogs, "/markets/leanhogs"),
  createCommodity("🐂 Feeder Cattle", feederCattle, "/markets/feedercattle"),
  createCommodity("☕ Coffee", coffee, "/markets/coffee"),
  createCommodity("🍫 Cocoa", cocoa, "/markets/cocoa"),
  createCommodity("🍬 Sugar", sugar, "/markets/sugar"),
  createCommodity("🧵 Cotton", cotton, "/markets/cotton"),
  createCommodity("🍊 Orange Juice", orangeJuice, "/markets/orangejuice"),
  createCommodity("🪵 Lumber", lumber, "/markets/lumber"),
  createCommodity("🌱 Agriculture ETF", agricultureEtf, "/markets/dba"),
  createCommodity("📦 Commodity ETF", commodityEtf, "/markets/dbc"),
  createCommodity("☢️ Uranium ETF", uraniumEtf, "/markets/ura"),
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
            href={market.href}
          />
        ))}
      </div>
      <Navbar bottom />
    </main>
  );
}