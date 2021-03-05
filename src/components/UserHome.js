import React, { Component } from 'react';
import Nav from './Nav';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Question from './Question';
import AnsweredQuestion from './AnsweredQuestions';
import '../css/App.css';
import { getAuthedUser } from '../actions/authUser';

class UserHome extends Component {
  state = {
    loading: true,
    showUnansweredQuestions: true,
  }

  renderAnsweredQuestions = () => {
    if (this.state.showUnansweredQuestions === true) {
      this.setState(
        {showUnansweredQuestions: false}
      );
    } 
  }

  renderUnansweredQuestions = () => {

    if (this.state.showUnansweredQuestions === false) {
      this.setState(
        {showUnansweredQuestions: true}
      );
    } 
  }

  render() {

    const { authedUser, unAnsweredQuestions, answeredQuestions } = this.props;
    const { showUnansweredQuestions } = this.state;
    
    if (authedUser === null) {
      return <Redirect to='/' />
    }

    return (

      <div className='userHome-full'>
        <div id="background-wrap">
              <div className="x1">
          <div className="cloud"></div>
      </div>
  
      <div className="x2">
          <div className="cloud"></div>
      </div>
  
      <div className="x3">
          <div className="cloud"></div>
      </div>
  
      <div className="x4">
          <div className="cloud"></div>
      </div>
      
      <div className="x5">
          <div className="cloud"></div>
      </div>
      </div>
        <div className="main-title colored"><h2>Welcome {authedUser.id}</h2></div>
        <Nav />
        <div className="userHome-question-buttons-div">
          <button className="userHome-question-buttons userHome-unanswer-btn" onClick={this.renderUnansweredQuestions}>QUESTIONS TO ANSWER</button>
          <button className="userHome-question-buttons userHome-answer-btn" onClick={this.renderAnsweredQuestions}>ANSWERED QUESTIONS</button>
        </div>

        {showUnansweredQuestions === true && unAnsweredQuestions.length === 0
          ? (<div className='question-error'>Out of Questions. You may want to create a question! </div>)
          : (<span></span>)}

        {showUnansweredQuestions === false && answeredQuestions.length === 0
          ? (<div className='question-error'>You haven't answered any questions.</div>)
          : (<span></span>)}

        <div className="user-main">
          {showUnansweredQuestions === true ? (
            unAnsweredQuestions.map(question => (
              <Question 
                key={question.id}
                questionID={question.id}
                author={question.author}
                ChoiceOne={question.ChoiceOne.text}
                ChoiceTwo={question.ChoiceTwo.text}
                userID={question.author}
                />
            ))) 
            : answeredQuestions.map(question => (
              <AnsweredQuestion 
                key={question.id}
                author={question.author}
                ChoiceOne={question.ChoiceOne.text}
                ChoiceTwo={question.ChoiceTwo.text}
                ChoiceOneVotes={question.ChoiceOne.votes}
                ChoiceTwoVotes={question.ChoiceTwo.votes}
                userID={question.author}
                />
            ))
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps ({questions, users, authedUser}, props) {
  let unAnsweredQuestions = {}

  let answeredQuestions = {}

  if (authedUser !== null) {
    unAnsweredQuestions = Object.values(Object.values(questions)).filter((question) => 
      !question.ChoiceOne.votes.includes(authedUser.id) && !question.ChoiceTwo.votes.includes(authedUser.id)); 

    answeredQuestions = Object.values(questions).filter((question) =>
        question.ChoiceOne.votes.includes(authedUser.id) || question.ChoiceTwo.votes.includes(authedUser.id));
  }

  return {
    unAnsweredQuestions: Object.values(unAnsweredQuestions),
    answeredQuestions: Object.values(answeredQuestions),
    users: users,
    authedUser: authedUser,
    questions: questions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSelectedUser: () => dispatch(getAuthedUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);