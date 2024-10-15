import '@mantine/core/styles.css'
import { Providers } from '@/app/Providers'
import { AppRoutes } from '@/app/AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Providers>
        <AppRoutes />
      </Providers>
    </Router>
  )
}
