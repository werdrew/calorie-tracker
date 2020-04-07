import React from 'react';
import { Container, Typography } from '@material-ui/core';
import "./homePage.css"

export default class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="homePage">
                <section id="homePageContent">
                    <Typography className="homePageText" variant="h2">
                        {this.props.loggedIn
                        ? `Hi ${this.props.username}!`
                        : 'Welcome to our site!'
                        }
                    </Typography>
                    <Typography className="homePageText" variant="h6">
                        {this.props.loggedIn
                        ? 'Please click on one of the links above to access this app\'s features.'
                        : 'Please click on one of the links above to login or register for a new account.'
                        }
                    </Typography>
                </section>
            </div>
        )
    }
}