export class Email {
  static readonly REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  private constructor(private readonly email: string) {
    if (!Email.isValid(email)) {
      throw new Error('Email is not valid');
    }
  }

  static isValid(email: string): boolean {
    return !!email.toLowerCase().match(Email.REGEXP);
  }

  static fromString(email: string): Email {
    return new Email(email);
  }

  asString(): string {
    return this.email;
  }
}
