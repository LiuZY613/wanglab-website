/**
 * 论文发表页生成脚本
 *
 * 从王磊老师 CV PDF 提取论文列表，生成 VitePress 页面。
 * 由 npm run prebuild 共同调用。
 */

import { execSync } from 'node:child_process'
import { writeFileSync, mkdirSync, existsSync, readFileSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_FILE = join(__dirname, '..', 'docs', 'publications', 'index.md')
const CV_URL = 'https://wangleiphy.github.io/CV.pdf'

// ----- 1. 下载 CV PDF -----
async function downloadPDF() {
  console.log('[pub] 正在下载 CV PDF...')
  const res = await fetch(CV_URL)
  if (!res.ok) throw new Error(`下载失败: ${res.status}`)
  const buf = await res.arrayBuffer()
  return Buffer.from(buf)
}

// ----- 2. 提取文本 (pdftotext) -----
function extractText(pdfData) {
  const tmpPdf = join(tmpdir(), 'CV_' + Date.now() + '.pdf')
  writeFileSync(tmpPdf, pdfData)
  const tmpTxt = tmpPdf.replace('.pdf', '.txt')

  try {
    execSync(`pdftotext -layout "${tmpPdf}" "${tmpTxt}"`, { stdio: 'pipe' })
    const text = readFileSync(tmpTxt, 'utf-8')
    unlinkSync(tmpPdf)
    unlinkSync(tmpTxt)
    return text
  } catch (e) {
    try { unlinkSync(tmpPdf) } catch {}
    throw new Error('pdftotext 不可用: ' + e.message)
  }
}

// ----- 3. 解析论文 -----
function parsePublications(text) {
  const lines = text.split('\n')
  const pubs = []
  let inPublications = false
  let inEprints = false
  let inBook = false
  let current = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) { current = null; continue }

    // Section headers
    if (trimmed === 'Publications') { inPublications = true; inEprints = false; inBook = false; continue }
    if (trimmed.match(/^Eprints on arxiv/)) { inPublications = false; inEprints = true; inBook = false; continue }
    if (trimmed.match(/^Book chapters/)) { inPublications = false; inEprints = false; inBook = true; continue }

    if (trimmed.match(/^Last update/)) break

    // 论文条目:  [1] Author1, ... Title. Journal ...
    const pubMatch = trimmed.match(/^\[(\d+)\]\s+(.+)/)
    if (pubMatch && (inPublications || inEprints)) {
      const [, num, content] = pubMatch
      current = {
        index: parseInt(num),
        text: content,
        type: inEprints ? 'eprint' : 'pub',
      }
      pubs.push(current)
      continue
    }

    // 续行
    if (current && trimmed && !trimmed.match(/^http/)) {
      current.text += ' ' + trimmed
    }
  }

  return pubs
}

// ----- 4. 格式化单个论文（纯文本，不生成链接）-----
function formatEntry(entry) {
  // 尝试提取：作者. 标题. 期刊 卷, 页 (年份).
  let text = entry.text

  // 移除 arXiv 链接
  text = text.replace(/arXiv:\s*[\d\.]+/, '')
  // 美化斜体期刊名
  text = text.replace(/Phys\. Rev\./g, '*Phys. Rev.*')
  text = text.replace(/Phys\. Rev\. Lett\.?/g, '*Phys. Rev. Lett.*')
  text = text.replace(/Nature Physics/g, '*Nature Physics*')
  text = text.replace(/Nature Communications/g, '*Nature Communications*')
  text = text.replace(/Chinese Physics Letters/g, '*Chinese Physics Letters*')
  text = text.replace(/Science Bulletin/g, '*Science Bull.*')
  text = text.replace(/SciPost Phys\./g, '*SciPost Phys.*')
  text = text.replace(/PRX Quantum/g, '*PRX Quantum*')
  text = text.replace(/Machine Learning: Science and Technology/g, '*Mach. Learn.: Sci. Technol.*')
  text = text.replace(/Europhysics Letter/g, '*EPL*')
  text = text.replace(/New J\. of Phys\./g, '*New J. Phys.*')
  text = text.replace(/J\. Chem\. Phys\./g, '*J. Chem. Phys.*')
  text = text.replace(/Eur\. Phys\. J\./g, '*Eur. Phys. J.*')
  text = text.replace(/npj Quantum Inf/g, '*npj Quantum Inf*')
  text = text.replace(/Phys\. Rev\. Research/g, '*Phys. Rev. Research*')
  text = text.replace(/Journal of Machine Learning/g, '*J. Mach. Learn.*')
  text = text.replace(/Entropy/g, '*Entropy*')
  text = text.replace(/Chinese Phys\. B/g, '*Chinese Phys. B*')
  text = text.replace(/Phys\. Rev\. D\./g, '*Phys. Rev. D*')
  text = text.replace(/Phys\. Rev\. Applied/g, '*Phys. Rev. Applied*')
  text = text.replace(/Quantum /g, '*Quantum* ')
  text = text.replace(/npj Computational Materials/g, '*npj Comput. Mater.*')
  text = text.replace(/Science China/g, '*Sci. China*')
  text = text.replace(/Science,/g, '*Science*,')

  return text
}

