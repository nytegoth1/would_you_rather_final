import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function handleSaveQuestion (info) {
  return _saveQuestion(info)
}

export function handleQuestionAnswer (authedUser, qid, answer) {
  return _saveQuestionAnswer(authedUser, qid, answer)
}