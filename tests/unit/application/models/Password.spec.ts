import { Password } from '@/application/models/Password';

describe('Password', () => {
  it('should tell a "password" is not valid if it has not at least 4 characters', () => {
    const password = 'abc';
    const isPasswordValid = Password.isValid(password);

    expect(isPasswordValid).toBeFalsy();
  });

  it('should tell a "password" is valid if it has more than 3 characters', () => {
    const password = 'abcd';
    const isPasswordValid = Password.isValid(password);

    expect(isPasswordValid).toBeTruthy();
  });
});
