import React, {Component} from 'react'
import {connect} from 'react-redux'
import AnswerPoll from './answerQuestion'
import ViewPoll from './viewPoll'
import {NoMatch} from './NoMatch'

class QuestionContainer extends Component {
    render() {
        return (
            this.props.question === null ? <NoMatch/> :
            this.props.optOne || this.props.optTwo ?  <ViewPoll
                question={this.props.question}
                author={this.props.author}
                optOne={this.props.optOne}
                optTwo={this.props.optTwo}
            /> :
                <AnswerPoll
                    question={this.props.question}
                    author={this.props.author}
                />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const question = state.questions[ownProps.match.params.questionId]
    return {
        optOne: question?question.optionOne.votes.includes(state.loggedUser): null,
        optTwo: question?question.optionTwo.votes.includes(state.loggedUser) :null,
        author: question?state.users[question.author]: null ,
        question: question?question: null
    }
}

export default connect(mapStateToProps)(QuestionContainer)
