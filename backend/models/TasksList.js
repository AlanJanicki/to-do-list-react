import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const TasksList = new Schema(
  {
    tasks: [
      {
        body: {
          type: String,
          required: true,
        },
        createdAt: {
          type: String,
          required: true,
        },
        done: Boolean,
        finishDate: String,
        id: {
          type: String,
          required: true,
        },
        priority: String,
      },
      { timestamps: true },
    ],
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default model('TasksList', TasksList);
