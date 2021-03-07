import { User } from '../user.entity';
// ---DTO 로 naming convention 통일하기

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