import { describe, expect, it } from 'vitest'

const reto1 = (gifts) => {
  if (!gifts.every((gift) => typeof gift === 'string')) throw new Error()

  return gifts.map((gift) => {
    const faceBox = '*'.repeat(gift.length + 2)
    return `${faceBox}\n*${gift}*\n${faceBox}`
  })
}

describe('reto1', () => {
  it('should be a function', () => {
    expect(reto1).toBeTypeOf('function')
  })

  it('should throw if not array is provided as parameter', () => {
    expect(() => reto1(1)).toThrow()
  })

  it('should throw if each value provided is not a string', () => {
    expect(() => reto1([1])).toThrow()
  })

  it('should return a array', () => {
    expect(Array.isArray(reto1(['1', '2']))).toBe(true)
  })

  it('should return an array with strings packing string from the original array', () => {
    expect(reto1(['1'])).toStrictEqual(['***\n*1*\n***'])
  })

  it('should return an array with strings packing each string from the original array', () => {
    expect(reto1(['cat', 'game', 'socks'])).toStrictEqual([
      '*****\n*cat*\n*****',
      '******\n*game*\n******',
      '*******\n*socks*\n*******'
    ])
  })
})
