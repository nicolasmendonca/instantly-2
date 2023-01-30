import { PUBLIC_APP_URL } from '$env/static/public'

export const paths = {
  root: () => `/`,
  workspaces: () => `/workspaces`,
  workspace: (workspaceId: string) => `${paths.workspaces()}/${workspaceId}`,
  workspaceTasks: (workspaceId: string) => `${paths.workspace(workspaceId)}/tasks`,
  workspaceTask: (workspaceId: string, taskId: string) => `${paths.workspaceTasks(workspaceId)}/${taskId}`,
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