// ----- 5. 生成 markdown -----
function generateMarkdown(pubs) {
  let md = `# 论文发表

完整列表请参阅 [Google Scholar](https://scholar.google.com/citations?user=t4m9TCIAAAAJ&hl=en) 与 [arXiv](https://arxiv.org/a/wang_l_1.html)。

## 期刊论文

`
  const pubsByYear = {}
  const epsByYear = {}

  for (const p of pubs) {
    if (p.type === 'pub') {
      const ym = p.text.match(/\((\d{4})\)/)
      const year = ym ? ym[1] : 'unknown'
      if (!pubsByYear[year]) pubsByYear[year] = []
      pubsByYear[year].push(p)
    } else {
      const ym = p.text.match(/arXiv:(\d{2})(\d{2})/) || p.text.match(/\((\d{4})\)/)
      let year = 'eprint'
      if (ym) year = ym[1].length === 4 ? ym[1] : '20' + ym[1]
      if (!epsByYear[year]) epsByYear[year] = []
      epsByYear[year].push(p)
    }
  }

  // 按年份倒序
  const pubYears = Object.keys(pubsByYear).sort((a, b) => b.localeCompare(a))

  for (const year of pubYears) {
    md += `<div class="pub-year">${year}</div>\n\n`
    for (const p of pubsByYear[year]) {
      md += `<div class="pub-item">\n`
      md += `<span class="title">[${p.index}]</span> ${formatEntry(p)}\n`
      md += `</div>\n\n`
    }
  }

  md += `---

## 预印本 (arXiv)

`
  const epYears = Object.keys(epsByYear).sort((a, b) => b.localeCompare(a))
  for (const year of epYears) {
    md += `<div class="pub-year">${year}</div>\n\n`
    for (const p of epsByYear[year]) {
      md += `<div class="pub-item">\n`
      md += `<span class="title">[${p.index}]</span> ${formatEntry(p)}\n`
      md += `</div>\n\n`
    }
  }

  md += `
`
  return md
}

// ----- 6. 主流程 -----
async function run() {
  const pdfData = await downloadPDF()
  let text
  try {
    text = extractText(pdfData)
  } catch (e) {
    console.warn('[pub] pdftotext 不可用, 使用缓存文本')
    const cached = join(__dirname, '..', '.temp', 'cv.txt')
    if (existsSync(cached)) {
      text = readFileSync(cached, 'utf-8')
    } else {
      throw new Error('无法提取 CV 文本，请确认 pdftotext 已安装')
    }
  }

  const pubs = parsePublications(text)
  console.log(`[pub] 解析到 ${pubs.filter(p => p.type === 'pub').length} 篇论文 + ${pubs.filter(p => p.type === 'eprint').length} 篇预印本`)

  const md = generateMarkdown(pubs)
  mkdirSync(dirname(OUT_FILE), { recursive: true })
  writeFileSync(OUT_FILE, md, 'utf-8')
  console.log('[pub] 发表页已生成')
}

run().catch(e => {
  console.error('[pub] 错误:', e.message)
  process.exit(1)
})
