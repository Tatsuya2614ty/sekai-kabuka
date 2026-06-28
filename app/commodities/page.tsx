import Navbar from "../components/Navbar";
import MarketCard from "../components/MarketCard";

export default function CommoditiesPage() {
  return (
    <main>
      <Navbar />

      <h1>Commodities</h1>

      <p className="market-status">Gold rises while oil pulls back ⚖️</p>

        <div className="grid">

          <MarketCard
            title="🥇 Gold"
            price="2,420"
            change="+0.8%"
            positive={true}
            subtext="Gold rises as investors seek safety"
            featured={true}
          />

          <MarketCard
            title="🥈 Silver"
            price="31.20"
            change="+0.4%"
            positive={true}
          />

          <MarketCard
            title="🛢️ Oil"
            price="78.50"
            change="-1.2%"
            positive={false}
          />

          <MarketCard
            title="🔥 Natural Gas"
            price="2.84"
            change="+2.6%"
            positive={true}
          />

          <MarketCard
            title="🔩 Copper"
            price="4.62"
            change="+0.7%"
            positive={true}
          />

        </div>
    </main>
  );
}