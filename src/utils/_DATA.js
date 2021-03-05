import sam from '../images/Yosemite_Sam.svg.png';
import daffy from '../images/daffy.png';
import sylvester from '../images/sylvester.jpg';
import samsound from '../sounds/sam04.mp3';
import daffsound from '../sounds/daffy23.mp3';
import sylvsound from '../sounds/sylv01.mp3';

let users = {
  Sam: {
    id: 'Sam',
    name: 'Sam',
    imgURL: sam,
    soundURL: samsound,
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'ChoiceOne',
      "6ni6ok3ym7mf1p33lnez": 'ChoiceOne',
      "am8ehyc8byjqgar0jgpub9": 'ChoiceTwo',
      "loxhs1bqm25b708cmbf3g": 'ChoiceTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  Daffy: {
    id: 'Daffy',
    name: 'Daffy',
    imgURL: daffy,
    soundURL: daffsound,
    answers: {
      "vthrdm985a262al8qx3do": 'ChoiceOne',
      "xj352vofupe1dqz9emx13r": 'ChoiceTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  Sylvester: {
    id: 'Sylvester',
    name: 'Sylvester',
    imgURL: sylvester,
    soundURL: sylvsound,
    answers: {
      "xj352vofupe1dqz9emx13r": 'ChoiceOne',
      "vthrdm985a262al8qx3do": 'ChoiceTwo',
      "6ni6ok3ym7mf1p33lnez": 'ChoiceOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'Sam',
    timestamp: 1467166872634,
    ChoiceOne: {
      votes: ['Sam'],
      text: 'Be a lily-livered varmint',
    },
    ChoiceTwo: {
      votes: [],
      text: 'Be ornery fur-bearin’ rebel'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'Daffy',
    timestamp: 1468479767190,
    ChoiceOne: {
      votes: [],
      text: 'Become a Thuperhero',
    },
    ChoiceTwo: {
      votes: ['Daffy', 'Sam'],
      text: 'Become a Thupervillian'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'Sam',
    timestamp: 1488579767190,
    ChoiceOne: {
      votes: [],
      text: 'Be a doggone idgit galoot',
    },
    ChoiceTwo: {
      votes: ['Sam'],
      text: 'Be a doggone long eared galoot'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'Sylvester',
    timestamp: 1482579767190,
    ChoiceOne: {
      votes: [],
      text: 'See Spike',
    },
    ChoiceTwo: {
      votes: ['Sam'],
      text: 'See a ba ba big Cat'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'Sylvester',
    timestamp: 1489579767190,
    ChoiceOne: {
      votes: [],
      text: 'Have a Tweety',
    },
    ChoiceTwo: {
      votes: ['Daffy'],
      text: 'Have Sufferin succotash'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'Daffy',
    timestamp: 1493579767190,
    ChoiceOne: {
      votes: ['Daffy'],
      text: 'Be Dethpicable',
    },
    ChoiceTwo: {
      votes: [],
      text: 'Be Happy'
    }
  },
}

let selectUser = null

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

//GETS THE USER SELECTED
export function _getSelectUser () {
  return new Promise((res, rej) => {
    setTimeout(() => res(selectUser), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ ChoiceOneText, ChoiceTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    ChoiceOne: {
      votes: [],
      text: ChoiceOneText,
    },
    ChoiceTwo: {
      votes: [],
      text: ChoiceTwoText,
    }
  }
}

export function _saveSelectedUser (user) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      selectUser = user;
      res(user)}, 1000)
  })
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }
      
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([Object.values(authedUser)[0]])
          }
        }
      }

      res()
    }, 500)
  })
}