import React from 'react';
import { Typography } from '@material-ui/core';
import StatisticsService from '../../service/StatisticsService';
import "./homePage.css"

export default class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.today = new Date();
        this.statisticsService = new StatisticsService();
        this.state = ({
            netCalories: 0
        })
    }

    async componentWillMount() {
        const formattedDate = `${this.today.getYear() + 1900}-0${this.today.getMonth() + 1}-${this.today.getDate()}`
        const response = await this.statisticsService.getNetCaloriesForToday(this.props.id, formattedDate);
        this.setState({ netCalories: response ? response.netCalories : this.state.netCalories });
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
                        ? `Your net calories for today (calories in - calories out - basal metabolic rate) are: ${this.state.netCalories}.`
                        : 'Please click on one of the links above to login or register for a new account.'
                        }
                    </Typography>
                </section>
            </div>
        )
    }
}