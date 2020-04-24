const test = require('ava')

test('no matches', function (t) {
  t.plan(2)
  t.is('xx'.replace(/y/, 'z'), 'xx')
  t.is('xx'.replace(/y/g, 'z'), 'xx')
})

test('match', function (t) {
  t.plan(2)
  t.is('xx'.replace(/x/, 'z'), 'zx')
  t.is('xx'.replace(/x/g, 'z'), 'zz')
})
