import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Button, TextField, Typography } from '@material-ui/core'
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
                        className="loginField"
                        onChange={e => this.setState({ password: e.target.value })}/>

                    <Button
                        id="loginButton"
                        onClick={() => this.props.onSubmitLoginButton(this.state)}>
                        Login
                    </Button>

                    <Typography variant="h6">
                        Don't have an account? Register here.
                    </Typography>
                </Paper>
            </div>
        )
    }
}