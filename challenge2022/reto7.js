import { describe, expect, it } from 'vitest'

function getGiftsToRefill (a1, a2, a3) {
  if (!Array.isArray(a1)) throw new Error()
  if (!Array.isArray(a2)) throw new Error()
  if (!Array.isArray(a3)) throw new Error()

  const unique1 = [...new Set(a1)]
  const unique2 = [...new Set(a2)]
  const unique3 = [...new Set(a3)]

  const Refill = [
    ...unique1.filter(
      (item) => !unique2.includes(item) && !unique3.includes(item)
    ),
    ...unique2.filter(
      (item) => !unique1.includes(item) && !unique3.includes(item)
    ),
    ...unique3.filter(
      (item) => !unique1.includes(item) && !unique2.includes(item)
    )
  ]
  return Refill
}

describe('reto7', () => {
  it('should be a function', () => {
    expect(getGiftsToRefill).toBeTypeOf('function')
  })

  it('should throw if first parameter provided is array', () => {
    expect(() => getGiftsToRefill(1)).toThrow()
  })

  it('should throw if second parameter provided is array', () => {
    expect(() => getGiftsToRefill([], 1)).toThrow()
  })

  it('should throw if thirt parameter provided is array', () => {
    expect(() => getGiftsToRefill([], [], 1)).toThrow()
  })

  it('should return array', () => {
    const response = getGiftsToRefill([], [], [])
    expect(Array.isArray(response)).toBe(true)
  })

  it('should return array with phone', () => {
    const a1 = ['bici', 'bici']
    const a2 = ['bici']
    const a3 = ['bici', 'phone']
    expect(getGiftsToRefill(a1, a2, a3)).toEqual(['phone'])
  })

  it('should return array with muñeca and pc', () => {
    const a1 = ['bici', 'coche', 'bici', 'bici']
    const a2 = ['coche', 'bici', 'muñeca', 'coche']
    const a3 = ['bici', 'pc', 'pc']
    expect(getGiftsToRefill(a1, a2, a3)).toEqual(['muñeca', 'pc'])
  })
})
