const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')


/** @type {import('next').NextConfig} */

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {
    RESTURL_HYPERDOT: (() => {
      if (isDev) return 'http://127.0.0.1:3000'
      if (isProd) {
        return ''
      }
      if (isStaging) return 'http://localhost:11639'
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    RESTURL_SESSIONS: (() => {
      if (isDev) return 'http://localhost:4000/sessions'
      if (isProd) return 'https://www.siliconvalley-codecamp.com/rest/sessions'
      if (isStaging) return 'http://localhost:11639'
      return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
  }

  // next.config.js object
  return {
    reactStrictMode: true,
    swcMinify: true,
    env
  }
}
