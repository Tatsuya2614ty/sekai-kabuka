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

async function getYahooForex(symbol: string): Promise<YahooForexData> {
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
  const [
    usdjpy,
    eurusd,
    gbpusd,
    usdcad,
    audusd,
    nzdusd,
    usdchf,
    usdtry,
    usdkrw,
    usdcny,
    usdhkd,
    usdtwd,
    usdsgd,
    usdthb,
    usdmyr,
    usdphp,
    usdmxn,
    usdars,
    usdbrl,
    usdrub,
    usdinr,
    usdidr,
    usdvnd,
    usdzar,
    usdpln,
    usdsek,
    usdnok,
    usddkk,
    usdczk,
    usdhuf,
  ] = await Promise.all([
    getYahooForex("JPY=X"),
    getYahooForex("EURUSD=X"),
    getYahooForex("GBPUSD=X"),
    getYahooForex("CAD=X"),
    getYahooForex("AUDUSD=X"),
    getYahooForex("NZDUSD=X"),
    getYahooForex("CHF=X"),
    getYahooForex("TRY=X"),
    getYahooForex("KRW=X"),
    getYahooForex("CNY=X"),
    getYahooForex("HKD=X"),
    getYahooForex("TWD=X"),
    getYahooForex("SGD=X"),
    getYahooForex("THB=X"),
    getYahooForex("MYR=X"),
    getYahooForex("PHP=X"),
    getYahooForex("MXN=X"),
    getYahooForex("ARS=X"),
    getYahooForex("BRL=X"),
    getYahooForex("RUB=X"),
    getYahooForex("INR=X"),
    getYahooForex("IDR=X"),
    getYahooForex("VND=X"),
    getYahooForex("ZAR=X"),
    getYahooForex("PLN=X"),
    getYahooForex("SEK=X"),
    getYahooForex("NOK=X"),
    getYahooForex("DKK=X"),
    getYahooForex("CZK=X"),
    getYahooForex("HUF=X"),
  ]);

  const pairs: ForexPair[] = [
    createPair("🇺🇸🇯🇵 USD/JPY", usdjpy, "/markets/usdjpy"),
    createPair("🇪🇺🇺🇸 EUR/USD", eurusd, "/markets/eurusd"),
    createPair("🇬🇧🇺🇸 GBP/USD", gbpusd, "/markets/gbpusd"),
    createPair("🇺🇸🇨🇦 USD/CAD", usdcad, "/markets/usdcad"),
    createPair("🇦🇺🇺🇸 AUD/USD", audusd, "/markets/audusd"),
    createPair("🇳🇿🇺🇸 NZD/USD", nzdusd, "/markets/nzdusd"),
    createPair("🇺🇸🇨🇭 USD/CHF", usdchf, "/markets/usdchf"),
    createPair("🇺🇸🇹🇷 USD/TRY", usdtry, "/markets/usdtry"),
    createPair("🇺🇸🇰🇷 USD/KRW", usdkrw, "/markets/usdkrw"),
    createPair("🇺🇸🇨🇳 USD/CNY", usdcny, "/markets/usdcny"),
    createPair("🇺🇸🇭🇰 USD/HKD", usdhkd, "/markets/usdhkd"),
    createPair("🇺🇸🇹🇼 USD/TWD", usdtwd, "/markets/usdtwd"),
    createPair("🇺🇸🇸🇬 USD/SGD", usdsgd, "/markets/usdsgd"),
    createPair("🇺🇸🇹🇭 USD/THB", usdthb, "/markets/usdthb"),
    createPair("🇺🇸🇲🇾 USD/MYR", usdmyr, "/markets/usdmyr"),
    createPair("🇺🇸🇵🇭 USD/PHP", usdphp, "/markets/usdphp"),
    createPair("🇺🇸🇲🇽 USD/MXN", usdmxn, "/markets/usdmxn"),
    createPair("🇺🇸🇦🇷 USD/ARS", usdars, "/markets/usdars"),
    createPair("🇺🇸🇧🇷 USD/BRL", usdbrl, "/markets/usdbrl"),
    createPair("🇺🇸🇷🇺 USD/RUB", usdrub, "/markets/usdrub"),
    createPair("🇺🇸🇮🇳 USD/INR", usdinr, "/markets/usdinr"),
    createPair("🇺🇸🇮🇩 USD/IDR", usdidr, "/markets/usdidr"),
    createPair("🇺🇸🇻🇳 USD/VND", usdvnd, "/markets/usdvnd"),
    createPair("🇺🇸🇿🇦 USD/ZAR", usdzar, "/markets/usdzar"),
    createPair("🇺🇸🇵🇱 USD/PLN", usdpln, "/markets/usdpln"),
    createPair("🇺🇸🇸🇪 USD/SEK", usdsek, "/markets/usdsek"),
    createPair("🇺🇸🇳🇴 USD/NOK", usdnok, "/markets/usdnok"),
    createPair("🇺🇸🇩🇰 USD/DKK", usddkk, "/markets/usddkk"),
    createPair("🇺🇸🇨🇿 USD/CZK", usdczk, "/markets/usdczk"),
    createPair("🇺🇸🇭🇺 USD/HUF", usdhuf, "/markets/usdhuf"),
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