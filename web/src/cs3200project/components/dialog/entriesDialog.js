import React from 'react';
import { Button, Dialog, DialogTitle, Select, MenuItem, Typography, TextField } from '@material-ui/core';
import FoodService from '../../service/nutrition/FoodService';
import "./entriesDialog.css";

export default class FoodDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            addMode: true,
            types: [],
            foodItems: [],
            enterServings: true,
            editServings: true
        }
        this.foodService = new FoodService();
    }

    async componentWillMount() {
        const foodTypes = await this.foodService.getAllFoodTypes();
        this.setState({ types: foodTypes.types } );
    }

    async applyFoodType() {
        if (!this.state.selectedType) {
            this.setState({ failedToApplyFoodType: true })
        }
        else {
            const foodItems = await this.foodService.getAllFoodItemsByType(this.state.selectedType);
            this.setState({ failedToApplyFoodType: false, foodItems: foodItems.items });
        };
    }

    async applySelectedFoodItem() {
        if (!this.state.selectedFoodItem) {
            this.setState({ failedToApplyFoodItem: true });
        } else {
            const foodInfo = await this.foodService.getFoodInfoByName(this.state.selectedFoodItem);
            this.setState({ foodInfo: foodInfo.info }, () => {
                this.setState({ failedToApplyFoodItem: false, foodSelected: true })
            });
        }
    }

    async addEntry() {

    }

    renderAddMode() {
        return (
            <div id="addMode">
                <Typography className="h6-header" variant="h6">Select a food type:</Typography>
                <div className="dialogRow">
                    <Select 
                        value={this.state.types[0]}
                        onChange={e => this.setState({ selectedType: e.target.value })}>
                            {this.state.types.map(type => {
                                return <MenuItem value={type}>{type}</MenuItem>
                            })}
                    </Select>
                    <Button
                            className="button"
                            onClick={() => this.applyFoodType()}>
                            Apply
                    </Button>
                </div>
                
                <Typography className="h6-header" variant="h6">Select a food item:</Typography>
                <div className="dialogRow">
                    <Select 
                        value={this.state.foodItems[0]}
                        onChange={e => this.setState({ selectedFoodItem: e.target.value })}>
                            {this.state.foodItems.map(item => {
                                return <MenuItem value={item.name}>{item.name}</MenuItem>
                            })}
                    </Select>
                    <Button
                            className="button"
                            onClick={() => this.applySelectedFoodItem()}>
                            Apply
                    </Button>
                </div>

                {this.state.foodSelected &&
                    <div className="foodInfoSection">
                        <div className="dialogRow foodInfo">
                        <text className="text">{this.state.foodInfo.grams_per_serving} grams per serving</text>
                        <text className="text">{this.state.foodInfo.calories_per_100g} calories per 100g</text>
                        </div>

                        <div className="dialogColumn">
                            <Typography className="h6-header" variant="h6">
                                {this.state.enterServings
                                    ? "Number of servings:"
                                    : "Number of grams:"}
                            </Typography>
                            <Button
                                className="button"
                                onClick={() => this.setState({ enterServings: !this.state.enterServings })}>
                                {this.state.enterServings
                                    ? "Enter grams instead?"
                                    : "Enter servings instead?"}
                            </Button>                        
                        </div>
                        <div className="dialogRow">
                            <TextField
                                variant="outlined"
                                onChange={e => this.setState({ servingSize: e.target.value })}/>
                        </div>
                    </div>
                }

                <Button
                    className="button"
                    onClick={() => this.props.onAddEntry(this.state)}
                    disabled={!this.state.servingSize}>
                    Add Entry
                </Button>
            </div>
        );
    }

    renderEditMode() {
        return (
            <div id="editMode">
                {console.log(this.props.entries)}
                <Typography className="h6-header" variant="h6">Select an entry to edit:</Typography>
                <div className="dialogRow">
                    <Select 
                        onChange={e => this.setState({ entryToEdit: e.target.value })}>
                            {this.props.entries.map(entry => {
                                return <MenuItem value={entry}>{entry.name}</MenuItem>
                            })}
                    </Select>
                </div>
                { this.state.entryToEdit &&
                    <div className="dialogRow">
                        {console.log(this.state.entryToEdit)}
                        <div className="dialogColumn">
                            <Typography className="h6-header" variant="h6">
                                {this.state.editServings
                                    ? "Number of servings:"
                                    : "Number of grams:"}
                            </Typography>
                            <Button
                                className="button"
                                onClick={() => this.setState({ editServings: !this.state.editServings })}>
                                {this.state.editServings
                                    ? "Enter grams instead?"
                                    : "Enter servings instead?"}
                            </Button>
                            <div className="dialogRow">
                            <TextField
                                variant="outlined"
                                onChange={e => {
                                    const updatedEntry = {...this.state.entryToEdit};
                                    if (this.state.editServings) {
                                        updatedEntry.num_servings = e.target.value;
                                        updatedEntry.num_grams = null;
                                    } else {
                                        updatedEntry.num_servings = null;
                                        updatedEntry.num_grams = e.target.value;
                                    }
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
                {this.state.failedToApplyFoodType &&
                    <Typography variant="h5" color="error">Please select a food type.</Typography>}
                {this.state.failedToApplyFoodItem &&
                    <Typography variant="h5" color="error">Please select a food item.</Typography>}
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
                            foodSelected: undefined,
                            servingSize: undefined,
                            selectedType: undefined,
                            selectedFoodItem: undefined })}>
                        {this.state.addMode ? "Enter Edit Mode" : "Enter Add Mode"}
                </Button>
            </Dialog>
        )
    }
}