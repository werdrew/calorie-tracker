import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './components/loginPage/loginPage';
import RegisterPage from './components/loginPage/registerPage';
import UserService from './service/auth/UserService';
import HomePage from './components/home/homePage';
import ProfilePage from './components/profile/profilePage'
import NutritionPage from './components/nutrition/nutritionPage';
import ActivityPage from './components/activity/activityPage';
import './cs3200project.css';

export default class CS3200Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: undefined,
            loginFailed: false,
            registrationFailed: false
        };
        this.userService = new UserService();
    }

    async onSubmitLoginButton(formData) {
        try {
            const data = await this.userService.login(formData);
            const loggedIn = data.success;
            if (loggedIn) {
                this.setState({
                    loggedIn: true,
                    username: formData.username
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

    async onSubmitRegisterButton(formData) {
        try {
            const data = await this.userService.register(formData);
            const registered = data.success;
            if (registered) {
                this.setState({
                    loggedIn: true,
                    username: formData.username
                });
            }
            else {
                this.setState({
                    registrationFailed: true
                });
            }
        } catch (e) {
            console.error(`Failed to log in! ${e}`);
        }
    }

    render() {
        return (
            <div>
                <AppBar color="inherit" position="static">
                    <Toolbar>
                        <Typography color="textPrimary" variant="h6">
                            CS3200 Project
                        </Typography>
                        {this.state.loggedIn
                            ? <div>
                                <Link className="appBarLink" to={`/home`}>Home</Link>
                                <Link className="appBarLink" to={`/profile`}>Profile</Link>
                                <Link className="appBarLink" to={`/nutrition`}>Nutrition</Link>
                                <Link className="appBarLink" to={`/activity`}>Activity</Link>
                            </div>
                            : <div>
                                <Link className="appBarLink" to={`/login`}>Login</Link>
                                <Link className="appBarLink" to={`/register`}>Register</Link>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route path='/register'>
                        {this.state.loggedIn
                            ? <Redirect to='/home'/>
                            : <RegisterPage
                                onSubmitRegisterButton={this.onSubmitRegisterButton.bind(this)}
                                registrationFailed={this.state.registrationFailed}/>
                        }
                    </Route>
                    <Route path='/login'>
                        {this.state.loggedIn
                            ? <Redirect to='/home'/>
                            : <LoginPage 
                                onSubmitLoginButton={this.onSubmitLoginButton.bind(this)}
                                loginFailed={this.state.loginFailed}/>
                        }                    
                    </Route>
                    <Route path='/home'>
                        {this.state.loggedIn
                            ? <HomePage 
                                username={this.state.username}
                                loggedIn={this.state.loggedIn}/>
                            : <Redirect to='/login'/>
                        }
                    </Route>
                    <Route path={`/profile`}>
                        {this.state.loggedIn
                            ? <ProfilePage 
                                username={this.state.username}/>
                            : <Redirect to='/login'/>
                        }
                    </Route>
                    <Route path={'/nutrition'}>
                    {this.state.loggedIn
                            ? <NutritionPage 
                                username={this.state.username}/>
                            : <Redirect to='/login'/>
                        }
                    </Route>
                    <Route path={'/activity'}>
                    {this.state.loggedIn
                            ? <ActivityPage 
                                username={this.state.username}/>
                            : <Redirect to='/login'/>
                        }
                    </Route>
                    <Route path='/'>
                        <HomePage
                            username={this.state.username}
                            loggedIn={this.state.loggedIn}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}   