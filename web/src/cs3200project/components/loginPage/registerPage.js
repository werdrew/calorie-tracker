import React from 'react';
import { 
    FormControlLabel, FormLabel, Radio, RadioGroup,
    Button, Paper, TextField, Typography 
} from '@material-ui/core'
import { Link } from 'react-router-dom';
import DateSelector from '../date/dateSelector';
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

                    <DateSelector
                        title="Date of Birth"
                        onDayChange={day => this.setState({ day })}
                        onMonthChange={month => this.setState({ month })}
                        onYearChange={year => this.setState({ year })}
                    />

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