import Debug from 'debug'
import config from 'config'

export const appDebug = Debug(`${config.get('app.shortName')}:core`)
export const dbDebug = Debug(`${config.get('app.shortName')}:db`)
export const ctrlDebug = Debug(`${config.get('app.shortName')}:ctrl`)

export interface IPaginationResult {
  limit?: number
  offset?: number
  total?: number
}

export interface IValidationResult {
  message: string
  errors: string[]
  statusCode: number
}

export const apiResponse = (data?: {} | [{}], validation?: IValidationResult, meta?: IPaginationResult) => {
  return {
    data,
    meta,
    validation
  }
}

export const joiDefaultOptions = {
  errors: {
    wrap: {
      label: ''
    }
  }
}
