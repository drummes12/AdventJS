import { describe, expect, it } from 'vitest'

function getFilesToBackup(lastBackup, changes) {
  if (typeof lastBackup !== 'number') throw new Error()
  if (!Array.isArray(changes)) throw new Error()

  const files = {}
  changes
    .filter((files) => files[1] > lastBackup)
    .forEach((file) => {
      files[file[0]] = file[1]
    })
  const filesToBackup = Object.entries(files)
    .map((file) => Number(file[0]))
    .sort((fileA, fileB) => fileA[1] - fileB[1])

  return filesToBackup
}

describe('reto13', () => {
  it('should be a function', () => {
    expect(getFilesToBackup).toBeTypeOf('function')
  })

  it('should throw if first parameter is not a number', () => {
    expect(() => getFilesToBackup()).toThrow()
  })

  it('should throw if second parameter is not a array', () => {
    expect(() => getFilesToBackup(1)).toThrow()
  })

  it('should return a array', () => {
    const type = getFilesToBackup(1, [])
    expect(Array.isArray(type)).toBe(true)
  })

  it('should return a list of files to backup -> [ 1, 3 ]', () => {
    const lastBackup = 1546300800
    const changes = [
      [3, 1546301100],
      [2, 1546300800],
      [1, 1546300800],
      [1, 1546300900],
      [1, 1546301000],
    ]
    expect(getFilesToBackup(lastBackup, changes)).toEqual([1, 3])
  })

  it('should return a list of files to backup -> [ 1, 2, 3 ]', () => {
    expect(
      getFilesToBackup(1546300600, [
        [1, 1546300800],
        [2, 1546300800],
        [1, 1546300900],
        [1, 1546301000],
        [3, 1546301100],
      ]),
    ).toEqual([1, 2, 3])
  })
})
