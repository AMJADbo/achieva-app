import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UpdateProfileDto } from "./dto/update-profile.dto";

interface CreateUserInput {
  email: string;
  username: string;
  displayName: string;
  passwordHash: string | null;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>
  ) {}

  create(input: CreateUserInput) {
    return this.repo.save(this.repo.create(input));
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
      select: ["id", "email", "username", "displayName", "avatarUrl", "bio", "tokens", "kycVerified", "passwordHash", "createdAt", "updatedAt"],
    });
  }

  async updateProfile(id: string, dto: UpdateProfileDto) {
    await this.repo.update(id, dto);
    return this.findById(id);
  }

  async addTokens(id: string, amount: number) {
    await this.repo.increment({ id }, "tokens", amount);
  }

  async getPublicProfile(id: string) {
    const user = await this.repo.findOne({
      where: { id },
      relations: ["achievements"],
    });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }
}
