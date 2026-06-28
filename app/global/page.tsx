import Navbar from "../components/Navbar";
import MarketCard from "../components/MarketCard";

export default function GlobalPage() {
    return (
        <main>
            <Navbar />
            <h1>Global Markets</h1>

            <p className="market-status">Global sentiment: Mixed 🌍</p>

            <div className="grid">

                <MarketCard
                    title="🇯🇵 Nikkei 225"
                    price="38,420"
                    change="+0.9%"
                    positive={true}
                    subtext="Asia markets are slightly higher"
                    featured={true}
                />

                <MarketCard
                    title="🇩🇪 DAX"
                    price="18,210"
                    change="-0.4%"
                    positive={false}
                />

                <MarketCard
                    title="🇬🇧 FTSE 100"
                    price="8,120"
                    change="+0.2%"
                    positive={true}
                />

                <MarketCard
                    title="🇭🇰 Hang Seng"
                    price="18,660"
                    change="-0.7%"
                    positive={false}
                />

                <MarketCard
                    title="🇪🇺 Euro Stoxx 50"
                    price="4,980"
                    change="+0.1%"
                    positive={true}
                />

            </div>
        </main>
    );
}