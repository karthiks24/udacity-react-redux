import React, {Component} from 'react'
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap'
import Profile from './profileinfo'
import {Redirect} from 'react-router-dom'
import {addQuestion} from '../redux/actions/questionActions'
import {connect} from 'react-redux'

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
        disabled: true,
        toHome: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }, () => {
            this.state.optionOne && this.state.optionTwo
                ? this.setState({disabled: false})
                : this.setState({disabled: true})
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addQuestion(this.props.loggedUser, this.state.optionOne, this.state.optionTwo)
        this.setState({
            optionOne: '',
            optionTwo: '',
            disabled: true,
            toHome: true
        })
    }

    render() {
        return (
            this.state.toHome ? <Redirect to='/'/> :
                <Container>
                    <Row>
                        <Col sm={4}>
                            <Profile/>
                        </Col>
                        <Col sm={8}>
                        <h2>Challenge Your Buddy..!</h2>
                            <Card style={{width: '38rem'}}>
                                <Card.Header>Create New Question</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Label>Would you rather..</Form.Label>
                                        <Form.Control id="optionOne" size="lg" type="text" placeholder="Enter Your First Option"
                                                      onChange={this.handleChange}/>
                                        <Form.Label>OR</Form.Label>
                                        <Form.Control id="optionTwo" size="lg" type="text" placeholder="Enter Your Second Option"
                                                      onChange={this.handleChange}/>
                                        <br/>
                                        <Button className='signIn-button'
                                                disabled={this.state.disabled}
                                                type="submit" bsstyle="success">
                                            Add Question
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {loggedUser: state.loggedUser}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addQuestion: (author, optionOne, optionTwo) => dispatch(addQuestion(author, optionOne, optionTwo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)