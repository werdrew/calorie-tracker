import React from 'react';
import { 
    Button,
    Container, FormControl, InputLabel,
    Select, MenuItem, Radio,
    Paper, Typography, TextField,
    FormLabel, RadioGroup, FormControlLabel
} from '@material-ui/core';
import UserService from '../../service/auth/UserService';

import "./profilePage.css";

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profileLoadFailed: false
        }
        this.userService = new UserService();
        this.today = new Date();
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
                        {this.props.username}'s Profile ({this.state.age} years old)
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

                    <FormLabel class="profileText">Date of Birth</FormLabel>
                    <Container id="profileDob">
                        <FormControl className="profileField profileDobForm" variant="outlined">
                            <InputLabel id="monthInputLabel">Month</InputLabel>
                                <Select
                                    id="monthDropdown"
                                    value={parseInt(this.state.month)}
                                    onChange={e => this.setState({ month: e.target.value })}
                                    label="Month"
                                >
                                    {[...Array(12).keys()].map(index => {
                                        return <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                    })}
                                </Select>
                        </FormControl>

                        <FormControl className="profileField profileDobForm" variant="outlined">
                            <InputLabel id="dayInputLabel">Day</InputLabel>
                                <Select
                                labelId="dayDropdown"
                                value={parseInt(this.state.day)}
                                onChange={e => this.setState({ day: e.target.value })}
                                label="Day"
                                >
                                {[...Array(31).keys()].map(index => {
                                    return <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                })}
                            </Select>
                        </FormControl>

                        <FormControl className="profileField profileDobForm" variant="outlined">
                            <InputLabel id="yearInputLabel">Year</InputLabel>
                                <Select
                                labelId="yearDropdown"
                                value={parseInt(this.state.year)}
                                onChange={e => this.setState({ year: e.target.value })}
                                label="Year"
                                >
                                {[...Array(this.today.getYear() + 1).keys()].map(index => {
                                    return <MenuItem value={index + 1900}>{index + 1900}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Container>

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