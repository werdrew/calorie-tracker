import React from 'react';
import { 
    Button,
    Container, FormControl, InputLabel,
    Select, MenuItem, Radio,
    Paper, Typography, TextField,
    FormLabel, RadioGroup, FormControlLabel
} from '@material-ui/core';
import DateSelector from '../date/dateSelector';
import UserService from '../../service/auth/UserService';

import "./profilePage.css";

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profileLoadFailed: false
        }
        this.userService = new UserService();
    }

    async componentWillMount() {
        const userInfo = await this.userService.getUser(this.props.username)
            .then(res => { return res; })
            .catch(e => console.error(`Error retrieving profile info for user! ${e.message}`));
        if (userInfo.success) {
            const { username, password, sex, year, month, day, age, height, weight } = userInfo.results;
            this.setState({
                username,
                password,
                sex,
                year,
                month,
                day,
                age,
                height,
                weight
            });
        }
        else {
            console.log(userInfo.err);
            this.setState({ profileLoadFailed: true });
        }
    }

    async onUpdateProfile() {
        const response = await this.userService.updateUser(this.state)
            .then(res => { return res; })
            .catch(e => console.error(`Error updating profile info for user! ${e.message}`));
        console.log(response);    
        if (response.success) {
            this.setState({ profileUpdated: true })
            console.log(`Profile for ${this.state.username} updated`);
        } else {
            console.log(`Failed to update user: ${response.err}`);
        }
    }

    render() {
        return (
            <div id="profilePage">
                <Paper className="paper centerHorizontally" elevation={3}>
                    <Typography variant="h3">
                        {this.props.username}'s Profile
                    </Typography>

                    <FormLabel className="profileText">Sex</FormLabel>
                    <RadioGroup className="profileField" value={this.state.sex || "M"}>
                        <FormControlLabel
                            control={<Radio color="primary" />}
                            label="Male"
                            labelPlacement="end"
                            value="M"
                            onChange={e => this.setState({ sex: 'M' })}
                        />
                        <FormControlLabel
                        control={<Radio color="primary" />}
                        label="Female"
                        labelPlacement="end"
                        value="F"
                        onChange={e => this.setState({ sex: 'F' })}
                        />
                    </RadioGroup>

                    <DateSelector
                        title="Date of Birth"
                        onDayChange={day => this.setState({ day })}
                        onMonthChange={month => this.setState({ month })}
                        onYearChange={year => this.setState({ year })}
                        initialValue={{
                            day: parseInt(this.state.day),
                            month: parseInt(this.state.month),
                            year: parseInt(this.state.year)
                        }}
                    />

                    <FormLabel className="profileText">Height</FormLabel>
                    <TextField 
                        variant="outlined"
                        value={this.state.height}
                        className="profileField-small"
                        onChange={e => this.setState({ height: e.target.value })}/>

                    <FormLabel className="profileText">Weight</FormLabel>
                    <TextField
                        variant="outlined"
                        value={this.state.weight}
                        className="profileField-small"
                        onChange={e => this.setState({ weight: e.target.value })}/>       
                        
                    { this.state.profileUpdated &&
                        <Typography variant="h6" color="primary">
                            Profile updated!
                        </Typography>}

                    { this.state.profileLoadFailed &&
                        <Typography variant="h6" color="error">
                            Profile failed to load! Please try again.    
                        </Typography>
                    }

                    <Button
                        id="updateButton"
                        variant="outlined"
                        onClick={() => this.onUpdateProfile()}>
                        Update
                    </Button>
                </Paper>
            </div>
        )
    }
}