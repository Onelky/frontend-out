import { ErrorResponse, LoginRequest, UserInfo } from '@/types'
import { http, HttpResponse } from 'msw'
import { EMAIL, LOGIN_URL, PASSWORD } from '@/config'

export const handlers = [
  http.post<never, LoginRequest, UserInfo | ErrorResponse>(
    `${LOGIN_URL}`,
    async ({ request }) => {
      const { email, password } = await request.json()
      if (email === EMAIL && password === PASSWORD) {
        return HttpResponse.json({ email, token: 'token' })
      }

      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    },
  ),
]
