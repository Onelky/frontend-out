import { render, screen } from '@/testUtils'
import { Login } from './Login'
import userEvent from '@testing-library/user-event'
import { within } from '@testing-library/dom'

it('should enable Login button only when form is valid', async () => {
  const user = userEvent.setup()
  render(<Login />)

  // Validate that Login button is disabled by default
  expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()

  // Fill form
  await user.type(screen.getByRole('textbox', { name: 'email' }), 'test')
  await user.type(screen.getByRole('textbox', { name: 'password' }), 'test')

  // Validate that Login button is enabled
  expect(screen.getByRole('button', { name: 'Login' })).toBeEnabled()
})

it('should display errors when login with invalid credentials', async () => {
  const user = userEvent.setup()
  render(<Login />)

  // Fill form
  await user.type(screen.getByRole('textbox', { name: 'email' }), 'test')
  await user.type(screen.getByRole('textbox', { name: 'password' }), 'test')

  // Click login button
  await user.click(screen.getByRole('button', { name: 'Login' }))

  // Validate that error messages are displayed
  expect(
    within(await screen.findByRole('alert', { name: 'Errors' })).getByText(
      'Invalid credentials',
    ),
  ).toBeInTheDocument()
})
