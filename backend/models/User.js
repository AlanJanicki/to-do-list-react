import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const UserSchema = new Schema(
  {
    avatar: {
      type: String,
      required: true,
    },
    enabledDarkMode: {
      type: Boolean,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ownAvatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('User', UserSchema);
