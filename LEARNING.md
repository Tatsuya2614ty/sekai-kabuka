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

## Common Brackets

### `[]` — Array (square brackets)

Stores multiple values in a list.

Example:
- A list of markets.
- A list of prices.
- A list of chart points.

### `{}` — Object (curly braces)

Stores related information using properties.

Example:
- A market’s title.
- A market’s price.
- A market’s daily change.

### `<>` — JSX (angle brakets)

Creates or groups React elements.

Example:
- A `<Navbar />` component.
- A `<MarketCard />` component.
- A group of elements inside `<>...</>`.

### `()` — Parentheses

Calls functions or groups code.

Example:
- Calling `getYahooMarket()`.
- Writing an `if` condition.
- Returning multiline JSX.


### How can I call these
() = parentheses or round brackets
[] = square brackets
{} = curly braces or curly brackets
<> = angle brackets

## Common Brackets（よく使う括弧）

### `[]` — Square Brackets / Array（角括弧・配列）

Stores multiple values in a list.  
複数の値をリストとして保存します。

Example（例）:
- A list of markets（市場の一覧）
- A list of prices（価格の一覧）
- A list of chart points（チャートデータの一覧）

### `{}` — Curly Braces / Object（波括弧・オブジェクト）

Stores related information using properties.  
関連する情報をプロパティとしてまとめて保存します。

Example（例）:
- A market’s title（市場の名前）
- A market’s price（市場の価格）
- A market’s daily change（市場の前日比）

### `<>` — Angle Brackets / JSX（山括弧・JSX）

Creates or groups React elements.  
Reactの要素を作成したり、複数の要素をまとめたりします。

Example（例）:
- A `<Navbar />` component（Navbarコンポーネント）
- A `<MarketCard />` component（MarketCardコンポーネント）
- Elements grouped inside `<>...</>`（複数の要素をまとめるFragment）

### `()` — Parentheses（丸括弧）

Calls functions or groups code.  
関数を呼び出したり、コードをまとめたりします。

Example（例）:
- Calling `getYahooMarket()`（関数を呼び出す）
- Writing an `if` condition（if文の条件を書く）
- Returning multiline JSX（複数行のJSXを返す）