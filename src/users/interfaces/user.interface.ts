export interface UserSignIn {
  mail: string;
  password: string;
};

export interface UserSignUp extends UserSignIn {
  name: string;
};
