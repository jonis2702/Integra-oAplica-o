import { Request, Response } from "express";
import { User } from "../../core/entities/user.entity";
import { UserUseCases } from "../../core/usecases/user.usecases";
import { TypeORMUserRepository } from "../../infrastructure/repositories/user.repository";
import { CreateUserDTO } from "../../infrastructure/dtos/user.dto";

const userRepository = new TypeORMUserRepository();
const userUseCases = new UserUseCases(userRepository);

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const userData: CreateUserDTO = req.body;
      const user = new User();
      Object.assign(user, userData);
      
      const createdUser = await userUseCases.createUser(user);
      res.status(201).json({
        id: createdUser.id,
        name: createdUser.name,
        registration: createdUser.registration
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { registration, password } = req.body;
      const token = await userUseCases.login(registration, password);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  static async getProfile(req: Request, res: Response) {
    res.json({ user: (req as any).user });
  }
}