import React from 'react';
import LoginPage from './components/loginPage/loginPage';
import HomePage from './components/home/homePage'
import './cs3200project.css'

export default class CS3200Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: undefined
        }
    }

    onSubmitLoginButton(info) {
        const username = info.username;
        const password = info.password;
        this.setState({
            loggedIn: true,
            username
        });
    }

    render() {
        return (
            <div>
                {this.state.loggedIn
                    ? <HomePage username={this.state.username}/>
                    : <LoginPage onSubmitLoginButton={this.onSubmitLoginButton.bind(this)}/>}
            </div>
        );
    }
}   