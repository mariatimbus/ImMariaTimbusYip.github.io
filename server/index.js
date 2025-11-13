import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/api/', rateLimit({ windowMs: 60 * 1000, max: 20 }))

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {}
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `Portfolio contact — ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })

    res.json({ ok: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ ok: false, error: 'Email failed' })
  }
})

const PORT = process.env.PORT_SERVER || 8787
app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`)
})
