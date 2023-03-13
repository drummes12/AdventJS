import { describe, expect, it } from 'vitest'

function getOptimalPath(path) {
  const res = path.reduceRight((previous, current) =>
    current.map(
      (val, index) => val + Math.min(previous[index], previous[index + 1]),
    ),
  )[0]
  return res
}

describe('reto14', () => {
  it('should to be a function', () => {
    expect(getOptimalPath).toBeTypeOf('function')
  })

  it('should throw if parameter is not a array', () => {
    expect(() => getOptimalPath()).toThrow()
  })

  it('should return a number', () => {
    expect(getOptimalPath([[1]])).toBeTypeOf('number')
  })

  it('should return 2', () => {
    expect(getOptimalPath([[0], [2, 3]])).toBe(2)
  })

  it('should return 2', () => {
    expect(getOptimalPath([[1], [7, 4], [2, 4, 6]])).toBe(9)
  })

  it('should return 2', () => {
    expect(getOptimalPath([[1], [1, 5], [7, 5, 8], [9, 4, 1, 3]])).toBe(8)
  })
})

//       [1]
//     [7   4]
//   [2   4   6]
// [9   4   1   3]
