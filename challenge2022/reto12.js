import { describe, expect, it } from 'vitest'

function selectSleigh(distance, sleighs) {
  if (typeof distance !== 'number') throw new Error()
  if (!Array.isArray(sleighs)) throw new Error()

  const battery = 20
  const consumes = sleighs
    .map((sleigh) => {
      return { name: sleigh.name, consume: sleigh.consumption * distance }
    })
    .filter((sleigh) => sleigh.consume <= battery)

  const bestSleigh = consumes.at(-1)

  return bestSleigh ? bestSleigh.name : null
}

describe('reto12', () => {
  it('should be a function', () => {
    expect(selectSleigh).toBeTypeOf('function')
  })

  it('should throw if first parameter is not number', () => {
    expect(() => selectSleigh()).toThrow()
  })

  it('should throw if second parameter is not array', () => {
    expect(() => selectSleigh(1)).toThrow()
  })

  it('should return a string or null', () => {
    expect(selectSleigh(30, [{ name: 'test', consumption: 0.3 }])).toBeTypeOf(
      'string',
    )
  })

  it('should return a string or null', () => {
    expect(selectSleigh(30, [{ name: 'test', consumption: 1 }])).toBeNull()
  })

  it('should return "Dancer"', () => {
    const distance = 30
    const sleighs = [
      { name: 'Dasher', consumption: 0.3 },
      { name: 'Dancer', consumption: 0.5 },
      { name: 'Rudolph', consumption: 0.7 },
      { name: 'Midu', consumption: 1 },
    ]
    expect(selectSleigh(distance, sleighs)).toBe('Dancer')
  })

  it('should return "Dancer"', () => {
    const distance = 30
    const sleighs = [
      { name: 'Dasher', consumption: 0.7 },
      { name: 'Dancer', consumption: 0.8 },
      { name: 'Rudolph', consumption: 0.9 },
      { name: 'Midu', consumption: 1 },
    ]
    expect(selectSleigh(distance, sleighs)).toBeNull()
  })
})
