import '@testing-library/jest-dom'
import { afterEach, beforeAll } from 'vitest'
import { cleanup } from '@testing-library/react'

  // Suppress stderr warnings from router devtools and CSS parsing (must be done before any imports)
  // These warnings are printed during module import, so we intercept stderr early
  const originalStderrWrite = process.stderr.write.bind(process.stderr)
  process.stderr.write = function (
    chunk: string | Uint8Array,
    encoding?: BufferEncoding | ((err?: Error | null) => void),
    cb?: (err?: Error | null) => void
  ) {
    const chunkStr = typeof chunk === 'string' 
      ? chunk 
      : chunk instanceof Buffer 
        ? chunk.toString() 
        : String(chunk)
    
    if (
      chunkStr.includes('@tanstack/router-devtools') ||
      chunkStr.includes('moved to') ||
      chunkStr.includes('This package has moved') ||
      chunkStr.includes('has moved to @tanstack/react-router-devtools') ||
      chunkStr.includes('Could not parse CSS stylesheet')
    ) {
      return true
    }
    
    if (typeof encoding === 'function') {
      return originalStderrWrite(chunk, encoding)
    }
    if (typeof cb === 'function') {
      return originalStderrWrite(chunk, encoding as BufferEncoding, cb)
    }
    return originalStderrWrite(chunk, encoding as BufferEncoding)
  }

// Suppress test warnings
beforeAll(() => {
  // Suppress console warnings for React Query act() warnings
  const originalError = console.error
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('An update to') &&
      args[0].includes('was not wrapped in act')
    ) {
      return
    }
    originalError(...args)
  }

  // Suppress TanStack Router devtools deprecation warning
  const originalWarn = console.warn
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('@tanstack/router-devtools') ||
        args[0].includes('moved to') ||
        args[0].includes('This package has moved'))
    ) {
      return
    }
    originalWarn(...args)
  }

})

// Cleanup after each test
afterEach(() => {
  cleanup()
})

