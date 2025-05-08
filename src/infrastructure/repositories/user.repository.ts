import { getRepository } from "typeorm";
import { User } from "../../core/entities/user.entity";
import { UserRepository } from "../../core/interfaces/user.repository";

export class TypeORMUserRepository implements UserRepository {
  private repository = getRepository(User);

  async create(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async findByRegistration(registration: string): Promise<User | null> {
    return await this.repository.findOne({ where: { registration } });
  }
}