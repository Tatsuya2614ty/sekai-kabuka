import Navbar from "./components/Navbar";
import MarketCard from "./components/MarketCard";

type USMarket = {
  title: string;
  price: string;
  change: string;
  positive: boolean;
  sparkline: number[];
  featured?: boolean;
  customClass?: string;
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

export default async function Home() {
  const [sp500, nasdaq, dow, russell, vix, us10y, sox, nasdaq100, sp100, spMidCap400, spSmallCap600, nyseComposite,
    dowTransportation, technology, financials, healthcare, energy, industrials,
    consumerDiscretionary, consumerStaples, utilities, materials, realEstate, communicationServices,
    totalMarket, equalWeight, magnificentSeven, regionalBanks, biotechnology, innovation,
  ] = await Promise.all([

    getYahooIndex("%5EGSPC"),
    getYahooIndex("%5EIXIC"),
    getYahooIndex("%5EDJI"),
    getYahooIndex("%5ERUT"),
    getYahooIndex("%5EVIX"),
    getYahooIndex("%5ETNX"),
    getYahooIndex("%5ESOX"),
    getYahooIndex("%5ENDX"),
    getYahooIndex("%5ESP100"),
    getYahooIndex("%5ESP400"),
    getYahooIndex("%5ESP600"),
    getYahooIndex("%5ENYA"),
    getYahooIndex("%5EDJT"),
    getYahooIndex("XLK"),
    getYahooIndex("XLF"),
    getYahooIndex("XLV"),
    getYahooIndex("XLE"),
    getYahooIndex("XLI"),
    getYahooIndex("XLY"),
    getYahooIndex("XLP"),
    getYahooIndex("XLU"),
    getYahooIndex("XLB"),
    getYahooIndex("XLRE"),
    getYahooIndex("XLC"),
    getYahooIndex("VTI"),
    getYahooIndex("RSP"),
    getYahooIndex("MAGS"),
    getYahooIndex("KRE"),
    getYahooIndex("XBI"),
    getYahooIndex("ARKK"),
  ]);

  function createMarket(
    title: string,
    data: {
      price: string;
      change: string;
      positive: boolean;
      sparkline: number[];
    },
    options: Partial<USMarket> = {}
  ): USMarket {
    return {
      title,
      price: data.price,
      change: data.change,
      positive: data.positive,
      sparkline: data.sparkline,
      ...options,
    };
  }

  const markets: USMarket[] = [
    createMarket("🇺🇸 S&P 500", sp500, {
      featured: true,
      href: "/markets/sp500",
    }),

    createMarket("🇺🇸 Nasdaq", nasdaq, {
      href: "/markets/nasdaq",
    }),

    createMarket("🇺🇸 Dow Jones", dow, {
      href: "/markets/dow",
    }),

    createMarket("🇺🇸 Russell 2000", russell, {
      href: "/markets/russell",
    }),

    createMarket("🇺🇸 VIX", vix, {
      customClass: "fear",
      href: "/markets/vix",
    }),

    createMarket("🇺🇸 US 10Y", us10y, {
      href: "/markets/us10y",
    }),

    createMarket("🇺🇸 SOX", sox, {
      href: "/markets/sox",
    }),
    createMarket("🇺🇸 Nasdaq 100", nasdaq100, {
      href: "/markets/nasdaq100",
    }),

    createMarket("🇺🇸 S&P 100", sp100, {
      href: "/markets/sp100",
    }),

    createMarket("🇺🇸 S&P MidCap 400", spMidCap400, {
      href: "/markets/spmidcap400",
    }),

    createMarket("🇺🇸 S&P SmallCap 600", spSmallCap600, {
      href: "/markets/spsmallcap600",
    }),

    createMarket("🇺🇸 NYSE Composite", nyseComposite, {
      href: "/markets/nysecomposite",
    }),

    createMarket("🇺🇸 Dow Transportation", dowTransportation, {
      href: "/markets/dowtransportation",
    }),

    createMarket("🇺🇸 Technology (XLK)", technology, {
      href: "/markets/technology",
    }),

    createMarket("🇺🇸 Financials (XLF)", financials, {
      href: "/markets/financials",
    }),

    createMarket("🇺🇸 Healthcare (XLV)", healthcare, {
      href: "/markets/healthcare",
    }),

    createMarket("🇺🇸 Energy (XLE)", energy, {
      href: "/markets/energy",
    }),

    createMarket("🇺🇸 Industrials (XLI)", industrials, {
      href: "/markets/industrials",
    }),

    createMarket("🇺🇸 Consumer Discretionary (XLY)", consumerDiscretionary, {
      href: "/markets/consumerdiscretionary",
    }),

    createMarket("🇺🇸 Consumer Staples (XLP)", consumerStaples, {
      href: "/markets/consumerstaples",
    }),

    createMarket("🇺🇸 Utilities (XLU)", utilities, {
      href: "/markets/utilities",
    }),

    createMarket("🇺🇸 Materials (XLB)", materials, {
      href: "/markets/materials",
    }),

    createMarket("🇺🇸 Real Estate (XLRE)", realEstate, {
      href: "/markets/realestate",
    }),

    createMarket("🇺🇸 Communication Services (XLC)", communicationServices, {
      href: "/markets/communicationservices",
    }),
    createMarket("🇺🇸 US Total Market (VTI)", totalMarket, {
      href: "/markets/totalmarket",
    }),

    createMarket("🇺🇸 S&P 500 Equal Weight (RSP)", equalWeight, {
      href: "/markets/equalweight",
    }),

    createMarket("🇺🇸 Magnificent Seven (MAGS)", magnificentSeven, {
      href: "/markets/magnificentseven",
    }),

    createMarket("🇺🇸 Regional Banks (KRE)", regionalBanks, {
      href: "/markets/regionalbanks",
    }),

    createMarket("🇺🇸 Biotechnology (XBI)", biotechnology, {
      href: "/markets/biotechnology",
    }),

    createMarket("🇺🇸 Innovation (ARKK)", innovation, {
      href: "/markets/innovation",
    }),
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
            featured={market.featured}
            customClass={market.customClass}
            href={market.href}
          />
        ))}
      </div>

      <Navbar bottom />
    </main>
  );
}