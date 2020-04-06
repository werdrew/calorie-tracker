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
                        Welcome to our site {this.props.username}!
                    </Typography>
                    <Typography className="homePageText" variant="h6">
                        Please click on one of the links above to access this app's features.
                    </Typography>
                </section>
            </div>
        )
    }
}