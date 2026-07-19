## Data Flow

Data moves in one direction.

API
↓
Function
↓
Object
↓
Component
↓
Screen

Don't calculate the same data twice.
Reuse the data that already exists.

Yahoo API
      ↓
getYahooForex()
      ↓
return {
  price,
  change,
  positive,
  sparkline
}
      ↓
usdjpy
      ↓
pair
      ↓
MarketCard
      ↓
Website