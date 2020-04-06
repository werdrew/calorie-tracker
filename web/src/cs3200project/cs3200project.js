import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './components/loginPage/loginPage';
import RegisterPage from './components/loginPage/registerPage';
import UserService from './service/auth/UserService';
import HomePage from './components/home/homePage';
import './cs3200project.css';

export default class CS3200Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: undefined,
            loginFailed: false
        };
        this.userService = new UserService();
    }

    async onSubmitLoginButton(info) {
        try {
            const data = await this.userService.login(info.username, info.password);
            const loggedIn = data.success;
            if (loggedIn) {
                this.setState({
                    loggedIn: true,
                    username: info.username
                });
            }
            else {
                this.setState({
                    loginFailed: true
                });
            }
        } catch (e) {
            console.error(`Failed to log in! ${e}`);
        }
    }

    async onSubmitRegisterButton(info) {
        // try {
        //     await UserService.register(info.username, info.password);
        //     this.setState({
        //         loggedIn: true,
        //         username: info.username
        //     });
        // } catch (e) {
        //     console.error(`Failed to register user! ${e}`);
        // }
    }

    render() {
        return (
            <div>
                <AppBar color="inherit" position="static">
                    <Toolbar>
                        <Typography color="textPrimary" variant="h6">
                            CS3200 Project
                        </Typography>
                        {this.state.loggedIn &&
                            <div>
                                <Link className="appBarLink" to={`/${this.state.username}/food`}>Food Log</Link>
                                <Link className="appBarLink" to={`/${this.state.username}/activity`}>Activity Log</Link>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
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
                            onSubmitLoginButton={this.onSubmitLoginButton.bind(this)}
                            loginFailed={this.state.loginFailed}/>}
                    </Route>
                </Switch>
            </div>
        );
    }
}   