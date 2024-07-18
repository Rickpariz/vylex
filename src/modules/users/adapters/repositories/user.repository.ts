import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "./interfaces/user-repository.interface";
import { BaseUser, User } from "../../entities/user.entity";
import { PrismaClientLocator } from "../../../../shared/di/di.enums";
import { CreateUserUseCaseDto } from "../dtos/create-user.dto";
import { UpdateUserUseCaseDto } from "../dtos/update-user.dto";

@injectable()
export default class UserRepository implements IUserRepository {
  constructor(@inject(PrismaClientLocator) readonly prisma: PrismaClient) {}

  async create(dto: CreateUserUseCaseDto): Promise<User> {
    return this.prisma.user.create({
      data: dto,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async exists(params: { email?: string; id?: number }): Promise<Boolean> {
    const { email, id } = params;
    const count = await this.prisma.user.count({
      where: {
        ...(email ? { email } : {}),
        ...(id ? { id } : {}),
      },
    });

    return count > 0;
  }

  async findByEmail(email: string): Promise<BaseUser | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async isDuplicateEmail(params: {
    email: string;
    id: number;
  }): Promise<Boolean> {
    const { id, email } = params;
    const count = await this.prisma.user.count({
      where: {
        email,
        id: {
          not: id,
        },
      },
    });

    return count > 0;
  }

  async update({ id, ...data }: Partial<BaseUser>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
