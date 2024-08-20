const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [optionSchema],
  marks: { type: Number, required: true },
  correctAnswer: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
