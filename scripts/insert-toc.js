const markdownToc = require('markdown-toc')
const fs = require('fs-extra')
const path = require('path')

async function main () {
  const filename = path.resolve(__dirname, '..', 'README.md')
  const contents = await fs.readFile(filename, 'utf8')
  const result = markdownToc.insert(contents, {
    maxdepth: 4,
    bullets: '-',
    filter: function (string) {
      return string.indexOf('License') === -1
    }
  })
  await fs.writeFile(filename, result, 'utf8')
}
main()
