import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savingQuestionAnswer } from '../actions/questions';
import '../css/App.css';



class Question extends Component {
  state = {
    answer: '',
  }

  handleChange = (e) => {
    const answer = e.target.value

    this.setState({ answer: answer })
  }


  handleSubmit = (e) => {
    e.preventDefault();

    const { answer } = this.state
    const { dispatch, questionID } = this.props
    

    if (!answer) {
      alert('Please select an answer.')
    } else {
      dispatch(savingQuestionAnswer(questionID, answer))

      //Todo: Wanted to eventually use local storage to pass parameters like date and time of answers submitted.
      // var today = new Date();

      // let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
      // itemsArray.push(this.props.author, today.toLocaleString());
      // localStorage.setItem('items', JSON.stringify(itemsArray));
      // localStorage.getItem('items', JSON.stringify(itemsArray));
      
    }
  }

  render() {
    const { users, authedUser } = this.props
    
    return (
      <div className="container-fluid">

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

        <div className="question-full-div">
          <div>
            <img className="question-img" alt="user-avatar" src={Object.values(users)[2]} />
          </div>
          <form className="question-form" onSubmit={this.handleSubmit}>
            {authedUser.id === this.props.author
              ? <div className="question-title">You asked:</div>
              : <div className="question-title">{this.props.author} asks:</div>}
            <h3> Would you rather... </h3>
            <input type='radio' name='option' value='ChoiceOne' id='ChoiceOne' onChange={this.handleChange} />
            <label className="question-choice" htmlFor='ChoiceOne'> {this.props.ChoiceOne} </label>
            <br />
            <input type='radio' name='option' value='ChoiceTwo' id='ChoiceTwo' onChange={this.handleChange} />
            <label className="question-choice" htmlFor='ChoiceTwo'>{this.props.ChoiceTwo}</label>
            <br />
            <input className="question-button" type='submit' />
          </form>
          <div className="clearfix"></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }, { userID }) {
  const user = users[userID];

  return {
    users: user,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(Question)