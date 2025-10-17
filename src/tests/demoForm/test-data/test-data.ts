import { IUser, IUserData, IUsersData } from "../types/types";

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
    title: "Min valid credentials",
    successMessage: successMessage,
  },
  {
    credentials: {
      username: "Emyrsafasdwefdsfdsddsdsdsdsd",
      password: "12346Aasdsdfdsdfdf",
    },
    title: "Max valid credentials",
    successMessage: successMessage,
  },
];
