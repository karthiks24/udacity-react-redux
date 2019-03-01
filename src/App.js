import React, {Component} from 'react';
import './App.css';
import {fetchInitialData} from './redux/actions/loggedUserAction'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import SignIn from './components/signIn'
import Navigation from './components/Header'
import Home from './components/home'
import QuestionContainer from './components/routeQuestions'
import AddQuestion from './components/newQuestion'
import {categorizeQuestions} from '../src/redux/actions/questionActions'
import LeaderBoard from './components/leaderboard'
import Loader from './components/Loader'
import {NoMatch} from  './components/NoMatch'

class App extends Component {

    componentDidMount() {
        this.props.getInitialData()
    }

    /* categorise the questions(answered & unanswered) on new props*/
    componentWillReceiveProps(props) {
        if (props.loggedUser != null) {
            props.categorizeQuestions(props.questions, props.loggedUser, props.users)
        }

    }
    NoMatch = ({ location }) => (

        <div id='login-body'>
            <h3>No match for <code>{location.pathname}</code> Please Navigate to Home Page</h3>
        </div>
    )

    render() {
        return (
            <BrowserRouter>
                <div className="login-container">
                    {this.props.loading === true ? <Loader/> : null}
                    {this.props.displayLogin ? null : <Navigation/>}
                    {this.props.loading === true ? null :
                        this.props.displayLogin ?
                            <Switch>
                                <Route  path='/' component={SignIn} />
                                <Route path='*'  component={NoMatch}/>
                            </Switch> :
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/add' component={AddQuestion}/>
                                <Route exact path='/leaderboard' component={LeaderBoard}/>
                                <Route exact path='/questions/:questionId' component={QuestionContainer}/>
                                <Route  path='*' component={NoMatch} />
                            </Switch>
                    }
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: Object.keys(state.questions).length === 0,
        displayLogin: (state.loggedUser != null) ? false : true,
        users: state.users,
        questions: state.questions,
        loggedUser: state.loggedUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInitialData: () => dispatch(fetchInitialData()),
        categorizeQuestions: (questions, loggedUser, users) => dispatch(categorizeQuestions(questions, loggedUser, users))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
