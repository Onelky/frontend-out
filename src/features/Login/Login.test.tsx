import { render, screen } from '@/testUtils'
import { Login } from './Login'
import userEvent from '@testing-library/user-event'

describe('Login', () => {
  it('should enable Login button only when form is valid', async () => {
    const user = userEvent.setup()
    render(<Login />)

    const loginButton = screen.getByRole('button', { name: 'Login' })

    // Validate that Login button is disabled by default
    expect(loginButton).toBeDisabled()

    // Fill form
    await user.type(screen.getByLabelText(/Email/i), 'test@test.com')
    await user.type(screen.getByLabelText(/Password/i), 'test123')

    // Validate that Login button is enabled
    expect(loginButton).toBeEnabled()
  })

  it('should display errors when login with invalid credentials', async () => {
    const user = userEvent.setup()
    render(<Login />)

    // Fill form
    await user.type(
        screen.getByRole('textbox', { name: 'Email' }),
        'test@test.com',
    )
    await user.type(screen.getByLabelText(/Password/i), 'test123')

    // Click login button
    await user.click(screen.getByRole('button', { name: 'Login' }))

    // Validate that error messages are displayed
    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument()
  })
});