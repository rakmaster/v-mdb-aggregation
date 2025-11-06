// MongoDB Aggregation Pipeline Validation Utilities

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

export interface ValidationError {
  type: 'json' | 'structure' | 'stage' | 'operator'
  message: string
  position?: {
    line?: number
    column?: number
    stageIndex?: number
  }
}

export interface ValidationWarning {
  type: 'performance' | 'best-practice' | 'compatibility'
  message: string
  position?: {
    stageIndex?: number
  }
}

// Common MongoDB aggregation operators
const FIELD_OPERATORS = new Set([
  '$sum', '$avg', '$min', '$max', '$count', '$first', '$last',
  '$push', '$addToSet', '$stdDevPop', '$stdDevSamp'
])

const CONDITIONAL_OPERATORS = new Set([
  '$cond', '$ifNull', '$switch', '$eq', '$ne', '$gt', '$gte', '$lt', '$lte',
  '$and', '$or', '$not', '$in', '$nin'
])

const STAGE_NAMES = new Set([
  '$addFields', '$bucket', '$bucketAuto', '$changeStream', '$changeStreamSplitLargeEvent',
  '$collStats', '$count', '$currentOp', '$densify', '$documents', '$facet', '$fill',
  '$geoNear', '$graphLookup', '$group', '$indexStats', '$limit', '$listLocalSessions',
  '$listSessions', '$lookup', '$match', '$merge', '$out', '$planCacheStats', '$project',
  '$redact', '$replaceRoot', '$replaceWith', '$sample', '$search', '$searchMeta', '$set',
  '$setWindowFields', '$shardedDataDistribution', '$skip', '$sort', '$sortByCount',
  '$unionWith', '$unset', '$unwind'
])

export function validateAggregationPipeline(jsonString: string): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  }

  // Step 1: Validate JSON syntax
  let pipeline: any
  try {
    pipeline = JSON.parse(jsonString)
  } catch (error) {
    result.isValid = false
    result.errors.push({
      type: 'json',
      message: `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown parsing error'}`,
      position: {
        line: getErrorLine(jsonString, error),
        column: getErrorColumn(jsonString, error)
      }
    })
    return result
  }

  // Step 2: Validate pipeline structure (must be array)
  if (!Array.isArray(pipeline)) {
    result.isValid = false
    result.errors.push({
      type: 'structure',
      message: 'Aggregation pipeline must be an array of stage objects'
    })
    return result
  }

  // Step 3: Validate each stage
  pipeline.forEach((stage, index) => {
    validateStage(stage, index, result)
  })

  // Step 4: Check for performance warnings
  checkPerformanceWarnings(pipeline, result)

  return result
}

function validateStage(stage: any, index: number, result: ValidationResult): void {
  // Stage must be an object
  if (typeof stage !== 'object' || stage === null || Array.isArray(stage)) {
    result.isValid = false
    result.errors.push({
      type: 'structure',
      message: `Stage ${index + 1} must be an object`,
      position: { stageIndex: index }
    })
    return
  }

  const stageKeys = Object.keys(stage)

  // Stage must have exactly one key (the stage name)
  if (stageKeys.length !== 1) {
    result.isValid = false
    result.errors.push({
      type: 'structure',
      message: `Stage ${index + 1} must have exactly one key (stage name)`,
      position: { stageIndex: index }
    })
  }

  const stageName = stageKeys[0]

  // Stage name must start with $
  if (!stageName || !stageName.startsWith('$')) {
    result.isValid = false
    result.errors.push({
      type: 'stage',
      message: `Stage ${index + 1}: Stage name "${stageName || 'undefined'}" must start with $`,
      position: { stageIndex: index }
    })
    return
  }

  // Check if stage name is recognized
  if (!STAGE_NAMES.has(stageName)) {
    result.warnings.push({
      type: 'compatibility',
      message: `Stage ${index + 1}: Unrecognized stage "${stageName}" - may not be supported in all MongoDB versions`,
      position: { stageIndex: index }
    })
  }

  // Validate stage-specific structure
  const stageValue = stage[stageName!]
  validateStageContent(stageName!, stageValue, index, result)
}

