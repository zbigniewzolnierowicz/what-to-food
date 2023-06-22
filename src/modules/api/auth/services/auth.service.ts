import { Injectable } from '@nestjs/common';
import { User } from '../models/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewUserDTO } from '../dto/create-user.dto';
import { UserExistsException } from '../exceptions/exists.exception';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private hashPassword(password: string): string {
    return `HASHED_${password}`;
  }

  private comparePassword(hash: string, givenString: string): boolean {
    return hash === `HASHED_${givenString}`;
  }

  public async createUser(newUserDTO: NewUserDTO) {
    try {
      const newUser = await this.userModel.create(newUserDTO);
      newUser.password_hash = this.hashPassword(newUserDTO.password);

      await newUser.save();

      return newUser._id;
    } catch (error: any) {
      throw new UserExistsException(error);
    }
  }
}
