import Image from "next/image";
import Link from "next/link";
import Sparkline from "./Sparkline";

type MarketCardProps = {
  title: string;
  name?: string;
  price: string;
  change: string;
  positive: boolean;
  featured?: boolean;
  customClass?: string;
  logo?: string;
  sparkline?: number[];
  href?: string;
};

export default function MarketCard({
  title,
  name,
  price,
  change,
  positive,
  featured = false,
  customClass = "",
  logo,
  sparkline,
  href,
}: MarketCardProps) {
  const cardClassName = [
    "card",
    featured ? "featured" : "",
    customClass,
  ]
    .filter(Boolean)
    .join(" ");

  const [textIcon, ...titleWords] = title.split(" ");
  const hasTextIcon = !logo && titleWords.length > 0;

  const displayedTitle = hasTextIcon
    ? titleWords.join(" ")
    : title;
  const cardContent = (
    <div className={cardClassName}>
      <div className="card-header">
        {logo && (
          <Image
            src={logo}
            alt=""
            width={28}
            height={28}
            className="card-logo"
          />
        )}

        <div className="card-title-row">
          {/* show the icon if it exists */}
          {hasTextIcon && (
            <span className="card-text-icon">{textIcon}</span>
          )}

          {/* always show the best available name */}
          <span className="card-name">
            {name || displayedTitle}
          </span>

          {/* show the symbol if both values exist */}
          {name && title && (
            <span className="card-symbol">{title}</span>
          )}
        </div>
      </div>

      <div className="card-price-section">
        <p className="price">{price}</p>

        <span
          className={`card-change ${positive ? "positive" : "negative"
            }`}
        >
          {change}
        </span>
      </div>

      <div className="card-chart">
        <Sparkline
          positive={positive}
          points={sparkline}
        />
      </div>

    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="card-link"
        aria-label={`View ${name || title}`}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}