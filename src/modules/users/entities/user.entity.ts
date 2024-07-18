export type BaseUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type User = Omit<BaseUser, "password">;
