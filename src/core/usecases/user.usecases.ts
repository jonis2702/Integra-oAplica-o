import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { UserRepository } from "../interfaces/user.repository";
import dotenv from "dotenv";

dotenv.config();

export class UserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: User): Promise<User> {
    const existingUser = await this.userRepository.findByRegistration(user.registration);
    if (existingUser) throw new Error("Registration already exists");
    
    user.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.create(user);
  }

  async login(registration: string, password: string): Promise<string> {
    const user = await this.userRepository.findByRegistration(registration);
    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    return jwt.sign(
      { id: user.id, registration: user.registration },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }
}