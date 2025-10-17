export interface IUser {
  username: string;
  password: string;
}

type Country = "USA" | "Canada" | "UK";
type Gender = "Male" | "Female";
type Hobbies = ("Travelling" | "Movies" | "Sports" | "Gaming" | "Dancing")[];
type Skills = ("JavaScript" | "Python" | "Java" | "C++" | "Ruby")[];
type YearOfBirth =
  | "1970"
  | "1971"
  | "1972"
  | "1973"
  | "1974"
  | "1975"
  | "1976"
  | "1977"
  | "1978"
  | "1979"
  | "1980"
  | "1981"
  | "1982"
  | "1983"
  | "1984"
  | "1985"
  | "1986"
  | "1987"
  | "1988"
  | "1989"
  | "1990"
  | "1991"
  | "1992"
  | "1993"
  | "1994"
  | "1995"
  | "1996"
  | "1997"
  | "1998"
  | "1999"
  | "2000"
  | "2001"
  | "2002"
  | "2003"
  | "2004"
  | "2005"
  | "2006"
  | "2007"
  | "2008"
  | "2009"
  | "2010";

type Months =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

type Days =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31";

export interface IUserData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  country: Country;
  gender: Gender;
  hobbies: Hobbies;
  language: string;
  skills: Skills;
  password: string;
  yearOfBirth: YearOfBirth;
  monthOfBirth: Months;
  dayOfBirth: Days;
}

export interface IUsersData {
  title: string;
  credentials: IUser;
  successMessage: string;
}
