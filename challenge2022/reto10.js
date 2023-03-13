import { describe, expect, it } from 'vitest'

function checkJump (heights) {
  if (!Array.isArray(heights)) throw new Error()
  const max = Math.max(...heights)
  const indexMax = heights.findIndex((heigh) => heigh === max)
  const up = heights.slice(0, indexMax + 1)
  const down = heights.slice(indexMax)
  if (up.length <= 1 || down.length <= 1) return false

  let check = false
  check = !up.some((item, index) => item > up[index + 1])
  if (check) {
    check = !down.some((item, index) => item < down[index + 1])
  }

  return check
}

describe('reto10', () => {
  it('should be a function', () => {
    expect(checkJump).toBeTypeOf('function')
  })

  it('should throw if parameter is nor array', () => {
    expect(() => checkJump()).toThrow()
  })

  it('should return boolead', () => {
    expect(checkJump([1])).toBeTypeOf('boolean')
  })

  it('should return true', () => {
    expect(checkJump([1, 3, 2])).toBe(true)
  })

  it('should return true', () => {
    expect(checkJump([1, 3, 8, 5, 2])).toBe(true)
  })

  it('should return false', () => {
    expect(checkJump([1, 7, 3, 5])).toBe(false)
  })

  it('should return false', () => {
    expect(checkJump([2, 2, 2, 2])).toBe(false)
  })

  it('should return false', () => {
    expect(checkJump([1, 2, 3])).toBe(false)
  })

  it('should return false', () => {
    expect(checkJump([1, 3, 2, 5, 4, 3, 2, 1])).toBe(false)
  })
})