function validateStageContent(stageName: string, value: any, stageIndex: number, result: ValidationResult): void {
  switch (stageName) {
    case '$match':
      validateMatchStage(value, stageIndex, result)
      break
    case '$group':
      validateGroupStage(value, stageIndex, result)
      break
    case '$project':
    case '$addFields':
    case '$set':
      validateProjectionStage(value, stageIndex, result)
      break
    case '$sort':
      validateSortStage(value, stageIndex, result)
      break
    case '$limit':
    case '$skip':
      validateNumericStage(value, stageIndex, result)
      break
    case '$unwind':
      validateUnwindStage(value, stageIndex, result)
      break
    case '$lookup':
      validateLookupStage(value, stageIndex, result)
      break
    // Add more stage-specific validations as needed
    default:
      // Generic validation for other stages
      validateGenericStage(value, stageIndex, result)
  }
}

function validateMatchStage(value: any, stageIndex: number, result: ValidationResult): void {
  if (typeof value !== 'object' || value === null) {
    result.errors.push({
      type: 'structure',
      message: `Stage ${stageIndex + 1} ($match): Must be an object with query conditions`,
      position: { stageIndex: stageIndex }
    })
  }
}

function validateGroupStage(value: any, stageIndex: number, result: ValidationResult): void {
  if (typeof value !== 'object' || value === null) {
    result.errors.push({
      type: 'structure',
      message: `Stage ${stageIndex + 1} ($group): Must be an object with _id and accumulator fields`,
      position: { stageIndex: stageIndex }
    })
    return
  }

  if (!value.hasOwnProperty('_id')) {
    result.errors.push({
      type: 'structure',
      message: `Stage ${stageIndex + 1} ($group): Missing required _id field`,
      position: { stageIndex: stageIndex }
    })
  }

  // Check accumulator operators
  Object.entries(value).forEach(([field, accumulator]) => {
    if (field !== '_id' && typeof accumulator === 'object' && accumulator !== null) {
      const accumulatorKeys = Object.keys(accumulator)
      if (accumulatorKeys.length > 0) {
        const op = accumulatorKeys[0]
        if (op && op.startsWith('$') && !FIELD_OPERATORS.has(op)) {
          result.warnings.push({
            type: 'compatibility',
            message: `Stage ${stageIndex + 1} ($group): Unrecognized accumulator operator "${op}"`,
            position: { stageIndex: stageIndex }
          })
        }
      }
    }
  })
}

function validateProjectionStage(value: any, stageIndex: number, result: ValidationResult): void {
  if (typeof value !== 'object' || value === null) {
    result.errors.push({
      type: 'structure',
      message: `Stage ${stageIndex + 1}: Projection stage must be an object mapping field names to expressions`,
      position: { stageIndex: stageIndex }
    })
  }
}

function validateSortStage(value: any, stageIndex: number, result: ValidationResult): void {
  if (typeof value !== 'object' || value === null) {
    result.errors.push({
      type: 'structure',
      message: `Stage ${stageIndex + 1} ($sort): Must be an object mapping field names to sort directions (1 or -1)`,
      position: { stageIndex: stageIndex }
    })
    return
  }

  Object.entries(value).forEach(([field, direction]) => {
    if (direction !== 1 && direction !== -1) {
      result.errors.push({
        type: 'structure',
        message: `Stage ${stageIndex + 1} ($sort): Field "${field}" must have sort direction 1 (ascending) or -1 (descending), got ${direction}`,
        position: { stageIndex: stageIndex }
      })
    }
  })
}

function validateNumericStage(value: any, stageIndex: number, result: ValidationResult): void {
  if (typeof value !== 'number' || value < 0 || !Number.isInteger(value)) {
    result.errors.push({
      type: 'structure',
      message: `Stage ${stageIndex + 1}: Must be a non-negative integer`,
      position: { stageIndex: stageIndex }
    })
  }
}

