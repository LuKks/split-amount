const randomBigInt = require('secure-random-bigint')

module.exports = function splitAmount (amount, size, opts) {
  let remaining = BigInt(amount)
  const min = BigInt((opts && opts.min) || 0n)
  const parts = []

  if (min * BigInt(size) > remaining) {
    throw new Error('Amount is not enough for the minimum requirement')
  }

  for (let i = 0; i < size - 1; i++) {
    const max = remaining - (min * BigInt(size - i - 1))

    if (max > min) {
      const part = randomBigInt(min, max)
      parts.push(part)
      remaining -= part
    } else {
      parts.push(min)
      remaining -= min
    }
  }

  parts.push(remaining)

  if (typeof amount === 'bigint') {
    return parts
  }

  return parts.map(n => Number(n))
}
