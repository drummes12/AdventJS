import { describe, expect, it } from 'vitest'

function canExit(maze) {
  if (!Array.isArray(maze)) throw new Error()
  let exit = false
  const LETTER_START = 'S'
  const LETTER_EXIT = 'E'
  const LETTER_WALL = 'W'

  const revisedPosition = []

  const getPosition = (letter) => {
    const positionRow = maze.findIndex((point) => point.includes(letter))
    if (positionRow < 0) return
    const positionCol = maze[positionRow].findIndex((point) => point === letter)
    return [positionRow, positionCol]
  }
  const positionStart = getPosition(LETTER_START)
  const positionExit = getPosition(LETTER_EXIT)
  if (!positionStart || !positionExit) {
    return false
  }

  const checkDirectionX = (position, positionX) => {
    const COLUMNS = maze[0] ? maze[0].length : 0
    if (
      exit === false &&
      positionX >= 0 &&
      positionX < COLUMNS &&
      maze[position[0]][positionX] !== LETTER_WALL &&
      !revisedPosition.includes(`[${position[0]},${positionX}]`)
    ) {
      if (maze[position[0]][positionX] === LETTER_EXIT) {
        exit = true
        return
      }
      checkExit([position[0], positionX])
    }
  }

  const checkDirectionY = (position, positionY) => {
    const ROWS = maze.length
    if (
      exit === false &&
      positionY >= 0 &&
      positionY < ROWS &&
      maze[positionY][position[1]] !== LETTER_WALL &&
      !revisedPosition.includes(`[${positionY},${position[1]}]`)
    ) {
      if (maze[positionY][position[1]] === LETTER_EXIT) {
        exit = true
        return
      }
      checkExit([positionY, position[1]])
    }
  }

  const checkExit = (position) => {
    // highlightPosition([...maze], position[0], position[1])
    revisedPosition.push(JSON.stringify(position))
    const positionLeft = position[1] - 1
    checkDirectionX(position, positionLeft)
    // RIGHT
    const positionRight = position[1] + 1
    checkDirectionX(position, positionRight)
    // DOWN
    const positionDown = position[0] + 1
    checkDirectionY(position, positionDown)
    // UP
    const positionUp = position[0] - 1
    checkDirectionY(position, positionUp)
  }

  checkExit(positionStart)

  return exit
}

// function highlightPosition(maze, row, col) {
//   const ROWS = maze.length
//   const COLUMNS = maze?.[0].length
//   if (row % ROWS === 0 && col % COLUMNS === 0) return
//   const highlightedMaze = maze.map((row) => [...row])
//   highlightedMaze[row][col] = '▧'
//   console.log(highlightedMaze)
// }

describe('reto24', () => {
  it('should be a function', () => {
    expect(canExit).toBeTypeOf('function')
  })

  it('should throw if argument is not an array', () => {
    expect(() => canExit()).toThrow()
  })

  it('should return a boolean', () => {
    expect(canExit([[]])).toBeTypeOf('boolean')
  })

  it('should return TRUE if have exited (LEFT)', () => {
    expect(canExit([['E', ' ', 'S']])).toBe(true)
  })

  it('should return TRUE if have exited (RIGHT)', () => {
    expect(canExit([['S', ' ', 'E']])).toBe(true)
  })

  it('should return TRUE if have exited (DOWN)', () => {
    expect(canExit([['S'], [' '], ['E']])).toBe(true)
  })

  it('should return TRUE if have exited (UP)', () => {
    expect(canExit([['E'], [' '], ['S']])).toBe(true)
  })

  it('should return TRUE if have exited (MAZE)', () => {
    expect(
      canExit([
        [' ', ' ', 'W', ' ', 'S'],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', 'W', ' '],
        ['W', 'W', ' ', 'W', 'W'],
        [' ', ' ', ' ', ' ', 'E'],
      ]),
    ).toBe(true)
  })
})
