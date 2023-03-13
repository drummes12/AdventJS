import { describe, expect, it } from 'vitest'

function fixLetter(letter) {
  if (typeof letter !== 'string') throw new Error()

  // Eliminar espacios al inicio y al final
  const case1 = letter.trim()

  // Eliminar múltiples espacios en blanco y dejar sólo uno
  const case2 = case1.replace(/\s+/g, ' ')

  // Dejar un espacio después de cada coma
  const case3 = case2.replace(/,(\S)/g, ', $1')

  // Quitar espacios antes de coma o punto
  const case4 = case3.replace(/\s+(,|\.|\?|!)/g, '$1')

  // Las preguntas sólo deben terminar con un signo de interrogación
  const case5 = case4.replace(/\?+/g, '?')

  // La primera letra de cada oración debe estar en mayúscula
  const case6 = case5.replace(/(^\w|(\.|\?|!)\s*\w)/g, (match) =>
    match.toUpperCase(),
  )

  // Poner en mayúscula la palabra "Santa Claus" si aparece en la carta
  const case7 = case6.replace(/santa claus/gi, 'Santa Claus')

  // Poner un punto al final de la frase si no tiene puntuación
  const case8 = case7.replace(/[^.|?|!]$/g, (match) => `${match}.`)

  // console.log(`Case 1🚀-${case1}-🚀`)
  // console.log(`Case 2🚀-${case2}-🚀`)
  // console.log(`Case 3🚀-${case3}-🚀`)
  // console.log(`Case 4🚀-${case4}-🚀`)
  // console.log(`Case 5🚀-${case5}-🚀`)
  // console.log(`Case 6🚀-${case6}-🚀`)
  // console.log(`Case 7🚀-${case7}-🚀`)
  // console.log(`Case 8🚀-${case8}-🚀`)

  return case8
}

describe('reto16', () => {
  it('should to be a function', () => {
    expect(fixLetter).toBeTypeOf('function')
  })

  it('should throw if paramter is not a string', () => {
    expect(() => fixLetter()).toThrow()
  })

  it('should return a string', () => {
    expect(fixLetter('hola')).toBeTypeOf('string')
  })

  it('should return a string eliminating spaces at the beginning and end', () => {
    expect(fixLetter(' test spaces ')).toBe('Test spaces.')
  })

  it('should return a string eliminating repeat spaces and return only one', () => {
    expect(fixLetter(' test    spaces ')).toBe('Test spaces.')
  })

  it('should return a string adding space after each coma', () => {
    expect(fixLetter(' test,test2, spaces ')).toBe('Test, test2, spaces.')
  })

  it('should return a string delete space before each coma', () => {
    expect(fixLetter(' test ,test2, spaces .')).toBe('Test, test2, spaces.')
  })

  it('should return a string with one interrogative sign each ask', () => {
    expect(fixLetter(' test? ,test2?? spaces .')).toBe('Test?, test2? Spaces.')
  })

  it('should return a string with first letter each oration is upper', () => {
    expect(fixLetter(' test? ,test2?? spaces . test')).toBe(
      'Test?, test2? Spaces. Test.',
    )
  })

  it('should return a string with "Santa Claus" if exists', () => {
    expect(fixLetter(' test? ,test2?? spaces . santa claus')).toBe(
      'Test?, test2? Spaces. Santa Claus.',
    )
  })

  it('should return a string with point at end of letter', () => {
    expect(fixLetter(' test? ,test2?? spaces . test')).toBe(
      'Test?, test2? Spaces. Test.',
    )
  })

  it('should return a string with point at end of letter', () => {
    expect(fixLetter(' test? ,test2?? spaces . test?')).toBe(
      'Test?, test2? Spaces. Test?',
    )
  })
})
