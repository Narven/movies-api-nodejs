import { injectable } from 'inversify'
import { Request, Response, NextFunction } from 'express'
import { BaseMiddleware } from 'inversify-express-utils'
import { apiResponse, IValidationResult } from '../constant'
import { HttpStatus } from '../HttpStatus'
import { vResourceId } from '../validation'

@injectable()
class ValidationIdResourceMiddleware extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    return vResourceId.required().validate(req.params.id)
      .then(() => next())
      .catch((err: any) => {
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

export default ValidationIdResourceMiddleware
