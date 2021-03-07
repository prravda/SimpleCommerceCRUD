import { User } from './entities/user.entity';
// ---DTO 로 naming convention 통일하기

export interface SignInUserDTO {
  mail: string;
  password: string;
};

export interface CreateUserDTO extends SignInUserDTO {
  name: string;
};