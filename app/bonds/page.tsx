import Navbar from "../components/Navbar";
import MarketCard from "../components/MarketCard";

type BondMarket = {
    title: string;
    price: string;
    change: string;
    positive: boolean;
    sparkline: number[];
    href?: string;
};

type BondData = {
    price: string;
    change: string;
    positive: boolean;
    sparkline: number[];
};

function createBond(
    title: string,
    data: BondData,
    href: string

): BondMarket {
    return {
        title,
        price: data.price,
        change: data.change,
        positive: data.positive,
        sparkline: data.sparkline,
        href,
    };
}

async function getYahooBond(symbol: string): Promise<BondData> {
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
    const price = `${meta.regularMarketPrice.toLocaleString("en-US")}%`;

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

async function getFredBond(
    seriesId: string
): Promise<BondData> {

    // 1 Fetch the CSV
    const res = await fetch(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${seriesId}`,
        {
            next: { revalidate: 86400 },
        }
    );

    // 2 Check the response
    if (!res.ok) {
        throw new Error(`Failed to load ${seriesId}`);
    }

    // 3 Read it as text
    const csv = await res.text();

    // 4 Convert the CSV into number
    const prices = csv
        .trim()
        .split("\n")
        .slice(1)
        .map((row) => Number(row.split(",")[1]))
        .filter((price) => Number.isFinite(price));

    if (prices.length < 2) {
        throw new Error(`Insufficient data for ${seriesId}`);
    }

    // 5 Calculate the change
    const currentPrice = prices[prices.length - 1];
    const previousPrice = prices[prices.length - 2];

    const changePercent =
        ((currentPrice - previousPrice) / previousPrice) * 100;

    // 6 Return standardized data
    return {
        price: `${currentPrice.toFixed(3)}%`,
        change: `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`,
        positive: changePercent >= 0,
        sparkline: prices.slice(-24),
    };
}

export default async function BondsPage() {
    const [
        us3m,
        us5y,
        us10y,
        us30y,
        japan10y,
        germany10y,
        uk10y,
        france10y,
        canada10y,
        australia10y,
    ] = await Promise.all([
        getYahooBond("%5EIRX"),
        getYahooBond("%5EFVX"),
        getYahooBond("%5ETNX"),
        getYahooBond("%5ETYX"),
        getFredBond("IRLTLT01JPM156N"),
        getFredBond("IRLTLT01DEM156N"),
        getFredBond("IRLTLT01GBM156N"),
        getFredBond("IRLTLT01FRM156N"),
        getFredBond("IRLTLT01CAM156N"),
        getFredBond("IRLTLT01AUM156N"),
    ]);

    const bonds: BondMarket[] = [
        createBond("🇺🇸 US 13-Week Treasury Bill", us3m, "/markets/us3m"),
        createBond("🇺🇸 US 5-Year Treasury Yield", us5y, "/markets/us5y"),
        createBond("🇺🇸 US 10-Year Treasury Yield", us10y, "/markets/us10y"),
        createBond("🇺🇸 US 30-Year Treasury Yield", us30y, "/markets/us30y"),
        createBond("🇯🇵 Japan 10-Year Bond Yield", japan10y, "/markets/japan10y"),
        createBond("🇩🇪 Germany 10-Year Bond Yield", germany10y, "/markets/germany10y"),
        createBond("🇬🇧 UK 10-Year Bond Yield", uk10y, "/markets/uk10y"),
        createBond("🇫🇷 France 10-Year Bond Yield", france10y, "/markets/france10y"),
        createBond("🇨🇦 Canada 10-Year Bond Yield", canada10y, "/markets/canada10y"),
        createBond("🇦🇺 Australia 10-Year Bond Yield", australia10y, "/markets/australia10y"),
    ];

    return (
        <main>
            <Navbar />

            <div className="grid">
                {bonds.map((bond) => (
                    <MarketCard
                        key={bond.title}
                        title={bond.title}
                        price={bond.price}
                        change={bond.change}
                        positive={bond.positive}
                        sparkline={bond.sparkline}
                        href={bond.href}
                    />
                ))}
            </div>
            <Navbar bottom />
        </main>
    );
}

