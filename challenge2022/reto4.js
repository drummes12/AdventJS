import { describe, expect, it } from 'vitest'

const reto4 = (boxes) => {
  if (!boxes.every((box) => typeof box === 'object')) throw new Error()
  const keys = ['l', 'w', 'h']
  if (
    !boxes.every((box) => {
      if (Object.keys(box).length < 3) return false
      return Object.keys(box).every((key, index) => key === keys[index])
    })
  ) throw new Error()

  const boxesSort = boxes
    .map((box) => ({
      l: box.l,
      w: box.w,
      h: box.h,
      area: box.l * box.w * box.h
    }))
    .sort((boxA, boxB) => boxA.area - boxB.area)

  return boxesSort.every(
    (box, index) =>
      index === 0 ||
      (box.l > boxesSort[index - 1].l &&
        box.w > boxesSort[index - 1].w &&
        box.h > boxesSort[index - 1].h)
  )
}

describe('reto4', () => {
  it('should be a function', () => {
    expect(reto4).toBeTypeOf('function')
  })

  it('should throw if not provided parameter', () => {
    expect(reto4).toThrow()
  })

  it('should throw if not provided array', () => {
    expect(() => reto4(1)).toThrow()
  })

  it('should throw if is a array of objects', () => {
    expect(() => reto4([{}, 2])).toThrow()
  })

  it('should throw if each object not contains l, w, h', () => {
    expect(() => reto4([{ l: 1, w: 1, h: 1 }, {}])).toThrow()
  })

  it('should return 1 case <true>', () => {
    expect(
      reto4([
        { l: 1, w: 1, h: 1 },
        { l: 2, w: 2, h: 2 }
      ])
    ).toBe(true)
  })

  it('should return 2 case <false>', () => {
    expect(
      reto4([
        { l: 1, w: 1, h: 1 },
        { l: 2, w: 2, h: 2 },
        { l: 3, w: 1, h: 3 }
      ])
    ).toBe(false)
  })

  it('should return 3 case <false>', () => {
    expect(
      reto4([
        { l: 1, w: 1, h: 1 },
        { l: 3, w: 3, h: 3 },
        { l: 2, w: 2, h: 2 }
      ])
    ).toBe(true)
  })

  it('should return 4 case <false>', () => {
    expect(
      reto4([
        { l: 1, w: 1, h: 10 },
        { l: 3, w: 3, h: 12 },
        { l: 2, w: 2, h: 1 }
      ])
    ).toBe(false)
  })
})
