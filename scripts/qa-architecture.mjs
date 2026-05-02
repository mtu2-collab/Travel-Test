import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const srcRoot = path.join(projectRoot, 'src')

const jsLike = ['.js', '.jsx']
const disallowLocalStorageOutsideApi = []
const disallowSeedImportsOutsideApi = []
let filesChecked = 0

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath)
      continue
    }
    if (!jsLike.some((ext) => fullPath.endsWith(ext))) continue

    filesChecked += 1
    const relative = path.relative(projectRoot, fullPath)
    const content = fs.readFileSync(fullPath, 'utf8')

    const isApiFile = relative.startsWith('src/api/')
    if (!isApiFile && /localStorage\./.test(content)) {
      disallowLocalStorageOutsideApi.push(relative)
    }

    if (!isApiFile && /from ['"].*\/api\/seed\//.test(content)) {
      disallowSeedImportsOutsideApi.push(relative)
    }
  }
}

walk(srcRoot)

const errors = []
if (disallowLocalStorageOutsideApi.length) {
  errors.push(`localStorage usage outside api layer:\n- ${disallowLocalStorageOutsideApi.join('\n- ')}`)
}
if (disallowSeedImportsOutsideApi.length) {
  errors.push(`seed imports outside api layer:\n- ${disallowSeedImportsOutsideApi.join('\n- ')}`)
}

if (errors.length) {
  console.error('❌ Architecture QA failed\n' + errors.join('\n\n'))
  process.exit(1)
}

console.log(`✅ Architecture QA passed. Checked ${filesChecked} JS/JSX files.`)
