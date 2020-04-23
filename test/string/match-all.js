const test = require('ava')

test('no matches', function (t) {
  const iterator = 'xx'.matchAll(/y/g)
  const result = []
  for (const match of iterator) {
    result.push(match[0])
  }
  t.deepEqual(result, [])
})

test('match', function (t) {
  const iterator = 'xx'.matchAll(/x/g)
  const result = []
  for (const match of iterator) {
    result.push(match[0])
  }
  t.deepEqual(result, ['x', 'x'])
})
