import { Email } from '@/application/models/Email';
import { Password } from '@/application/models/Password';

export class Credentials {
  constructor(private readonly email: Email, private readonly password: Password) {}
}
