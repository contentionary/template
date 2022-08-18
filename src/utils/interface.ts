export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

export interface UserBaseInt {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: number;
  username: string;
}

export interface UserRegistrationInt extends UserBaseInt {
  password: string;
  confirmPassword: string;
}

export interface UserInt extends UserBaseInt {
  gender: Gender;
  ownCentre: Array<string>;
  managedCentre: Array<string>;
  subscribedCentre: Array<string>;
}
