// The complete flow 
// Browser -> API -> FRED -> CSV -> JavaScript -> JSON -> Chart//

// 1 import NextResponse
import { NextResponse } from "next/server";

// 2 Create the GET function
export async function GET(request: Request) {

    // 3 Read the URL parameter
  const { searchParams } = new URL(request.url);
  const seriesId = searchParams.get("seriesId");

  // 4 Validate the parameter
  if (!seriesId) {
    return NextResponse.json(
      { error: "A FRED series ID is required." },
      { status: 400 }
    );
  }

  // 5 Fetch the FRED CSV file
  // await pauses this function until FRED responds// 
  const response = await fetch(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${encodeURIComponent(seriesId)}`,
    {
      next: { revalidate: 86400 }, // means Next.js can cache the result for 86,400 seconds (24h)//
    }
  );

  // 6 Check whether FRED responded successfully
  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to retrieve FRED data." },
      { status: 502 }
    );
  }

  // 7 Read the response as text
  const csv = await response.text();

  // 8 Convert the CSV into chart data
  const chartData = csv
    .trim()  // removes unnecessary whitespace
    .split("\n") // separates the CSV into rows
    .slice(1) // removes the header row

    // 9 Convert every row into an object
    .map((row) => {
      const [date, value] = row.split(",");

      return {
        date,
        close: Number(value),
      };
    })

    // 10 Remove invalid values
    .filter((point) => Number.isFinite(point.close))

    // 11 Keep the latest 60 observations
    .slice(-60);

    // Return JSON
  return NextResponse.json({
    seriesId,
    chartData,
  });
}