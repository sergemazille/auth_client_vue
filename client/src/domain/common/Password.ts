export class Password {
  constructor(password: string) {
    if (!this.isValid(password)) {
      throw new Error('Password is not valid');
    }
  }

  private isValid(password: string): boolean {
    return password.length > 3;
  }
}