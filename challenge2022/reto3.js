import { describe, expect, it } from 'vitest'

const reto3 = (packOfGifts, reindeers) => {
  if (!packOfGifts.every((pog) => typeof pog === 'string')) throw new Error()
  if (!reindeers.every((rein) => typeof rein === 'string')) throw new Error()

  let weightGifts = 0
  packOfGifts.forEach((pog) => {
    weightGifts += pog.length
  })

  let weightReindeers = 0
  reindeers.forEach((rein) => {
    weightReindeers += rein.length
  })

  return Math.floor((weightReindeers * 2) / weightGifts)
}

describe('reto3', () => {
  it('should be a function', () => {
    expect(reto3).toBeTypeOf('function')
  })

  it('should throw if first parameter if not array of strings', () => {
    expect(() => reto3([1, 2, '3'])).toThrow()
  })

  it('should throw if second parameter if not array of strings', () => {
    expect(() => reto3(['1', '2', '3'], [1, 2, '3'])).toThrow()
  })

  it('should return a number', () => {
    expect(reto3(['1', '2', '3'], ['1', '2', '3'])).toBeTypeOf('number')
  })

  it('should return the number of gifts', () => {
    expect(reto3(['book', 'doll', 'ball'], ['dasher', 'dancer'])).toBe(2)
  })

  it('should return the number exact for down of gifts', () => {
    expect(reto3(['a', 'b', 'c'], ['d', 'e'])).toBe(1)
  })
})
