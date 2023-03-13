import { describe, expect, it } from 'vitest'

function executeCommands(commands) {
  if (!Array.isArray(commands)) throw new Error()

  const REGISTER_COUNT = 8
  const REGISTER_POSITION_PREFIX = 'V'
  const CPU = Array(REGISTER_COUNT).fill(0)

  const MOV = (command) => {
    const { parameter1, parameter2 } = command
    const position1 = Number(parameter1.replace(REGISTER_POSITION_PREFIX, ''))
    const position2 = Number(parameter2.replace(REGISTER_POSITION_PREFIX, ''))
    CPU[position2] = Number(parameter1) || CPU[position1]
  }

  const ADD = (command) => {
    const { parameter1, parameter2 } = command
    const position1 = Number(parameter1.replace(REGISTER_POSITION_PREFIX, ''))
    const position2 = Number(parameter2.replace(REGISTER_POSITION_PREFIX, ''))
    CPU[position1] += CPU[position2]
    CPU[position1] %= 256
  }

  const DEC = (command) => {
    const { parameter1 } = command
    const position = Number(parameter1.replace(REGISTER_POSITION_PREFIX, ''))
    CPU[position] = (CPU[position] - 1 + 256) % 256
  }

  const INC = (command) => {
    const { parameter1 } = command
    const position = Number(parameter1.replace(REGISTER_POSITION_PREFIX, ''))
    CPU[position] = (CPU[position] + 1) % 256
  }

  const JMP = (command, index) => {
    const { parameter1 } = command
    if (CPU[0] !== 0) {
      const loopCommands = commands.slice(Number(parameter1), index + 1)
      executeLoop(loopCommands, index)
    }
  }

  const instructions = {
    MOV,
    ADD,
    DEC,
    INC,
    JMP,
  }

  const executeCommand = (command, argument, index) => {
    instructions[command](argument, index)
  }
  const executeLoop = (commands, indexC) => {
    commands.forEach((command, index) => {
      const [instruction, parameter1, parameter2] = command.split(/ |,/g)
      executeCommand(instruction, { parameter1, parameter2 }, indexC || index)
    })
  }

  executeLoop(commands)

  return CPU
}

describe('reto23', () => {
  it('should be a function', () => {
    expect(executeCommands).toBeTypeOf('function')
  })

  it('should throw if argument is not a array', () => {
    expect(() => executeCommands()).toThrow()
  })

  it('should return an array of 8 elements numbers of 0-255', () => {
    const output = executeCommands([])
    expect(output.length === 8).toBe(true)
    expect(output.every((bit) => bit >= 0 && bit <= 255)).toBe(true)
  })

  it('should return a CPU: [12, 12, 12, 12, 12, 12, 12, 12] with instruction MOV', () => {
    expect(
      executeCommands([
        'MOV 12,V00',
        'MOV V00,V01',
        'MOV V01,V02',
        'MOV V02,V03',
        'MOV V03,V04',
        'MOV V04,V05',
        'MOV V05,V06',
        'MOV V06,V07',
      ]),
    ).toEqual([12, 12, 12, 12, 12, 12, 12, 12])
  })

  it('should return a CPU: [12, 12, 12, 12, 12, 12, 12, 12] with instruction ADD', () => {
    expect(
      executeCommands([
        'MOV 12,V00',
        'ADD V01,V00',
        'ADD V02,V01',
        'ADD V03,V02',
        'ADD V04,V03',
        'ADD V05,V04',
        'ADD V06,V05',
        'ADD V07,V06',
      ]),
    ).toEqual([12, 12, 12, 12, 12, 12, 12, 12])
  })

  it('should return a CPU: [12, 12, 12, 12, 12, 12, 12, 12] with instruction DEC', () => {
    expect(
      executeCommands([
        'DEC V00',
        'DEC V01',
        'DEC V02',
        'DEC V03',
        'DEC V04',
        'DEC V05',
        'DEC V06',
        'DEC V07',
      ]),
    ).toEqual([255, 255, 255, 255, 255, 255, 255, 255])
  })

  it('should return a CPU: [12, 12, 12, 12, 12, 12, 12, 12] with instruction INC', () => {
    expect(
      executeCommands([
        'MOV 255,V00',
        'MOV V00,V01',
        'MOV V01,V02',
        'MOV V02,V03',
        'MOV V03,V04',
        'MOV V04,V05',
        'MOV V05,V06',
        'MOV V06,V07',
        'INC V00',
        'INC V01',
        'INC V02',
        'INC V03',
        'INC V04',
        'INC V05',
        'INC V06',
        'INC V07',
      ]),
    ).toEqual([0, 0, 0, 0, 0, 0, 0, 0])
  })

  it('should return a CPU: [0, 10, 0, 0, 0, 0, 1, 0] with instruction JMP', () => {
    expect(
      executeCommands([
        'MOV 10,V00', // V00 es 10
        'DEC V00', // decrementa V00 en 1  <---┐
        'INC V01', // incrementa V01 en 1      |
        'JMP 1', // bucle hasta que V00 sea 0 ----┘
        'INC V06', // incrementa V06 en 1
      ]),
    ).toEqual([0, 10, 0, 0, 0, 0, 1, 0])
  })
})
