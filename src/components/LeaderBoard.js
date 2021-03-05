import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../css/App.css';
import Nav from './Nav';
import 'font-awesome/css/font-awesome.min.css';

const awardColor = ['yellow', '#cccccc', 'orange'];

const awardText = ['First Place', 'Second Place', 'Third Place'];

class LeaderBoard extends Component {

  render() {
    const { userArray, authedUser } = this.props

    if (authedUser === null) {
      return <Redirect to='/' />
    }
    //console.log("User Array",userArray)

    return (
      <div className="leader-full-body">

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

        <Nav />


        <h2 className="leader-title">LEADER BOARD</h2>
        {userArray.map((user, idx) => (
          
          <div key={user.id} className="card mb-4 shadow-sm">
          <div className="card-header award">
            <h4 className="my-0 fw-normal" ><p className="award" style={{ color: awardColor[idx] }}><i className="fa fa-trophy" style={{ color: awardColor[idx] }}></i> {awardText[idx]}</p><div className='score-total'>Total Score {user.ranking}</div></h4>
          </div>
          <div className="card-body">
            <div className="card-title card-image"><img className="leader-avatar" alt="user-avatar" src={user.imgURL} /></div>
                 <div className="col-md-9 leader-body">
                 <h3 className="leader-name">{user.name}</h3>
                 <p className="result-text" style={{ marginTop: '15px' }}> Answered Questions: {user.answeredResults}</p>
                 <p className="result-text"> Questions Asked:   {user.questionsResults}</p>
               </div>
               <audio ref="audio_tag" src={user.soundURL} controls />
          </div>
        </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {

  const userArray = Object.keys(users).map((user) => {
    const userInfo = {
      id: users[user].id,
      imgURL: users[user].imgURL,
      soundURL: users[user].soundURL,
      name: users[user].name,
      answeredResults: Object.keys(users[user].answers).length,
      questionsResults: users[user].questions.length,
    }

    const ranking = userInfo.answeredResults + userInfo.questionsResults

    userInfo.ranking = ranking;

    return userInfo;
  }).sort((a, b) => (
    b.ranking - a.ranking
  ))

  return {
    authedUser,
    userArray
  }
}


export default connect(mapStateToProps)(LeaderBoard)