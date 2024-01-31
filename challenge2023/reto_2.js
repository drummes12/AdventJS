import { describe, expect, it } from 'vitest'

function manufacture (gifts, materials) {
  if (!gifts.every((gift) => typeof gift === 'string') || typeof materials !== 'string') throw new Error()

  const giftBuilt = gifts.filter((gift) => {
    const letter = gift.split('')
    const isBuilt = letter.every((l) => materials.includes(l))

    return isBuilt && gift
  })

  return giftBuilt.filter(Boolean)
}

describe('manufacture', () => {
  it('should be a function', () => {
    expect(manufacture).toBeTypeOf('function')
  })

  it('should throw if not array is provided as first parameter', () => {
    expect(() => manufacture(1)).toThrow()
  })

  it('should throw if not string is provided as second parameter', () => {
    expect(() => manufacture([''], 1)).toThrow()
  })

  it('should return a array', () => {
    expect(Array.isArray(manufacture(['', ''], ''))).toBe(true)
  })

  it('should return an array with the gifts that can be built.', () => {
    expect(manufacture(['oso'], 'tronesa')).toStrictEqual(['oso'])
  })

  it('should return an array with the gifts that can\'t be built.', () => {
    expect(manufacture(['pelota'], 'tronesa')).toStrictEqual([])
  })

  it('should return an array with all gifts that can be built.', () => {
    expect(manufacture(['tren', 'oso', 'pelota'], 'tronesa')).toStrictEqual(['tren', 'oso'])
  })
})
