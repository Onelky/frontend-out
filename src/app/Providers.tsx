import { FC, PropsWithChildren } from 'react'
import { MantineProvider, Stack } from '@mantine/core'
import { MSWProvider } from '@/providers/mswProvider.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '@/providers/authProvider.tsx'
import theme, { customColors } from '@/theme.ts'

const defaultQueryConfig = { staleTime: 60000, retry: false }

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig },
})

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MantineProvider theme={theme} withCssVariables>
          <MSWProvider>
            <Stack
              c={customColors.secondary}
              w={'100%'}
              h={'100vh'}
              justify={'center'}
              align={'center'}
            >
              {children}
            </Stack>
          </MSWProvider>
        </MantineProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
