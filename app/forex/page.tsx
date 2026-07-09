import Navbar from "../components/Navbar";
import MarketCard from "../components/MarketCard";

type ForexPair = {
  title: string;
  symbol: "JPY" | "EUR" | "GBP" | "CAD";
  inverse: boolean;
  href: string;
};

export default async function ForexPage() {
  const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=JPY,EUR,GBP,CAD", {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  const previousRes = await fetch(
    `https://api.frankfurter.app/2026-06-25?from=USD&to=JPY,EUR,GBP,CAD`,
    {
      next: { revalidate: 60 },
    }
  );

  const previousData = await previousRes.json();
  const changes = {
    JPY:
      ((data.rates.JPY - previousData.rates.JPY) /
        previousData.rates.JPY) *
      100,

    EUR:
      ((1 / data.rates.EUR - 1 / previousData.rates.EUR) /
        (1 / previousData.rates.EUR)) *
      100,

    GBP:
      ((1 / data.rates.GBP - 1 / previousData.rates.GBP) /
        (1 / previousData.rates.GBP)) *
      100,

    CAD:
      ((data.rates.CAD - previousData.rates.CAD) /
        previousData.rates.CAD) *
      100,
  };

  const pairs: ForexPair[] = [
    {
      title: "🇺🇸🇯🇵 USD/JPY",
      symbol: "JPY",
      inverse: false,
      href: "/markets/usdjpy",
    },
    {
      title: "🇪🇺🇺🇸 EUR/USD",
      symbol: "EUR",
      inverse: true,
      href: "/markets/eurusd",
    },
    {
      title: "🇬🇧🇺🇸 GBP/USD",
      symbol: "GBP",
      inverse: true,
      href: "/markets/gbpusd",
    },
    {
      title: "🇺🇸🇨🇦 USD/CAD",
      symbol: "CAD",
      inverse: false,
      href: "/markets/usdcad",
    },
  ];

  return (
    <main>
      <Navbar />
      <h1>Forex</h1>

      <div className="grid">

        {pairs.map((pair) => {
          const rawRate = data.rates[pair.symbol];
          const displayRate = pair.inverse ? 1 / rawRate : rawRate;
          const decimals = pair.symbol === "JPY" ? 2 : 4;
          const change = changes[pair.symbol];

          return (
            <MarketCard
              key={pair.symbol}
              title={pair.title}
              price={displayRate.toFixed(decimals)}
              change={`${change.toFixed(2)}%`}
              positive={change >= 0}
              href={pair.href}
            />
          );
        })}
      </div>
    </main>
  );
}