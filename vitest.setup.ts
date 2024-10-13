import { server } from '@/mocks/server'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import '@testing-library/jest-dom'

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const { getComputedStyle } = window
window.getComputedStyle = (elt) => getComputedStyle(elt)
window.HTMLElement.prototype.scrollIntoView = () => {}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Sets the environment to test so the msw's base route is updated accordingly
vi.stubEnv('NODE_ENV', 'test')

window.ResizeObserver = ResizeObserver
