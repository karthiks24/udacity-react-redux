import Loader from 'react-loader-spinner'
import React, {Component} from 'react';

//Loader component for async operations
export default class loader extends Component {
    render() {
        return (
            <div id="login-body">
                <Loader
                    type="Ball-Triangle"
                    color="#FFFF"
                    height="100"
                    width="100"
                />
            </div>
        );
    }
}