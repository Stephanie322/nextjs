import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",           // links to your User model
    required: true 
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),   // defaults to today
  },
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    required: [true, "Please write some content for your diary entry"]
  }
}, { timestamps: true });

const DiaryEntry = mongoose.models.DiaryEntry || mongoose.model("DiaryEntry", diarySchema);

export default DiaryEntry;
