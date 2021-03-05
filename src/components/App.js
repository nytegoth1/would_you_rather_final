import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import UserChoice from './UserChoice'
import UserHome from './UserHome'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import LoadingBar from 'react-redux-loading'
import '../css/App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{ backgroundColor: '#1a3e6b', height: '4px' }} />
          <div className="container">
            {this.props.loading === true
              ? null
              : <div>
                <Route path='/' exact component={UserChoice} />
                <Route path='/home/:id' component={UserHome} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={LeaderBoard} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ selectUser }) {
  return {
    //sets a new property onto the component
    loading: selectUser === null
  }
}

export default connect(mapStateToProps)(App);
