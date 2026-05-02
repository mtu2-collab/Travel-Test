import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const offenders = []

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build'].includes(entry.name)) continue
      walk(fullPath)
      continue
    }

    if (!fullPath.endsWith('.js')) continue
    const text = fs.readFileSync(fullPath, 'utf8')
    if (/<\/?[A-Z][A-Za-z0-9]*/.test(text) || /return\s*<\w+/.test(text)) {
      offenders.push(path.relative(root, fullPath))
    }
  }
}

walk(path.join(root, 'src'))

if (offenders.length) {
  console.error('❌ JSX found in .js files (should be .jsx):\n- ' + offenders.join('\n- '))
  process.exit(1)
}

console.log('✅ JSX extension check passed (no JSX in .js files).')
