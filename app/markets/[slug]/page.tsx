"use client";

import { use, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";

const marketConfig = {
    sp500: {
        title: "S&P 500",
        tradingViewSymbol: "OANDA:SPX500USD",
    },
    nasdaq: {
        title: "Nasdaq 100 (QQQ)",
        tradingViewSymbol: "NASDAQ:QQQ",
    },
    sox: {
        title: "PHLX Semiconductor Index (SOXQ)",
        tradingViewSymbol: "NASDAQ:SOXQ",
    },
    dow: {
        title: "Dow Jones (DIA)",
        tradingViewSymbol: "AMEX:DIA",
    },
    russell: {
        title: "Russell 2000 (IWM)",
        tradingViewSymbol: "AMEX:IWM",
    },
    vix: {
        title: "VIX",
        tradingViewSymbol: "TVC:VIX",
    },
    us10y: {
        title: "US 10Y Treasury Yield",
        tradingViewSymbol: "TVC:US10Y",
    },
    nasdaq100: {
        title: "Nasdaq 100 ETF (QQQ)",
        tradingViewSymbol: "NASDAQ:QQQ",
    },
    sp100: {
        title: "S&P 100 ETF (OEF)",
        tradingViewSymbol: "AMEX:OEF",
    },

    spmidcap400: {
        title: "S&P MidCap 400",
        tradingViewSymbol: "SP:MID",
    },

    spsmallcap600: {
        title: "S&P SmallCap 600 ETF (IJR)",
        tradingViewSymbol: "AMEX:IJR",
    },

    nysecomposite: {
        title: "US Total Market ETF (VTI)",
        tradingViewSymbol: "AMEX:VTI",
    },
    dowtransportation: {
        title: "Transportation ETF (IYT)",
        tradingViewSymbol: "AMEX:IYT",
    },

    technology: {
        title: "Technology Select Sector SPDR Fund (XLK)",
        tradingViewSymbol: "AMEX:XLK",
    },

    financials: {
        title: "Financial Select Sector SPDR Fund (XLF)",
        tradingViewSymbol: "AMEX:XLF",
    },

    healthcare: {
        title: "Health Care Select Sector SPDR Fund (XLV)",
        tradingViewSymbol: "AMEX:XLV",
    },

    energy: {
        title: "Energy Select Sector SPDR Fund (XLE)",
        tradingViewSymbol: "AMEX:XLE",
    },

    industrials: {
        title: "Industrial Select Sector SPDR Fund (XLI)",
        tradingViewSymbol: "AMEX:XLI",
    },

    consumerdiscretionary: {
        title: "Consumer Discretionary Select Sector SPDR Fund (XLY)",
        tradingViewSymbol: "AMEX:XLY",
    },

    consumerstaples: {
        title: "Consumer Staples Select Sector SPDR Fund (XLP)",
        tradingViewSymbol: "AMEX:XLP",
    },

    utilities: {
        title: "Utilities Select Sector SPDR Fund (XLU)",
        tradingViewSymbol: "AMEX:XLU",
    },

    materials: {
        title: "Materials Select Sector SPDR Fund (XLB)",
        tradingViewSymbol: "AMEX:XLB",
    },

    realestate: {
        title: "Real Estate Select Sector SPDR Fund (XLRE)",
        tradingViewSymbol: "AMEX:XLRE",
    },

    communicationservices: {
        title: "Communication Services Select Sector SPDR Fund (XLC)",
        tradingViewSymbol: "AMEX:XLC",
    },
    totalmarket: {
        title: "Vanguard Total Stock Market ETF (VTI)",
        tradingViewSymbol: "AMEX:VTI",
    },

    equalweight: {
        title: "Invesco S&P 500 Equal Weight ETF (RSP)",
        tradingViewSymbol: "AMEX:RSP",
    },

    magnificentseven: {
        title: "Roundhill Magnificent Seven ETF (MAGS)",
        tradingViewSymbol: "CBOE:MAGS",
    },

    regionalbanks: {
        title: "SPDR S&P Regional Banking ETF (KRE)",
        tradingViewSymbol: "AMEX:KRE",
    },

    biotechnology: {
        title: "SPDR S&P Biotechnology ETF (XBI)",
        tradingViewSymbol: "AMEX:XBI",
    },

    innovation: {
        title: "ARK Innovation ETF (ARKK)",
        tradingViewSymbol: "AMEX:ARKK",
    },
    bitcoin: {
        title: "Bitcoin",
        tradingViewSymbol: "BINANCE:BTCUSDT",
    },
    ethereum: {
        title: "Ethereum",
        tradingViewSymbol: "BINANCE:ETHUSDT",
    },
    solana: {
        title: "Solana",
        tradingViewSymbol: "BINANCE:SOLUSDT",
    },
    ripple: {
        title: "XRP",
        tradingViewSymbol: "BINANCE:XRPUSDT",
    },
    binancecoin: {
        title: "BNB",
        tradingViewSymbol: "BINANCE:BNBUSDT",
    },
    cardano: {
        title: "Cardano",
        tradingViewSymbol: "BINANCE:ADAUSDT",
    },
    dogecoin: {
        title: "Dogecoin",
        tradingViewSymbol: "BINANCE:DOGEUSDT",
    },
    tron: {
        title: "TRON",
        tradingViewSymbol: "BINANCE:TRXUSDT",
    },
    chainlink: {
        title: "Chainlink",
        tradingViewSymbol: "BINANCE:LINKUSDT",
    },
    "avalanche-2": {
        title: "Avalanche",
        tradingViewSymbol: "BINANCE:AVAXUSDT",
    },
    stellar: {
        title: "Stellar",
        tradingViewSymbol: "BINANCE:XLMUSDT",
    },
    sui: {
        title: "Sui",
        tradingViewSymbol: "BINANCE:SUIUSDT",
    },
    "hedera-hashgraph": {
        title: "Hedera",
        tradingViewSymbol: "BINANCE:HBARUSDT",
    },
    litecoin: {
        title: "Litecoin",
        tradingViewSymbol: "BINANCE:LTCUSDT",
    },
    "shiba-inu": {
        title: "Shiba Inu",
        tradingViewSymbol: "BINANCE:SHIBUSDT",
    },
    polkadot: {
        title: "Polkadot",
        tradingViewSymbol: "BINANCE:DOTUSDT",
    },
    "bitcoin-cash": {
        title: "Bitcoin Cash",
        tradingViewSymbol: "BINANCE:BCHUSDT",
    },
    uniswap: {
        title: "Uniswap",
        tradingViewSymbol: "BINANCE:UNIUSDT",
    },
    pepe: {
        title: "Pepe",
        tradingViewSymbol: "BINANCE:PEPEUSDT",
    },
    near: {
        title: "NEAR Protocol",
        tradingViewSymbol: "BINANCE:NEARUSDT",
    },
    aave: {
        title: "Aave",
        tradingViewSymbol: "BINANCE:AAVEUSDT",
    },
    aptos: {
        title: "Aptos",
        tradingViewSymbol: "BINANCE:APTUSDT",
    },
    "internet-computer": {
        title: "Internet Computer",
        tradingViewSymbol: "BINANCE:ICPUSDT",
    },
    "crypto-com-chain": {
        title: "Cronos",
        tradingViewSymbol: "COINBASE:CROUSD",
    },
    bittensor: {
        title: "Bittensor",
        tradingViewSymbol: "BINANCE:TAOUSDT",
    },
    arbitrum: {
        title: "Arbitrum",
        tradingViewSymbol: "BINANCE:ARBUSDT",
    },
    "render-token": {
        title: "Render",
        tradingViewSymbol: "BINANCE:RENDERUSDT",
    },
    cosmos: {
        title: "Cosmos Hub",
        tradingViewSymbol: "BINANCE:ATOMUSDT",
    },
    filecoin: {
        title: "Filecoin",
        tradingViewSymbol: "BINANCE:FILUSDT",
    },
    optimism: {
        title: "Optimism",
        tradingViewSymbol: "BINANCE:OPUSDT",
    },
    nikkei: {
        title: "Nikkei 225",
        tradingViewSymbol: "OSE:NK2251!",
    },
    dax: {
        title: "DAX",
        tradingViewSymbol: "XETR:DAX",
    },
    ftse: {
        title: "FTSE 100",
        tradingViewSymbol: "CAPITALCOM:UK100",
    },
    hangseng: {
        title: "Hang Seng",
        tradingViewSymbol: "HSI:HSI",
    },
    eurostoxx: {
        title: "Euro Stoxx 50",
        tradingViewSymbol: "CAPITALCOM:EU50",
    },
    shanghai: {
        title: "Shanghai Composite",
        tradingViewSymbol: "SSE:000001",
    },
    shenzhen: {
        title: "Shenzhen Component",
        tradingViewSymbol: "SZSE:399001",
    },
    kospi: {
        title: "KOSPI — EWY ETF Proxy",
        tradingViewSymbol: "AMEX:EWY",
    },
    taiwan: {
        title: "Taiwan Weighted — EWT ETF Proxy",
        tradingViewSymbol: "AMEX:EWT",
    },
    nifty50: {
        title: "Nifty 50 — INDY ETF Proxy",
        tradingViewSymbol: "NASDAQ:INDY",
    },
    sensex: {
        title: "BSE Sensex — INDA ETF Proxy",
        tradingViewSymbol: "AMEX:INDA",
    },
    asx200: {
        title: "ASX 200 — EWA ETF Proxy",
        tradingViewSymbol: "AMEX:EWA",
    },
    singapore: {
        title: "Singapore STI — EWS ETF Proxy",
        tradingViewSymbol: "AMEX:EWS",
    },
    indonesia: {
        title: "Jakarta Composite — EIDO ETF Proxy",
        tradingViewSymbol: "AMEX:EIDO",
    },
    malaysia: {
        title: "Malaysia KLCI — EWM ETF Proxy",
        tradingViewSymbol: "AMEX:EWM",
    },
    canada: {
        title: "S&P/TSX Composite — EWC ETF Proxy",
        tradingViewSymbol: "AMEX:EWC",
    },
    brazil: {
        title: "Bovespa — EWZ ETF Proxy",
        tradingViewSymbol: "AMEX:EWZ",
    },
    mexico: {
        title: "IPC Mexico — EWW ETF Proxy",
        tradingViewSymbol: "AMEX:EWW",
    },
    france: {
        title: "CAC 40 — EWQ ETF Proxy",
        tradingViewSymbol: "AMEX:EWQ",
    },
    italy: {
        title: "FTSE MIB — EWI ETF Proxy",
        tradingViewSymbol: "AMEX:EWI",
    },
    spain: {
        title: "IBEX 35 — EWP ETF Proxy",
        tradingViewSymbol: "AMEX:EWP",
    },
    switzerland: {
        title: "Swiss Market Index — EWL ETF Proxy",
        tradingViewSymbol: "AMEX:EWL",
    },
    netherlands: {
        title: "AEX — EWN ETF Proxy",
        tradingViewSymbol: "AMEX:EWN",
    },
    sweden: {
        title: "OMX Stockholm 30 — EWD ETF Proxy",
        tradingViewSymbol: "AMEX:EWD",
    },
    belgium: {
        title: "BEL 20 — EWK ETF Proxy",
        tradingViewSymbol: "AMEX:EWK",
    },
    newzealand: {
        title: "New Zealand — ENZL ETF",
        tradingViewSymbol: "NASDAQ:ENZL",
    },
    southafrica: {
        title: "South Africa — EZA ETF",
        tradingViewSymbol: "AMEX:EZA",
    },
    thailand: {
        title: "Thailand — THD ETF",
        tradingViewSymbol: "AMEX:THD",
    },
    philippines: {
        title: "Philippines — EPHE ETF",
        tradingViewSymbol: "AMEX:EPHE",
    },
    vietnam: {
        title: "Vietnam — VNM ETF",
        tradingViewSymbol: "AMEX:VNM",
    },
    gold: {
        title: "Gold",
        tradingViewSymbol: "OANDA:XAUUSD",
    },
    silver: {
        title: "Silver",
        tradingViewSymbol: "OANDA:XAGUSD",
    },
    wti: {
        title: "WTI Oil",
        tradingViewSymbol: "TVC:USOIL",
    },
    naturalgas: {
        title: "Natural Gas",
        tradingViewSymbol: "CAPITALCOM:NATURALGAS",
    },
    copper: {
        title: "Copper",
        tradingViewSymbol: "CAPITALCOM:COPPER",
    },
    platinum: {
        title: "Platinum — PPLT ETF Proxy",
        tradingViewSymbol: "AMEX:PPLT",
    },
    palladium: {
        title: "Palladium — PALL ETF Proxy",
        tradingViewSymbol: "AMEX:PALL",
    },
    brent: {
        title: "Brent Oil — BNO ETF Proxy",
        tradingViewSymbol: "AMEX:BNO",
    },
    heatingoil: {
        title: "Heating Oil",
        tradingViewSymbol: "CAPITALCOM:HEATINGOIL",
    },
    gasoline: {
        title: "Gasoline — UGA ETF Proxy",
        tradingViewSymbol: "AMEX:UGA",
    },
    corn: {
        title: "Corn — CORN ETF",
        tradingViewSymbol: "AMEX:CORN",
    },
    wheat: {
        title: "Chicago Wheat — WEAT ETF",
        tradingViewSymbol: "AMEX:WEAT",
    },
    soybeans: {
  title: "Soybeans",
  tradingViewSymbol: "CMCMARKETS:SOYBEAN",
},
    soybeanmeal: {
        title: "Soybean Meal",
        tradingViewSymbol: "CMCMARKETS:SOYMEAL",
    },
    soybeanoil: {
        title: "Soybean Oil",
        tradingViewSymbol: "CMCMARKETS:SOYOIL",
    },
    oats: {
        title: "Oats",
        tradingViewSymbol: "CMCMARKETS:OATS",
    },
    roughrice: {
        title: "Rough Rice",
        tradingViewSymbol: "CMCMARKETS:ROUGHRICE",
    },
    kcwheat: {
        title: "KC Wheat — WEAT ETF Proxy",
        tradingViewSymbol: "AMEX:WEAT",
    },
    livecattle: {
        title: "Live Cattle",
        tradingViewSymbol: "CITYINDEX:LIVECATTLECFD",
    },
    leanhogs: {
        title: "Lean Hogs",
        tradingViewSymbol: "CITYINDEX:LEANHOGSCFD",
    },
    feedercattle: {
        title: "Feeder Cattle — Aug 2026",
        tradingViewSymbol: "CMCMARKETS:FEEDERCATTLEQ2026",
    },
    coffee: {
        title: "Coffee",
        tradingViewSymbol: "CAPITALCOM:COFFEE",
    },
    cocoa: {
        title: "Cocoa",
        tradingViewSymbol: "CAPITALCOM:COCOA",
    },
    sugar: {
        title: "Sugar — CANE ETF",
        tradingViewSymbol: "AMEX:CANE",
    },
    cotton: {
        title: "Cotton",
        tradingViewSymbol: "CAPITALCOM:COTTON",
    },
    orangejuice: {
        title: "Orange Juice",
        tradingViewSymbol: "CMCMARKETS:ORANGEJUICE",
    },
    lumber: {
  title: "Lumber",
  tradingViewSymbol: "CMCMARKETS:USLUMBER",
},
    dba: {
        title: "DBA Agriculture ETF",
        tradingViewSymbol: "AMEX:DBA",
    },
    dbc: {
        title: "DBC Commodity ETF",
        tradingViewSymbol: "AMEX:DBC",
    },
    ura: {
        title: "URA Uranium ETF",
        tradingViewSymbol: "AMEX:URA",
    },
    usdjpy: {
        title: "USD/JPY",
        tradingViewSymbol: "FX:USDJPY",
    },
    eurusd: {
        title: "EUR/USD",
        tradingViewSymbol: "FX:EURUSD",
    },
    gbpusd: {
        title: "GBP/USD",
        tradingViewSymbol: "FX:GBPUSD",
    },
    usdcad: {
        title: "USD/CAD",
        tradingViewSymbol: "FX:USDCAD",
    },
    audusd: {
        title: "AUD/USD",
        tradingViewSymbol: "FX:AUDUSD",
    },
    nzdusd: {
        title: "NZD/USD",
        tradingViewSymbol: "FX:NZDUSD",
    },
    usdchf: {
        title: "USD/CHF",
        tradingViewSymbol: "FX:USDCHF",
    },
    eurjpy: {
        title: "EUR/JPY",
        tradingViewSymbol: "FX:EURJPY",
    },
    gbpjpy: {
        title: "GBP/JPY",
        tradingViewSymbol: "FX:GBPJPY",
    },
    audjpy: {
        title: "AUD/JPY",
        tradingViewSymbol: "FX:AUDJPY",
    },
    eurgbp: {
        title: "EUR/GBP",
        tradingViewSymbol: "FX:EURGBP",
    },
    eurchf: {
        title: "EUR/CHF",
        tradingViewSymbol: "FX:EURCHF",
    },
    euraud: {
        title: "EUR/AUD",
        tradingViewSymbol: "FX:EURAUD",
    },
    eurnzd: {
        title: "EUR/NZD",
        tradingViewSymbol: "FX:EURNZD",
    },
    gbpaud: {
        title: "GBP/AUD",
        tradingViewSymbol: "FX:GBPAUD",
    },
    gbpnzd: {
        title: "GBP/NZD",
        tradingViewSymbol: "FX:GBPNZD",
    },
    gbpchf: {
        title: "GBP/CHF",
        tradingViewSymbol: "FX:GBPCHF",
    },
    audnzd: {
        title: "AUD/NZD",
        tradingViewSymbol: "FX:AUDNZD",
    },
    audcad: {
        title: "AUD/CAD",
        tradingViewSymbol: "FX:AUDCAD",
    },
    audchf: {
        title: "AUD/CHF",
        tradingViewSymbol: "FX:AUDCHF",
    },
    nzdjpy: {
        title: "NZD/JPY",
        tradingViewSymbol: "FX:NZDJPY",
    },
    nzdcad: {
        title: "NZD/CAD",
        tradingViewSymbol: "FX:NZDCAD",
    },
    nzdchf: {
        title: "NZD/CHF",
        tradingViewSymbol: "FX:NZDCHF",
    },
    cadjpy: {
        title: "CAD/JPY",
        tradingViewSymbol: "FX:CADJPY",
    },
    cadchf: {
        title: "CAD/CHF",
        tradingViewSymbol: "FX:CADCHF",
    },
    chfjpy: {
        title: "CHF/JPY",
        tradingViewSymbol: "FX:CHFJPY",
    },
    eurcad: {
        title: "EUR/CAD",
        tradingViewSymbol: "FX:EURCAD",
    },
    gbpcad: {
        title: "GBP/CAD",
        tradingViewSymbol: "FX:GBPCAD",
    },
    usdcny: {
        title: "USD/CNY",
        tradingViewSymbol: "FX_IDC:USDCNY",
    },
    usdhkd: {
        title: "USD/HKD",
        tradingViewSymbol: "FX:USDHKD",
    },
};

type MarketPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default function MarketDetailPage({ params }: MarketPageProps) {
    const container = useRef<HTMLDivElement>(null);
    const { slug } = use(params);
    const market = marketConfig[slug as keyof typeof marketConfig];

    if (!market) {
        return (
            <main>
                <Navbar />
                <h1>Market not found</h1>
                <p>This chart is not available yet.</p>
            </main>
        );
    }

    useEffect(() => {
        if (!container.current) return;

        container.current.innerHTML = "";

        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;

        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: market.tradingViewSymbol,
            interval: "D",
            timezone: "Asia/Tokyo",
            theme: "dark",
            style: "1",
            locale: "en",
            allow_symbol_change: false,
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: false,
            calendar: false,
            support_host: "https://www.tradingview.com",
        });

        container.current.appendChild(script);
    }, [market.tradingViewSymbol]);

    return (
        <main>
            <Navbar />
            <h1>{market.title}</h1>

            <div
                ref={container}
                style={{ height: "600px", width: "100%", marginTop: "24px" }}
            />
        </main>
    );
}