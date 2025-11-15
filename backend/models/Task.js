import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    status: { type: String, default: "En cours" },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
