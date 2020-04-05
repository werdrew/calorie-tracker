import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './components/loginPage/loginPage';
import RegisterPage from './components/loginPage/registerPage';
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
        /* TODO: Call a service to checek the info against DB. */
        this.setState({
            loggedIn: true,
            username: info.username
        });
    }

    onSubmitRegisterButton(info) {
        /* TODO: Call a service to create a record for the user
        and do data validation. */

        this.setState({
            loggedIn: true,
            username: info.username
        })
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/register'>
                        {this.state.loggedIn
                            ? <Redirect to='/'/>
                            : <RegisterPage
                            onSubmitRegisterButton={this.onSubmitRegisterButton.bind(this)}/>
                        }
                    </Route>
                    <Route path='/'>
                        {this.state.loggedIn
                        ? <HomePage 
                            username={this.state.username}/>
                        : <LoginPage 
                            onSubmitLoginButton={this.onSubmitLoginButton.bind(this)}/>}
                    </Route>
                </Switch>
            </div>
        );
    }
}   