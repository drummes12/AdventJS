import { describe, test, expect } from 'vitest'

function organizeGifts (gifts: string): string {
  const regexGifts = /(\d+)(\w)/g

  const giftSplit = [...gifts.matchAll(regexGifts)]
  if (giftSplit.length === 0) return ''

  let result = ''

  for (const [_, number, type] of giftSplit) {
    let rest = +number
    const pales = `[${type}]`.repeat(rest / 50)
    rest %= 50
    const cajas = `{${type}}`.repeat(rest / 10)
    rest %= 10
    const bolsas = `(${`${type}`.repeat(rest)})`
      .repeat(+!(rest === 0))

    result += pales + cajas + bolsas
  }

  return result
}

describe('Reto 8: Organizar regalos', () => {
  test('Cajas', () => {
    const gifts = '20a10b'
    expect(organizeGifts(gifts)).toBe('{a}{a}{b}')
  })

  test('Palé', () => {
    const gifts = '60a10b'
    expect(organizeGifts(gifts)).toBe('[a]{a}{b}')
  })

  test('Bolsas', () => {
    const gifts = '64a10b'
    expect(organizeGifts(gifts)).toBe('[a]{a}(aaaa){b}')
  })
})
