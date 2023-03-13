import { describe, expect, it } from 'vitest'

function getCompleted(part, total) {
  if (typeof part !== 'string') throw new Error()
  if (typeof total !== 'string') throw new Error()

  function timeToSeconds (time) {
    const [horas, minutos, segundos] = time.split(':')
    return horas * 3600 + minutos * 60 + segundos * 1
  }

  function findGcd(a, b) {
    for (let i = 0; i < 100; i++) {
      if (b === 0) break
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }

  const secondsPart = timeToSeconds(part)
  const secondsTotal = timeToSeconds(total)

  const gcd = findGcd(secondsPart, secondsTotal)

  return `${secondsPart / gcd}/${secondsTotal / gcd}`
}

describe('reto11', () => {
  it('should be a function', () => {
    expect(getCompleted).toBeTypeOf('function')
  })

  it('should throw if first parameter is not a string', () => {
    expect(() => getCompleted()).toThrow()
  })

  it('should throw if second parameter is not a string', () => {
    expect(() => getCompleted('')).toThrow()
  })

  it('should return a string', () => {
    expect(getCompleted('', '')).toBeTypeOf('string')
  })

  it('should return a "1/3"', () => {
    expect(getCompleted('01:00:00', '03:00:00')).toBe('1/3')
  })

  it('should return a "3/5"', () => {
    expect(getCompleted('03:30:30', '05:50:50')).toBe('3/5')
  })
})
