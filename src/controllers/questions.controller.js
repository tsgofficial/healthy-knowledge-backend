const db = require('../models');
const catchAsync = require('../utils/catchAsync');

const Questions = db.questions;

const listQuestions = catchAsync(async (req, res) => {
  const questions = await Questions.findAll();
  return res.send({ success: true, data: questions });
});

const createQuestion = catchAsync(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).send({ success: false, message: 'title and description are required' });
  }
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).send({ success: false, message: 'Please authenticate' });
  }
  const created = await Questions.create({ title, description, user_id: userId });
  return res.status(201).send({ success: true, message: 'Question created', data: created });
});

const updateQuestion = catchAsync(async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  if (!title || !description) {
    return res.status(400).send({ success: false, message: 'title and description are required' });
  }
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).send({ success: false, message: 'Please authenticate' });
  }
  const [count] = await Questions.update({ title, description }, { where: { id, user_id: userId } });
  if (count === 0) {
    return res.status(404).send({ success: false, message: 'Question not found' });
  }
  const updated = await Questions.findByPk(id);
  return res.send({ success: true, message: 'Question updated', data: updated });
});

const deleteQuestion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).send({ success: false, message: 'Please authenticate' });
  }
  const count = await Questions.destroy({ where: { id, user_id: userId } });
  if (count === 0) {
    return res.status(404).send({ success: false, message: 'Question not found' });
  }
  return res.send({ success: true, message: 'Question deleted' });
});

module.exports = { listQuestions, createQuestion, updateQuestion, deleteQuestion };
