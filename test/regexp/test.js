const test = require('ava')

test('no matches', function (t) {
  t.plan(1)
  t.is(/y/.test('xx'), false)
})

test('match', function (t) {
  t.plan(1)
  t.is(/x/.test('xx'), true)
})

test('stateful with the `g` flag', function (t) {
  t.plan(7)
  const regexp = /x/g
  t.is(regexp.lastIndex, 0)
  t.is(regexp.test('xx'), true)
  t.is(regexp.lastIndex, 1)
  t.is(regexp.test('xx'), true)
  t.is(regexp.lastIndex, 2)
  t.is(regexp.test('xx'), false)
  t.is(regexp.lastIndex, 0)
})
