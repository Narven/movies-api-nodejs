import { injectable } from 'inversify'
import { Request, Response, NextFunction } from 'express'
import { BaseMiddleware } from 'inversify-express-utils'
import { apiResponse, IValidationResult } from '../constant'
import { HttpStatus } from '../HttpStatus'
import { vCreateMovieSchema } from '../validation'

@injectable()
class ValidationCreateMovieMiddleware extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    return vCreateMovieSchema.required().validate(req.body)
      .then(() => next())
      .catch((err: any) => {
        console.debug(err)
        const validationError: IValidationResult = {
          message: 'Validation Error',
          errors: [err.message],
          statusCode: HttpStatus.badRequest
        }

        return res.status(HttpStatus.badRequest)
          .json(apiResponse(undefined, validationError))
      })
  }
}

export default ValidationCreateMovieMiddleware
