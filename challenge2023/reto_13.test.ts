import { describe, it, expect } from 'vitest'

function calculateTime (deliveries: string[]): string {
  let restantTime = 0
  let restantTimeStr = ''

  for (const deliverie of deliveries) {
    const [hh, mm, ss] = deliverie.split(':')
    restantTime += Number(hh)
    restantTime += Number(mm) / 60
    restantTime += Number(ss) / 60 / 60
  }
  restantTime -= 7

  restantTimeStr += restantTime >= 0 ? '' : '-'
  restantTime = Math.abs(restantTime)

  const hours = Math.floor(restantTime)
  restantTimeStr += `${hours}`.padStart(2, '0')
  const minutes = Math.round((restantTime - hours) * 60)
  restantTimeStr += `:${`${minutes}`.padStart(2, '0')}`
  const seconds = Math.round(((restantTime - hours) * 60 - minutes) * 60)
  restantTimeStr += `:${`${seconds}`.padStart(2, '0')}`

  return restantTimeStr
}

describe('Reto #13: ⌚️ Calculando el tiempo', () => {
  it('Sobra 2h 20m', () => {
    expect(calculateTime(['00:10:00', '01:00:00', '03:30:00'])).toBe('-02:20:00')
  })

  it('Falta 30m', () => {
    expect(calculateTime(['02:00:00', '05:00:00', '00:30:00'])).toBe('00:30:00')
  })

  it('Sobra 5h 29m', () => {
    expect(calculateTime(['00:45:00', '00:45:00', '00:00:30', '00:00:30'])).toBe('-05:29:00')
  })

  it('Falta 5h 2m 1s', () => {
    expect(calculateTime(['01:01:01', '09:59:59', '01:01:01'])).toBe('05:02:01')
  })
})
