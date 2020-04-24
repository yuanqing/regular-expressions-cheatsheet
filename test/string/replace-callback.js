const test = require('ava')

test('no matches', function (t) {
  t.plan(2)
  function callback (match) {
    return match.toUpperCase()
  }
  t.is('xx'.replace(/y/, callback), 'xx')
  t.is('xx'.replace(/y/g, callback), 'xx')
})

test('match', function (t) {
  t.plan(2)
  function callback (match) {
    return match.toUpperCase()
  }
  t.is('xx'.replace(/x/, callback), 'Xx')
  t.is('xx'.replace(/x/g, callback), 'XX')
})

test('match, with capturing group', function (t) {
  t.plan(2)
  function callback (match, y) {
    return `${match.toUpperCase()}${y.toUpperCase()}`
  }
  t.is('xyxy'.replace(/x(y)/, callback), 'XYYxy')
  t.is('xyxy'.replace(/x(y)/g, callback), 'XYYXYY')
})
