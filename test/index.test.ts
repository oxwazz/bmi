import { describe, expect, it } from 'vitest'
import { calc } from '../src'

describe('test BMI Calculator (APAC)', () => {
  it('should calculate BMI and status for normal weight (number input)', () => {
    const result = calc('APAC', { height: 170, weight: 65 })
    expect(result?.data?.bmi).toBeCloseTo(22.49, 2)
    expect(result?.data?.status).toBe('Normal weight')
    expect(result?.data?.normalWeightRange).toEqual({
      max: 66.181,
      min: 53.465,

    })
  })

  it('should calculate BMI and status for underweight', () => {
    const result = calc('APAC', { height: 160, weight: 45 })
    expect(result?.data?.bmi).toBeCloseTo(17.58, 2)
    expect(result?.data?.status).toBe('Underweight')
    expect(result?.data?.normalWeightRange).toEqual({
      max: 58.624,
      min: 47.36,
    })
  })

  it('should calculate BMI and status for obesity class II', () => {
    const result = calc('APAC', { height: 180, weight: 130 })
    expect(result?.data?.bmi).toBeCloseTo(40.12, 2)
    expect(result?.data?.status).toBe('Obesity class II')
    expect(result?.data?.normalWeightRange).toEqual({
      max: 74.196,
      min: 59.94,
    })
  })

  it('should support string inputs', () => {
    const result = calc('APAC', { height: '165', weight: '70' })
    expect(result?.data?.bmi).toBeCloseTo(25.71, 2)
    expect(result?.data?.status).toBe('Obesity class I')
    expect(result?.data?.normalWeightRange).toEqual({
      max: 62.34525,
      min: 50.36625,
    })
  })
})

describe('test BMI Calculator (WHO)', () => {
  it('should calculate BMI and status for normal weight (number input)', () => {
    const result = calc('WHO', { height: 170, weight: 65 })
    expect(result?.data?.bmi).toBeCloseTo(22.49, 2)
    expect(result?.data?.status).toBe('Normal weight')
    expect(result?.data?.normalWeightRange).toEqual({
      max: 71.961,
      min: 53.465,
    })
  })

  it('should calculate BMI and status for underweight', () => {
    const result = calc('WHO', { height: 160, weight: 45 })
    expect(result?.data?.bmi).toBeCloseTo(17.58, 2)
    expect(result?.data?.status).toBe('Underweight')
    expect(result?.data?.normalWeightRange).toEqual({
      max: 63.744,
      min: 47.36,

    })
  })

  it('should calculate BMI and status for obesity class II', () => {
    const result = calc('WHO', { height: 180, weight: 130 })
    expect(result?.data?.bmi).toBeCloseTo(40.12, 2)
    expect(result?.data?.status).toBe('Obesity class III')
    expect(result?.data?.normalWeightRange).toEqual({
      max: 80.676,
      min: 59.94,

    })
  })

  it('should support string inputs', () => {
    const result = calc('WHO', { height: '165', weight: '70' })
    expect(result?.data?.bmi).toBeCloseTo(25.71, 2)
    expect(result?.data?.status).toBe('Pre-obesity')
    expect(result?.data?.normalWeightRange).toEqual({
      max: 67.79025,
      min: 50.36625,

    })
  })
})
