import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {loggedUser} from '../redux/actions/loggedUserAction'
import {categorizeQuestions} from '../redux/actions/questionActions'
import { Form, Button, Image} from 'react-bootstrap'
import image from '../signin.png'

class signIn extends Component {
    state = {
        loggedUser: null,
        disable: true
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.setLoggedUser(this.state.loggedUser)
        this.props.categorizeQuestions(this.props.questions,this.state.loggedUser, this.props.user)
    }

    handleChange = (e) => {
        this.setState({
                loggedUser: e.target.value
            }, () => {
                if (this.state.loggedUser) {
                    this.setState({
                        disable: false
                    })
                }
            }
        )
    }

    render() {
        return (
            <div className="login-container">
                <Image className='sign-icon' src={image} rounded />
               <div id='login-body'>
                   <Form id='login-elements' controlid="exampleForm.ControlSelect1" onSubmit={this.handleSubmit}>
                       <Form.Control as="select" onChange={this.handleChange}>
                           <option hidden value="default">Select a user...</option>
                           {(this.props.users).map((user) => (
                               <option key={user.id} value={user.id}>
                                   {user.name}
                               </option>
                           ))}}
                       </Form.Control>
                       <Button className='signIn-button'
                               disabled={this.state.disable}
                               type="submit">
                           Sign In
                       </Button>
                   </Form>
               </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: Object.values(state.users),
        questions: state.questions,
        user: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoggedUser: (id) => dispatch(loggedUser(id)),
        categorizeQuestions: (questions,loggeduser,users) => dispatch(categorizeQuestions(questions,loggeduser,users))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (signIn);
