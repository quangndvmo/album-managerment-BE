import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../app.controller';

export class ParseDataToIntPipe implements PipeTransform {
  transform(value: string): number {
    const transformedValue = parseInt(value, 10);
    if (isNaN(transformedValue)) {
      throw new BadRequestException('cannot transform input data to number');
    }
    return transformedValue;
  }
}

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.INPROGRESS,
    TaskStatus.RESOLVED,
  ];

  isValidStatus(status) {
    return this.allowedStatuses.indexOf(status) > -1;
  }

  transform(value: any): TaskStatus {
    value = value.toUpperCase();
    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`${value} is not a valid task status`);
    }
    return value;
  }
}
