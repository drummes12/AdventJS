import { describe, expect, it } from 'vitest'

function createCube (size) {
  if (typeof size !== 'number') throw new Error()

  const facesLUp = (length) => Array(length).fill('/\\').join('')
  const facesLDown = (length) => Array(length).fill('\\/').join('')
  const facesRUp = (length) => Array(length).fill('\\').join('_')
  const facesRDown = (length) => Array(length).fill('/').join('_')
  const space = (length) => ' '.repeat(length)

  const cube = Array(size * 2)
  for (let i = 1; i < size + 1; i++) {
    cube[i - 1] = space(size - i) +
      facesLUp(i) + '_' + facesRUp(size)
    cube[i + size - 1] = space(i - 1) +
      facesLDown(size - i + 1) + '_' + facesRDown(size)
  }

  return cube.join('\n')
}

describe('reto6', () => {
  it('should be a function', () => {
    expect(createCube).toBeTypeOf('function')
  })

  it('should throw if parameter provided not is a number', () => {
    expect(() => createCube('1')).toThrow()
  })

  it('should return a string', () => {
    expect(createCube(1)).toBeTypeOf('string')
  })

  it('should return a cube of 1', () => {
    expect(createCube(1)).toBe('/\\_\\\n\\/_/')
  })

  it('should return a cube of 2', () => {
    expect(createCube(2)).toBe(' /\\_\\_\\\n/\\/\\_\\_\\\n\\/\\/_/_/\n \\/_/_/')
  })

  it('should return a cube of 3', () => {
    expect(createCube(3)).toBe(
      '  /\\_\\_\\_\\\n /\\/\\_\\_\\_\\\n/\\/\\/\\_\\_\\_\\\n\\/\\/\\/_/_/_/\n \\/\\/_/_/_/\n  \\/_/_/_/'
    )
  })

  it('should return a cube of 10', () => {
    expect(createCube(10)).toBe(
      '         /\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\\n        /\\/\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\\n       /\\/\\/\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\\n      /\\/\\/\\/\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\\n     /\\/\\/\\/\\/\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\\n    /\\/\\/\\/\\/\\/\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\\n   /\\/\\/\\/\\/\\/\\/\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\\n  /\\/\\/\\/\\/\\/\\/\\/\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\\n /\\/\\/\\/\\/\\/\\/\\/\\/\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\\n/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\\n\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/_/_/_/_/_/_/_/_/_/_/\n \\/\\/\\/\\/\\/\\/\\/\\/\\/_/_/_/_/_/_/_/_/_/_/\n  \\/\\/\\/\\/\\/\\/\\/\\/_/_/_/_/_/_/_/_/_/_/\n   \\/\\/\\/\\/\\/\\/\\/_/_/_/_/_/_/_/_/_/_/\n    \\/\\/\\/\\/\\/\\/_/_/_/_/_/_/_/_/_/_/\n     \\/\\/\\/\\/\\/_/_/_/_/_/_/_/_/_/_/\n      \\/\\/\\/\\/_/_/_/_/_/_/_/_/_/_/\n       \\/\\/\\/_/_/_/_/_/_/_/_/_/_/\n        \\/\\/_/_/_/_/_/_/_/_/_/_/\n         \\/_/_/_/_/_/_/_/_/_/_/'
    )
  })
})