function validateUnwindStage(value: any, stageIndex: number, result: ValidationResult): void {
  if (typeof value === 'string') {
    // Simple unwind: "$field"
    if (!value.startsWith('$')) {
      result.warnings.push({
        type: 'best-practice',
        message: `Stage ${stageIndex + 1} ($unwind): Field path should start with $`,
        position: { stageIndex: stageIndex }
      })
    }
  } else if (typeof value === 'object' && value !== null) {
    // Advanced unwind with options
    if (!value.path) {
      result.errors.push({
        type: 'structure',
        message: `Stage ${stageIndex + 1} ($unwind): Missing required "path" field`,
        position: { stageIndex: stageIndex }
      })
    }
  } else {
    result.errors.push({
      type: 'structure',
      message: `Stage ${stageIndex + 1} ($unwind): Must be a string field path or object with path property`,
      position: { stageIndex: stageIndex }
    })
  }
}

function validateLookupStage(value: any, stageIndex: number, result: ValidationResult): void {
  if (typeof value !== 'object' || value === null) {
    result.errors.push({
      type: 'structure',
      message: `Stage ${stageIndex + 1} ($lookup): Must be an object with lookup configuration`,
      position: { stageIndex: stageIndex }
    })
    return
  }

  if (!value.from) {
    result.errors.push({
      type: 'structure',
      message: `Stage ${stageIndex + 1} ($lookup): Missing required "from" field`,
      position: { stageIndex: stageIndex }
    })
  }

  if (!value.as) {
    result.errors.push({
      type: 'structure',
      message: `Stage ${stageIndex + 1} ($lookup): Missing required "as" field`,
      position: { stageIndex: stageIndex }
    })
  }
}

function validateGenericStage(value: any, stageIndex: number, result: ValidationResult): void {
  // Generic validation - just check it's not null/undefined
  if (value === null || value === undefined) {
    result.errors.push({
      type: 'structure',
      message: `Stage ${stageIndex + 1}: Stage value cannot be null or undefined`,
      position: { stageIndex: stageIndex }
    })
  }
}

function checkPerformanceWarnings(pipeline: any[], result: ValidationResult): void {
  // Check for $match early in pipeline
  const firstMatchIndex = pipeline.findIndex(stage => '$match' in stage)
  if (firstMatchIndex > 0) {
    result.warnings.push({
      type: 'performance',
      message: 'Consider moving $match stage earlier in pipeline for better performance',
      position: { stageIndex: firstMatchIndex }
    })
  }

  // Check for multiple $sort stages
  const sortCount = pipeline.filter(stage => '$sort' in stage).length
  if (sortCount > 1) {
    result.warnings.push({
      type: 'performance',
      message: 'Multiple $sort stages detected - consider combining them',
      position: {}
    })
  }

  // Check for $limit without preceding $sort
  const limitStages = pipeline.map((stage, index) => ({ stage, index })).filter(item => '$limit' in item.stage)
  limitStages.forEach(({ stage, index }) => {
    let hasPrecedingSort = false
    for (let i = 0; i < index; i++) {
      if ('$sort' in pipeline[i]) {
        hasPrecedingSort = true
        break
      }
    }
    if (!hasPrecedingSort) {
      result.warnings.push({
        type: 'best-practice',
        message: '$limit without preceding $sort may return unpredictable results',
        position: { stageIndex: index }
      })
    }
  })
}

function getErrorLine(jsonString: string, error: any): number | undefined {
  // Try to extract line number from JSON parsing error
  if (error instanceof SyntaxError && 'message' in error) {
    const match = error.message.match(/at position (\d+)/)
    if (match && match[1]) {
      const position = parseInt(match[1])
      const lines = jsonString.substring(0, position).split('\n')
      return lines.length
    }
  }
  return undefined
}

function getErrorColumn(jsonString: string, error: any): number | undefined {
  // Try to extract column number from JSON parsing error
  if (error instanceof SyntaxError && 'message' in error) {
    const match = error.message.match(/at position (\d+)/)
    if (match && match[1]) {
      const position = parseInt(match[1])
      const lines = jsonString.substring(0, position).split('\n')
      const lastLine = lines[lines.length - 1]
      return lastLine ? lastLine.length : undefined
    }
  }
  return undefined
}
