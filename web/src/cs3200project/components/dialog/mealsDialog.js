import React from 'react';
import { Button, Dialog, DialogTitle, Select, MenuItem, Typography, TextField } from '@material-ui/core';
import FoodService from '../../service/nutrition/FoodService';
import "./entriesDialog.css";

export default class MealsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: true,
            selectExistingType: true,
            types: []
        }
        this.foodService = new FoodService();
    }

    async componentWillMount() {
        const foodTypes = await this.foodService.getAllFoodTypes();
        this.setState({ types: foodTypes.types } );
    }

    renderAddMode() {
        return (
            <div className="addMode">
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
                            onChange={e => this.setState({ foodType: e.target.value })}>
                                {this.state.types.map(type => {
                                    return <MenuItem value={type}>{type}</MenuItem>
                                })}
                        </Select>
                        : <TextField 
                            variant="outlined"
                            label="Type"
                            onChange={e => this.setState({ foodType: e.target.value })}/>
                    }
                    <Button
                        className="button"
                        onClick={() => this.setState({ selectExistingType: !this.state.selectExistingType })}>
                        {this.state.selectExistingType
                            ? "Enter New Type"
                            : "Select Existing Type"}
                    </Button> 
                </div>
                {this.state.foodType &&
                    <div>
                        <Typography className="h6-header" variant="h6">
                            Food name:
                        </Typography>
                        <TextField 
                            variant="outlined"
                            label="Name"
                            onChange={e => this.setState({ foodName: e.target.value })}/>
                    </div>
                }
                {this.state.foodName &&
                    <div>
                        <Typography className="h6-header" variant="h6">
                            Enter grams per serving:
                        </Typography>
                        <div className="dialogRow">
                            <TextField 
                                variant="outlined"
                                label="Grams per serving"
                                onChange={e => this.setState({ gramsPerServing: e.target.value })}/>
                        </div>   

                        <Typography className="h6-header" variant="h6">
                            Enter calories per 100g:
                        </Typography>
                        <div className="dialogRow">
                                <TextField 
                                    variant="outlined"
                                    label="Calories per 100g"
                                    onChange={e => this.setState({ caloriesPer100G: e.target.value })}/>
                        </div>   
                    </div>                 
                }

                <Button
                    className="button"
                    onClick={() => this.props.onCreateMeal({
                        type: this.state.foodType,
                        name: this.state.foodName,
                        caloriesPer100G: this.state.caloriesPer100G,
                        gramsPerServing: this.state.gramsPerServing
                    })}
                    disabled={!this.state.foodType 
                        && !this.state.foodName 
                        && !this.state.caloriesPer100G
                        && !this.state.gramsPerServing}>
                    Create Meal
                </Button>
            </div>
        );
    }

    renderEditMode() {
        return (
            <div className="editMode"></div>
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
                            enterServings: true,
                            foodType: undefined,
                            foodName: undefined
                        })
                    }}>
                    {this.state.addMode ? "Enter Edit Mode" : "Enter Add Mode"}
            </Button>
        </Dialog>

        );
    }
}