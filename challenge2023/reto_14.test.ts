import { describe, it, expect } from 'vitest'

function maxGifts (houses: number[]) {
  const numberHouses = houses.length
  if (numberHouses === 0) return 0
  if (numberHouses === 1) return houses[0]

  const maxGiftsPosible: number[] = []
  maxGiftsPosible[0] = houses[0]
  maxGiftsPosible[1] = Math.max(houses[0], houses[1])

  for (let i = 2; i < numberHouses; i++) {
    const prevMaxGifts = maxGiftsPosible[i - 1]
    const currMaxGift = maxGiftsPosible[i - 2] + houses[i]
    maxGiftsPosible[i] = Math.max(prevMaxGifts, currMaxGift)
  }

  return maxGiftsPosible[numberHouses - 1]
}

describe('Reto #14: 🚨 Evita la alarma', () => {
  it('Entrega casa de en medio', () => {
    expect(maxGifts([2, 4, 2])).toBe(4)
  })

  it('Entrega dos casa que suman 10', () => {
    expect(maxGifts([5, 1, 1, 5])).toBe(10)
  })

  it('Entrega tres casa que suman 9', () => {
    expect(maxGifts([4, 1, 1, 4, 2, 1])).toBe(9)
  })

  it('Entrega la segunda y ultima casa que suman 103', () => {
    expect(maxGifts([1, 3, 1, 3, 100])).toBe(103)
  })

  it('Entrega en cuatro casa y suma 12', () => {
    expect(maxGifts([2, 1, 2, 1, 2, 1, 6])).toBe(12)
  })
})
