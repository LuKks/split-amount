const test = require('brittle')
const splitAmount = require('./index.js')

test('basic', function (t) {
  {
    const split = splitAmount(10, 3)
    const sum = split.reduce((a, c) => a + c, 0)

    t.alike(split.map(v => typeof v), ['number', 'number', 'number'])
    t.is(sum, 10)
  }

  {
    const split = splitAmount(10n, 3)
    const sum = split.reduce((a, c) => a + c, 0n)

    t.alike(split.map(v => typeof v), ['bigint', 'bigint', 'bigint'])
    t.is(sum, 10n)
  }
})

test('Number', function (t) {
  const amount = 3
  const size = 3

  for (let i = 0; i < 10000; i++) {
    const split = splitAmount(amount, size)
    const sum = split.reduce((a, c) => a + c, 0)

    if (sum !== amount) {
      t.fail('Sum is incorrect')
      return
    }
  }
})

test('BigInt', function (t) {
  const amount = 3n
  const size = 3

  for (let i = 0; i < 10000; i++) {
    const split = splitAmount(amount, size)
    const sum = split.reduce((a, c) => a + c, 0n)

    if (sum !== amount) {
      t.fail('Sum is incorrect')
      return
    }
  }
})

test('big amounts', function (t) {
  const amount = 10000000000000000000000000000000000000000000000000n

  for (let i = 0; i < 10000; i++) {
    const split = splitAmount(amount, 3)
    const sum = split.reduce((a, c) => a + c, 0n)

    if (sum !== amount) {
      t.fail('Sum is incorrect')
      return
    }
  }
})

test('min', function (t) {
  for (let i = 0; i < 10000; i++) {
    const split = splitAmount(10, 3, { min: 3 })
    const sum = split.reduce((a, c) => a + c, 0)

    for (const part of split) {
      if (part < 3n) {
        t.fail('Part is less than min')
        return
      }
    }

    if (sum !== 10) {
      t.fail('Sum is incorrect')
      return
    }
  }
})

test('amount is not enough', function (t) {
  try {
    splitAmount(1, 2, { min: 1 })
    t.fail()
  } catch (err) {
    t.is(err.message, 'Amount is not enough for the minimum requirement')
  }
})
