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
  const [usdjpy, eurusd, gbpusd, usdcad, audusd, nzdusd, usdchf, eurjpy, gbpjpy, audjpy,
    eurgbp, eurchf, euraud, eurnzd, gbpaud, gbpnzd, gbpchf, audnzd, audcad, audchf,
    nzdjpy, nzdcad, nzdchf, cadjpy, cadchf, chfjpy, eurcad, gbpcad, usdcny, usdhkd,
  ] = await Promise.all([
    getYahooForex("JPY=X"),
    getYahooForex("EURUSD=X"),
    getYahooForex("GBPUSD=X"),
    getYahooForex("CAD=X"),
    getYahooForex("AUDUSD=X"),
    getYahooForex("NZDUSD=X"),
    getYahooForex("CHF=X"),
    getYahooForex("EURJPY=X"),
    getYahooForex("GBPJPY=X"),
    getYahooForex("AUDJPY=X"),
    getYahooForex("EURGBP=X"),
    getYahooForex("EURCHF=X"),
    getYahooForex("EURAUD=X"),
    getYahooForex("EURNZD=X"),
    getYahooForex("GBPAUD=X"),
    getYahooForex("GBPNZD=X"),
    getYahooForex("GBPCHF=X"),
    getYahooForex("AUDNZD=X"),
    getYahooForex("AUDCAD=X"),
    getYahooForex("AUDCHF=X"),
    getYahooForex("NZDJPY=X"),
    getYahooForex("NZDCAD=X"),
    getYahooForex("NZDCHF=X"),
    getYahooForex("CADJPY=X"),
    getYahooForex("CADCHF=X"),
    getYahooForex("CHFJPY=X"),
    getYahooForex("EURCAD=X"),
    getYahooForex("GBPCAD=X"),
    getYahooForex("CNY=X"),
    getYahooForex("HKD=X"),
  ]);

  function createPair(
    title: string,
    data: YahooForexData,
    href: string
  ): ForexPair {
    return {
      title,
      price: data.price,
      change: data.change,
      positive: data.positive,
      sparkline: data.sparkline,
      href,
    };
  }
  const pairs: ForexPair[] = [
    createPair("🇺🇸🇯🇵 USD/JPY", usdjpy, "/markets/usdjpy"),
    createPair("🇪🇺🇺🇸 EUR/USD", eurusd, "/markets/eurusd"),
    createPair("🇬🇧🇺🇸 GBP/USD", gbpusd, "/markets/gbpusd"),
    createPair("🇺🇸🇨🇦 USD/CAD", usdcad, "/markets/usdcad"),
    createPair("🇦🇺🇺🇸 AUD/USD", audusd, "/markets/audusd"),
    createPair("🇳🇿🇺🇸 NZD/USD", nzdusd, "/markets/nzdusd"),
    createPair("🇺🇸🇨🇭 USD/CHF", usdchf, "/markets/usdchf"),
    createPair("🇪🇺🇯🇵 EUR/JPY", eurjpy, "/markets/eurjpy"),
    createPair("🇬🇧🇯🇵 GBP/JPY", gbpjpy, "/markets/gbpjpy"),
    createPair("🇦🇺🇯🇵 AUD/JPY", audjpy, "/markets/audjpy"),
    createPair("🇪🇺🇬🇧 EUR/GBP", eurgbp, "/markets/eurgbp"),
    createPair("🇪🇺🇨🇭 EUR/CHF", eurchf, "/markets/eurchf"),
    createPair("🇪🇺🇦🇺 EUR/AUD", euraud, "/markets/euraud"),
    createPair("🇪🇺🇳🇿 EUR/NZD", eurnzd, "/markets/eurnzd"),
    createPair("🇬🇧🇦🇺 GBP/AUD", gbpaud, "/markets/gbpaud"),
    createPair("🇬🇧🇳🇿 GBP/NZD", gbpnzd, "/markets/gbpnzd"),
    createPair("🇬🇧🇨🇭 GBP/CHF", gbpchf, "/markets/gbpchf"),
    createPair("🇦🇺🇳🇿 AUD/NZD", audnzd, "/markets/audnzd"),
    createPair("🇦🇺🇨🇦 AUD/CAD", audcad, "/markets/audcad"),
    createPair("🇦🇺🇨🇭 AUD/CHF", audchf, "/markets/audchf"),
    createPair("🇳🇿🇯🇵 NZD/JPY", nzdjpy, "/markets/nzdjpy"),
    createPair("🇳🇿🇨🇦 NZD/CAD", nzdcad, "/markets/nzdcad"),
    createPair("🇳🇿🇨🇭 NZD/CHF", nzdchf, "/markets/nzdchf"),
    createPair("🇨🇦🇯🇵 CAD/JPY", cadjpy, "/markets/cadjpy"),
    createPair("🇨🇦🇨🇭 CAD/CHF", cadchf, "/markets/cadchf"),
    createPair("🇨🇭🇯🇵 CHF/JPY", chfjpy, "/markets/chfjpy"),
    createPair("🇪🇺🇨🇦 EUR/CAD", eurcad, "/markets/eurcad"),
    createPair("🇬🇧🇨🇦 GBP/CAD", gbpcad, "/markets/gbpcad"),
    createPair("🇺🇸🇨🇳 USD/CNY", usdcny, "/markets/usdcny"),
    createPair("🇺🇸🇭🇰 USD/HKD", usdhkd, "/markets/usdhkd"),
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
      <Navbar bottom />
    </main>
  );
}