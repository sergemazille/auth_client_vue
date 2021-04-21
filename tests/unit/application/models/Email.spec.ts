import { Email } from '@/application/models/Email';

describe('Email', () => {
  it('should throw when "email" is not a valid email', () => {
    const email = 'not a valid email';
    const errorTrigger = () => Email.fromString(email);

    expect(errorTrigger).toThrow('Email is not valid');
  });

  it('should instantiate an Email when "email" is valid', () => {
    const email = 'user@email.com';
    const validEmail = Email.fromString(email);

    expect(validEmail).toBeInstanceOf(Email);
  });

  it('should allow to get its email property as a string', () => {
    const email = Email.fromString('user@email.com');

    expect(email.asString()).toBe('user@email.com');
  });
});
