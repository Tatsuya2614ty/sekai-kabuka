import Sparkline from "./Sparkline";
import Image from "next/image";

type MarketCardProps = {
  title: string;
  name?: string;
  price: string;
  change: string;
  positive: boolean;
  subtext?: string;
  featured?: boolean;
  customClass?: string;
  logo?: string;
  sparkline?: number[];
};

export default function MarketCard({
  title,
  name,
  price,
  change,
  positive,
  subtext,
  featured,
  customClass,
  logo,
  sparkline,
}: MarketCardProps) {
  return (
    <div className={`card ${featured ? "featured" : ""} ${customClass || ""}`}>
  <div className="card-top">
    <div className="card-header">
      {logo && (
        <Image
          src={logo}
          alt={title}
          width={28}
          height={28}
        />
      )}

      <div className="coin-title">
        {name}
        {title && ` · ${title}`}
      </div>
    </div>
  </div>

  <Sparkline
    positive={positive}
    points={sparkline}
  />

      <p className="price">{price}</p>

      <span className={positive ? "positive" : "negative"}>
        {change}
      </span>

      {subtext && (
        <p className="subtext">{subtext}</p>
      )}
    </div>
  );
}