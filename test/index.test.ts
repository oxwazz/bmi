import { describe, expect, it } from 'vitest'
import { calc } from '../src'

describe('test BMI Calculator', () => {
  it('should calculate BMI and status for normal weight (number input)', () => {
    const result = calc({ sex: 'male', height: 170, weight: 65 })
    expect(result.bmi).toBeCloseTo(22.49, 2)
    expect(result.status).toBe('Normal weight')
    expect(result.normalWeightRange).toEqual({
      min: 53.5,
      max: 72,
    })
  })

  it('should calculate BMI and status for underweight', () => {
    const result = calc({ sex: 'female', height: 160, weight: 45 })
    expect(result.bmi).toBeCloseTo(17.58, 2)
    expect(result.status).toBe('Underweight')
    expect(result.normalWeightRange).toEqual({
      min: 47.4,
      max: 63.7,
    })
  })

  it('should calculate BMI and status for obesity class II', () => {
    const result = calc({ sex: 'male', height: 180, weight: 130 })
    expect(result.bmi).toBeCloseTo(40.12, 2)
    expect(result.status).toBe('Obesity class III') // BMI > 40
    expect(result.normalWeightRange).toEqual({
      min: 59.9,
      max: 80.7,
    })
  })

  it('should support string inputs', () => {
    const result = calc({ sex: 'female', height: '165', weight: '70' })
    expect(result.bmi).toBeCloseTo(25.71, 2)
    expect(result.status).toBe('Pre-obesity')
    expect(result.normalWeightRange).toEqual({
      min: 50.4,
      max: 67.8,
    })
  })

  it('should round normal weight range to 1 decimal', () => {
    const result = calc({ sex: 'male', height: 175, weight: 75 })
    expect(result.normalWeightRange.min % 0.1).toBe(0.0999999999999997)
    expect(result.normalWeightRange.max % 0.1).toBe(0.09999999999999293)
  })
})
