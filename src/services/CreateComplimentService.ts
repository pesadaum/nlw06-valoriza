import { getCustomRepository } from 'typeorm';
import { ComplimentRepository } from '../repositories/ComplimentRepository';
import { UserRepository } from '../repositories/UserRepository';
interface IComplimentRequest {
  tag_id: string,
  user_sender: string,
  user_receiver: string,
  message: string
}

class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentRepository);
    const usersRepository = getCustomRepository(UserRepository);
    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect user receiver");
    }

    if (!userReceiverExists) {
      throw new Error("User receiver doesn't exists");
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    await complimentsRepository.save(compliment);
    return compliment;

  }

}

export { CreateComplimentService }