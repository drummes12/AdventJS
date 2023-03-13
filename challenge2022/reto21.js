import { describe, expect, it } from 'vitest'

function printTable(gifts) {
  if (!Array.isArray(gifts)) throw new Error()

  const nameGifts = ['Gift', ...gifts.map((gift) => gift.name)]
  const quantityGifts = ['Quantity', ...gifts.map((gift) => `${gift.quantity}`)]

  const maxNameGift = Math.max(...nameGifts.map((names) => names.length))
  const maxQuantityGifts = Math.max(...quantityGifts.map((quantity) => quantity.length))

  const table = ['+'.repeat(maxNameGift + maxQuantityGifts + 7)]
  table.push(
    `| ${
      nameGifts[0].padEnd(maxNameGift)
    } | ${
      quantityGifts[0].padEnd(maxQuantityGifts)
    } |`)
  table.push(
    `| ${
      '-'.repeat(maxNameGift)
    } | ${
      '-'.repeat(maxQuantityGifts)
    } |`)

  for (let i = 1; i < gifts.length + 1; i++) {
    table.push(
      `| ${
        nameGifts[i].padEnd(maxNameGift)
      } | ${
        quantityGifts[i].padEnd(maxQuantityGifts)
      } |`)
  }
  table.push('*'.repeat(maxNameGift + maxQuantityGifts + 7))

  return table.join('\n')
}

describe('reto21', () => {
  it('should be a function', () => {
    expect(printTable).toBeTypeOf('function')
  })

  it('should throw if parameter is not an array', () => {
    expect(() => printTable()).toThrow()
  })

  it('should return a string', () => {
    expect(printTable([])).toBeTypeOf('string')
  })

  it('should return a string with form of table', () => {
    expect(
      printTable([
        { name: 'Game', quantity: 2 },
        { name: 'Bike', quantity: 1 },
        { name: 'Book', quantity: 3 },
      ]),
    ).toBe(`+++++++++++++++++++
| Gift | Quantity |
| ---- | -------- |
| Game | 2        |
| Bike | 1        |
| Book | 3        |
*******************`)
  })
})
