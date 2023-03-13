import { describe, expect, it } from 'vitest'

function dryNumber(dry, numbers) {
  if (typeof dry !== 'number') throw new Error()
  if (typeof numbers !== 'number') throw new Error()

  const result = Array.from({ length: numbers }, (_, i) => i + 1).filter(
    (number) => `${number}`.includes(dry),
  )

  return result
}

describe('reto18', () => {
  it('should be a function', () => {
    expect(dryNumber).toBeTypeOf('function')
  })

  it('should throw if first argument is not a number', () => {
    expect(() => dryNumber()).toThrow()
  })

  it('should throw if second argument is not a number', () => {
    expect(() => dryNumber(1)).toThrow()
  })

  it('should return a array', () => {
    const result = dryNumber(1, 1)
    expect(Array.isArray(result)).toBe(true)
  })

  it('should return array of bar', () => {
    expect(dryNumber(1, 15)).toEqual([1, 10, 11, 12, 13, 14, 15])
  })
})
