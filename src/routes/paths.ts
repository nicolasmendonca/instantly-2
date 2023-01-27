import { env } from '$env/dynamic/public'

const appBaseUrl = env.PUBLIC_APP_URL

export const paths = {
  root: () => `/`,
  auth: {
    login: () => `/auth/login`,
    signup: () => `/auth/signup`,
    forgotPassword: () => `/auth/forgot-password`,
    setPassword: () => `/auth/set-password`,
    confirmSignUp: () => `/auth/confirm`,
  }
} as const

export function withBaseUrl(path: string) {
  return `${appBaseUrl}${path}`
}
