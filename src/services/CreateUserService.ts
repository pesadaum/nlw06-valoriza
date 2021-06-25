import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

interface IUserRequest {
  name: string;
  email: string;
  isAdmin: boolean;
}

class CreateUserService {
  async execute({ name, email, isAdmin }: IUserRequest) {
    const usersRepository = getCustomRepository(UserRepository);
    const userAlreadyExists = await usersRepository.findOne({ email })

    if (!email) {
      throw new Error("email does not exist")
    }

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const user = usersRepository.create({ name, email, isAdmin });
    await usersRepository.save(user);
    return user;

  }
}

export { CreateUserService }