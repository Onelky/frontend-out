import type { ErrorResponse, LoginRequest, LoginResponse } from '@/types'
import { http, HttpResponse } from 'msw'
import { LOGIN_URL } from '@/config'

export const handlers = [
  http.post<never, LoginRequest, LoginResponse | ErrorResponse>(
    `${LOGIN_URL}`,
    async ({ request }) => {
      const requestInfo = await request.json()

      if (
        requestInfo?.username === process.env.USERNAME &&
        requestInfo?.password === process.env.PASSWORD
      )
        return HttpResponse.json({ token: '' })

      return HttpResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 },
      )
    },
  ),
]
