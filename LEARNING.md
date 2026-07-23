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

## useState()

Stores data that can change while the app is running.

Example:
- Whether the navbar is visible.
- Whether a menu is open.
- Whether a user is logged in.

## useRef()

Stores a value without causing the component to re-render.

Example:
- Previous scroll position.
- Timer ID.
- DOM element reference.

## Logical Operators

&& (AND)
- Both conditions must be true.

Example:
if (isLoggedIn && isAdmin) {
  // Show admin page
}

|| (OR)
- At least one condition must be true.

Example:
if (isAdmin || isOwner) {
  // Allow access
}

! (NOT)
- Reverses true and false.

Example:
if (!isLoggedIn) {
  // Redirect to login
}