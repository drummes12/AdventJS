import { describe, expect, it } from 'vitest'

function carryGifts(gifts, maxWeight) {
  if (!Array.isArray(gifts)) throw new Error()
  if (typeof maxWeight !== 'number') throw new Error()

  if (!gifts.every((gift) => maxWeight >= gift.length)) {
    return []
  }
  const carrys = gifts.reduce((carrys, gift) => {
    if (carrys.at(-1).replace(/ /g, '').length + gift.length <= maxWeight) {
      const lastCarry = carrys.length - 1
      carrys[lastCarry] = `${carrys[lastCarry]} ${gift}`.trim()
      return carrys
    }
    return carrys.concat(gift)
  }, [''])
  return carrys
}

describe('reto17', () => {
  it('should to be a function', () => {
    expect(carryGifts).toBeTypeOf('function')
  })

  it('should throw if first argument is not a array', () => {
    expect(() => carryGifts()).toThrow()
  })

  it('should throw if first argument is not a number', () => {
    expect(() => carryGifts([])).toThrow()
  })

  it('should return array with 2 positions', () => {
    const gifts = ['game', 'bike', 'book', 'toy']
    const maxWeight = 10
    const carrys = carryGifts(gifts, maxWeight)
    expect(carrys).toEqual(['game bike', 'book toy'])
  })

  it('should return array with 3 positions', () => {
    const gifts = ['game', 'bike', 'book', 'toy']
    const maxWeight = 7
    const carrys = carryGifts(gifts, maxWeight)
    expect(carrys).toEqual(['game', 'bike', 'book toy'])
  })

  it('should return array with empty array', () => {
    const gifts = ['toy', 'toy', 'toy', 'toy']
    const maxWeight = 2
    const carrys = carryGifts(gifts, maxWeight)
    expect(carrys).toEqual([])
  })

  it('should return array with empty array', () => {
    const gifts = ['ab', 'cd', 'ef', 'ghijkl']
    const maxWeight = 5
    const carrys = carryGifts(gifts, maxWeight)
    expect(carrys).toEqual([])
  })
})
