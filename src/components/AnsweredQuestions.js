import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/App.css';

class Question extends Component {
  render() {
    const { users, authedUser, author, ChoiceOne, ChoiceTwo, ChoiceOneVotes, ChoiceTwoVotes } = this.props

    const totalLength = ChoiceOneVotes.length + ChoiceTwoVotes.length
    const percentOne = (ChoiceOneVotes.length / totalLength) * 100
    const percentTwo = (ChoiceTwoVotes.length / totalLength) * 100

    return(
      <div className="answered-full-div">
        <div>
          <img className="answered-avatar" alt="user-avatar" src={Object.values(users)[2]} /> 
        </div>
        <div className="question-form">
          {authedUser.id === author
            ? <div className="question-title">Asked by You:</div>
            : <div className="question-title">{author} asked:</div>}
          <h3> Results </h3>
          <br />
          {ChoiceOneVotes.includes(Object.values(authedUser)[0])
          ? <div className='answered-div'>
              <div className='user-choice'>

                <p className='paragraph-text'>Would you rather {ChoiceOne} </p>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentOne}%`}}></div>
                </div>
                <p>{ChoiceOneVotes.length} out of {totalLength} votes</p>
              </div>
              <br />
              <div className='not-user-choice'>
                <p className='paragraph-text'>Would you rather {ChoiceTwo}</p>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentTwo}%`}}></div>
                </div>
                <p>{ChoiceTwoVotes.length} out of {totalLength} votes</p>
              </div>
            </div>
          : <div className='answered-div'> 
              <div className='not-user-choice'>
                <p className='paragraph-text'>Would you rather {ChoiceOne} </p>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentOne}%`}}></div>
                </div>
                <p>{ChoiceOneVotes.length} out of {totalLength} votes</p>
              </div>
              <br />
              <div className='user-choice'>
                <p className='paragraph-text'>Would you rather {ChoiceTwo}</p>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentTwo}%`}}></div>
                </div>
                <p>{ChoiceTwoVotes.length} out of {totalLength} votes</p>
              </div>
            </div>
          }
        </div>  
        <div className="clearfix"></div>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }, { userID }) {
  const user = users[userID];

  return {
    users: user,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(Question)