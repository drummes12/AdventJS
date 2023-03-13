import { describe, expect, it } from 'vitest'

function checkPart (part) {
  if (typeof part !== 'string') throw new Error()

  const arrayPart = part.split('')
  const arrayFirstPart = [...arrayPart]
  const arraySecondPart = [...arrayPart].reverse()
  if (arrayFirstPart.join('') !== arraySecondPart.join('')) {
    const desiqual1 = arrayFirstPart.findIndex(
      (value, index) => value !== arraySecondPart[index]
    )
    const value = arrayFirstPart[desiqual1]
    arrayFirstPart.splice(desiqual1, 1)
    arraySecondPart.splice(-desiqual1 - 1, 1)
    if (arrayFirstPart.join('') !== arraySecondPart.join('')) {
      arrayFirstPart.splice(desiqual1, 0, value)
      arraySecondPart.splice(-desiqual1, 0, value)
      arraySecondPart.splice(desiqual1, 1)
      arrayFirstPart.splice(-desiqual1 - 1, 1)
    }
  }

  return arrayFirstPart.join('') === arraySecondPart.join('')
}

describe('reto8', () => {
  it('should be a function', () => {
    expect(checkPart).toBeTypeOf('function')
  })

  it('should throw if first parameter is not string', () => {
    expect(() => checkPart(1)).toThrow()
  })

  it('should return boolean', () => {
    expect(checkPart('')).toBeTypeOf('boolean')
  })

  it('should return true', () => {
    expect(checkPart('uwuwuwu')).toBe(true)
  })

  it('should return true', () => {
    expect(checkPart('miidim')).toBe(true)
  })

  it('should return false', () => {
    expect(checkPart('midu')).toBe(false)
  })

  it('should return true', () => {
    expect(checkPart('zzzoonzzz')).toBe(true)
  })

  it('should return true', () => {
    expect(checkPart('zozozoozzoozz')).toBe(false)
  })
})
