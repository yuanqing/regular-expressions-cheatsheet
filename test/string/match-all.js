const test = require('ava')

test('no matches', function (t) {
  t.plan(1)
  const iterator = 'xx'.matchAll(/y/g)
  const result = []
  for (const matches of iterator) {
    result.push([matches[0], matches.length, matches.index])
  }
  t.deepEqual(result, [])
})

test('match', function (t) {
  t.plan(1)
  const iterator = 'xx'.matchAll(/x/g)
  const result = []
  for (const matches of iterator) {
    result.push([matches[0], matches.length, matches.index])
  }
  t.deepEqual(result, [
    ['x', 1, 0],
    ['x', 1, 1]
  ])
})

test('match, with capturing group', function (t) {
  t.plan(1)
  const iterator = 'xyxy'.matchAll(/x(y)/g)
  const result = []
  for (const matches of iterator) {
    result.push([matches[0], matches[1], matches.length, matches.index])
  }
  t.deepEqual(result, [
    ['xy', 'y', 2, 0],
    ['xy', 'y', 2, 2]
  ])
})
