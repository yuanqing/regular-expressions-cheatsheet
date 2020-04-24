const test = require('ava')

test('no matches', function (t) {
  t.plan(2)
  function callback (x) {
    return x.toUpperCase()
  }
  t.is('xx'.replace(/y/, callback), 'xx')
  t.is('xx'.replace(/y/g, callback), 'xx')
})

test('match', function (t) {
  t.plan(2)
  function callback (x) {
    return x.toUpperCase()
  }
  t.is('xx'.replace(/x/, callback), 'Xx')
  t.is('xx'.replace(/x/g, callback), 'XX')
})
