function escapeHtml(s) {
  if (s == null || s === '') return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function sendJson(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

async function readJsonBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function looksLikeEmail(s) {
  if (!s || typeof s !== 'string') return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())
}

/** Resend returns `message` as string or array of validation objects */
function parseResendError(payload) {
  if (!payload || typeof payload !== 'object') return 'Resend rejected the request'
  const m = payload.message
  if (typeof m === 'string') return m
  if (Array.isArray(m)) {
    return m
      .map((x) => (x && typeof x === 'object' && x.message ? x.message : String(x)))
      .join('; ')
  }
  return 'Resend rejected the request'
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.end()
    return
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, error: 'Method not allowed' })
    return
  }

  const body = await readJsonBody(req)
  if (body === null) {
    sendJson(res, 400, { ok: false, error: 'Invalid JSON' })
    return
  }

  const {
    name,
    phone,
    email,
    date,
    time,
    guests,
    notes,
    lang,
  } = body

  const trimmed = {
    name: typeof name === 'string' ? name.trim() : '',
    phone: typeof phone === 'string' ? phone.trim() : '',
    email: typeof email === 'string' ? email.trim() : '',
    date: typeof date === 'string' ? date.trim() : '',
    time: typeof time === 'string' ? time.trim() : '',
    guests: typeof guests === 'string' || typeof guests === 'number' ? String(guests).trim() : '',
    notes: typeof notes === 'string' ? notes.trim() : '',
    lang: lang === 'en' ? 'en' : 'it',
  }

  if (!trimmed.name || !trimmed.phone || !trimmed.date || !trimmed.time || !trimmed.guests) {
    sendJson(res, 400, { ok: false, error: 'Missing required fields' })
    return
  }

  const apiKey = (process.env.RESEND_API_KEY || '').trim()
  const to = (process.env.BOOKING_TO_EMAIL || '').trim()
  const from = (process.env.RESEND_FROM || 'onboarding@resend.dev').trim()

  if (!apiKey || !to) {
    console.error('Missing RESEND_API_KEY or BOOKING_TO_EMAIL')
    sendJson(res, 503, { ok: false, error: 'Email not configured' })
    return
  }

  const oneLine = (s) => String(s).replace(/[\r\n]/g, ' ').slice(0, 120)

  const subject =
    trimmed.lang === 'en'
      ? `[Las Vegas] Table booking — ${oneLine(trimmed.date)} ${oneLine(trimmed.time)} (${oneLine(trimmed.name)})`
      : `[Las Vegas] Prenotazione tavolo — ${oneLine(trimmed.date)} ${oneLine(trimmed.time)} (${oneLine(trimmed.name)})`

  const labels =
    trimmed.lang === 'en'
      ? {
          title: 'New table reservation',
          name: 'Name',
          phone: 'Phone',
          email: 'Email',
          guests: 'Guests',
          date: 'Date',
          time: 'Time',
          notes: 'Notes',
        }
      : {
          title: 'Nuova prenotazione tavolo',
          name: 'Nome',
          phone: 'Telefono',
          email: 'Email',
          guests: 'Persone',
          date: 'Data',
          time: 'Orario',
          notes: 'Note',
        }

  const rows = [
    [labels.name, trimmed.name],
    [labels.phone, trimmed.phone],
    [labels.email, trimmed.email || '—'],
    [labels.guests, trimmed.guests],
    [labels.date, trimmed.date],
    [labels.time, trimmed.time],
    ...(trimmed.notes ? [[labels.notes, trimmed.notes]] : []),
  ]

  const html = `
    <h2>${escapeHtml(labels.title)}</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px 6px 0;border-bottom:1px solid #eee;font-weight:600;">${escapeHtml(k)}</td><td style="padding:6px 0;border-bottom:1px solid #eee;">${escapeHtml(v)}</td></tr>`,
        )
        .join('')}
    </table>
    <p style="margin-top:16px;color:#666;font-size:12px;">Language: ${escapeHtml(trimmed.lang)}</p>
  `

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  const replyTo = looksLikeEmail(trimmed.email) ? trimmed.email.trim() : null

  const resendBody = {
    from,
    to: [to],
    subject,
    html,
    text,
  }
  if (replyTo) {
    resendBody.reply_to = replyTo
  }

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resendBody),
  })

  const payload = await resendRes.json().catch(() => ({}))

  if (!resendRes.ok) {
    const detail = parseResendError(payload)
    console.error('Resend error:', resendRes.status, payload)
    const clientStatus = resendRes.status >= 400 && resendRes.status < 500 ? 422 : 502
    sendJson(res, clientStatus, {
      ok: false,
      error: 'Failed to send email',
      message: detail,
    })
    return
  }

  sendJson(res, 200, { ok: true, id: payload.id })
}
