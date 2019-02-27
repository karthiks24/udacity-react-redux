import React, {Component, Fragment} from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {connect} from 'react-redux'
import {logoutUser} from '../redux/actions/loggedUserAction'
import {Link} from 'react-router-dom'
class Navigation extends Component {

    logout = () => {
        this.props.logoutUser()
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Link to="/">Home</Link>
                            <Link to="/add">New Question</Link>
                            <Link to="/leaderboard">Leaderboard</Link>
                        </Nav>
                        <Navbar.Toggle/>
                        {this.props.username &&
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Hello, {this.props.username}!
                            </Navbar.Text>
                            <Nav.Link href="/" onClick={this.logout}>LogOut</Nav.Link>
                        </Navbar.Collapse>}
                    </Navbar.Collapse>
                </Navbar>
                <hr/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const loggedUser = state.loggedUser;
    return {
        loggedUser: loggedUser,
        username: state.users[loggedUser] ? state.users[loggedUser].name : null,
        avatar: state.users[loggedUser] ? state.users[loggedUser].avatarURL : null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation)