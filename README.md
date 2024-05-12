# split-amount

Split amount into parts

```
npm i split-amount
```

## Usage

```js
const splitAmount = require('split-amount')

const parts = splitAmount(10n, 3)
console.log(parts) // => [2n, 5n, 3n]

splitAmount(10, 3) // => [2, 5, 3]
splitAmount(10, 3) // => [8, 0, 1]
splitAmount(10, 3, { min: 3 }) // => [4, 3, 3]
```

## API

#### `const parts = splitAmount(amount, size)`

Split amount into smaller parts.

If `amount` is a BigInt, the returned parts will also be `BigInt`.

## License

MIT
