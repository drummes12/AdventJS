import { describe, expect, it } from 'vitest'

const getMaxGifts = (giftsCities, maxGifts, maxCities) => {
  if (!Array.isArray(giftsCities)) throw new Error()
  if (typeof maxGifts !== 'number') throw new Error()
  if (typeof maxCities !== 'number') throw new Error()

  // Ordena los elementos del array de mayor a menor
  giftsCities.sort((a, b) => b - a)

  // Función para encontrar la mayor suma de regalos que se pueden entregar
  const encontrarMayorSuma = (
    cantidadCiclos,
    restArray,
    inicio,
    sumaParcial
  ) => {
    let mayorSuma = sumaParcial
    if (sumaParcial > maxGifts || cantidadCiclos === 0) {
      return sumaParcial
    }

    for (let i = inicio; i < restArray.length; i++) {
      const suma = encontrarMayorSuma(
        cantidadCiclos - 1,
        restArray,
        i + 1,
        sumaParcial + restArray[i]
      )
      if (suma <= maxGifts && suma > mayorSuma) {
        mayorSuma = suma
      }
    }

    return mayorSuma
  }

  // Encuentra la mayor suma de regalos que se pueden entregar
  const mayorSuma = encontrarMayorSuma(maxCities, giftsCities, 0, 0)

  // Si no se encontró una suma que satisfaga los requisitos, devuelve 0
  if (mayorSuma > maxGifts) {
    return 0
  }

  return mayorSuma
}

describe('reto5', () => {
  it('should to be a function', () => {
    expect(getMaxGifts).toBeTypeOf('function')
  })

  it('should be first parameter a array', () => {
    expect(() => getMaxGifts()).toThrow()
  })

  it('should be second parameter is a number', () => {
    expect(() => getMaxGifts([])).toThrow()
  })

  it('should be thirt parameter is a number', () => {
    expect(() => getMaxGifts([], 1)).toThrow()
  })

  it('should return a number', () => {
    const giftsCities = [12]
    const maxGifts = 1
    const maxCities = 1
    expect(getMaxGifts(giftsCities, maxGifts, maxCities)).toBeTypeOf('number')
  })

  it('should return the number 20', () => {
    const giftsCities = [12, 3, 11, 5, 7]
    const maxGifts = 20
    const maxCities = 3
    expect(getMaxGifts(giftsCities, maxGifts, maxCities)).toBe(20)
  })

  it('should return the number 0', () => {
    expect(getMaxGifts([50], 15, 1)).toBe(0)
  })

  it('should return the number 50', () => {
    expect(getMaxGifts([50], 100, 1)).toBe(50)
  })

  it('should return the number 70', () => {
    expect(getMaxGifts([50, 70], 100, 1)).toBe(70)
  })

  it('should return the number 100', () => {
    expect(getMaxGifts([50, 70, 30], 100, 2)).toBe(100)
  })

  it('should return the number 100', () => {
    expect(getMaxGifts([50, 70, 30], 100, 3)).toBe(100)
  })

  it('should return the number 100', () => {
    expect(getMaxGifts([50, 70, 30], 100, 4)).toBe(100)
  })
  it('should return the number 100', () => {
    expect(getMaxGifts([50, 10, 40, 1000, 500, 200], 199, 4)).toBe(100)
  })

  it('should return the number 115', () => {
    expect(getMaxGifts([50, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 1000, 1000)).toBe(
      115
    )
  })
})
