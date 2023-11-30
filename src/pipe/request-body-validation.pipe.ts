import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AppRequestBodyValidationPipe implements PipeTransform {
  private request_validation:any
  constructor () {}

  async transform(value: any, metadata: ArgumentMetadata) {
    let request_bory_validation = await this.request_validation.validateRequestBody(value),
        all_error_message = {...request_bory_validation.error_message}
    if( Object.keys(all_error_message).length > 0 )
      throw new HttpException(all_error_message,HttpStatus.BAD_REQUEST)
    
    return request_bory_validation.value;
  }
}
