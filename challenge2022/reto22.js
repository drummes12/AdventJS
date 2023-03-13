import { describe, expect, it } from 'vitest'

function checkStepNumbers(systemNames, stepNumbers) {
  if (!Array.isArray(systemNames)) throw new Error()
  if (!Array.isArray(stepNumbers)) throw new Error()

  const uniqueSystemNames = [...new Set(systemNames)]
  const systems = systemNames.map((name, index) => [name, stepNumbers[index]])
  const steps = uniqueSystemNames.map((name) =>
    systems.filter((sn) => sn[0] === name),
  )

  return steps.every((step) => {
    for (let i = 1; i < step.length; i++) {
      if (step[i - 1][1] < step[i][1]) continue
      return false
    }
    return true
  })
}

describe('reto22', () => {
  it('should be a function', () => {
    expect(checkStepNumbers).toBeTypeOf('function')
  })

  it('should first parameter is an array', () => {
    expect(() => checkStepNumbers()).toThrow()
  })

  it('should second parameter is an array', () => {
    expect(() => checkStepNumbers([])).toThrow()
  })

  it('should return a boolean value', () => {
    expect(checkStepNumbers([], [])).toBeTypeOf('boolean')
  })

  it('should return true', () => {
    const systemNames = [
      'tree_1',
      'tree_2',
      'house',
      'tree_1',
      'tree_2',
      'house',
    ]
    const stepNumbers = [1, 33, 10, 2, 44, 20]
    expect(checkStepNumbers(systemNames, stepNumbers)).toBe(true)
  })

  it('should return false', () => {
    expect(checkStepNumbers(['tree_1', 'tree_1', 'house'], [2, 1, 10])).toBe(
      false,
    )
  })
})
