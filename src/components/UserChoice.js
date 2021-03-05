import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import { saveAuthedUser } from '../actions/authUser';
import '../css/App.css';
//import loonTune from '../sounds/merry_melodies_end.mp3';

class UserChoice extends Component {
  state = {
    users: {},
    selectUser: null,
    redirectToNewPage: false,
    userID: ''
  }

  saveUserChoice = (e, user) => {
    e.preventDefault();

    this.props.selectedUser(user)
      .then(() => this.setState({ userID: user.id }))
      .then(() => this.setState({ redirectToNewPage: true }))
  }

  render() {
    const { users } = this.props
    const { redirectToNewPage, userID } = this.state

    if (redirectToNewPage) {
      return (
        <Redirect to={"/home/" + userID} />
      )
    }

    return (
      <div>
        {/* <audio ref="audio_tag" src={loonTune} autoPlay/> */}
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
        <div className="title-box">
          <p className="main-title">Looney Tunes Would You Rather</p>
          <div id="tilt"></div>
          <h3 className="login-text">Please sign in to continue.</h3>
          <div className="dropdown">
            <button className="user-button dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              SELECT USER
            </button>
            <ul className="dropdown-menu">
              {Object.keys(users).map(user => (
                <li
                  className="user-select"
                  key={users[user].id}
                  onClick={(e) => this.saveUserChoice(e, users[user], users[user].id)}>
                  <img className="menu-img" alt="img" src={users[user].imgURL} />
                  <a className='user-name'>
                    {users[user].name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {

  return {
    users: state.users,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectedUser: (user) => dispatch(saveAuthedUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChoice);