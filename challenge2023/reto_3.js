import { describe, expect, it } from 'vitest'

function findNaughtyStep (original, modified) {
  if (typeof original !== 'string' || typeof modified !== 'string') throw new Error()

  if (original === modified) return ''

  for (let i = 0; i < original.length + 1; i++) {
    if (original[i] !== modified[i]) {
      if (original[i] === modified[i + 1]) return modified[i]
      return original[i]
    }
  }

  return ''
}

describe('manufacture', () => {
  it('should be a function', () => {
    expect(findNaughtyStep).toBeTypeOf('function')
  })

  it('should throw if insufficient or incorrect type is provided as parameter', () => {
    expect(() => findNaughtyStep(1, 1)).toThrow()
  })

  it('should return a string', () => {
    expect(findNaughtyStep('', '')).toBeTypeOf('string')
  })

  it('should return an string with the naughty steps surplus.', () => {
    expect(findNaughtyStep('abcd', 'abcde')).toStrictEqual('e')
  })

  it('should return an string with the naughty steps missing.', () => {
    expect(findNaughtyStep('stepfor', 'stepor')).toStrictEqual('f')
  })

  it('should return an string within the naughty steps.', () => {
    expect(findNaughtyStep('abc', 'abcd')).toStrictEqual('d')
  })

  it('should return an string with the naughty steps surplus.', () => {
    expect(findNaughtyStep('xxxx', 'xxoxx')).toStrictEqual('o')
  })
})
