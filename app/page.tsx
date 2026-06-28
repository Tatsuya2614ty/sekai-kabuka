import Navbar from "./components/Navbar";
import MarketCard from "./components/MarketCard";

export default function Home() {
  return (
    <main>
      <Navbar />

      <h1>World Market Dashboard</h1>

      <p className="market-status">
        Track stocks, forex, crypto, and commodities in one place.
      </p>

      <div className="grid">

        <MarketCard
          title="🇺🇸 S&P 500"
          price="5,320"
          change="+1.2%"
          positive={true}
          subtext="US market remains strong today"
          featured={true}
        />

        <MarketCard
          title="🇺🇸 Nasdaq"
          price="18,420"
          change="+0.8%"
          positive={true}
        />

        <MarketCard
          title="🇺🇸 Dow Jones"
          price="42,130"
          change="-0.3%"
          positive={false}
        />

        <MarketCard
          title="🇺🇸 US 10Y"
          price="4.544"
          change="+1.86%"
          positive={true}
        />

        <MarketCard
          title="🇺🇸 Russell 2000"
          price="2,863"
          change="+0.67%"
          positive={true}
        />

        <MarketCard
          title="🇺🇸 VIX"
          price="18.45"
          change="-2.1%"
          positive={false}
          customClass="fear"
        />

      </div>
    </main>
  );
}