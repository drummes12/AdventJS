import { describe, expect, it } from 'vitest'

function decode(message: string) {
  if (typeof message !== 'string') throw new Error('Invalid parameter')

  const pattern = /\(((?:[^)(]+|\([^)(]*\)|\([^)(]*\([^)(]*\)[^)(]*\))*)\)/g;
  const matches = message.match(pattern)
  if (matches === null) return message

  matches.forEach((match) => {
    let subLayer = match.slice(1, -1).split('')
    const isSubLayer = subLayer.filter(c => c === '(').length > 0
    if (isSubLayer) subLayer = decode(subLayer.join('')).split('')

    const decoded = subLayer.reverse().join('')
    message = message.replace(match, decoded)
  })

  return message
}

describe('decode', () => {
  it('should be a function', () => {
    expect(decode).toBeTypeOf('function')
  })

  it('should throw if insufficient or incorrect type is provided as parameter', () => {
    expect(() => decode(1)).toThrow()
  })

  it('should return a string', () => {
    expect(decode('')).toBeTypeOf('string')
  })

  it('should return an string with the string revert', () => {
    expect(decode('(odnum)')).toStrictEqual('mundo')
  })

  it('should return an string with the string revert correct', () => {
    expect(decode('hola (odnum), como estan?')).toStrictEqual('hola mundo, como estan?')
  })

  it('should return an string with the string revert consecutive correct', () => {
    expect(decode('(olleh) (dlrow)!')).toStrictEqual('hello world!')
  })

  it('should return an string with the string revert nested correct.', () => {
    expect(decode('sa(u(cla)atn)s')).toStrictEqual('santaclaus')
  })
})
