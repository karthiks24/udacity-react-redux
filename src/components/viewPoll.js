import React, {Component} from 'react'
import {Badge, Card, Col, Container, Image, ListGroup, ProgressBar, Row} from 'react-bootstrap'
import Profile from './profileinfo'

export default class viewPoll extends Component {

    render() {
        const {question, optOne, optTwo} = this.props
        const optOneVotes = question.optionOne.votes.length
        const optTwoVotes = question.optionTwo.votes.length
        const totalVotes = optOneVotes + optTwoVotes
        const optOnePercentage = (optOneVotes / totalVotes) * 100
        const optTwoPercentage = (optTwoVotes / totalVotes) * 100

        return (
            <Container>
                <Row>
                    <Col sm={4}>
                        <Profile/>
                    </Col>
                    <Col sm={8}>
                        <Card style={{width: '38rem'}}>
                            <Card.Header>Asked by {this.props.question.author}</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col xs={3}>
                                        <Image circle className="avatar"
                                               src={this.props.author.avatarURL}/>
                                    </Col>
                                    <Col xs={9}>
                                        <Card.Title>Would You Rather</Card.Title>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item bsStyle={optOne ? 'info' : null}>
                                                {optOne ? <Badge> Your Vote</Badge> : null}
                                                <p>Would you rather {question.optionOne.text} ?</p>
                                                <ProgressBar now={optOnePercentage} label={`${optOnePercentage}%`}/>
                                                <h5>{optOneVotes} out of {totalVotes} votes</h5>
                                            </ListGroup.Item>
                                            <ListGroup.Item bsStyle={optTwo ? 'info' : null}>
                                                {optTwo ? <Badge> Your Vote</Badge> : null}
                                                <p>Would you rather {question.optionTwo.text} ?</p>
                                                <ProgressBar now={optTwoPercentage} label={`${optTwoPercentage}%`}/>
                                                <h5>{optTwoVotes} out of {totalVotes} votes</h5>
                                            </ListGroup.Item>
                                        </ListGroup>
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