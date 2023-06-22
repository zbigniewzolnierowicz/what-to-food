import { Injectable } from '@nestjs/common';
import { NewUserDTO } from '../dto/create-user.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { User } from '../models/user.schema';
import { InjectRepository } from '@mikro-orm/nestjs';
import * as argon2 from 'argon2';
import { UserExistsException } from '../exceptions/exists.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  public async createUser(newUserDTO: NewUserDTO) {
    const newUser = this.userRepo.create({
      ...newUserDTO,
      password_hash: await argon2.hash(newUserDTO.password),
    });

    try {
      const result = await this.em.persistAndFlush(newUser);
      return result;
    } catch (e) {
      throw new UserExistsException(e);
    }
  }
}
