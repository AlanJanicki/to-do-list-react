import { UserInputError } from 'apollo-server';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  validateChangeAvatarInput,
  validateChangePasswordInput,
  validateLoginInput,
  validateRegisterInput,
} from '../../utils/validator.js';
import verifyAuth from '../../utils/verifyAuth.js';

import TasksList from '../../models/TasksList.js';
import User from '../../models/User.js';

const generateToken = (user) => {
  return jwt.sign({ avatar: user.avatar, id: user.id, name: user.name }, process.env.JSONWT_KEY, {
    expiresIn: '6h',
  });
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

      return { avatar: user.avatar, id: user.id, name: user.name, token };
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

      let res;
      try {
        res = await newUser.save();
      } catch (error) {
        throw new UserInputError('Błąd', {
          errors: {
            uncategorizedErrors: 'Nie udało się utworzyć użytkownika. Spróbuj ponownie.',
          },
        });
      }

      try {
        await new TasksList({ tasks: [], userId: res.id }).save();
      } catch (error) {
        throw new UserInputError('Błąd', {
          errors: {
            uncategorizedErrors:
              'Nie udało się utworzyć tablicy zadań dla użytkownika. Spróbuj ponownie.',
          },
        });
      }

      return { id: res.id };
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

      let res;
      try {
        res = await User.findByIdAndUpdate(user.id, { password: newPassword }, { new: true });
      } catch (error) {
        throw new UserInputError('Błąd', {
          errors: {
            uncategorizedErrors: 'Nie udało się utworzyć zmienić hasła. Spróbuj ponownie.',
          },
        });
      }

      const token = generateToken(res);

      return { avatar: res.avatar, id: res.id, name: res.name, token };
    },

    async updateUserAvatar(_, { avatar }, context) {
      const user = verifyAuth(context);

      const errors = validateChangeAvatarInput(avatar);
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

      let res;
      try {
        res = await User.findByIdAndUpdate(user.id, { avatar }, { new: true });
      } catch (error) {
        throw new UserInputError('Błąd', {
          errors: {
            uncategorizedErrors: 'Nie udało się utworzyć zmienić avatara. Spróbuj ponownie.',
          },
        });
      }

      const token = generateToken(res);

      return { avatar: res.avatar, id: res.id, name: res.name, token };
    },
  },
};

export default user;
