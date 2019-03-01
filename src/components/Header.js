import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {connect} from 'react-redux'
import {logoutUser} from '../redux/actions/loggedUserAction'
import {Link} from 'react-router-dom'

const logout = () => {
    this.props.logoutUser()
}

const Navigation = (props) => {
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
                    {props.username &&
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Hello, {props.username}!
                        </Navbar.Text>
                        <Nav.Link href="/" onClick={logout}>LogOut</Nav.Link>
                    </Navbar.Collapse>}
                </Navbar.Collapse>
            </Navbar>
            <hr/>
        </div>
    )

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