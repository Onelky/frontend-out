import type { Comment } from './Dashboard.types.ts'
import type { UseInfiniteQueryResult } from 'react-query'
import { render, screen, userEvent } from '@/testUtils'
import { vi } from 'vitest'
import { within } from '@testing-library/dom'
import { Dashboard } from './Dashboard'

/*
 * Mock response of useComments to avoid reques
 * */
vi.mock('./api/getComments', () => ({
  useComments: vi
    .fn()
    .mockImplementation((): UseInfiniteQueryResult<Comment[], unknown> => {
      return {
        isLoading: false,
        isError: false,
        data: {
          pages: [
            [
              {
                id: 1,
                name: 'Name 1',
                email: 'email1@test.com',
                body: 'Body 1',
                postId: 1,
              },
              {
                id: 2,
                name: 'Name 2',
                email: 'email2@test.com',
                body: 'Body 2',
                postId: 2,
              },
            ],
          ],
        },
      } as unknown as UseInfiniteQueryResult<Comment[], unknown>
    }),
}))

describe('Dashboard', () => {
  it('should contain the right content: Dashboard header, logout button and multiple rows', async () => {
    render(<Dashboard />)

    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument()
    expect(
        screen.getByRole('heading', { name: 'ProDashboard' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('should open a dialog when the first item of list is selected and closes it when Close button is clicked', async () => {
    const user = userEvent.setup()
    render(<Dashboard />)

    // Click View Detail button inside first row
    const firstItem = screen.getAllByRole('listitem')[0]
    await user.click(
        within(firstItem).getByRole('button', { name: 'View detail' }),
    )
    const dialog = await screen.findByRole('dialog')

    // Check that content is correct
    expect(dialog).toBeInTheDocument()
    expect(within(dialog).getByText('Body 1')).toBeInTheDocument()
    expect(within(dialog).getByText('email1@test.com')).toBeInTheDocument()
    expect(within(dialog).getByText('Name 1')).toBeInTheDocument()
    expect(within(dialog).getByText('1')).toBeInTheDocument()

    // Check that Dialog is closed after clicking button
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(dialog).not.toBeInTheDocument()
  })

});