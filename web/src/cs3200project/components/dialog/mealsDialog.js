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
            types: [],
            foodItems: [],
            userCreatedMeals: []
        }
        this.foodService = new FoodService();
    }

    async componentWillMount() {
        const foodTypes = await this.foodService.getAllFoodTypes();
        const userCreatedMeals = await this.foodService.getAllMealsCreatedByUser(this.props.id);
        this.setState({ 
            types: foodTypes.types, 
            userCreatedMeals, 
            mealToEdit: userCreatedMeals[0] || undefined 
        });
    }

    async componentDidUpdate() {
        const foodTypes = await this.foodService.getAllFoodTypes();
        const userCreatedMeals = await this.foodService.getAllMealsCreatedByUser(this.props.id);
        if (this.state.userCreatedMeals.length != userCreatedMeals.length || this.state.justUpdated) {
            this.setState({ 
                types: foodTypes.types, 
                userCreatedMeals,
                mealToEdit: userCreatedMeals[0] || undefined
            });
        }
    }

    async applyFoodType() {
        if (!this.state.foodType) {
            this.setState({ failedToApplyFoodType: true })
        }
        else {
            const foodItems = await this.foodService.getAllFoodItemsByType(this.state.foodType);
            this.setState({ failedToApplyFoodType: false, foodItems: foodItems.items });
        };
    }

    async applyFoodItem() {
        if (!this.state.foodItem) {
            this.setState({ failedToApplyFoodItem: true })
        }
        else {
            const foodInfo = await this.foodService.getFoodInfoByName(this.state.foodItem.name);
            this.setState({ failedToApplyFoodItem: false, foodInfo: foodInfo.info });
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
                        <div className="dialogRow">
                            <TextField 
                                variant="outlined"
                                label="Grams per serving"
                                onChange={e => this.setState({ gramsPerServing: e.target.value })}/>
                        </div>   
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
            <div id="editMode">
                <div className="dialogRow">
                    <Typography className="h6-header" variant="h6">
                        Select which food item to edit:
                    </Typography>
                    <Select 
                        value={this.state.mealToEdit || this.state.userCreatedMeals[0]}
                        onChange={e => this.setState({ mealToEdit: e.target.value })}>
                        {this.state.userCreatedMeals.map(meal => {
                            return <MenuItem value={meal}>{meal.name}</MenuItem>
                        })}
                    </Select>
                </div>
                {this.state.mealToEdit &&
                    <div className="dialogRow">
                    <TextField 
                        variant="outlined"
                        label="Name"
                        onChange={e => {
                            const newName = e.target.value;
                            const editedMeal = {...this.state.editedMeal};
                            editedMeal.name = newName;
                            this.setState({ editedMeal });
                        }}/>
                    <TextField 
                        variant="outlined"
                        label="Type"
                        onChange={e => {
                            const newType = e.target.value;
                            const editedMeal = {...this.state.editedMeal};
                            editedMeal.type = newType;
                            this.setState({ editedMeal });
                        }}/>
                    <TextField 
                        variant="outlined"
                        label="Grams per serving"
                        onChange={e => {
                            const newGramsPerServing = e.target.value;
                            const editedMeal = {...this.state.editedMeal};
                            editedMeal.gramsPerServing = newGramsPerServing;
                            this.setState({ editedMeal });
                        }}/>
                    <TextField 
                        variant="outlined"
                        label="Calories per 100g"
                        onChange={e => {
                            const newCaloriesPer100G = e.target.value;
                            const editedMeal = {...this.state.editedMeal};
                            editedMeal.caloriesPer100G = newCaloriesPer100G;
                            this.setState({ editedMeal })
                        }}/>
                    </div>
                }
                <div className="buttonRow">
                    <Button
                        className="button"
                        onClick={() => this.props.onEditMeal({ id: this.state.mealToEdit.id, ...this.state.editedMeal })}
                        disabled={
                            !this.state.editedMeal
                            || !this.state.editedMeal.name
                            || !this.state.editedMeal.type
                            || !this.state.editedMeal.gramsPerServing
                            || !this.state.editedMeal.caloriesPer100G
                        }>
                        Edit
                    </Button>
                    <Button
                        className="button"
                        onClick={() => this.props.onDeleteMeal(this.state.mealToEdit.id)}
                        disabled={!this.state.mealToEdit}>
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