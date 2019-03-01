import React, {Component} from 'react'
import {Button, ButtonGroup, Card, Col, Container, Image, Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Home extends Component {

    state = {
        answered: false,
        unanswered: true
    }

    handleAnsweredClick = () => {
        this.setState({
            answered: true,
            unanswered: false
        })
    }

    handleUnansweredClick = () => {
        this.setState({
            answered: false,
            unanswered: true
        })
    }

    render() {
        var questionData = this.state.unanswered ? this.props.unAnsweredQuestions : this.props.answeredQuestions
        return (
            <Container>
                <Row>
                    <Col sm={4}>
                        <Card style={{width: '18rem'}}>
                            <Card.Img variant="top" src={this.props.avatar}/>
                            <Card.Body>
                                <Card.Title>{this.props.username}</Card.Title>
                                <Card.Text>
                                    <span>Answered Questions : {this.props.answered}</span>
                                    <span> UnAnswered Questions: {this.props.unanswered}</span>
                                </Card.Text>
                                <ButtonGroup size="sm" className="mt-3">
                                    <Button onClick={this.handleAnsweredClick}>View Answered</Button>
                                    <Button onClick={this.handleUnansweredClick}>View UnAnswered</Button>
                                </ButtonGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={8}>
                        {this.state.unanswered ? <h2>Unanswered Questions</h2> : <h2>Answered Questions</h2>}
                        {questionData.map((question) => (
                            <Card key={question.id} style={{width: '38rem'}}>
                                <Card.Header>{question.author}{this.state.unanswered? ' asks': ' asked'}</Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col xs={3}>
                                            <Image  className="avatar"
                                                   src={this.props.users[question.author].avatarURL}/>
                                        </Col>
                                        <Col xs={6}>
                                            <Card.Title>Would You Rather</Card.Title>
                                            <Card.Text>
                                                <span>{question.optionOne.text}</span>
                                            </Card.Text>
                                            <Card.Text>
                                                <span>{question.optionTwo.text}</span>
                                            </Card.Text>
                                        </Col>
                                        <Col xs={3} >
                                            <div className='card-btn'>
                                            <Link to={`/questions/${question.id}`}>
                                                <Button className='signIn-button signbtn'
                                                        disabled={false}
                                                        type="submit" bsstyle="success">
                                                    {this.state.unanswered ? 'Answer Poll' : 'View Poll'}
                                                </Button>
                                            </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))
                        }
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
        answeredQuestions: (Object.values(state.categorizeQuestions.answeredQuestions)).sort((a, b) => {
            return b.timestamp - a.timestamp
        }),
        unAnsweredQuestions: (Object.values(state.categorizeQuestions.unansweredquestions)).sort((a, b) => {
            return b.timestamp - a.timestamp
        }),
        users: state.users
    }
}


export default connect(mapStateToProps)(Home)