import { User } from '../user.entity';

export interface UserSignIn {
  mail: string;
  password: string;
};

export interface UserSignUp extends UserSignIn {
  name: string;
};

export interface ICreatedOrFound {
  user: User;
  isCreated: boolean;
}