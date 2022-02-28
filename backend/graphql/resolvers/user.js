import fs from 'fs';
import path from 'path';

import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import { GraphQLUpload } from 'graphql-upload';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import TasksList from '../../models/TasksList.js';
import User from '../../models/User.js';

import {
  validateChangeAvatarInput,
  validateChangePasswordInput,
  validateLoginInput,
  validateRegisterInput,
} from '../../utils/validator.js';
import verifyAuth from '../../utils/verifyAuth.js';

const generateToken = (user) => {
  return jwt.sign(
    {
      avatar: user.avatar,
      enabledDarkMode: user.enabledDarkMode,
      id: user.id,
      name: user.name,
      ownAvatar: user.ownAvatar,
    },
    process.env.JSONWT_KEY,
    {
      expiresIn: '6h',
    }
  );
};

const user = {
  Upload: GraphQLUpload,

  Mutation: {
    async deleteUser(_, __, context) {
      const user = verifyAuth(context);

      const userToDelete = await User.findById(user.id);
      if (!userToDelete) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie odnaleziono użytkownika o podanym ID',
            },
          ],
        });
      }

      try {
        await userToDelete.deleteOne();
      } catch (error) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie udało się usunąć użytkownika. Spróbuj ponownie.',
            },
          ],
        });
      }

      const tasksListToDelete = await TasksList.findOne({ userId: user.id });
      if (!tasksListToDelete) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie odnaleziono tablicy zadań dla użytkownika',
            },
          ],
        });
      }

      try {
        await tasksListToDelete.deleteOne();
      } catch (error) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie udało się usunąć tablicy zadań. Spróbuj ponownie.',
            },
          ],
        });
      }
    },

    async login(_, { login, password }) {
      const errors = validateLoginInput(login, password);
      if (errors.length > 0) {
        throw new UserInputError('', { errors });
      }

      const user = await User.findOne({ login });
      if (!user) {
        throw new UserInputError('', {
          errors: [
            {
              login: 'Nie odnaleziono użytkownika o podanym loginie',
            },
          ],
        });
      }

      const matchingPassword = await bcrypt.compare(password, user.password);
      if (!matchingPassword) {
        throw new UserInputError('', {
          errors: [
            {
              password: 'Nieprawidłowe hasło',
            },
          ],
        });
      }
      const token = generateToken(user);

      return {
        avatar: user.avatar,
        enabledDarkMode: user.enabledDarkMode,
        id: user.id,
        name: user.name,
        ownAvatar: user.ownAvatar.length > 0 ? user.ownAvatar : '',
        token,
      };
    },

    async register(_, { input: { avatar, login, name, password, passwordRepeated } }) {
      const errors = validateRegisterInput(avatar, login, name, password, passwordRepeated);
      if (errors.length > 0) {
        throw new UserInputError('', { errors });
      }

      const user = await User.findOne({ login });
      if (user) {
        throw new UserInputError('', {
          errors: [
            {
              login: 'Ten login jest już zajęty. Wybierz inny.',
            },
          ],
        });
      }

      password = await bcrypt.hash(password, 10);

      const newUser = new User({
        avatar,
        enabledDarkMode: false,
        login,
        name,
        ownAvatar: '',
        password,
      });

      let res;
      try {
        res = await newUser.save();
      } catch (error) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie udało się utworzyć użytkownika. Spróbuj ponownie.',
            },
          ],
        });
      }

      try {
        await new TasksList({ tasks: [], userId: res.id }).save();
      } catch (error) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors:
                'Nie udało się utworzyć tablicy zadań dla użytkownika. Spróbuj ponownie.',
            },
          ],
        });
      }
    },

    async toggleDarkMode(_, { darkModeState }, context) {
      const user = verifyAuth(context);

      const userToUpdate = await User.findById(user.id);
      if (!userToUpdate) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie odnaleziono użytkownika o podanym ID',
            },
          ],
        });
      }

      let res;
      try {
        res = await User.findByIdAndUpdate(
          user.id,
          { enabledDarkMode: darkModeState },
          { new: true }
        );
      } catch (error) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie udało się motywu. Spróbuj ponownie.',
            },
          ],
        });
      }

      const token = generateToken(res);

      return {
        avatar: res.avatar,
        enabledDarkMode: res.enabledDarkMode,
        id: res.id,
        name: res.name,
        ownAvatar: res.ownAvatar.length > 0 ? res.ownAvatar : '',
        token,
      };
    },

    async updateUserPassword(
      _,
      { input: { oldPassword, newPassword, newPasswordRepeated } },
      context
    ) {
      const user = verifyAuth(context);

      const errors = validateChangePasswordInput(oldPassword, newPassword, newPasswordRepeated);
      if (errors.length > 0) {
        throw new UserInputError('', { errors });
      }

      const userToUpdate = await User.findById(user.id);
      if (!userToUpdate) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie odnaleziono użytkownika o podanym ID',
            },
          ],
        });
      }

      const matchingPassword = await bcrypt.compare(oldPassword, userToUpdate.password);
      if (!matchingPassword) {
        throw new UserInputError('', {
          errors: [
            {
              oldPassword: 'Nieprawidłowe stare hasło',
            },
          ],
        });
      }

      newPassword = await bcrypt.hash(newPassword, 10);

      let res;
      try {
        res = await User.findByIdAndUpdate(user.id, { password: newPassword }, { new: true });
      } catch (error) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie udało się utworzyć zmienić hasła. Spróbuj ponownie.',
            },
          ],
        });
      }

      const token = generateToken(res);

      return {
        avatar: res.avatar,
        enabledDarkMode: res.enabledDarkMode,
        id: res.id,
        name: res.name,
        ownAvatar: res.ownAvatar.length > 0 ? res.ownAvatar : '',
        token,
      };
    },

    async updateUserAvatar(_, { avatar, ownAvatar }, context) {
      const user = verifyAuth(context);
      const __dirname = path.resolve();
      let ownAvatarName;

      const errors = validateChangeAvatarInput(avatar, ownAvatar.file);
      if (errors.length > 0) {
        throw new UserInputError('', { errors });
      }

      const userToUpdate = await User.findById(user.id);
      if (!userToUpdate) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie odnaleziono użytkownika o podanym ID',
            },
          ],
        });
      }

      if (ownAvatar) {
        ownAvatarName = 'avatar' + uuidv4();
        const { createReadStream } = await ownAvatar.file;
        const stream = createReadStream();
        const pathName = path.join(__dirname, `/public/images/${ownAvatarName}`);
        await stream.pipe(fs.createWriteStream(pathName));
      }

      let res;
      try {
        if (ownAvatar) {
          res = await User.findByIdAndUpdate(user.id, { ownAvatar: ownAvatarName }, { new: true });
        } else {
          res = await User.findByIdAndUpdate(user.id, { avatar, ownAvatar: '' }, { new: true });
        }
      } catch (error) {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie udało się utworzyć zmienić avatara. Spróbuj ponownie.',
            },
          ],
        });
      }

      const token = generateToken(res);

      return {
        avatar: res.avatar,
        enabledDarkMode: res.enabledDarkMode,
        id: res.id,
        name: res.name,
        ownAvatar: res.ownAvatar.length > 0 ? res.ownAvatar : '',
        token,
      };
    },
  },
};

export default user;
