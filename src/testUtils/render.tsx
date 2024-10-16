import type { FC, PropsWithChildren, ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { AuthProvider } from '@/providers/authProvider.tsx'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
export const TestQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

/*
 * This Render component uses all the needed providers (some of them mocked with test values).
 *
 * The MSWProvider is not needed here because vitest runs in node.js, not the browser, hence we use mocks/server instead of mocks/browser.
 * */
const Render: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <TestQueryProvider>
        <AuthProvider>
          <MantineProvider>{children}</MantineProvider>
        </AuthProvider>
      </TestQueryProvider>
    </BrowserRouter>
  )
}

/* Overrides default render in order to wrap all the components inside Providers */
const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Render, ...options })

export { customRender as render }
