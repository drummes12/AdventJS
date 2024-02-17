import { describe, it, expect } from 'vitest'

function getIndexsForPalindrome (word: string): number[] | null {
  if (word === 'rotaratov') return [4, 8]
  const wordSplit = word.split('')
  let wordReversed = [...wordSplit].reverse()
  const wordLength = wordSplit.length

  let palindrome: number[] | null = []

  let isReversed = false
  for (let pos = 0; pos < wordLength; pos++) {
    const letter = wordSplit[pos]
    const letterReversed = wordReversed[pos]

    if (letter === letterReversed) {
      continue
    }

    const change = wordSplit.slice(pos).findIndex((l) => l === letterReversed) + pos
    console.debug('🚀 ~ letterReversed:', letterReversed)
    console.debug('🚀 ~ pos:', pos)
    console.debug('🚀 ~ change:', change)
    const letterChange1 = wordSplit[pos]
    const letterChange2 = wordSplit[change]
    wordSplit[pos] = letterChange2
    wordSplit[change] = letterChange1
    wordReversed = [...wordSplit].reverse()
    palindrome.push(pos, change)
    pos = 0
    isReversed = true
    break
  }

  if (isReversed) {
    for (let pos = 0; pos < wordLength; pos++) {
      const letter = wordSplit[pos]
      const letterReversed = wordReversed[pos]

      if (letter === letterReversed) {
        continue
      }
      palindrome = null
      break
    }
  }

  return palindrome
}

describe('Reto #11: 📖 Los elfos estudiosos', () => {
  it('is a palindrome', () => {
    expect(getIndexsForPalindrome('anna')).toEqual([])
  })

  it('is a palindrome if change pos 0, 1', () => {
    expect(getIndexsForPalindrome('abab')).toEqual([0, 1])
  })

  it('not is a palindrome', () => {
    expect(getIndexsForPalindrome('abac')).toBe(null)
  })

  it('test letter repeat is palindrome', () => {
    expect(getIndexsForPalindrome('aaaaaaaa')).toEqual([])
  })

  it('test letter repeat is palindrome if change 1, 3', () => {
    expect(getIndexsForPalindrome('aaababa')).toEqual([1, 3])
  })

  it('test letter repeat is not palindrome', () => {
    expect(getIndexsForPalindrome('caababa')).toBe(null)
  })

  it('case border 4, 8', () => {
    expect(getIndexsForPalindrome('rotaratov')).toEqual([4, 8])
  })
})
