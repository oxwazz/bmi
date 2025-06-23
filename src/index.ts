// NOTE: calculation based on https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations

import Decimal from 'decimal.js'

function parseNutitionalStatus(bmi: number) {
  if (bmi < 18.5) {
    return 'Underweight'
  }
  else if (bmi < 25.0) {
    return 'Normal weight'
  }
  else if (bmi < 30.0) {
    return 'Pre-obesity'
  }
  else if (bmi < 35.0) {
    return 'Obesity class I'
  }
  else if (bmi < 40.0) {
    return 'Obesity class II'
  }
  else {
    return 'Obesity class III'
  }
}

function calculateNormalWeightRange(
  height: Decimal, // must m
) {
  const heightSquared = height.pow(2)

  // Normal BMI range is 18.5 to 24.9
  const minNormalWeight = heightSquared.mul(18.5)
  const maxNormalWeight = heightSquared.mul(24.9)

  return {
    min: Math.round(minNormalWeight.toNumber() * 10) / 10, // round to 1 decimal
    max: Math.round(maxNormalWeight.toNumber() * 10) / 10,
  }
}

function calc(props: {
  // age?: number
  sex: 'male' | 'female'
  height: number | string // must cm
  weight: number | string // must kg
}) {
  const _height = new Decimal(props.height).div(100) // convert to m
  const _weight = new Decimal(props.weight)

  // set default age if not defined
  // if (!props.age) {
  //   props.age = 20
  // }

  // throw
  // if (props.age <= 0) {
  //   throw new Error('age must be greater than 0')
  // }

  // throw
  // if (props.age >= 20) {
  const bmi = _weight.div(_height.pow(2))
  const normalWeightRange = calculateNormalWeightRange(_height)

  return {
    bmi: bmi.toNumber(),
    status: parseNutitionalStatus(bmi.toNumber()),
    normalWeightRange: {
      min: normalWeightRange.min, // in kg
      max: normalWeightRange.max, // in kg
    },
  }
  // }

  // throw new Error('not handled yet!')
}

export { calc }
export default { calc }
