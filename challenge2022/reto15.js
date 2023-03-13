import { describe, expect, it } from 'vitest'

function decorateTree(base) {
  if (typeof base !== 'string') throw new Error()
  const dict = {
    PP: 'P',
    BB: 'B',
    RR: 'R',
    BP: 'R',
    PB: 'R',
    BR: 'P',
    RB: 'P',
    PR: 'B',
    RP: 'B',
  }

  base = base.split(' ')
  const list = new Array(base.length).fill(base)
  const tree = list.reduce(
    (total) =>
      total.concat([
        new Array(total.at(-1).length - 1).fill('').map((_, i) => {
          return dict[
            total
              .at(-1)
              .slice(i, i + 2)
              .join('')
          ]
        }),
      ]),
    [base],
  )
  const decoTree = tree
    .slice(0, base.length)
    .map((layer) => layer.join(' '))
    .reverse()

  return decoTree
}

describe('reto15', () => {
  it('should to be a function', () => {
    expect(decorateTree).toBeTypeOf('function')
  })

  it('should throw if parameter is not a string', () => {
    expect(() => decorateTree()).toThrow()
  })

  it('should return an array', () => {
    const tree = decorateTree('B')
    expect(Array.isArray(tree)).toBe(true)
  })

  it('should return an tree (2 levels)', () => {
    expect(decorateTree('B B')).toEqual(['B', 'B B'])
  })

  it('should return an tree (2 levels)', () => {
    expect(decorateTree('B P')).toEqual(['R', 'B P'])
  })

  it('should return an tree (4 levels)', () => {
    expect(decorateTree('B P R P')).toEqual(['R', 'P B', 'R B B', 'B P R P'])
  })

  it('should return an tree (7 levels)', () => {
    expect(decorateTree('B B P R P R R')).toEqual([
      'B',
      'R P',
      'B P P',
      'P R B R',
      'P P B B P',
      'B R B B B R',
      'B B P R P R R',
    ])
  })
})
