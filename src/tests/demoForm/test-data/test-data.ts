import { IRegistrationData, IUser, IUserData, IUsersData } from "../types/types";

export enum NOTIFICATIONS {
  SUCCESS_REGISTER = "Successfully registered! Please, click Back to return on login page",
}

export const validRegistrData: IUser[] = [
  {
    username: "someUserName",
    password: "somePassword",
  },
  {
    username: "som",
    password: "somePasw",
  },
  {
    username: "someUserNameWithfortysymbolsersdfvljesdnw",
    password: "somePaswwertyuioplkj",
  },
];

export const user: IUserData = {
  firstName: "firstnametest",
  lastName: "lastNameTest",
  address: "some address",
  email: "vadim.activeplatform@gmail.com",
  phone: "+375251111111",
  country: "USA",
  gender: "Male",
  hobbies: ["Sports", "Gaming", "Dancing"],
  language: "russian",
  skills: ["JavaScript", "Ruby"],
  password: "qwertyyu122345",
  yearOfBirth: "1990",
  monthOfBirth: "November",
  dayOfBirth: "30",
};

export const successMessage = "Successfully registered! Please, click Back to return on login page";
export const userData: IUsersData[] = [
  {
    credentials: {
      username: "Vadim1234567",
      password: "Vadim1234567",
    },
    title: "Smoke credentials",
    successMessage: successMessage,
  },
  {
    credentials: {
      username: "Emy",
      password: "12346Aa777",
    },
    title: "3 letters username in credentials",
    successMessage: successMessage,
  },
  {
    credentials: {
      username: "Emyrsafasdwefdsfdsddsdsdsdsd",
      password: "12346Aasdsdfdsdfdf",
    },
    title: "40 letter username in credentials",
    successMessage: successMessage,
  },
];

export const registrationInvalidData: IRegistrationData[] = [
  {
    username: "",
    password: "",
    title: "Should not register with empty username and empty password",
    errorMessage: "Please, provide valid data",
  },
  {
    username: "   dfdfdrdfggfg",
    password: "tesfKKjhjfd",
    title: "Should not register with empty username has postfix",
    errorMessage: "Prefix and postfix spaces are not allowed is username",
  },
  {
    username: "usernameReg",
    password: "",
    title: "Should not register with empty password",
    errorMessage: "Password is required",
  },
  {
    username: "",
    password: "passwordSome",
    title: "Should not register with empty username",
    errorMessage: "Username is required",
  },
  {
    username: "we",
    password: "passwordSomee",
    title: "Should not register when username less than 3 characters",
    errorMessage: "Username should contain at least 3 characters",
  },
  {
    username: "drhebmgywjjuppmqyb",
    password: "passrte",
    title: "Should not register when password less than 8 characters",
    errorMessage: "Password should contain at least 8 characters",
  },
  {
    username: "drhebmgywjjuppmqyb",
    password: "PASSWORDUPPER",
    title: "Should not register when password characters only in UpperCase",
    errorMessage: "Password should contain at least one character in lower case",
  },
  {
    username: "existingUser",
    password: "andPassword",
    title: "Should not register with username when username already in use",
    errorMessage: "Username is in use",
  },
  {
    username: "drhebmgywjjuppmqyb",
    password: "passrtepassrtepassrtepassrtepassrtepassrtepassrte",
    title: "Should not register when password more than 20 characters",
    errorMessage: "Password can't exceed 20 characters",
  },
  {
    username: "baohrryufosaiojbncpgoxzdrhebmgywjjuppmqyb",
    password: "eewkfTkdfdf",
    title: "Should not register when username more than 40 characters",
    errorMessage: "Username can't exceed 40 characters",
  },
];
