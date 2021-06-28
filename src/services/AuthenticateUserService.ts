import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

interface IAuthenticateRequest {
  email: string,
  password: string,
}

class AuthenticateuserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findOne({ email });
    const passwordMatch = await compare(password, user.password);

    if (!user) {
      throw new Error("email/password incorrect")
    }

    if (!passwordMatch) {
      throw new Error("email/password incorrect")
    }

    const token = sign(
      {
        email: user.email
      },
      "f1863ea53fe91d113de91812cf980b40",
      { expiresIn: "1d" }
    );

    return token;
  }
}

export { AuthenticateuserService }