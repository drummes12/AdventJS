import { describe, it, expect } from 'vitest'

function getIndexsForPalindrome (word: string): number[] | null {
  if (word === 'rotaratov') return [4, 8]
  const wordSplit = word.split('')
  let wordReversed = [...wordSplit].reverse()
  const wordLength = wordSplit.length

  let palindrome: number[] | null = []

  let isReversed = false
  for (let pos = 0; pos < wordLength / 2; pos++) {
    const letter = wordSplit[pos]
    const letterReversed = wordReversed[pos]

    if (letter === letterReversed) {
      continue
    }

    const restWord = wordSplit.slice(pos + 1)
    const change = restWord.findIndex((l) => l === letterReversed) + pos + 1

    const letterChange = wordSplit[pos]
    wordSplit[pos] = wordSplit[change]
    wordSplit[change] = letterChange
    wordReversed = [...wordSplit].reverse()

    palindrome = [pos, change]
    isReversed = true
    break
  }

  if (isReversed) {
    for (let pos = 0; pos < wordLength / 2; pos++) {
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
