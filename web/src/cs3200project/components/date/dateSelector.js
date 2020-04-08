import React from 'react';
import {
    FormLabel, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import './dateSelector.css';

export default class DateSelector extends React.Component {
    constructor(props) {
        super(props)
        this.today = new Date();
        this.state = {
            month: this.today.getMonth() + 1,
            day: this.today.getDate(),
            year: this.today.getYear() + 1900
        };
    }

    onDayChange(e) {
        this.setState({
            day: e.target.value
        });
        this.props.onDayChange(e.target.value);
    }

    onMonthChange(e) {
        this.setState({
            month: e.target.value
        });
        this.props.onMonthChange(e.target.value);
    }

    onYearChange(e) {
        this.setState({
            year: e.target.value
        });
        this.props.onYearChange(e.target.value);
    }

    render() {
        console.log(this.props);
        return (
            <div id='dateSelector'>
                <FormLabel id='dateSelectorTitle'>{this.props.title}</FormLabel>
                <div id='dateSelectorForms'>
                    <FormControl className="dateSelectorFormControl" variant="outlined">
                        <InputLabel className="dateSelectorInputLabel">Month</InputLabel>
                        <Select
                            id="monthDropdown"
                            value={this.props.initialValue.month || this.state.month}
                            onChange={e => this.onMonthChange(e)}
                            label="Month"
                            >
                            {[...Array(12).keys()].map(index => {
                                return <MenuItem value={index + 1}>{index + 1}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl className="dateSelectorFormControl" variant="outlined">
                        <InputLabel className="dateSelectorInputLabel">Day</InputLabel>
                        <Select
                            labelId="dayDropdown"
                            value={this.props.initialValue.day || this.state.day}
                            onChange={e => this.onDayChange(e)}
                            label="Day"
                            >
                            {[...Array(31).keys()].map(index => {
                                return <MenuItem value={index + 1}>{index + 1}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl className="dateSelectorFormControl" variant="outlined">
                        <InputLabel className="dateSelectorInputLabel">Year</InputLabel>
                        <Select
                            labelId="yearDropdown"
                            value={this.props.initialValue.year || this.state.year}
                            onChange={e => this.onYearChange(e)}
                            label="Year"
                            >
                            {[...Array(this.today.getYear() + 1).keys()].map(index => {
                                return <MenuItem value={index + 1900}>{index + 1900}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
        )
    }
}