export class Password {
  static readonly MIN_LENGTH = 4;

  value: string;

  constructor(password: string) {
    if (!Password.isValid(password)) {
      throw new Error('Password is not valid');
    }

    this.value = password;
  }

  static isValid(password: string): boolean {
    return password.length >= Password.MIN_LENGTH;
  }
}
