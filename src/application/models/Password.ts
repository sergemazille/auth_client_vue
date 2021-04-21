export class Password {
  static readonly MIN_LENGTH = 4;

  static isValid(password: string): boolean {
    return password.length >= Password.MIN_LENGTH;
  }
}
