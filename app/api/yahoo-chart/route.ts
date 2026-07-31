import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const symbol = request.nextUrl.searchParams.get("symbol");

    if (!symbol) {
        return NextResponse.json(
            { error: "A Yahoo symbol is required." },
            { status: 400 }
        );
    }

    const encodedSymbol = encodeURIComponent(symbol);

    const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodedSymbol}?range=6mo&interval=1d`,
        {
            next: { revalidate: 300 },
        }
    );

    if (!response.ok) {
        return NextResponse.json(
            { error: "Yahoo Finance request failed." },
            { status: response.status }
        );
    }

    const data = await response.json();
    const result = data.chart.result?.[0];

    if (!result) {
        return NextResponse.json(
            { error: "Chart data is unavaiable." },
            { status: 404 }
        );
    }
    const timestamps: number[] = result.timestamp ?? [];
    const quotes = result.indicators.quote?.[0];
    const closingPrices: Array<number | null> = quotes?.close ?? [];
    const chartData = timestamps
        .map((timestamp, index) => ({
            date: new Date(timestamp * 1000)
                .toISOString()
                .slice(0, 10),
            close: closingPrices[index],
        }))
        .filter(
            (
                point
            ): point is {
                date: string;
                close: number;
            } => typeof point.close === "number"
        );
    
    return NextResponse.json({
        symbol, chartData,
    });
}
