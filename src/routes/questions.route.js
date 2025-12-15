const express = require('express');
const { protect } = require('../middlewares/auth');
const { listQuestions, createQuestion, updateQuestion, deleteQuestion } = require('../controllers/questions.controller');

const router = express.Router();

router.get('/', listQuestions);
router.post('/', protect, createQuestion);
router.put('/:id', protect, updateQuestion);
router.delete('/:id', protect, deleteQuestion);

module.exports = router;
