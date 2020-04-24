const test = require('ava')

test('no matches', function (t) {
  t.plan(2)
  t.is('xx'.match(/y/), null)
  t.is('xx'.match(/y/g), null)
})

test('match', function (t) {
  t.plan(2)
  t.deepEqual('xx'.match(/x/).slice(), ['x'])
  t.deepEqual('xx'.match(/x/g).slice(), ['x', 'x'])
})

test('match, with capturing group, without `g` flag', function (t) {
  t.plan(1)
  t.deepEqual('xyxy'.match(/x(y)/).slice(), ['xy', 'y'])
})

test('match, with capturing group, with `g` flag', function (t) {
  t.plan(1)
  t.deepEqual('xyxy'.match(/x(y)/g).slice(), ['xy', 'xy'])
})
