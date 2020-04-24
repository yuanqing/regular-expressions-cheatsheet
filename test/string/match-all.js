const test = require('ava')

test('no matches', function (t) {
  t.plan(1)
  const iterator = 'xx'.matchAll(/y/g)
  const result = []
  for (const match of iterator) {
    result.push(match[0])
  }
  t.deepEqual(result, [])
})

test('match', function (t) {
  t.plan(1)
  const iterator = 'xx'.matchAll(/x/g)
  const result = []
  for (const match of iterator) {
    result.push(match[0])
  }
  t.deepEqual(result, ['x', 'x'])
})

test('match, with capturing group', function (t) {
  t.plan(1)
  const iterator = 'xyxy'.matchAll(/x(y)/g)
  const result = []
  for (const match of iterator) {
    result.push([match[0], match[1]])
  }
  t.deepEqual(result, [
    ['xy', 'y'],
    ['xy', 'y']
  ])
})
