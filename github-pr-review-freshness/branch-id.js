// The branch id that the self-review skill records in a PR body
// (aboutbits/agent-kit, skills/self-review/scripts/review-state.ts). Both must compute it the same way:
// for every changed file that is not generated, its diff against the merge-base with zero context,
// whitespace and blank lines ignored, import and package lines dropped, and every hunk left empty
// dropped, put through `git patch-id --stable`; then the SHA-256 of the sorted lines "<path>\t<id>\n".
// A binary file's id is "binary:" and its blob id at the head, or "binary:deleted". Every diff runs
// with the options in DIFF, so the git config of the machine cannot change an id.
const { execFileSync } = require('node:child_process')
const { createHash } = require('node:crypto')

const GENERATED =
  /(^|\/)(generated|build|dist|node_modules|vendor)\/|(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lock|bun\.lockb|go\.sum|Cargo\.lock|composer\.lock|Gemfile\.lock|poetry\.lock)$|\.(pb\.go|g\.dart|freezed\.dart|min\.js|min\.css)$|(^|\/)__snapshots__\//
const NOISE = /^[+-]\s*(import|package)\s/
const DIFF = ['diff', '--no-color', '--no-ext-diff', '--diff-algorithm=myers', '-M']

const git = (cwd, args, input) => execFileSync('git', args, { cwd, input, encoding: 'utf8', maxBuffer: 1 << 28 })

function isGenerated(cwd, path) {
  return /: linguist-generated: (set|true)$/m.test(git(cwd, ['check-attr', 'linguist-generated', '--', path])) || GENERATED.test(path)
}

function normalize(diff) {
  const out = []
  let hunk = []
  let changes = 0
  const flush = () => {
    if (changes > 0) out.push(...hunk)
    hunk = []
    changes = 0
  }
  for (const line of diff.split('\n')) {
    if (line.startsWith('@@')) {
      flush()
      hunk = [line]
      continue
    }
    if (hunk.length === 0) {
      out.push(line)
      continue
    }
    if (NOISE.test(line)) continue
    if (/^[+-]/.test(line)) changes++
    hunk.push(line)
  }
  flush()
  return out.join('\n')
}

function patchId(cwd, diff) {
  if (!/^[+-](?![+-]{2} )/m.test(diff)) return ''
  return (git(cwd, ['patch-id', '--stable'], diff).split(' ')[0] ?? '').trim()
}

function fileId(cwd, base, head, path) {
  if (/^-\t-\t/.test(git(cwd, [...DIFF, '--numstat', base, head, '--', path]))) {
    let blob = 'deleted'
    try {
      blob = execFileSync('git', ['rev-parse', `${head}:${path}`], { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    } catch {}
    return `binary:${blob}`
  }
  return patchId(cwd, normalize(git(cwd, [...DIFF, '-U0', '-w', '--ignore-blank-lines', base, head, '--', path])))
}

function branchId(cwd, base, head = 'HEAD') {
  const lines = git(cwd, [...DIFF, '--name-only', base, head])
    .split('\n')
    .filter(Boolean)
    .sort()
    .filter((path) => !isGenerated(cwd, path))
    .map((path) => `${path}\t${fileId(cwd, base, head, path)}\n`)
    .join('')
  return createHash('sha256').update(lines).digest('hex')
}

module.exports = { branchId }
