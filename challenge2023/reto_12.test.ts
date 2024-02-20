import { describe, it, expect } from 'vitest'

function checkIsValidCopy (original: string, copy: string) {
  const orderDegrad = ['#', '+', ':', '.', ' ']

  for (let pos = 0; pos < original.length; pos++) {
    const originalLetter = original[pos]
    const copyLetter = copy[pos]

    if (originalLetter === ' ' && copyLetter !== ' ') return false
    if (originalLetter === copyLetter) continue
    if (copyLetter === originalLetter.toLowerCase()) continue

    const levelDegraded = orderDegrad.indexOf(originalLetter) + 1
    const degraded = orderDegrad.slice(levelDegraded)

    if (!degraded.includes(copyLetter)) return false
  }
  return true
}

describe('Reto #12: 📸 ¿Es una copia válida?', () => {
  it('is copy 2 levels', () => {
    expect(checkIsValidCopy(
      'Santa Claus is coming',
      'sa#ta Cl#us i+ comin#'
    )).toBe(true)
  })

  it('not is copy 2 levels by p', () => {
    expect(checkIsValidCopy(
      's#nta Cla#s is coming',
      'p#nt: cla#s #s c+min#'
    )).toBe(false)
  })

  it('is copy more levels', () => {
    expect(checkIsValidCopy(
      'Santa Claus',
      's#+:. c:. s'
    )).toBe(true)
  })

  it('not is copy more levels by space', () => {
    expect(checkIsValidCopy(
      'Santa Claus',
      's#+:.#c:. s'
    )).toBe(false)
  })

  it('not is copy more levels by space', () => {
    expect(checkIsValidCopy(
      's+#:.#c:. s',
      's#+:.#c:. s'
    )).toBe(false)
  })
})
