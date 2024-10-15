import { ReactNode, useEffect } from 'react'
import { NODE_ENV } from '@/config'
import { useToggle } from '@mantine/hooks'
import { StartReturnType } from 'msw/src/browser/setupWorker/glossary.ts'

let mockingPromise: StartReturnType

/* Starts msw browser worker only if two conditions are met:
 * 1. the execution of the app starts from the browser (i.e. windows object is defined)
 * 2. The environment is development
 */

if (typeof window !== 'undefined' && NODE_ENV === 'development') {
  import('../mocks/browser').then(({ worker }) => {
    mockingPromise = worker.start()
  })
}

/*
 * This Provider waits for the worker to start, and then children inside will be loaded when the worker is started.
 * */
export function MSWProvider({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const [loaded, setLoaded] = useToggle()

  useEffect(() => {
    if (mockingPromise) mockingPromise.then(() => setLoaded(true))
    else setLoaded(true)
  }, [mockingPromise])

  if (!loaded) return null
  return children
}
