import { PUBLIC_APP_URL } from '$env/static/public'

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
  return `${PUBLIC_APP_URL}${path}`
}
