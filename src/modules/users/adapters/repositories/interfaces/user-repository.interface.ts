import { BaseUser, User } from "../../../entities/user.entity";
import { CreateUserUseCaseDto } from "../../dtos/create-user.dto";
import { UpdateUserUseCaseDto } from "../../dtos/update-user.dto";

export interface IUserRepository {
  create: (dto: CreateUserUseCaseDto) => Promise<User>;
  exists: (params: { email?: string; id?: number }) => Promise<Boolean>;
  findByEmail: (email: string) => Promise<BaseUser | null>;
  isDuplicateEmail: (params: { email: string; id: number }) => Promise<Boolean>;
  update: (dto: Partial<BaseUser>) => Promise<User>;
  findAll: () => Promise<User[]>;
}
