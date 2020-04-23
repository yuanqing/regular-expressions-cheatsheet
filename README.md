# Regular Expression Cheatsheet [![build](https://github.com/yuanqing/regular-expression-cheatsheet/workflows/build/badge.svg)](https://github.com/yuanqing/regular-expression-cheatsheet/actions?query=workflow%3Abuild)

> An opinionated cheatsheet for using regular expressions in JavaScript

<!-- toc -->

- [Caveats](#caveats)
- [API](#api)
  - [regexp.test(string)](#regexpteststring)
  - [string.match(regexp)](#stringmatchregexp)
  - [string.matchAll(regexp)](#stringmatchallregexp)
  - [string.replace(regexp, newSubString)](#stringreplaceregexp-newsubstring)
  - [string.replace(regexp, callback)](#stringreplaceregexp-callback)
- [Syntax](#syntax)
  - [Single characters](#single-characters)
    - [Normal characters](#normal-characters)
    - [Whitespace characters](#whitespace-characters)
    - [Character set](#character-set)
    - [Escaping characters](#escaping-characters)
  - [Quantifier](#quantifier)
  - [Boundaries](#boundaries)
  - [Matching](#matching)
  - [Grouping and capturing](#grouping-and-capturing)
  - [Flags](#flags)
- [References and tools](#references-and-tools)

<!-- tocstop -->

## Caveats

- Follows my mental model, which may not square with yours.
- Intentionally non-comprehensive. Only includes syntax and parts of the API that I typically use.
- Certain concepts are imprecisely defined. (For example, does not account for characters that are very rarely encountered in input strings.)

## API

### regexp.test(string)

```js
/y/.test('xx') //=> `false`
```

```js
/x/.test('xx') //=> `true`
```

### string.match(regexp)

```js
'xx'.match(/y/)  //=> null
'xx'.match(/y/g) //=> null
```

```js
'xx'.match(/x/).slice()  //=> ['x']
'xx'.match(/x/g).slice() //=> ['x', 'x']
```

### string.matchAll(regexp)

```js
const iterator = 'xx'.matchAll(/y/g)
const result = []
for (const match of iterator) {
  result.push(match[0])
}
result //=> []
```

```js
const iterator = 'xx'.matchAll(/x/g)
const result = []
for (const match of iterator) {
  result.push(match[0])
}
result //=> ['x', 'x]
```

### string.replace(regexp, newSubString)

```js
'xx'.replace(/y/, 'z')  //=> 'xx'
'xx'.replace(/y/g, 'z') //=> 'xx'
```

```js
'xx'.replace(/x/, 'z')  //=> 'zx'
'xx'.replace(/x/g, 'z') //=> 'zz'
```

### string.replace(regexp, callback)

```js
function callback (x) {
  return x.toUpperCase()
}
'xx'.replace(/y/, callback)  //=> 'xx'
'xx'.replace(/y/g, callback) //=> 'xx'
```

```js
function callback (x) {
  return x.toUpperCase()
}
'xx'.replace(/x/, callback)  //=> 'Xx'
'xx'.replace(/x/g, callback) //=> 'XX'
```

## Syntax

### Single characters

#### Normal characters

Expression | Description
--:|:--|:--
`.` or `[^\n\r]` | any character *excluding* a newline or carriage return†
`[A-Za-z]` | alphabet
`[a-z]` | lowercase alphabet
`[A-Z]` | uppercase alphabet
`\d` or `[0-9]` | digit
`\D` or `[^0-9]` | non-digit
`_` | underscore
`\w` or `[A-Za-z0-9_]` | alphabet, digit or underscore
`\W` or `[^A-Za-z0-9_]` | non-alphabet, non-digit and non-underscore

#### Whitespace characters

Expression | Description
--:|:--|:--
` ` | space
`\t` | tab
`\n` | newline
`\r` | carriage return
`\s` | space, tab, newline or carriage return†

#### Character set

Expression | Description
--:|:--|:--
`[.,]` | `.` or `,`
`[xyz]` | either `x`, `y` or `z`
`[^xyz]` | neither `x`, `y` nor `z`
`[1-3]` | either `1`, `2` or `3`
`[^1-3]` | neither `1`, `2` nor `3`

- Think of a character set as an `OR` operation on the single characters enclosed within it.
- Within the square brackets, `.` means a literal period.

#### Escaping characters

##### Outside a character set

Expression | Description
--:|:--|:--
`\.` | period
`\^` | caret
`\$` | dollar sign
`\\` | back slash
`\/` | forward slash
`\(` | open bracket
`\)` | close bracket
`\[` | open square bracket
`\]` | close square bracket

- `-` and `_` need *not* be escaped.

##### Inside a character set

Expression | Description
--:|:--|:--
`\\` | back slash
`\]` | close square bracket

- `^` must be escaped only if it occurs immediately after the opening `[` of the character set.
- `-` must be escaped only if it occurs between two alphabets or two digits.

### Quantifiers

Expression | Description
--:|:--|:--
`{2}` | Exactly 2
`{2,}` | At least 2
`{2,7}` | At least 2 but no more than 7
`*` | 0 or more
`+` | 1 or more
`?` | Exactly 0 or 1

- The quantifier goes *after* the expression to be quantified.

### Boundaries

Expression | Description
:--|:--
`^` | start of string
`$` | end of string
`\b` | word boundary

- How word boundary matching works:
    - At the beginning of the string if the first character is `\w`.
    - Between two adjacent characters within the string, if the first character is `\w` and the second character is `\W`.
    - At the end of the string if the last character is `\w`.

### Matching

Expression | Description
:--|:--
`foo|bar` | match either `foo` or `bar`
`foo(?=bar)` | match `foo` if it’s before `bar`
`foo(?!bar)` | match `foo` if it’s *not* before `bar`
`(?<=bar)foo` | match `foo` if it’s after `bar`
`(?<!bar)foo` | match `foo` if it’s *not* after `bar`

### Grouping and capturing

Expression | Description
:--|:--
`(foo)` | capturing group; match and capture `foo`
`(?:foo)` | non-capturing group; match the group but without capturing `foo`

- Use a non-capturing group to “group” expressions, without capturing.
- Capturing groups are only relevant in the following methods:
    - `string.matchAll(regexp)`
    - `string.replace(regexp, callback)`

### Flags

Flag | Description
:--|:--
`g` | global search
`i` | case-insensitive search
`m` | multi-line search

- If the `m` flag is used, `^` and `$` match at the start and end of each line.

## References and tools

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [RegExplained](https://leaverou.github.io/regexplained/)

## License

[MIT](LICENSE.md)
