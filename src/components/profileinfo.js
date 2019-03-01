import React, {Component} from 'react'
import { Card, } from 'react-bootstrap'
import {connect} from 'react-redux'

//common component to show the profile info of the logged in user
class Profile extends Component {
    render() {

        return (
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={this.props.avatar}/>
                <Card.Body>
                    <Card.Title>{this.props.username}</Card.Title>
                    <Card.Text>
                        <span>Answered Questions : {this.props.answered}</span>
                        <span> UnAnswered Questions: {this.props.unanswered}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    const loggedUser = state.loggedUser;
    return {
        username: state.users[loggedUser] ? state.users[loggedUser].name : null,
        avatar: state.users[loggedUser] ? state.users[loggedUser].avatarURL : null,
        answered: state.categorizeQuestions.answeredQuestions.length,
        unanswered: state.categorizeQuestions.unansweredquestions.length
    }
}

export default connect(mapStateToProps)(Profile)
