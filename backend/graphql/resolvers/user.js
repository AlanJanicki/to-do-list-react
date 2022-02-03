import { UserInputError } from 'apollo-server';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  validateChangePasswordInput,
  validateLoginInput,
  validateRegisterInput,
} from '../../utils/validator.js';
import verifyAuth from '../../utils/verifyAuth.js';

import TasksList from '../../models/TasksList.js';
import User from '../../models/User.js';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.JSONWT_KEY,
    { expiresIn: '1h' }
  );
};

const user = {
  Mutation: {
    async login(_, { login, password }) {
      const errors = validateLoginInput(login, password);
      if (errors.length > 0) {
        throw new UserInputError('Błędy', { errors });
      }

      const user = await User.findOne({ login });
      if (!user) {
        throw new UserInputError('Błąd', {
          errors: {
            login: 'Nie odnaleziono użytkownika o podanym loginie',
          },
        });
      }

      const matchingPassword = await bcrypt.compare(password, user.password);
      if (!matchingPassword) {
        throw new UserInputError('Błąd', {
          errors: {
            password: 'Nieprawidłowe hasło',
          },
        });
      }
      const token = generateToken(user);

      return { id: user.id, name: user.name, token };
    },

    async register(_, { input: { avatar, login, name, password, passwordRepeated } }) {
      const errors = validateRegisterInput(avatar, login, name, password, passwordRepeated);
      if (errors.length > 0) {
        throw new UserInputError('Błędy', { errors });
      }

      const user = await User.findOne({ login });
      if (user) {
        throw new UserInputError('Błąd', {
          errors: {
            login: 'Ten login jest już zajęty. Wybierz inny.',
          },
        });
      }
      password = await bcrypt.hash(password, 10);

      const newUser = new User({
        avatar,
        login,
        name,
        password,
      });

      const res = await newUser.save();

      const newTasksList = await new TasksList({ tasks: [], userId: res.id }).save();
      if (!newTasksList) {
        throw new UserInputError('Błąd', {
          errors: {
            uncategorizedErrors: 'Nie udało się utworzyć tablicy zadań dla użytkownika',
          },
        });
      }

      const token = generateToken(res);

      return { id: res.id, name: res.name, token };
    },

    async updateUserPassword(
      _,
      { input: { oldPassword, newPassword, newPasswordRepeated } },
      context
    ) {
      const user = verifyAuth(context);

      const errors = validateChangePasswordInput(oldPassword, newPassword, newPasswordRepeated);
      if (errors.length > 0) {
        throw new UserInputError('Błędy', { errors });
      }

      const userToUpdate = await User.findById(user.id);
      if (!userToUpdate) {
        throw new UserInputError('Błąd', {
          errors: {
            uncategorizedErrors: 'Nie odnaleziono użytkownika o podanym ID',
          },
        });
      }

      const matchingPassword = await bcrypt.compare(oldPassword, userToUpdate.password);
      if (!matchingPassword) {
        throw new UserInputError('Błąd', {
          errors: {
            oldPassword: 'Nieprawidłowe stare hasło',
          },
        });
      }

      newPassword = await bcrypt.hash(newPassword, 10);

      const res = await User.findByIdAndUpdate(user.id, { password: newPassword }, { new: true });

      return { id: res.id, name: res.name };
    },
  },
};

export default user;
