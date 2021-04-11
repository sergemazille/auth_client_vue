export class Email {
  static readonly REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  value: string;

  constructor(email: string) {
    if (!Email.isValid(email)) {
      throw new Error('Email is not valid');
    }

    this.value = email;
  }

  static isValid(email: string): boolean {
    return !!email.toLowerCase().match(Email.REGEXP);
  }
}
