// Parses JOI validation object into an object with key being the field and value being the error message
import Joi from 'joi'

export const parseJoiValidation = (validationResult: any): {} | undefined => {
  const errors: any = {}

  if (validationResult && validationResult.error) {
    validationResult.error.details.forEach(({ context, message }: any) => {
      errors[context.key] = message
    })
  }

  return Object.keys(errors).length > 0 ? errors : undefined
}

export const vResourceId = Joi.number().label('ID')

//
// export const vGetMovieSchema = Joi.object<IClientEdit>({
//   [CLIENT_DESCRIPTION]: vClientTitle
// })
//
