import { describe, it, expect } from 'vitest'

function adjustLights (lights: string[]): number {
  const initialLight = lights[0]
  let count = 0

  for (let i = 0; i < lights.length; i++) {
    const isEvenPosition = i % 2 === 0
    const isInitialLight = lights[i] === initialLight
    const evenInvalid = isEvenPosition && !isInitialLight
    const oddInvalid = !isEvenPosition && isInitialLight

    if (evenInvalid || oddInvalid) count++
  }

  return Math.min(count, lights.length - count)
}

describe('Reto 9: Alternar las luces', () => {
  it('Caso 1', () => {
    const lights = ['🔴', '🟢', '🔴', '🟢', '🔴']
    expect(adjustLights(lights)).toBe(0)
  })

  it('Caso 2', () => {
    const lights = ['🔴', '🔴', '🔴', '🟢', '🔴']
    expect(adjustLights(lights)).toBe(1)
  })

  it('Caso 3', () => {
    const lights = ['🔴', '🔴', '🟢', '🟢', '🔴']
    expect(adjustLights(lights)).toBe(2)
  })

  it('Caso 3', () => {
    const lights = ['🔴', '🔴', '🟢', '🔴', '🟢']
    expect(adjustLights(lights)).toBe(1)
  })
})
