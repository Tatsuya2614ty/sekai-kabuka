import Navbar from "../components/Navbar";
import MarketCard from "../components/MarketCard";

type GlobalMarket = {
    title: string;
    price: string;
    change: string;
    positive: boolean;
    sparkline: number[];
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

export default async function GlobalPage() {
    const [nikkei, dax, ftse, hangSeng, euroStoxx] = await Promise.all([
        getYahooIndex("%5EN225"),
        getYahooIndex("%5EGDAXI"),
        getYahooIndex("%5EFTSE"),
        getYahooIndex("%5EHSI"),
        getYahooIndex("%5ESTOXX50E"),
    ]);

    const markets: GlobalMarket[] = [
        {
            title: "🇯🇵 Nikkei 225",
            price: nikkei.price,
            change: nikkei.change,
            positive: nikkei.positive,
            sparkline: nikkei.sparkline,
            href: "/markets/nikkei",
        },
        {
            title: "🇩🇪 DAX",
            price: dax.price,
            change: dax.change,
            positive: dax.positive,
            sparkline: dax.sparkline,
            href: "/markets/dax",
        },
        {
            title: "🇬🇧 FTSE 100",
            price: ftse.price,
            change: ftse.change,
            positive: ftse.positive,
            sparkline: ftse.sparkline,
            href: "/markets/ftse",
        },
        {
            title: "🇭🇰 Hang Seng",
            price: hangSeng.price,
            change: hangSeng.change,
            positive: hangSeng.positive,
            sparkline: hangSeng.sparkline,
            href: "/markets/hangseng",
        },
        {
            title: "🇪🇺 Euro Stoxx 50",
            price: euroStoxx.price,
            change: euroStoxx.change,
            positive: euroStoxx.positive,
            sparkline: euroStoxx.sparkline,
            href: "/markets/eurostoxx",
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
                        href={market.href}
                    />
                ))}
            </div>
        </main>
    );
}