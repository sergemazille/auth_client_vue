import { Email } from '@/domain/common/Email';

describe('Email', () => {
  it('should throw when "email" is not a valid email', () => {
    const email = 'not a valid email';
    const errorTrigger = () => new Email(email);

    expect(errorTrigger).toThrow('Email is not valid');
  });

  it('should instantiate an Email when "email" is valid', () => {
    const email = 'user@email.com';
    const validEmail = new Email(email);

    expect(validEmail).toBeInstanceOf(Email);
  });
});
