const test = require('ava')

test('no matches', function (t) {
  t.is(/y/.test('xx'), false)
})

test('match', function (t) {
  t.is(/x/.test('xx'), true)
})
