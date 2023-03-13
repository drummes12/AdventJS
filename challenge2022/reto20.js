import { describe, expect, it } from 'vitest'

function howManyReindeers(reindeerTypes, gifts) {
  if (!Array.isArray(reindeerTypes)) throw new Error()
  if (!Array.isArray(gifts)) throw new Error()

  const result = []
  reindeerTypes = reindeerTypes.sort(
    (reindeerTypeA, reindeerTypeB) =>
      reindeerTypeA.weightCapacity - reindeerTypeB.weightCapacity,
  )

  gifts.forEach((gift) => {
    const { country, weight } = gift
    let totalWeight = 0
    const reindeers = []
    while (totalWeight < weight) {
      reindeerTypes.forEach(({ type, weightCapacity }) => {
        if (totalWeight + weightCapacity <= weight) {
          if (
            !reindeers.some((item) => item.type === type) ||
            reindeers.length === 0
          ) {
            reindeers.push({ type, num: 0 })
          }
          totalWeight += weightCapacity
          const pos = reindeers.findIndex((item) => item.type === type)
          reindeers[pos] = {
            ...reindeers[pos],
            num: reindeers[pos]?.num + 1,
          }
        }
      })
    }
    result.push({ country, reindeers: reindeers.reverse() })
  })
  return result
}

describe('reto20', () => {
  it('should be a function', () => {
    expect(howManyReindeers).toBeTypeOf('function')
  })

  it('should throw if first argument is not an array', () => {
    expect(() => howManyReindeers()).toThrow()
  })

  it('should throw if second argument is not an array', () => {
    expect(() => howManyReindeers([])).toThrow()
  })

  it('should return array', () => {
    const reindeerTypes = [
      { type: 'Nuclear', weightCapacity: 50 },
      { type: 'Electric', weightCapacity: 10 },
      { type: 'Gasoline', weightCapacity: 5 },
      { type: 'Diesel', weightCapacity: 1 },
    ]
    const gifts = [
      { country: 'Spain', weight: 30 },
      { country: 'France', weight: 17 },
      { country: 'Italy', weight: 50 },
    ]
    expect(howManyReindeers(reindeerTypes, gifts)).toEqual([
      {
        country: 'Spain',
        reindeers: [
          { type: 'Electric', num: 1 },
          { type: 'Gasoline', num: 3 },
          { type: 'Diesel', num: 5 },
        ],
      },
      {
        country: 'France',
        reindeers: [
          { type: 'Electric', num: 1 },
          { type: 'Gasoline', num: 1 },
          { type: 'Diesel', num: 2 },
        ],
      },
      {
        country: 'Italy',
        reindeers: [
          { type: 'Electric', num: 3 },
          { type: 'Gasoline', num: 3 },
          { type: 'Diesel', num: 5 },
        ],
      },
    ])
  })

  it('should return array', () => {
    expect(
      howManyReindeers(
        [
          { type: 'Diesel', weightCapacity: 1 },
          { type: 'Gasoline', weightCapacity: 5 },
        ],
        [
          { country: 'Spain', weight: 30 },
          { country: 'Germany', weight: 7 },
        ],
      ),
    ).toEqual([
      {
        country: 'Spain',
        reindeers: [
          {
            type: 'Gasoline',
            num: 5,
          },
          {
            type: 'Diesel',
            num: 5,
          },
        ],
      },
      {
        country: 'Germany',
        reindeers: [
          {
            type: 'Gasoline',
            num: 1,
          },
          {
            type: 'Diesel',
            num: 2,
          },
        ],
      },
    ])
  })
})
