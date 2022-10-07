export type FindUserParams = Partial<{
 id: string;
 username: string
}>

export type CreateUserParams = Partial<{
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}>;