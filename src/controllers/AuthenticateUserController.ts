import { Request, Response } from 'express';
import { AuthenticateuserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const authenticateuserService = new AuthenticateuserService();

    const token = await authenticateuserService.execute({
      email,
      password,
    });

    return response.json(token);
  }

}

export { AuthenticateUserController };