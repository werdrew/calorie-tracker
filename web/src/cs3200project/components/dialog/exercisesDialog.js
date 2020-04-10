import React from 'react';
import { Button, Dialog, DialogTitle, Select, MenuItem, Typography, TextField } from '@material-ui/core';
import ExerciseService from '../../service/activity/ExerciseService';
import "./entriesDialog.css";

export default class ExercisesDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: true,
            selectExistingType: true,
            types: [],
            foodItems: [],
            userCreatedMeals: []
        }
        this.exerciseService = new ExerciseService();
    }

    async componentWillMount() {
        const exerciseTypes = await this.exerciseService.getAllExerciseTypes();
        const userCreatedExercises = await this.exerciseService.getAllExercisesCreatedByUser(this.props.id);
        this.setState({ 
            types: exerciseTypes.types, 
            userCreatedExercises, 
            exerciseToEdit: userCreatedExercises[0] || undefined 
        });
    }

    async componentDidUpdate() {
        const exerciseTypes = await this.exerciseService.getAllExerciseTypes();
        const userCreatedExercises = await this.exerciseService.getAllExercisesCreatedByUser(this.props.id);
        if (this.state.userCreatedExercises.length != userCreatedExercises.length || this.state.justUpdated) {
            this.setState({
                types: exerciseTypes.types,
                userCreatedExercises,
                exerciseToEdit: userCreatedExercises[0] || undefined
            });
        }
    }

    async applyExerciseType() {
        if (!this.state.exerciseType) {
            this.setState({ failedToApplyExerciseType: true })
        }
        else {
            const exerciseItems = await this.exerciseService.getAllExerciseItemsByType(this.state.exerciseType);
            this.setState({ failedToApplyExerciseType: false, exerciseItems: exerciseItems.items });
        };
    }

    async applyExerciseItem() {
        if (!this.state.exerciseItem) {
            this.setState({ failedToApplyExerciseItem: true })
        }
        else {
            const exerciseInfo = await this.exerciseService.getExerciseInfoByName(this.state.exerciseItem.name);
            this.setState({ failedToApplyExerciseItem: false, exerciseInfo: exerciseInfo.info });
        };
    }

    renderAddMode() {
        return (
            <div id="addMode">
                <Typography className="h6-header" variant="h6">
                    {this.state.selectExistingType 
                        ? "Select an existing type:"
                        : "Enter a new type:"
                    }
                </Typography>
                <div className="dialogRow">
                    {this.state.selectExistingType
                        ? <Select 
                            value={this.state.types[0]}
                            onChange={e => this.setState({ exerciseType: e.target.value })}>
                                {this.state.types.map(type => {
                                    return <MenuItem value={type}>{type}</MenuItem>
                                })}
                        </Select>
                        : <TextField 
                            variant="outlined"
                            label="Type"
                            onChange={e => this.setState({ exerciseType: e.target.value })}/>
                    }
                    <Button
                        className="button"
                        onClick={() => this.setState({ selectExistingType: !this.state.selectExistingType })}>
                        {this.state.selectExistingType
                            ? "Enter New Type"
                            : "Select Existing Type"}
                    </Button> 
                </div>
                {this.state.exerciseType &&
                    <div>
                        <Typography className="h6-header" variant="h6">
                            Exercise name:
                        </Typography>
                        <TextField 
                            variant="outlined"
                            label="Name"
                            onChange={e => this.setState({ exerciseName: e.target.value })}/>
                    </div>
                }
                {this.state.exerciseName &&
                    <div>
                        <div className="dialogRow">
                            <TextField 
                                variant="outlined"
                                label="Calories burned per 60 minutes of exercise @ 130lb"
                                onChange={e => this.setState({ calsBurnedAt130lb: e.target.value })}/>
                        </div>   
                        <div className="dialogRow">
                            <TextField 
                                variant="outlined"
                                label="Calories burned per 60 minutes of exercise @ 155lb"
                                onChange={e => this.setState({ calsBurnedAt155lb: e.target.value })}/>
                        </div>
                        <div className="dialogRow">
                            <TextField 
                                variant="outlined"
                                label="Calories burned per 60 minutes of exercise @ 180lb"
                                onChange={e => this.setState({ calsBurnedAt180lb: e.target.value })}/>
                        </div>   
                        <div className="dialogRow">
                            <TextField 
                                variant="outlined"
                                label="Calories burned per 60 minutes of exercise @ 205lb"
                                onChange={e => this.setState({ calsBurnedAt205lb: e.target.value })}/>
                        </div>   
                    </div>   
                }
                <Button
                    className="button"
                    onClick={() => this.props.onCreateExercise({
                        type: this.state.exerciseType,
                        name: this.state.exerciseName,
                        calsBurnedAt130lb: this.state.calsBurnedAt130lb,
                        calsBurnedAt155lb: this.state.calsBurnedAt155lb,
                        calsBurnedAt180lb: this.state.calsBurnedAt180lb,
                        calsBurnedAt205lb: this.state.calsBurnedAt205lb
                    })}
                    disabled={!this.state.exerciseType
                        && !this.state.exerciseName
                        && !this.state.calsBurnedAt130lb
                        && !this.state.calsBurnedAt155lb
                        && !this.state.calsBurnedAt180lb
                        && !this.state.calsBurnedAt205lb
                    }>
                    Create Exercise
                </Button>
            </div>
        );
    }

    renderEditMode() {
        return (
            <div id="editMode">
                <div className="dialogRow">
                    <Typography className="h6-header" variant="h6">
                        Select which exercise to edit:
                    </Typography>
                    <Select 
                        value={this.state.exerciseToEdit || this.state.userCreatedExercises[0]}
                        onChange={e => this.setState({ exerciseToEdit: e.target.value })}>
                        {this.state.userCreatedExercises.map(exercise => {
                            return <MenuItem value={exercise}>{exercise.name}</MenuItem>
                        })}
                    </Select>
                </div>
                {this.state.exerciseToEdit &&
                    <div className="dialogRow">
                    <TextField 
                        variant="outlined"
                        label="Name"
                        onChange={e => {
                            const newName = e.target.value;
                            const editedExercise = {...this.state.editedExercise};
                            editedExercise.name = newName;
                            this.setState({ editedExercise });
                        }}/>
                    <TextField 
                        variant="outlined"
                        label="Type"
                        onChange={e => {
                            const newType = e.target.value;
                            const editedExercise = {...this.state.editedExercise};
                            editedExercise.type = newType;
                            this.setState({ editedExercise });
                        }}/>
                        <TextField
                            variant="outlined"
                            label="Cals burned at 130lb"
                            onChange={e => {
                                const newCalsBurned = e.target.value;
                                const editedExercise = {...this.state.editedExercise};
                                editedExercise.calsBurnedAt130lb = newCalsBurned;
                                this.setState({ editedExercise });
                            }}/>
                        <TextField
                            variant="outlined"
                            label="Cals burned at 155lb"
                                onChange={e => {
                                    const newCalsBurned = e.target.value;
                                    const editedExercise = {...this.state.editedExercise};
                                    editedExercise.calsBurnedAt155lb = newCalsBurned;
                                    this.setState({ editedExercise });
                                }}/>
                        <TextField
                            variant="outlined"
                            label="Cals burned at 180lb"
                            onChange={e => {
                                const newCalsBurned = e.target.value;
                                const editedExercise = {...this.state.editedExercise};
                                editedExercise.calsBurnedAt180lb = newCalsBurned;
                                this.setState({ editedExercise });
                            }}/>
                        <TextField 
                            variant="outlined"
                            label="Cals burned at 205lb"
                            onChange={e => {
                                const newCalsBurned = e.target.value;
                                const editedExercise = {...this.state.editedExercise};
                                editedExercise.calsBurnedAt205lb = newCalsBurned;
                                this.setState({ editedExercise });
                            }}/>
                    </div>
                }
                <div className="buttonRow">
                    <Button
                        className="button"
                        onClick={() => this.props.onEditExercise({ 
                            id: this.state.exerciseToEdit.id, 
                            ...this.state.editedExercise
                        })}
                        disabled={
                            !this.state.editedExercise
                            || !this.state.editedExercise.name
                            || !this.state.editedExercise.type
                            || !this.state.editedExercise.calsBurnedAt130lb
                            || !this.state.editedExercise.calsBurnedAt155lb
                            || !this.state.editedExercise.calsBurnedAt180lb
                            || !this.state.editedExercise.calsBurnedAt205lb
                        }>
                        Edit
                    </Button>
                    <Button
                        className="button"
                        onClick={() => this.props.onDeleteExercise(this.state.exerciseToEdit.id)}
                        disabled={!this.state.exerciseToEdit}>
                        Delete
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
                : this.renderEditMode()}
            <div className="buttonRow">
                <Button
                    className="button"
                    onClick={() => this.props.onClose()}>
                    Close
                </Button>
            </div>
            <Button
                    className="button"
                    onClick={() => {
                        this.setState({
                            addMode: !this.state.addMode,
                            selectExistingType: true,
                            exerciseType: undefined,
                            exerciseName: undefined
                        })
                    }}>
                    {this.state.addMode ? "Enter Edit Mode" : "Enter Add Mode"}
            </Button>
        </Dialog>

        );
    }
}