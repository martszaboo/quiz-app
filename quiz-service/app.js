import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { inputData } from './utils/dataLoader.js';
import { findQuizData } from './utils/dataLoader.js';
import { validate } from 'uuid';
import levenshtein from 'fast-levenshtein';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Utils

const isAnswerMatch = (correctAnswer, userAnswer) => {
  const distance = levenshtein.get(
    correctAnswer.toLowerCase(),
    userAnswer.toLowerCase(),
  );
  return distance <= 3;
};

//MIDDLEWEAR

const validateId = (req, res, next) => {
  if (!validate(req.params.id)) {
    return res.status(400).json({
      message: 'Id is not valid',
    });
  }
  next();
};

//CONTROLLER

const quizController = {
  async getRandomQuiz(req, res) {
    const randomIndex = Math.floor(Math.random() * inputData.length);
    const quiz = inputData[randomIndex];

    let careerStats;
    try {
      careerStats = await findQuizData(quiz);
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: 'Quiz data cannot be read' });
    }

    res.status(200).json({
      id: quiz.ID,
      name: quiz.NAME,
      personalDetails: {
        dateOfBirth: quiz.DATEOFBIRTH,
        placeOfBirth: quiz.PLACEOFBIRTH,
        dateOfDeath: quiz.DATEOFDEATH,
        nationality: quiz.NATIONALITY,
        height: quiz.HEIGHT,
        weight: quiz.WEIGHT,
        pos: quiz.POS,
      },
      careerStats,
    });
  },
  submitAnswer(req, res) {
    const id = req.params.id;
    const quiz = inputData.find((item) => item.ID === id);

    if (!quiz) {
      return res.status(404).json({
        message: 'Quiz not found',
      });
    }
    if (!quiz.NAME || !req.body?.name) {
      return res.status(400).json({
        message: 'Quiz has no name to check the answer against',
      });
    }

    if (isAnswerMatch(quiz.NAME, req.body.name)) {
      console.log('Answer is correct');
      return res.status(200).json({
        correct: true,
        id: quiz.ID,
        name: quiz.NAME,
        presonalDetails: {
          dateOfBirth: quiz.DATEOFBIRTH,
          placeOfBirth: quiz.PLACEOFBIRTH,
          dateOfDeath: quiz.DATEOFDEATH,
          nationality: quiz.NATIONALITY,
          height: quiz.HEIGHT,
          weight: quiz.WEIGHT,
          pos: quiz.POS,
        },
      });
    } else {
      console.log('Answer is incorrect');

      return res.status(200).json({
        correct: false,
      });
    }
  },
  getQuiz(req, res) {
    res.status(200).json({ body: 'TODO' });
  },
};

//ROUTER

const quizRouter = express.Router();
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});
quizRouter.route('/quizzes/random').get(quizController.getRandomQuiz);
quizRouter
  .route('/quizzes/:id/answers')
  .post(validateId, quizController.submitAnswer);
quizRouter.route('/quizzes/:id').get(validateId, quizController.getQuiz);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', quizRouter);

app.use(express.static(path.join(__dirname, './dist')));

export default app;
