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