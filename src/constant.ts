import Debug from 'debug'
import config from 'config'

export const appDebug = Debug(`${config.get('app.shortName')}:core`)
export const dbDebug = Debug(`${config.get('app.shortName')}:db`)
export const ctrlDebug = Debug(`${config.get('app.shortName')}:ctrl`)

export const apiResponse = (data: {} | [{}], meta: any = {}) => {
  return {
    data,
    meta
  }
}
