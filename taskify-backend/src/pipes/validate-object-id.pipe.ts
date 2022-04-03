import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from "mongoose";

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform {
  private Required: boolean;

  constructor(required: boolean = false) {
    this.Required = required;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (this.Required && !value || !isValidObjectId(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    if (!this.Required && value && !isValidObjectId(value)) {
      return null;
    }

    return value;
  }
}
