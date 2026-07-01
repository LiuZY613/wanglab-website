/**
 * 组会数据抓取脚本
 *
 * 从 GitLab (code.itp.ac.cn) 拉取组会 README.md，
 * 解析后生成 VitePress 页面 — index.md (最近 + 年份选择) 和各年份页。
 */

import { execSync } from 'node:child_process'
import { writeFileSync, mkdirSync, existsSync, rmSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const API_BASE = 'https://code.itp.ac.cn/api/v4'
const PROJECT_ID = encodeURIComponent('codes/groupmeeting')
const OUT_DIR = join(__dirname, '..', 'docs', 'research', 'groupmeetings')

// ----- 凭据 -----
function getGitLabAuth() {
  try {
    const input = 'protocol=https\nhost=code.itp.ac.cn\n\n'
    const output = execSync('git credential fill', { input, stdio: ['pipe', 'pipe', 'pipe'] }).toString()
    const user = output.match(/username=(.+)/)?.[1] || ''
    const pass = output.match(/password=(.+)/)?.[1] || ''
    if (user && pass) {
      return 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64')
    }
  } catch { /* fallback */ }
  return null
}

// ----- 拉取 README -----
async function fetchReadme() {
  const auth = getGitLabAuth()
  const headers = { 'User-Agent': 'Node.js' }
  if (auth) headers['Authorization'] = auth

  const url = `${API_BASE}/projects/${PROJECT_ID}/repository/files/README%2Emd/raw?ref=master`
  console.log('[fetch] 正在从 GitLab 拉取组会数据...')

  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`GitLab API ${res.status}`)
  return await res.text()
}

// ----- 解析 README -----
function parseReadme(content) {
  const years = {}
  let currentYear = null
  let currentMeeting = null
  const lines = content.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // 年份标题: # 2026
    const ym = line.match(/^#\s+(20\d{2})\s*$/)
    if (ym) {
      const y = ym[1]
      if (!years[y]) years[y] = []
      currentYear = y
      currentMeeting = null
      continue
    }

    // 非年份的 # 标题（如 # Affairs）— 停止解析
    if (line.match(/^#\s+/) && !line.match(/^#\s+20\d{2}/)) {
      currentYear = null
      currentMeeting = null
      continue
    }

    // 会议标题: ## 2026.03.13 Zongyue Liu
    const mm = line.match(/^##\s+(\d{4})\.(\d{1,2})\.(\d{1,2})\s+(.+)/)
    if (mm && currentYear) {
      const [, y, m, d, speaker] = mm
      currentMeeting = {
        date: `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`,
        rawDate: `${y}.${m}.${d}`,
        speaker: speaker.trim(),
        topic: '',
        content: [],
        year: currentYear,
      }
      years[currentYear].push(currentMeeting)
      continue
    }

    // 主题: ### Topic
    const tm = line.match(/^###\s+(.+)/)
    if (tm && currentMeeting && !currentMeeting.topic) {
      currentMeeting.topic = tm[1].trim()
      continue
    }

    // 收集内容
    if (currentMeeting && currentYear && line.trim()
      && !line.includes('[Back To Top]')
      && !line.match(/^- \[\]\(\)\s*$/)) {
      currentMeeting.content.push(line)
    }
  }

  return years
}

// ----- 生成 index.md -----
function generateIndex(years) {
  const yearList = Object.keys(years).sort((a, b) => b.localeCompare(a))
  const latestYear = yearList[0]
  const latestMeetings = (years[latestYear] || []).slice(-8).reverse()

  let md = `---
sidebar: true
---

# 组会记录

## 📌 最近组会

`
  for (const m of latestMeetings) {
    md += `### ${m.date} — ${m.speaker}\n`
    if (m.topic) md += `**${m.topic}**\n\n`
    if (m.content.length > 0) {
      md += m.content.slice(0, 6).join('\n') + '\n'
    }
    md += '\n---\n\n'
  }

  md += `## 📅 按年份查看\n\n`
  for (const y of yearList) {
    const n = years[y].length
    md += `- [${y} 年](./${y})\n`
  }
  return md
}

// ----- 生成年份页 -----
function generateYearPage(year, meetings) {
  meetings.sort((a, b) => b.date.localeCompare(a.date))

  let md = `---
sidebar: true
---

# ${year} 年组会记录

<a href="/research/groupmeetings/" style="color: var(--vp-c-brand-1);">← 返回组会列表</a>

---

`
  // 年份导航由侧边栏提供，页内不再重复

  for (const m of meetings) {
    md += `## ${m.date} — ${m.speaker}\n\n`
    if (m.topic) md += `### ${m.topic}\n\n`
    for (const line of m.content) md += line + '\n'
    md += '\n---\n\n'
  }

  md += `<a href="/research/groupmeetings/" style="color: var(--vp-c-brand-1);">← 返回组会列表</a>\n`
  return md
}

// ----- 清理旧生成文件 -----
function cleanOldFiles() {
  if (!existsSync(OUT_DIR)) return
  function walk(dir) {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory()) {
        walk(full)
        if (readdirSync(full).length === 0) rmSync(full, { recursive: true })
      } else if (e.name.endsWith('.md') && e.name !== 'index.md') {
        rmSync(full)
      }
    }
  }
  walk(OUT_DIR)
}

// ----- 主流程 -----
async function run() {
  cleanOldFiles()

  const raw = await fetchReadme()
  const years = parseReadme(raw)

  const yearList = Object.keys(years).sort((a, b) => b.localeCompare(a))
  console.log(`[parse] ${yearList.length} 个年份:`)
  for (const y of yearList) console.log(`  ${y}: ${years[y].length} 次`)

  mkdirSync(OUT_DIR, { recursive: true })

  writeFileSync(join(OUT_DIR, 'index.md'), generateIndex(years), 'utf-8')
  console.log('[write] index.md')

  for (const y of yearList) {
    writeFileSync(join(OUT_DIR, `${y}.md`), generateYearPage(y, years[y]), 'utf-8')
    console.log(`[write] ${y}.md`)
  }

  console.log('[done] 组会数据同步完成')
}

run()
