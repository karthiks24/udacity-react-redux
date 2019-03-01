import React, {Component} from 'react'
import {Button, Card, Col, Container, Form, Image, Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import {handleVote} from '../redux/actions/questionActions'
import Profile from './profileinfo'

class AnswerPoll extends Component {

    state = {
        selection: null,
        disable: true
    }

    handleChange = (e) => {
        this.setState({
            selection: e.target.id,
            disable: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.selection) {
            this.props.handleVote(this.props.loggedUser, this.props.question, this.state.selection)
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={4}>
                        <Profile/>
                    </Col>
                    <Col sm={8}>
                        <Card style={{width: '28rem'}}>
                            <Card.Header>Asked by </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col xs={4}>
                                        <Image className="avatar" src={this.props.author.avatarURL}/>
                                    </Col>
                                    <Col xs={6}>
                                        <Card.Title>Would You Rather</Card.Title>
                                        <div>
                                            <Form.Group as={Row}>
                                                <Form.Check
                                                    onChange={this.handleChange}
                                                    type="radio"
                                                    label={this.props.question.optionOne.text}
                                                    name={this.props.question.optionOne.text}
                                                    id="optionOne"
                                                />
                                                <Form.Check
                                                    onChange={this.handleChange}
                                                    type="radio"
                                                    label={this.props.question.optionTwo.text}
                                                    name={this.props.question.optionTwo.text}
                                                    id="optionTwo"
                                                />
                                                <form onSubmit={this.handleSubmit}>
                                                    <Button className='signIn-button'
                                                            disabled={this.state.disable}
                                                            type="submit" bsstyle="success">
                                                        Submit
                                                    </Button>
                                                </form>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const loggedUser = state.loggedUser;
    return {
        username: state.users[loggedUser] ? state.users[loggedUser].name : null,
        avatar: state.users[loggedUser] ? state.users[loggedUser].avatarURL : null,
        answered: state.categorizeQuestions.answeredQuestions.length,
        unanswered: state.categorizeQuestions.unansweredquestions.length,
        loggedUser: state.loggedUser,
        users: state.users,
        questions: state.questions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleVote: (loggedUser, qid, answer) => dispatch(handleVote(loggedUser, qid, answer))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerPoll)