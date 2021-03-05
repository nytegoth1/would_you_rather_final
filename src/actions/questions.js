import { _getQuestions } from '../utils/_DATA';
import { handleQuestionAnswer, handleSaveQuestion } from '../utils/api'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'


//GET QUESTIONS
function getQuestions (questions) {
  return {
    type: GET_QUESTIONS,
    questions
  }
}

export const loadingQuestions = () => {
  return dispatch => {
    return _getQuestions().then(response => dispatch(getQuestions(response)))
  }
}

//SAVE NEW QUESTION
export function saveQuestion (question) {
  return {
    type: SAVE_QUESTION,
    question
  }
}

//SAVE QUESTION
function saveQuestionAnswer ({ authedUser, qid, answer}) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export const savingQuestionAnswer = (qid, answer) => {
  return (dispatch, getState) => {
    let { authedUser } = getState()

    authedUser = Object.values(authedUser)[0]

    dispatch(saveQuestionAnswer({ authedUser, qid, answer }))

    return handleQuestionAnswer({
      authedUser,
      qid,
      answer
    })
  }
}

export const addQuestion = (ChoiceOne, ChoiceTwo) => {
  return (dispatch, getState) => {
    let { authedUser } = getState()

    authedUser = Object.values(authedUser)[0]

    return handleSaveQuestion({
      ChoiceOneText: ChoiceOne,
      ChoiceTwoText: ChoiceTwo,
      author: authedUser
    })
      .then((question) => dispatch(saveQuestion(question)))
  }
}