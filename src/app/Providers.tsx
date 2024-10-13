import { FC, PropsWithChildren } from 'react'
import { MantineProvider } from '@mantine/core'
import { MSWProvider } from '@/providers/mswProvider.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const defaultQueryConfig = { staleTime: 60000, retry: false }

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig },
})

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withCssVariables>
        <MSWProvider>{children}</MSWProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
