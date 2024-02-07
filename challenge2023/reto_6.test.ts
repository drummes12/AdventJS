import { describe, expect, it } from 'vitest'

function maxDistance (movements: string): number {
  let position = 0
  let positionStar = 0

  for (const move of movements) {
    if (move === '>') { position -= 1; continue }
    if (move === '<') { position += 1; continue }
    positionStar += 1
  }

  return Math.abs(position) + positionStar
}

describe('maxDistance', () => {
  it('return an number', () => {
    expect(maxDistance('')).toBeTypeOf('number')
  })

  it('maxDistance(">>*<") should return 2', () => {
    expect(maxDistance('>>*<')).toBe(2)
  })

  it('maxDistance("<<<<<") should return 5', () => {
    expect(maxDistance('<<<<<')).toBe(5)
  })

  it('maxDistance(">***>") should return 5', () => {
    expect(maxDistance('>***>')).toBe(5)
  })

  it('maxDistance("**********") should return 10', () => {
    expect(maxDistance('**********')).toBe(10)
  })

  it('maxDistance("*<<<<<") should return 6', () => {
    expect(maxDistance('*<<<<<')).toBe(6)
  })
})
