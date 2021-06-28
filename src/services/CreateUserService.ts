import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

class CreateUserService {
  async execute({ name, email, isAdmin, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UserRepository);
    const userAlreadyExists = await usersRepository.findOne({ email })

    if (!email) {
      throw new Error("email does not exist")
    }

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({ name, email, isAdmin, password: passwordHash });
    await usersRepository.save(user);
    return user;

  }
}

export { CreateUserService }