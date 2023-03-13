import { describe, expect, it } from 'vitest'

function sortToys(toys, positions) {
  if (!Array.isArray(toys)) throw new Error()
  if (!Array.isArray(positions)) throw new Error()

  const toyPos = toys.map((toy, i) => [toy, positions[i]])
  return toyPos.sort((toyA, toyB) => toyA[1] - toyB[1]).map((toy) => toy[0])
}

describe('reto19', () => {
  it('should be a function', () => {
    expect(sortToys).toBeTypeOf('function')
  })

  it('should throw if first argument is not an array', () => {
    expect(() => sortToys()).toThrow()
  })

  it('should throw if secont argument is not an array', () => {
    expect(() => sortToys([])).toThrow()
  })

  it('should be array order', () => {
    const toys = ['ball', 'doll', 'car', 'puzzle']
    const positions = [2, 3, 1, 0]
    expect(sortToys(toys, positions)).toEqual(['puzzle', 'car', 'ball', 'doll'])
  })

  it('should be array order', () => {
    expect(
      sortToys(['pc', 'xbox', 'ps4', 'switch', 'nintendo'], [8, 6, 5, 7, 9]),
    ).toEqual(['ps4', 'xbox', 'switch', 'pc', 'nintendo'])
  })
})
