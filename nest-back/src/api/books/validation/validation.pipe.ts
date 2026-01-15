import { PipeTransform, ArgumentMetadata, UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || typeof metadata.metatype !== 'function') {
      return value;
    }

    const object = plainToInstance(metadata.metatype, value);
    const errors = validateSync(object);

    if (errors.length > 0) {
      throw new UnprocessableEntityException(errors);
    }

    return object;
  }
}