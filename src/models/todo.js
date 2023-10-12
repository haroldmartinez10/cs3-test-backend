import { Schema, model } from "mongoose";

/* id, nombre, desc, state, created_at, updated_at */

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100, 
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  }, {
    timestamps: true,
  }
);

export default model('Todo', todoSchema);