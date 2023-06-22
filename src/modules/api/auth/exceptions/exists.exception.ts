import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExistsException extends HttpException {
  constructor(error: any) {
    console.error(error);
    const detail =
      error instanceof UniqueConstraintViolationException
        ? error.sqlMessage
        : '';

    super('User already exists.', HttpStatus.CONFLICT, {
      cause: error,
      description: detail,
    });
  }
}
