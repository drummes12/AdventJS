import { describe, expect, it } from 'vitest'

function countTime (leds) {
  if (!Array.isArray(leds)) throw new Error()
  const ledsStr = leds.join('') + leds.join('')
  const ledsOff = ledsStr.split('1').map(str => str.length)

  return Math.max(...ledsOff) * 7
}

describe('reto9', () => {
  it('should be a function', () => {
    expect(countTime).toBeTypeOf('function')
  })

  it('should throw if first parameter is not array', () => {
    expect(() => countTime(1)).toThrow()
  })

  it('should return a number', () => {
    expect(countTime([1])).toBeTypeOf('number')
  })

  it('should return 7', () => {
    const leds = [0, 1, 1, 0, 1]
    expect(countTime(leds)).toBe(7)
  })

  it('should return 21', () => {
    const leds = [0, 0, 0, 1]
    expect(countTime(leds)).toBe(21)
  })
})
