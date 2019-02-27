import React, {Component} from 'react'
import {connect} from 'react-redux'
import AnswerPoll from './answerQuestion'
import ViewPoll from './viewPoll'

class QuestionContainer extends Component {
    render() {
        return (
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
        optOne: question.optionOne.votes.includes(state.loggedUser),
        optTwo: question.optionTwo.votes.includes(state.loggedUser),
        author: state.users[question.author],
        question: question
    }
}

export default connect(mapStateToProps)(QuestionContainer)
