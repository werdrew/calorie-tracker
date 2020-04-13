import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import DateSelector from '../date/dateSelector';
import Log from '../table/log';
import ExerciseEntriesDialog from '../dialog/exerciseEntriesDialog';
import ExercisesDialog from '../dialog/exercisesDialog';
import ExerciseLogService from '../../service/activity/ExerciseLogService';
import ExerciseService from '../../service/activity/ExerciseService';
import "./activityPage.css";

export default class ActivityPage extends React.Component {
    constructor(props) {
        super(props);
        this.today = new Date();
        this.state = {
            month: this.today.getMonth() + 1,
            day: this.today.getDate(),
            year: this.today.getYear() + 1900,
            openExercisesDialog: false,
            openEntriesDialog: false,
            rows: []
        };
        this.exerciseLogService = new ExerciseLogService();
        this.exerciseService = new ExerciseService();
    }

    async componentWillMount() {
        const date = `${this.state.month}-${this.state.day}-${this.state.year}`;
        const rowData = await this.exerciseLogService.getLogsForDate(this.props.id, date);
        const calData = await this.exerciseLogService.getTotalCaloriesForDate(this.props.id, date);
        this.setState({ rows: rowData.rows, calories: calData.calories });
    }

    async componentDidUpdate() {
        const date = `${this.state.month}-${this.state.day}-${this.state.year}`;
        const rowData = await this.exerciseLogService.getLogsForDate(this.props.id, date);
        const calData = await this.exerciseLogService.getTotalCaloriesForDate(this.props.id, date);
        if ((this.state.rows.length !== rowData.rows.length) || this.state.justUpdated) {
            this.setState({ rows: rowData.rows, justUpdated: false });
        }
        if (this.state.calories !== calData.calories) {
            this.setState({ calories: calData.calories });
        }
    }

    getHeaders() {
        return ['name', 'minutes_performed', 'calories_lost'];
    }

    getRows() {
        return this.state.rows;
    }

    async onCreateEntry(exerciseLogEntry) {
        exerciseLogEntry.user_id = this.props.id;
        exerciseLogEntry.date = `${this.state.month}-${this.state.day}-${this.state.year}`
        try {
            await this.exerciseLogService.createExerciseLogEntry(this.props.id, exerciseLogEntry);
            this.setState({ createEntrySucceeded: true, justUpdated: true });
        } catch (e) {
            console.log(e);
            this.setState({ createEntrySucceeded: false });
        }
    }

    async onEditEntry(exerciseLogEntry) {
        try {
            await this.exerciseLogService.editExerciseLogEntry(exerciseLogEntry);
            this.setState({ editEntrySucceeded: true, justUpdated: true });
        } catch (e) {
            console.log(e);
            this.setState({ editEntrySucceeded: false });
        }
    }

    async onDeleteEntry(exerciseLogEntry) {
        try {
            await this.exerciseLogService.deleteExerciseLogEntry(exerciseLogEntry);
            this.setState({ deleteEntrySucceeded: true, justUpdated: true })
        } catch (e) {
            console.log(e);
            this.setState({ deleteEntrySucceeded: false })
        }
    }

    async onCreateExercise(exercise) {
        try {
            await this.exerciseService.createExercise(this.props.id, exercise);
            this.setState({ createExerciseSucceeded: true, justUpdated: true });
        } catch (e) {
            console.log(e);
            this.setState({ createExerciseSucceeded: false });
        }
    }

    async onEditExercise(exercise) {
        try {
            await this.exerciseService.editExercise(this.props.id, exercise);
            this.setState({ editExerciseSucceeded: true, justUpdated: true })
        } catch (e) {
            console.log(e);
            this.setState({ editExerciseSucceeded: false })
        }
    }

    async onDeleteExercise(exerciseId) {
        try {
            await this.exerciseService.deleteExercise(this.props.id, exerciseId);
            this.setState({ deleteExerciseSucceeded: true, justUpdated: true });
        } catch (e) {
            console.log(e);
            this.setState({ deleteExerciseSucceeded: false })
        }
    }

    render() {
        return (
            <div id="activityPage">
                <div id="dateSelectorBg">
                    <DateSelector
                        title="Select a date:"
                        onDayChange={day => this.setState({ day })}
                        onMonthChange={month => this.setState({ month })}
                        onYearChange={year => this.setState({ year })}
                    />
                </div>
                <Paper className="paper" id="paperLog" elevation={3}>
                    <div className="buttonRow">
                        <Button 
                            className="button"
                            onClick={() => this.setState({ openExercisesDialog: true })}
                        >
                            View Your Exercises
                        </Button>
                    </div>
                    <Typography variant="h3">
                        Exercise Log
                    </Typography>
                    <Log
                        headers={this.getHeaders()}
                        rows={this.getRows()}
                        />
                    
                    <Typography variant="h6">
                        Calories lost today: {this.state.calories}
                    </Typography>
                    <div className="buttonRow">
                        <Button
                            className="button"
                            onClick={() => this.setState({ openEntriesDialog: true })}
                        >
                            Edit Entries
                        </Button>
                    </div>
                </Paper>

                {this.state.openExercisesDialog &&
                    <ExercisesDialog
                        title={`Your Exercises`}
                        open={this.state.openExercisesDialog}
                        onClose={() => this.setState({ openExercisesDialog: false })}
                        onCreateExercise={this.onCreateExercise.bind(this)}
                        onEditExercise={this.onEditExercise.bind(this)}
                        onDeleteExercise={this.onDeleteExercise.bind(this)}
                        {...this.props}/>
                }

                {this.state.openEntriesDialog &&
                    <ExerciseEntriesDialog
                        title={`Add/Edit Entries`}
                        open={this.state.openEntriesDialog}
                        onClose={() => this.setState({ openEntriesDialog: false })}
                        onCreateEntry={this.onCreateEntry.bind(this)}
                        onEditEntry={this.onEditEntry.bind(this)}
                        onDeleteEntry={this.onDeleteEntry.bind(this)}
                        entries={this.state.rows}
                        {...this.props}/>
                }

            </div>
        )
    }
}