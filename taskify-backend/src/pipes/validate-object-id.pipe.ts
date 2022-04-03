import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from "mongoose";

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !isValidObjectId(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return value;
  }
}
