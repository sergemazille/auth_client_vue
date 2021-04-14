import { Password } from '@/application/models/Password';

describe('Password', () => {
  it('should throw when "password" has not at least 4 characters', () => {
    const password = 'abc';
    const errorTrigger = () => new Password(password);

    expect(errorTrigger).toThrow('Password is not valid');
  });

  it('should instantiate a Password when "password" is longer than 3 characters', () => {
    const password = 'abcd';
    const validPassword = new Password(password);

    expect(validPassword).toBeInstanceOf(Password);
  });
});
