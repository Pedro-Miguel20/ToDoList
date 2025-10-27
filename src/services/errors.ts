export type UserTypeError = 'EmailExists' | 'WeakPassword' | 'UnknownError';

export class UserError extends Error {
  type: UserTypeError;
  field?: string;

  constructor(message: string, type: UserTypeError, field?: string) {
    super(message);
    this.type = type;
    this.field = field;
  }
}