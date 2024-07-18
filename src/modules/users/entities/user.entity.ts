// export type BaseUser = {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
// };

// export type User = Omit<BaseUser, "password">;

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type Theme = {
  id: number;
  name: string;
};

export type Package = {
  _id: string;
  themes: Theme[];
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export type Subscription = {
  _id: string;
  package: Package;
  users: User[];
};
