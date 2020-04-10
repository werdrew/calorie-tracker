import React from 'react';
import { Button, Dialog, DialogTitle, Select, MenuItem, Typography, TextField } from '@material-ui/core';
import ExerciseService from '../../service/activity/ExerciseService';
import "./entriesDialog.css";

export default class ExerciseEntriesDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            addMode: true,
            types: [],
            exerciseItems: [],
            minutesSpentExercising: 0
        }
        this.exerciseService = new ExerciseService();
    }

    async componentWillMount() {
        const exerciseTypes = await this.exerciseService.getAllExerciseTypes();
        this.setState({ types: exerciseTypes.types } );
    }

    async applyExerciseType() {
        if (!this.state.selectedType) {
            this.setState({ failedToApplyExerciseType: true })
        }
        else {
            const exerciseItems = await this.exerciseService.getAllExerciseItemsByType(this.state.selectedType);
            this.setState({ failedToApplyExerciseType: false, exerciseItems: exerciseItems.items });
        };
    }

    async applyExerciseItem() {
        if (!this.state.selectedExerciseItem) {
            this.setState({ failedToApplyExerciseItem: true });
        } else {
            const exerciseInfo = await this.exerciseService.getExerciseInfo(this.state.selectedExerciseItem.id);
            console.log(exerciseInfo);
            this.setState({ exerciseInfo: exerciseInfo.entry }, () => {
                this.setState({ failedToApplyExerciseItem: false, exerciseSelected: true })
            });
        }
    }

    async addEntry() {

    }

    renderAddMode() {
        return (
            <div id="addMode">
                <Typography className="h6-header" variant="h6">Select an exercise type:</Typography>
                <div className="dialogRow">
                    <Select 
                        value={this.state.selectedType || this.state.types[0]}
                        onChange={e => this.setState({ selectedType: e.target.value })}>
                            {this.state.types.map(type => {
                                return <MenuItem value={type}>{type}</MenuItem>
                            })}
                    </Select>
                    <Button
                            className="button"
                            onClick={() => this.applyExerciseType()}>
                            Apply
                    </Button>
                </div>
                
                <Typography className="h6-header" variant="h6">Select an exercise:</Typography>
                <div className="dialogRow">
                    <Select 
                        value={this.state.selectedExerciseItem || this.state.exerciseItems[0]}
                        onChange={e => this.setState({ selectedExerciseItem: e.target.value })}>
                            {this.state.exerciseItems.map(item => {
                                return <MenuItem value={item}>{item.name}</MenuItem>
                            })}
                    </Select>
                    <Button
                            className="button"
                            onClick={() => this.applyExerciseItem()}>
                            Apply
                    </Button>
                </div>

                {this.state.exerciseSelected &&
                    <div className="exerciseInfoSection">
                        <div className="dialogRow exerciseInfo">
                        <text className="text">{this.state.exerciseInfo.at_130_lb} calories burned @ 130 lb</text>
                        <text className="text">{this.state.exerciseInfo.at_155_lb} calories burned @ 155 lb</text>
                        <text className="text">{this.state.exerciseInfo.at_180_lb} calories burned @ 180 lb</text>
                        <text className="text">{this.state.exerciseInfo.at_205_lb} calories burned @ 205 lb</text>
                        </div>

                        <div className="dialogColumn">
                            <Typography className="h6-header" variant="h6">
                                Number of minutes spent exercising:
                            </Typography>                     
                        </div>
                        <div className="dialogRow">
                            <TextField
                                variant="outlined"
                                onChange={e => this.setState({ minutesSpentExercising: e.target.value })}/>
                        </div>
                    </div>
                }

                <Button
                    className="button"
                    onClick={() => this.props.onCreateEntry({
                        exercise_id: this.state.exerciseInfo.exercise_id,
                        minutes_performed: this.state.minutesSpentExercising
                    })}
                    disabled={!this.state.minutesSpentExercising}>
                    Add Entry
                </Button>
            </div>
        );
    }

    renderEditMode() {
        return (
            <div id="editMode">
                <Typography className="h6-header" variant="h6">Select an entry to edit:</Typography>
                <div className="dialogRow">
                    <Select
                        onChange={e => this.setState({ entryToEdit: e.target.value })}>
                            {this.props.entries.map(entry => {
                                console.log(entry);
                                return <MenuItem value={entry}>{entry.name}</MenuItem>
                            })}
                    </Select>
                </div>
                { this.state.entryToEdit &&
                    <div className="dialogRow">
                        <div className="dialogColumn">
                            <Typography className="h6-header" variant="h6">
                                Number of minutes spent exercising:
                            </Typography>
                            <div className="dialogRow">
                            <TextField
                                variant="outlined"
                                onChange={e => {
                                    const updatedEntry = {...this.state.entryToEdit};
                                    updatedEntry.minutes_performed = e.target.value;
                                    this.setState({ entryToEdit: updatedEntry });
                                }}/>
                            </div>                      
                        </div>
                    </div>
                }
                <div className="buttonRow">
                    <Button
                        className="button"
                        onClick={() => this.props.onEditEntry(this.state.entryToEdit)}
                        disabled={!this.state.entryToEdit}>
                        Edit Entry
                    </Button>
                    <Button
                        className="button"
                        onClick={() => this.props.onDeleteEntry(this.state.entryToEdit)}
                        disabled={!this.state.entryToEdit}>
                        Delete Entry
                    </Button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Dialog className="formDialog" open={this.props.open}>
                <DialogTitle>
                    {this.props.title}    
                </DialogTitle>
                {this.state.addMode 
                    ? this.renderAddMode()
                    : this.renderEditMode()
                }
                {this.state.failedToApplyExerciseType &&
                    <Typography variant="h5" color="error">Please select an exercise type.</Typography>}
                {this.state.failedToApplyExerciseItem &&
                    <Typography variant="h5" color="error">Please select an exercise.</Typography>}
                <div className="buttonRow">
                    <Button
                        className="button"
                        onClick={() => this.props.onClose()}>
                        Close
                    </Button>
                </div>
                <Button
                        className="button"
                        onClick={() => this.setState({ 
                            addMode: !this.state.addMode,
                            entryToEdit: undefined,
                            exerciseSelected: undefined,
                            selectedType: undefined,
                            selectedExerciseItem: undefined })}>
                        {this.state.addMode ? "Enter Edit Mode" : "Enter Add Mode"}
                </Button>
            </Dialog>
        )
    }
}