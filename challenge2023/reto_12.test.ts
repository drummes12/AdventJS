import { describe, it, expect } from 'vitest'

function checkIsValidCopy (original: string, copy: string) {
  const orderDegrad = ['#', '\\+', ':', '\\.', '\\s']

  for (let pos = 0; pos < original.length; pos++) {
    const regexLetters = /[a-zA-Z]+/g
    let regexDegrad = new RegExp(`(${orderDegrad.join('|')})+`)

    const originalLetter = original[pos]
    const copyLetter = copy[pos]

    if (originalLetter === ' ' && copyLetter !== ' ') return false

    let canDegraded = regexLetters.test(originalLetter)

    const alreadyDegraded = regexDegrad.test(originalLetter)

    if (alreadyDegraded) {
      const levelDegraded = orderDegrad.indexOf(originalLetter)
      const regex = orderDegrad.slice(levelDegraded).join('|')
      regexDegrad = new RegExp(`(${regex})+`)
      canDegraded = true
    }

    if (canDegraded) {
      const isOriginal = copyLetter === originalLetter
      const isLetterDegraded = copyLetter === originalLetter.toLowerCase()
      const isDegraded = regexDegrad.test(copyLetter)

      if (!isOriginal && !isLetterDegraded && !isDegraded) return false
    }
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
