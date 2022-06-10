import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Users from 'src/entities/users';
import { getRepository } from 'typeorm';

@Injectable()
export class UsersService {
  getUser = async (username: string) => {
    try {
      const user = await Users.findOne(username);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'User not Found');
    }
  };
  updateUser = async (id, userData: any) => {
    try {
      const updateUser = await Users.findOne({
        id: parseFloat(id),
      });
      const { name, username, password, role } = userData;
      if (name) updateUser.name = name;
      if (username) updateUser.username = username;
      if (password) {
        updateUser.password = password;
      }
      if (role) updateUser.role = role;
      return Users.save(updateUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'User not saved');
    }
  };
  deleteUser = async (id) => {
    try {
      return Users.delete(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'User not deleted');
    }
  };
  insertUser = async (userData: any) => {
    try {
      const newUser = new Users();
      const { name, username, password, role } = userData;
      newUser.name = name;
      newUser.username = username;
      newUser.password = password;
      newUser.role = role;
      return Users.save(newUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'User not saved');
    }
  };
}
