import React from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './loginPage.css';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            password: undefined
        }
    }

    render() {
        return (
            <div id="loginPage">
                <Paper className="paper centerHorizontally" elevation={3}>
                    <Typography variant="h3">
                        Login
                    </Typography>

                    <TextField 
                        variant="outlined"
                        label="Username"
                        className="loginField"
                        onChange={e => this.setState({ username: e.target.value })}/>

                    <TextField
                        variant="outlined"
                        label="Password"
                        type="password"
                        className="loginField"
                        onChange={e => this.setState({ password: e.target.value })}/>

                    <Button
                        id="loginButton"
                        variant="outlined"
                        onClick={() => this.props.onSubmitLoginButton(this.state)}>
                        Login
                    </Button>

                    {this.props.loginFailed &&
                        <Typography varian="h6" color="error">
                            Login failed!    
                        </Typography>
                    }

                    <Typography variant="h6">
                        Don't have an account? <Link to='/register'>Register today.</Link>
                    </Typography>
                </Paper>
            </div>
        )
    }
}