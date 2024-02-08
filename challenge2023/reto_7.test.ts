import { describe, it, expect } from 'vitest'

function drawGift (size: number, symbol: string): string {
  let gift = ''

  if (size <= 1) return '#\n'

  const faceSymbol = symbol.repeat(size - 2)

  gift += ' '.repeat(size - 1)
  gift += '#'.repeat(size)
  gift += '\n'

  for (let layer = 1; layer < size - 1; layer++) {
    gift += ' '.repeat(size - layer - 1)
    gift += '#'
    gift += faceSymbol
    gift += '#'
    gift += symbol.repeat(layer - 1)
    gift += '#'
    gift += '\n'
  }

  gift += '#'.repeat(size)
  gift += faceSymbol
  gift += '#'
  gift += '\n'

  for (let layer = size - 1; layer > 1; layer--) {
    gift += '#'
    gift += faceSymbol
    gift += '#'
    gift += symbol.repeat(layer - 2)
    gift += '#'
    gift += '\n'
  }

  gift += '#'.repeat(size)
  gift += '\n'

  return gift
}

describe('drawGift', () => {
  it('should return a string', () => {
    expect(drawGift(0, '')).toBeTypeOf('string')
  })

  it('should return a string with a gift of 1 face in 3D', () => {
    expect(drawGift(1, '^')).toStrictEqual('#\n')
  })

  it('should return a string with a gift of 2 face in 3D', () => {
    expect(drawGift(2, '&')).toStrictEqual(' ##\n###\n##\n')
  })

  it('should return a string with a gift of 4 face in 3D', () => {
    const result =
`   ####
  #++##
 #++#+#
####++#
#++#+#
#++##
####
`
    expect(drawGift(4, '+')).toStrictEqual(result)
  })

  it('should return a string with a gift of 5 face in 3D', () => {
    const result =
`    #####
   #***##
  #***#*#
 #***#**#
#####***#
#***#**#
#***#*#
#***##
#####
`
    expect(drawGift(5, '*')).toStrictEqual(result)
  })
})
