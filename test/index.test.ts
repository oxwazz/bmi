import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { hello } from '../src' // Update this path to match your file

// Mock console.log to test console output
const consoleSpy = vi.spyOn(console, 'log')

describe('hello function', () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return the correct string', () => {
    const result = hello()
    expect(result).toBe('Hello tsdown!')
  })

  it('should return a string', () => {
    const result = hello()
    expect(typeof result).toBe('string')
  })

  it('should have consistent behavior', () => {
    const results = []
    for (let i = 0; i < 3; i++) {
      results.push(hello())
    }

    expect(results).toEqual(['Hello tsdown!', 'Hello tsdown!', 'Hello tsdown!'])
  })
})

// Test the default export
describe('default export', () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  })

  it('should export an object with hello method', async () => {
    const module = await import('./../src/index') // Update this path

    expect(module.default).toHaveProperty('hello')
    expect(typeof module.default.hello).toBe('function')
  })
})
