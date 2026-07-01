/**
 * AI 日报生成脚本
 *
 * 由 GitHub Actions 每天定时触发 (UTC 00:00 = 北京时间 08:00)
 * 调用大语言模型 API 生成当日 AI 领域动态与推荐论文
 *
 * 环境变量:
 *   AI_API_KEY      - API 密钥
 *   AI_API_ENDPOINT  - API 端点 (默认 DashScope)
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = join(__dirname, '..', 'docs', 'daily')

const API_KEY = process.env.AI_API_KEY
const API_ENDPOINT = process.env.AI_API_ENDPOINT || 'https://dashscope.aliyuncs.com/compatible-mode/v1'

const SYSTEM_PROMPT = `你是一个 AI 领域的专业日报编辑。请用中文撰写今日的 AI 日报，格式如下：

## 🌍 国际 AI 大事
介绍 2-3 条今天国际上 AI 领域的重要新闻或进展。每条约 2-3 句话。重点突出对科学（尤其是物理学）研究有影响的内容。

## 📄 推荐论文阅读
推荐 3 篇值得关注的 AI 相关论文（可以是经典论文，也可以是近期热点）。每篇包含：
- 论文标题
- 作者
- 简介（1-2 句，说明为什么值得读）
- arXiv 或 DOI 链接

请优先推荐与 AI for Science、生成模型、量子计算、统计物理相关方向的论文。

## 📝 当日总结
用 3-5 句话总结今天的 AI 动态，并特别指出对 AI for Physics 研究方向的启示。`

function getToday() {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

function getPrompt(date) {
  return `请生成 ${date} 的 AI 日报。当前日期：${date}。请根据你的知识提供相关内容和链接。`
}

async function generateReport() {
  const today = getToday()
  const filename = join(DOCS_DIR, `${today}.md`)

  // 如果今天已有日报，跳过
  if (existsSync(filename)) {
    console.log(`[skip] ${today} 日报已存在: ${filename}`)
    return
  }

  if (!API_KEY) {
    console.warn('[warn] AI_API_KEY 未设置，将生成占位日报')
    writePlaceholder(today, filename)
    return
  }

  console.log(`[generate] 正在生成 ${today} 日报...`)

  try {
    const response = await fetch(`${API_ENDPOINT}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: getPrompt(today) },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    })

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ''

    if (!content) {
      throw new Error('API 返回为空')
    }

    const header = `# AI 日报 — ${today}

`

    const footer = ``

    const fullContent = header + content + footer

    mkdirSync(dirname(filename), { recursive: true })
    writeFileSync(filename, fullContent, 'utf-8')
    console.log(`[done] 日报已生成: ${filename}`)
  } catch (err) {
    console.error(`[error] 生成失败: ${err.message}`)
    writePlaceholder(today, filename)
  }
}

function writePlaceholder(today, filename) {
  const content = `# AI 日报 — ${today}

## 🌍 国际 AI 大事

今日内容生成中，请稍后刷新...

## 📄 推荐论文阅读

今日内容生成中，请稍后刷新...

## 📝 当日总结

今日内容生成中，请稍后刷新...
`
  mkdirSync(dirname(filename), { recursive: true })
  writeFileSync(filename, content, 'utf-8')
  console.log(`[done] 占位日报已生成: ${filename}`)
}

generateReport()
