// NOTE:
// - fn apac() calculation based on https://iris.who.int/handle/10665/206936
// - fn who() calculation based on https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations

import Decimal from 'decimal.js'

function calculateNormalWeightRange(
  height: Decimal, // must m
  bmiMin: number,
  bmiMax: number,
) {
  const heightSquared = height.pow(2)

  // Normal BMI range is `bmiMin` to `bmiMax`
  const minNormalWeight = heightSquared.mul(bmiMin)
  const maxNormalWeight = heightSquared.mul(bmiMax)

  return {
    min: minNormalWeight.toNumber(),
    max: maxNormalWeight.toNumber(),
  }
}

function apac(props: {
  // age?: number
  // sex: 'male' | 'female'
  height: Decimal // must m
  weight: Decimal // must kg
}) {
  function parseNutitionalStatus(bmi: number) {
    if (bmi < 18.5) {
      return 'Underweight'
    }
    else if (bmi < 23.0) {
      return 'Normal weight'
    }
    else if (bmi < 25.0) {
      return 'At risk'
    }
    else if (bmi < 30.0) {
      return 'Obesity class I'
    }
    else {
      return 'Obesity class II'
    }
  }

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
  const bmi = props.weight.div(props.height.pow(2))
  const normalWeightRange = calculateNormalWeightRange(props.height, 18.5, 22.9)

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

function who(props: {
  // age?: number
  // sex: 'male' | 'female'
  height: Decimal // must m
  weight: Decimal // must kg
}) {
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
  const bmi = props.weight.div(props.height.pow(2))
  const normalWeightRange = calculateNormalWeightRange(props.height, 18.5, 24.9)

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

function calc(
  standard: 'APAC' | 'WHO',
  props: {
    // age?: number
    // sex: 'male' | 'female'
    height: number | string // must cm
    weight: number | string // must kg
  },
): {
    error?: string
    data?: {
      bmi: number
      status: string
      normalWeightRange: {
        min: number // in kg
        max: number // in kg
      }
    }
  } {
  try {
    const _height = new Decimal(props.height).div(100) // convert to m
    const _weight = new Decimal(props.weight)

    switch (standard) {
      case 'APAC':
        return { data: apac({ ...props, height: _height, weight: _weight }) }
      case 'WHO':
      default:
        return { data: who({ ...props, height: _height, weight: _weight }) }
    }
  }
  catch (e) {
    return {
      error: e as string,
    }
  }
}

export { calc }
export default { calc }
