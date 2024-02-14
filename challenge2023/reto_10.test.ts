import { describe, it, expect } from 'vitest'

function createChristmasTree (ornaments: string, height: number): string {
  const decorations = ornaments.split('')
  let tree = ''
  let decor = 0

  for (let level = 0; level < height; level++) {
    const spaces = ' '.repeat(height - level - 1)

    const levelTree = []
    for (let decoration = 0; decoration < level + 1; decoration++) {
      levelTree.push(decorations[decor])
      decor = (decor + 1) % ornaments.length
    }

    tree += spaces + levelTree.join(' ') + '\n'
  }
  return tree + ' '.repeat(height - 1) + '|\n'
}

describe('Reto #10: 🎄 Crea tu propio árbol de navidad', () => {
  it('1 level', () => {
    const ornaments = '*'
    const height = 1
    const response = '*\n|\n'
    expect(createChristmasTree(ornaments, height)).toBe(response)
  })

  it('2 level', () => {
    const ornaments = '*@'
    const height = 2
    const response = ' *\n@ *\n |\n'
    expect(createChristmasTree(ornaments, height)).toBe(response)
  })

  it('3 level', () => {
    const ornaments = '*@#'
    const height = 3
    const response = '  *\n @ #\n* @ #\n  |\n'
    expect(createChristmasTree(ornaments, height)).toBe(response)
  })

  it('4 level', () => {
    const ornaments = '*@#&'
    const height = 4
    const response = '   *\n  @ #\n & * @\n# & * @\n   |\n'
    expect(createChristmasTree(ornaments, height)).toBe(response)
  })

  it('same ornaments', () => {
    const ornaments = 'x'
    const height = 3
    const response = '  x\n x x\nx x x\n  |\n'
    expect(createChristmasTree(ornaments, height)).toBe(response)
  })
})
