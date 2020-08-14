const test = require('ava')

test('no matches', function (t) {
  t.plan(2)
  let matches = 'xx'.match(/y/)
  t.is(matches, null)
  matches = 'xx'.match(/y/g)
  t.is(matches, null)
})

test('match', function (t) {
  t.plan(7)
  let matches = 'xx'.match(/x/)
  t.deepEqual(matches[0], 'x')
  t.is(matches.index, 0)
  t.is(matches.length, 1)
  matches = 'xx'.match(/x/g)
  t.deepEqual(matches[0], 'x')
  t.deepEqual(matches[1], 'x')
  t.is(typeof matches.index, 'undefined')
  t.is(matches.length, 2)
})

test('match, with capturing group, without `g` flag', function (t) {
  t.plan(4)
  const matches = 'xyxy'.match(/x(y)/)
  t.deepEqual(matches[0], 'xy')
  t.deepEqual(matches[1], 'y')
  t.is(matches.index, 0)
  t.is(matches.length, 2)
})

test('match, with capturing group, with `g` flag', function (t) {
  t.plan(4)
  const matches = 'xyxy'.match(/x(y)/g)
  t.deepEqual(matches[0], 'xy')
  t.deepEqual(matches[1], 'xy')
  t.is(typeof matches.index, 'undefined')
  t.is(matches.length, 2)
})
