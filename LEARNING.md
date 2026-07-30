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

役割: 複数のデータを順番に並べてまとめておきたい時に使います。

イメージ: スーパーの「お買い物リスト」のようなものです。

例: 市場の一覧、価格の一覧など

Example（例）:
- A list of markets（市場の一覧）
- A list of prices（価格の一覧）
- A list of chart points（チャートデータの一覧）

### `{}` — Curly Braces / Object（波括弧・オブジェクト）

役割: 1つのものに関する詳しい情報（プロパティ）をセットでまとめたい時に使います。

イメージ: 人のプロフィール（名前、年齢、住所など）のセットのようなものです。

例: ある市場の名前、価格、前日比などの詳細情報

Example（例）:
- A market’s title（市場の名前）
- A market’s price（市場の価格）
- A market’s daily change（市場の前日比）

### `<>` — Angle Brackets / JSX（山括弧・JSX）

役割: Webサイトの見た目を作るパーツ（Reactのコンポーネント）を表示したり、まとめたりする時に使います。

イメージ: ブロックを組み立てて画面を作るようなものです。

例: ナビゲーションバーやカードなどの画面部品、複数の部品を包むタグ

Example（例）:
- A `<Navbar />` component（Navbarコンポーネント）
- A `<MarketCard />` component（MarketCardコンポーネント）
- Elements grouped inside `<>...</>`（複数の要素をまとめるFragment）

### `()` — Parentheses（丸括弧）

役割: 命令（関数）を実行させたり、処理の条件を指定したり、計算の優先順位をまとめる時に使います。

イメージ: 「〜を実行して！」と指示を出したり、ひとまとまりの範囲をハッキリさせる括弧です。

例: 関数を呼び出す、if文の条件を書く

Example（例）:
- Calling `getYahooMarket()`（関数を呼び出す）
- Writing an `if` condition（if文の条件を書く）
- Returning multiline JSX（複数行のJSXを返す）