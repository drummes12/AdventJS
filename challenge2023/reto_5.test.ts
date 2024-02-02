import { describe, expect, it } from 'vitest'

function cyberReindeer(road: string, time: number): string[] {
  if (typeof road !== 'string' || typeof time !== 'number') throw new Error()
  
  let roadArray = road.split('')
  let positionCyber = 1
  const roadStates: string[] = [road]

  for (let unitTime = 1; unitTime < time; unitTime++) {
    if (unitTime === 5) {
      const unlockRoad = road.replaceAll('|', '*')
      roadArray = unlockRoad.split('')
      if (unitTime > positionCyber){
        positionCyber += 1
      }
    }
    const state = ['.', ...roadArray.slice(1)]
    state[positionCyber] = 'S'

    if (state[positionCyber + 1] !== '|'){
      positionCyber += 1
    }

    roadStates.push(state.join(''))
  }

  return roadStates
}

describe('cyberReindeer', () => {
  it('should be a function', () => {
    expect(cyberReindeer).toBeTypeOf('function')
  })

  it('should throw if insufficient or incorrect type is provided as parameters', () => {
    expect(() => cyberReindeer(1, '')).toThrow()
  })

  it('should return a array', () => {
    expect(Array.isArray(cyberReindeer('', 1))).toBe(true)
  })

  it('should return an array with the road', () => {
    const result = [
      'S......',
      '.S.....',
      '..S....',
      '...S...',
      '....S..',
    ]
    expect(cyberReindeer('S......', 5)).toStrictEqual(result)
  })

  it('should return an string with the road opened', () => {
    const result = [
      'S..*....*.',
      '.S.*....*.',
      '..S*....*.',
      '...S....*.',
      '...*S...*.',
      '...*.S..*.',
      '...*..S.*.',
      '...*...S*.',
      '...*....S.',
      '...*....*S',
    ]
    expect(cyberReindeer('S..*....*.', 10)).toStrictEqual(result)
  })

  it('should return an string with the road closed', () => {
    const result = [
      'S..|...|..',
      '.S.|...|..',
      '..S|...|..',
      '..S|...|..',
      '..S|...|..',
      '...S...*..',
      '...*S..*..',
      '...*.S.*..',
      '...*..S*..',
      '...*...S..',
    ]
    expect(cyberReindeer('S..|...|..', 10)).toStrictEqual(result)
  })
})
