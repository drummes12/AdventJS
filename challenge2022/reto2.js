import { describe, it, expect } from 'vitest'

const reto2 = (year, holidays) => {
  if (typeof year !== 'number') throw new Error()
  const format = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2][0-9]|3[0-1])$/g
  if (!holidays.every((holiday) => holiday.match(format))) throw new Error()

  let hoursExtras = 0
  holidays.forEach((holiday) => {
    const date = new Date(`${year}/${holiday}`)
    const day = date.getDay()
    if (day >= 1 && day <= 5) hoursExtras = hoursExtras + 1
  })

  return hoursExtras * 2
}

describe('reto2', () => {
  it('should be a function', () => {
    expect(reto2).toBeTypeOf('function')
  })

  it('should throw if not number is provided as first parameter', () => {
    expect(() => reto2()).toThrow()
  })

  it('should throw if not array is provided as second parameter', () => {
    expect(() => reto2(2023)).toThrow()
  })

  it('should throw if not strings into array is provided as second parameter', () => {
    expect(() => reto2(2023, [1, 2, 3])).toThrow()
  })

  it('should throw if not strings with format "MM/DD" into array is provided as second parameter', () => {
    expect(() => reto2(2023, ['1', '02/16', '3'])).toThrow()
  })

  it('should return an number', () => {
    expect(reto2(2023, ['02/15', '02/16'])).toBeTypeOf('number')
  })

  it('should return number four', () => {
    expect(reto2(2023, ['02/15', '02/16'])).toBe(4)
  })

  it('should return number four', () => {
    expect(reto2(2022, ['01/06', '04/01', '12/25'])).toBe(4)
  })
})
