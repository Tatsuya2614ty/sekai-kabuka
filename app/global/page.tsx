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

export default async function GlobalPage() {
    const [nikkei, dax, ftse, hangSeng, euroStoxx, shanghai, shenzhen, kospi, taiwan, nifty50,
        sensex, asx200, singapore, indonesia, malaysia, canada, brazil, mexico, france, italy,
        spain, switzerland, netherlands, sweden, belgium, newZealand, southAfrica, thailand, philippines, vietnam,
    ] = await Promise.all([
        getYahooIndex("%5EN225"),
        getYahooIndex("%5EGDAXI"),
        getYahooIndex("%5EFTSE"),
        getYahooIndex("%5EHSI"),
        getYahooIndex("%5ESTOXX50E"),
        getYahooIndex("000001.SS"),
        getYahooIndex("399001.SZ"),
        getYahooIndex("%5EKS11"),
        getYahooIndex("%5ETWII"),
        getYahooIndex("%5ENSEI"),
        getYahooIndex("%5EBSESN"),
        getYahooIndex("%5EAXJO"),
        getYahooIndex("%5ESTI"),
        getYahooIndex("%5EJKSE"),
        getYahooIndex("%5EKLSE"),
        getYahooIndex("%5EGSPTSE"),
        getYahooIndex("%5EBVSP"),
        getYahooIndex("%5EMXX"),
        getYahooIndex("%5EFCHI"),
        getYahooIndex("FTSEMIB.MI"),
        getYahooIndex("%5EIBEX"),
        getYahooIndex("%5ESSMI"),
        getYahooIndex("%5EAEX"),
        getYahooIndex("%5EOMX"),
        getYahooIndex("%5EBFX"),
        getYahooIndex("ENZL"),
        getYahooIndex("EZA"),
        getYahooIndex("THD"),
        getYahooIndex("EPHE"),
        getYahooIndex("VNM"),
    ]);

    function createMarket(
        title: string,
        data: YahooIndexData,
        href?: string
    ): GlobalMarket {
        return {
            title,
            price: data.price,
            change: data.change,
            positive: data.positive,
            sparkline: data.sparkline,
            href,
        };
    }


    const markets: GlobalMarket[] = [
        createMarket("🇯🇵 Nikkei 225", nikkei, "/markets/nikkei"),
        createMarket("🇩🇪 DAX", dax, "/markets/dax"),
        createMarket("🇬🇧 FTSE 100", ftse, "/markets/ftse"),
        createMarket("🇭🇰 Hang Seng", hangSeng, "/markets/hangseng"),
        createMarket("🇪🇺 Euro Stoxx 50", euroStoxx, "/markets/eurostoxx"),
        createMarket("🇨🇳 Shanghai Composite", shanghai, "/markets/shanghai"),
        createMarket("🇨🇳 Shenzhen Component", shenzhen, "/markets/shenzhen"),
        createMarket("🇰🇷 KOSPI", kospi, "/markets/kospi"),
        createMarket("🇹🇼 Taiwan Weighted", taiwan, "/markets/taiwan"),
        createMarket("🇮🇳 Nifty 50", nifty50, "/markets/nifty50"),
        createMarket("🇮🇳 BSE Sensex", sensex, "/markets/sensex"),
        createMarket("🇦🇺 ASX 200", asx200, "/markets/asx200"),
        createMarket("🇸🇬 Singapore STI", singapore, "/markets/singapore"),
        createMarket("🇮🇩 Jakarta Composite", indonesia, "/markets/indonesia"),
        createMarket("🇲🇾 FTSE Malaysia KLCI", malaysia, "/markets/malaysia"),
        createMarket("🇨🇦 S&P/TSX Composite", canada, "/markets/canada"),
        createMarket("🇧🇷 Bovespa", brazil, "/markets/brazil"),
        createMarket("🇲🇽 IPC Mexico", mexico, "/markets/mexico"),
        createMarket("🇫🇷 CAC 40", france, "/markets/france"),
        createMarket("🇮🇹 FTSE MIB", italy, "/markets/italy"),
        createMarket("🇪🇸 IBEX 35", spain, "/markets/spain"),
        createMarket("🇨🇭 Swiss Market Index", switzerland, "/markets/switzerland"),
        createMarket("🇳🇱 AEX", netherlands, "/markets/netherlands"),
        createMarket("🇸🇪 OMX Stockholm 30", sweden, "/markets/sweden"),
        createMarket("🇧🇪 BEL 20", belgium, "/markets/belgium"),
        createMarket("🇳🇿 New Zealand (ENZL)", newZealand, "/markets/newzealand"),
        createMarket("🇿🇦 South Africa (EZA)", southAfrica, "/markets/southafrica"),
        createMarket("🇹🇭 Thailand (THD)", thailand, "/markets/thailand"),
        createMarket("🇵🇭 Philippines (EPHE)", philippines, "/markets/philippines"),
        createMarket("🇻🇳 Vietnam (VNM)", vietnam, "/markets/vietnam"),
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