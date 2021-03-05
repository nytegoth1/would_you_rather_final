import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Nav from './Nav';
import { addQuestion } from '../actions/questions';
import '../css/App.css';

class NewQuestion extends Component {
  state = {
    ChoiceOne: '',
    ChoiceTwo: '',
    redirectToNewPage: false,
  }

  handleChangeChoiceOne = (e) => {
    const ChoiceOne = e.target.value

    this.setState({ ChoiceOne: ChoiceOne });
    //localStorage.setItem('question1', e.target.value);
  }

  handleChangeChoiceTwo = (e) => {
    const ChoiceTwo = e.target.value

    this.setState({ ChoiceTwo: ChoiceTwo });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { ChoiceOne, ChoiceTwo } = this.state
    const { dispatch } = this.props

    dispatch(addQuestion(ChoiceOne, ChoiceTwo));
    this.setState({ userID: true });
    this.setState({ redirectToNewPage: true });
    console.log('props', this.props)
    //localStorage.setItem('questions', JSON.stringify(this.state));
  }

  //

  //

  render() {
    const { authedUser, authedUserAvatar, authedUserID } = this.props
    const { ChoiceOne, ChoiceTwo, redirectToNewPage } = this.state

    if (redirectToNewPage) {
      return (
        <Redirect to={"/home/" + authedUserID} />
      )
    }

    if (authedUser === null) {
      return <Redirect to='/' />
    }

    return (
      <Fragment>
        <Nav avatar={authedUserAvatar} />
        <div className="new-question-full">

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

          <h2 className='complete-question-title'>Create New Question</h2>
          <form className='new-question-body' onSubmit={this.handleSubmit}>
            <h1 className='title'> Would you rather... </h1>
            <input
              placeholder='Enter Choice One'
              value={ChoiceOne}
              className='question-Choice'
              onChange={this.handleChangeChoiceOne}
            />
            <h3 className='complete-question-title'> or </h3>
            <input
              placeholder='Enter Choice Two'
              value={ChoiceTwo}
              className='question-Choice'
              onChange={this.handleChangeChoiceTwo}
            />
            <input type='submit' className='submit-btn' />
          </form>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps({ authedUser }) {
  let authedUserAvatar = ''
  let authedUserID = ''

  if (authedUser !== null) {
    authedUserAvatar = authedUser.avatarURL;
    authedUserID = authedUser.id
  }

  return {
    authedUser: authedUser,
    authedUserAvatar: authedUserAvatar,
    authedUserID: authedUserID,
  }
}

export default connect(mapStateToProps)(NewQuestion)