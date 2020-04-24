# Regular Expressions Cheatsheet [![build](https://github.com/yuanqing/regular-expressions-cheatsheet/workflows/build/badge.svg)](https://github.com/yuanqing/regular-expressions-cheatsheet/actions?query=workflow%3Abuild)

> An opinionated cheatsheet for using Regular Expressions in JavaScript

<!-- toc -->

- [Caveats](#caveats)
- [API](#api)
  - [regexp.test(string)](#regexpteststring)
  - [string.match(regexp)](#stringmatchregexp)
  - [string.matchAll(regexp)](#stringmatchallregexp)
  - [string.replace(regexp, newSubString)](#stringreplaceregexp-newsubstring)
  - [string.replace(regexp, callback)](#stringreplaceregexp-callback)
- [Syntax](#syntax)
  - [Normal characters](#normal-characters)
  - [Whitespace characters](#whitespace-characters)
  - [Character set](#character-set)
  - [Characters that require escaping](#characters-that-require-escaping)
  - [Quantifiers](#quantifiers)
  - [Boundaries](#boundaries)
  - [Matching](#matching)
  - [Grouping and capturing](#grouping-and-capturing)
  - [Flags](#flags)
- [References and tools](#references-and-tools)

<!-- tocstop -->

## Caveats

- Follows my mental model.
- Intentionally non-comprehensive. Only includes syntax and parts of the API that I actually use.
- Certain concepts are imprecisely defined. (For example, certain definitions does not account for characters that are very rarely encountered in input strings.)

## API

### regexp.test(string)

> There should be no capturing groups and no `g` flag in `regexp`.

#### No matches

```js
/y/.test('xx') //=> false
```

#### Match

```js
/x/.test('xx') //=> true
```

#### *(Pitfall)* Match, with `g` flag

> `regexp.lastIndex` may change with each call to `regexp.test(string)`.

```js
const regexp = /x/g
regexp.lastIndex  //=> 0
regexp.test('xx') //=> true
regexp.lastIndex  //=> 1
regexp.test('xx') //=> true
regexp.lastIndex  //=> 2
regexp.test('xx') //=> false
regexp.lastIndex  //=> 0
```

### string.match(regexp)

> There should be no capturing groups if there’s also a `g` flag in `regexp`.

#### No matches

```js
'xx'.match(/y/)  //=> null
'xx'.match(/y/g) //=> null
```

#### Match

```js
'xx'.match(/x/).slice()  //=> ['x']
'xx'.match(/x/g).slice() //=> ['x', 'x']
```

#### Match, with capturing group, without `g` flag

```js
'xyxy'.match(/x(y)/).slice() //=> ['xy', 'y']
```

#### *(Pitfall)* Match, with capturing group, with `g` flag

> Capturing groups in `regexp` are ignored; returns the matches only.

```js
'xyxy'.match(/x(y)/g).slice() //=> ['xy', 'xy']
```

### string.matchAll(regexp)

> There should always be a `g` flag in `regexp`.

#### No matches

```js
const iterator = 'xx'.matchAll(/y/g)
const result = []
for (const match of iterator) {
  result.push(match[0])
}
result //=> []
```

#### Match

```js
const iterator = 'xx'.matchAll(/x/g)
const result = []
for (const match of iterator) {
  result.push(match[0])
}
result //=> ['x', 'x']
```

#### Match, with capturing group

```js
const iterator = 'xyxy'.matchAll(/x(y)/g)
const result = []
for (const match of iterator) {
  result.push([match[0], match[1]])
}
result //=> [['xy', 'y'], ['xy', 'y']]
```

### string.replace(regexp, newSubString)

> There should be no capturing groups in `regexp`.

#### No matches

```js
'xx'.replace(/y/, 'z')  //=> 'xx'
'xx'.replace(/y/g, 'z') //=> 'xx'
```

#### Match

```js
'xx'.replace(/x/, 'z')  //=> 'zx'
'xx'.replace(/x/g, 'z') //=> 'zz'
```

### string.replace(regexp, callback)

#### No matches

```js
function callback (match) {
  return match.toUpperCase()
}
'xx'.replace(/y/, callback)  //=> 'xx'
'xx'.replace(/y/g, callback) //=> 'xx'
```

#### Match

```js
function callback (match) {
  return match.toUpperCase()
}
'xx'.replace(/x/, callback)  //=> 'Xx'
'xx'.replace(/x/g, callback) //=> 'XX'
```

#### Match, with capturing group

```js
function callback (match, y) {
  return `${match.toUpperCase()}${y.toUpperCase()}`
}
'xyxy'.replace(/x(y)/, callback)  //=> 'XYYxy'
'xyxy'.replace(/x(y)/g, callback) //=> 'XYYXYY'
```

## Syntax

### Normal characters

Expression | Description
--:|:--
`.` or `[^\n\r]` | any character *excluding* a newline or carriage return
`[A-Za-z]` | alphabet
`[a-z]` | lowercase alphabet
`[A-Z]` | uppercase alphabet
`\d` or `[0-9]` | digit
`\D` or `[^0-9]` | non-digit
`_` | underscore
`\w` or `[A-Za-z0-9_]` | alphabet, digit or underscore
`\W` or `[^A-Za-z0-9_]` | non-alphabet, non-digit and non-underscore

### Whitespace characters

Expression | Description
--:|:--
` ` | space
`\t` | tab
`\n` | newline
`\r` | carriage return
`\s` | space, tab, newline or carriage return

### Character set

Expression | Description
--:|:--
`[xyz]` | either `x`, `y` or `z`
`[^xyz]` | neither `x`, `y` nor `z`
`[1-3]` | either `1`, `2` or `3`
`[^1-3]` | neither `1`, `2` nor `3`

- Think of a character set as an `OR` operation on the single characters that are enclosed between the square brackets.
- Use `^` after the opening `[` to “negate” the character set.
- Within a character set, `.` means a literal period.

### Characters that require escaping

#### Outside a character set

Expression | Description
--:|:--
`\.` | period
`\^` | caret
`\$` | dollar sign
`\|` | pipe
`\\` | back slash
`\/` | forward slash
`\(` | opening bracket
`\)` | closing bracket
`\[` | opening square bracket
`\]` | closing square bracket
`\{` | opening curly bracket
`\}` | closing curly bracket

#### Inside a character set

Expression | Description
--:|:--
`\\` | back slash
`\]` | closing square bracket

- A `^` must be escaped only if it occurs immediately after the opening `[` of the character set.
- A `-` must be escaped only if it occurs between two alphabets or two digits.

### Quantifiers

Expression | Description
--:|:--
`{2}` | exactly 2
`{2,}` | at least 2
`{2,7}` | at least 2 but no more than 7
`*` | 0 or more
`+` | 1 or more
`?` | exactly 0 or 1

- The quantifier goes *after* the expression to be quantified.

### Boundaries

Expression | Description
--:|:--
`^` | start of string
`$` | end of string
`\b` | word boundary

- How word boundary matching works:
    - At the beginning of the string if the first character is `\w`.
    - Between two adjacent characters within the string, if the first character is `\w` and the second character is `\W`.
    - At the end of the string if the last character is `\w`.

### Matching

Expression | Description
--:|:--
`foo\|bar` | match either `foo` or `bar`
`foo(?=bar)` | match `foo` if it’s before `bar`
`foo(?!bar)` | match `foo` if it’s *not* before `bar`
`(?<=bar)foo` | match `foo` if it’s after `bar`
`(?<!bar)foo` | match `foo` if it’s *not* after `bar`

### Grouping and capturing

Expression | Description
--:|:--
`(foo)` | capturing group; match and capture `foo`
`(?:foo)` | non-capturing group; match the group but without capturing `foo`

- Capturing groups are only relevant in the following methods:
    - `string.match(regexp)`
    - `string.matchAll(regexp)`
    - `string.replace(regexp, callback)`

### Flags

Flag | Description
--:|:--
`g` | global search
`i` | case-insensitive search
`m` | multi-line search

- If the `g` flag is used, `regexp.lastIndex` may change with each call to `regexp.test(string)`.
- If the `m` flag is used, `^` and `$` will match the start and end of each line.

## References and tools

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [RegExplained](https://leaverou.github.io/regexplained/)

## License

[MIT](LICENSE.md)
