import React from 'react';
import { 
    Container,
    FormControlLabel, FormControl, FormLabel, 
    Radio, RadioGroup, InputLabel, Select,
    MenuItem,
    Button, Paper, TextField, Typography 
} from '@material-ui/core'
import { Link } from 'react-router-dom';
import './registerPage.css';

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.today = new Date();
        this.state = {
            username: null,
            password: null,
            sex: 'M',
            month: this.today.getMonth() + 1,
            day: this.today.getDate(),
            year: this.today.getYear() + 1900,
            height: null,
            weight: null
        };
        this.today = new Date();
    }

    render() {
        return (
            <div id="registerPage">
                <Paper className="paper centerHorizontally" elevation={3}>
                    <Typography variant="h3">
                        Register
                    </Typography>

                    <TextField 
                        variant="outlined"
                        label="Username"
                        className="registerField"
                        onChange={e => this.setState({ username: e.target.value })}/>

                    <TextField
                        variant="outlined"
                        label="Password"
                        type="password"
                        className="registerField"
                        onChange={e => this.setState({ password: e.target.value })}/>

                    <FormLabel id='registerFormLabel'>Sex</FormLabel>
                    <RadioGroup id="registerRadioGroup" value={this.state.sex || "M"}>
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

                    <FormLabel id='registerFormLabel'>Date of Birth</FormLabel>
                    <Container id="registerDob">
                        <FormControl className="registerDobFormControl" variant="outlined">
                            <InputLabel id="monthInputLabel">Month</InputLabel>
                                <Select
                                    id="monthDropdown"
                                    value={this.state.month}
                                    onChange={e => this.setState({ month: e.target.value })}
                                    label="Month"
                                    >
                                    {[...Array(12).keys()].map(index => {
                                        return <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                    })}
                                </Select>
                        </FormControl>

                        <FormControl className="registerDobFormControl" variant="outlined">
                            <InputLabel id="dayInputLabel">Day</InputLabel>
                                <Select
                                labelId="dayDropdown"
                                value={this.state.day}
                                onChange={e => this.setState({ day: e.target.value })}
                                label="Day"
                                >
                                {[...Array(31).keys()].map(index => {
                                    return <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                })}
                            </Select>
                        </FormControl>

                        <FormControl className="registerDobFormControl" variant="outlined">
                            <InputLabel id="yearInputLabel">Year</InputLabel>
                                <Select
                                labelId="yearDropdown"
                                value={this.state.year}
                                onChange={e => this.setState({ year: e.target.value })}
                                label="Year"
                                >
                                {[...Array(this.today.getYear() + 1).keys()].map(index => {
                                    return <MenuItem value={index + 1900}>{index + 1900}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Container>

                    <TextField 
                        variant="outlined"
                        label="Height (in inches)"
                        className="registerField"
                        onChange={e => this.setState({ height: e.target.value })}/>

                    <TextField
                        variant="outlined"
                        label="Weight"
                        className="registerField"
                        onChange={e => this.setState({ weight: e.target.value })}/>

                    {this.props.registrationFailed &&
                        <Typography varian="h6" color="error">
                            Registration failed!    
                        </Typography>
                    }

                    <Button
                        id="registerButton"
                        variant="outlined"
                        onClick={() => this.props.onSubmitRegisterButton(this.state)}>
                        Register
                    </Button>

                    <Typography variant="h6">
                        Already have an account? <Link to='/login'>Sign in instead.</Link>
                    </Typography>
                </Paper>
            </div>
        )
    }
}