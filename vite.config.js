import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/** Resolved once so Vite dev can run the same handler as Vercel (no 404 on /api/booking). */
const bookingHandlerUrl = new URL('./api/booking.js', import.meta.url).href

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-api-booking',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const pathOnly = req.url?.split('?')[0] ?? ''
          if (pathOnly !== '/api/booking') {
            return next()
          }
          const env = loadEnv(server.config.mode, process.cwd(), '')
          Object.assign(process.env, {
            RESEND_API_KEY: env.RESEND_API_KEY ?? process.env.RESEND_API_KEY,
            BOOKING_TO_EMAIL: env.BOOKING_TO_EMAIL ?? process.env.BOOKING_TO_EMAIL,
            RESEND_FROM: env.RESEND_FROM ?? process.env.RESEND_FROM,
          })
          try {
            const { default: handler } = await import(bookingHandlerUrl)
            await handler(req, res)
          } catch (err) {
            console.error('[api/booking]', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ ok: false, error: 'Server error' }))
          }
        })
      },
    },
  ],
})
