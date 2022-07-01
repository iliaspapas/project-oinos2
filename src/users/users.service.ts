import { Injectable, InternalServerErrorException } from '@nestjs/common';
import User from 'src/entities/users';
import Users from 'src/entities/users';

@Injectable()
export class UsersService {
  getAllUsers = async () => {
    return User.find();
  };
  getUser = async (username: string) => {
    try {
      const users = await Users.find({ where: { username } });
      console.log(users);
      return users[0];
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
      // updateUser = Object.assign({}, userData);
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
      const { name, username, password } = userData;
      newUser.name = name;
      newUser.username = username;
      newUser.password = password;
      console.log(newUser);
      return newUser.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error, 'User not saved');
    }
  };
}
