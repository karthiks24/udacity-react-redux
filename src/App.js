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

    render() {
        return (
            <BrowserRouter>
                <div className="login-container">
                    {this.props.loading === true ? <Loader/> : null}
                    {this.props.displayLogin ? null : <Navigation/>}
                    {this.props.loading === true ? null :
                        this.props.displayLogin ? <SignIn/> :
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/add' component={AddQuestion}/>
                                <Route exact path='/leaderboard' component={LeaderBoard}/>
                                <Route exact path='/questions/:questionId' component={QuestionContainer}/>
                                <Route path="*" component={Home} />
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
