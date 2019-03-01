import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card} from 'react-bootstrap'

class LeaderBoard extends Component {

    render() {
        return (
            <div>
                <h2>Know You score!!</h2>
                <div className='flex'>
                    {this.props.leaders.map((leader) => (
                        <Card key={leader.name} style={{width: '18rem'}}>
                            <Card.Img variant="top" src={leader.avatarURL}/>
                            <Card.Body>
                                <Card.Title>{leader.name}</Card.Title>
                                <Card.Text>
                                    <span>Answered Questions : {(Object.keys(leader.answers)).length}</span>
                                </Card.Text>
                                <Card.Text>
                                    <span> Created Questions: {leader.questions.length}</span>
                                </Card.Text>
                                <Card.Text>
                                    <span> score: {(Object.keys(leader.answers)).length + leader.questions.length}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>)

    }
}


const mapStateToProps = (state) => {
    const sortedLeaders = (Object.values(state.users)).sort((a, b) => {
        const aRank = (Object.keys(a.answers)).length + a.questions.length
        const bRank = (Object.keys(b.answers)).length + b.questions.length
        return bRank - aRank
    })
    const loggedUser = state.loggedUser
    return {
        loggedUser,
        leaders: sortedLeaders
    }
}

export default connect(mapStateToProps)(LeaderBoard);