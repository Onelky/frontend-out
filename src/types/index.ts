export interface LoginRequest {
  email: string
  password: string
}

export interface UserInfo {
  email: string
  token: string
}

export interface ErrorResponse {
  message?: string
}
