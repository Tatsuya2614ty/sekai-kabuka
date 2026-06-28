import Navbar from "../components/Navbar";
import MarketCard from "../components/MarketCard";

export default function ForexPage() {
  return (
    <main>
      <Navbar />
      <h1>Forex</h1>

      <p className="market-status">Forex mood: US dollar stronger today 💵</p>

      <div className="grid">
        <MarketCard
          title="🇺🇸 DXY"
          price="104.25"
          change="+0.4%"
          positive={true}
          sparkline="0,28 20,22 40,24 60,18 80,15 100,12"
          subtext="The US dollar is gaining strength today"
          featured={true}
        />

        <MarketCard
          title="🇺🇸🇯🇵 USD/JPY"
          price="156.80"
          change="+0.3%"
          positive={true}
          sparkline="0,35 20,25 40,30 60,15 80,18 100,8"
        />
        <MarketCard
          title="🇪🇺🇺🇸 EUR/USD"
          price="1.0840"
          change="-0.2%"
          positive={false}
          sparkline="0,30 20,28 40,32 60,26 80,20 100,18"
        />

        <MarketCard
          title="🇬🇧🇺🇸 GBP/USD"
          price="1.2700"
          change="-0.1%"
          positive={false}
          sparkline="0,40 20,35 40,25 60,28 80,18 100,12"
        />
        <MarketCard
          title="🇺🇸🇨🇦 USD/CAD"
          price="1.3650"
          change="+0.2%"
          positive={true}
          sparkline="0,20 20,22 40,18 60,25 80,30 100,38"
        />
      </div>
    </main>
  );
}