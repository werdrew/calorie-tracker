import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import DateSelector from '../date/dateSelector';
import Log from '../table/log';
import EntriesDialog from '../dialog/entriesDialog';
import MealsDialog from '../dialog/mealsDialog';
import FoodLogService from '../../service/nutrition/FoodLogService';
import FoodService from '../../service/nutrition/FoodService';
import "./nutritionPage.css";

export default class NutritionPage extends React.Component {
    constructor(props) {
        super(props);
        this.today = new Date();
        this.state = {
            month: this.today.getMonth() + 1,
            day: this.today.getDate(),
            year: this.today.getYear() + 1900,
            openMealsDialog: false,
            openEntriesDialog: false,
            rows: []
        };
        this.foodLogService = new FoodLogService();
        this.foodService = new FoodService();
    }

    async componentWillMount() {
        const date = `${this.state.month}-${this.state.day}-${this.state.year}`;
        const rowData = await this.foodLogService.getLogsForDate(this.props.id, date);
        const calData = await this.foodLogService.getTotalCaloriesForDate(this.props.id, date);
        console.log(rowData);
        this.setState({ rows: rowData.rows, calories: calData.calories });
    }

    async componentDidUpdate() {
        const date = `${this.state.month}-${this.state.day}-${this.state.year}`;
        const rowData = await this.foodLogService.getLogsForDate(this.props.id, date);
        console.log(rowData);
        const calData = await this.foodLogService.getTotalCaloriesForDate(this.props.id, date);
        if ((this.state.rows.length != rowData.rows.length) || this.state.justUpdated) {
            this.setState({ rows: rowData.rows, justUpdated: false });
        }
        if (this.state.calories != calData.calories) {
            this.setState({ calories: calData.calories });
        }
    }

    getHeaders() {
        return ['name', 'serving_size', 'calories_gained'];
    }

    getRows() {
        return this.state.rows;
    }

    async onAddEntry(dialogState) {
        const foodLogEntry = {
            user_id: this.props.id,
            food_id: dialogState.foodInfo.id,
            date: `${this.state.month}-${this.state.day}-${this.state.year}`,
            num_servings: dialogState.enterServings ? parseInt(dialogState.servingSize) : null,
            num_grams: dialogState.enterServings ? null : parseInt(dialogState.servingSize),
        }
        await this.foodLogService.createFoodLogEntry(foodLogEntry);
    }

    async onEditEntry(foodLogEntry) {
        const data = await this.foodLogService.editFoodLogEntry(foodLogEntry);
        if (data.success) {
            this.setState({ justUpdated: true });
        }
    }

    async onDeleteEntry(foodLogEntry) {
        await this.foodLogService.deleteFoodLogEntry(foodLogEntry);
    }

    async onCreateMeal(food) {
        await this.foodService.createFood(food);
    }

    async onEditMeal() {

    }

    async onDeleteMeal() {

    }

    render() {
        return (
            <div id="nutritionPage">
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
                            onClick={() => this.setState({ openMealsDialog: true })}
                        >
                            View Your Meals
                        </Button>
                    </div>
                    <Typography variant="h3">
                        Nutrition Log
                    </Typography>
                    <Log
                        headers={this.getHeaders()}
                        rows={this.getRows()}
                        />
                    
                    <Typography variant="h6">
                        Calories gained today: {this.state.calories}
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

                {this.state.openMealsDialog &&
                    <MealsDialog
                        title={`Your Meals`}
                        open={this.state.openMealsDialog}
                        onClose={() => this.setState({ openMealsDialog: false })}
                        onCreateMeal={this.onCreateMeal.bind(this)}
                        onEditMeal={this.onEditMeal.bind(this)}
                        onDeleteMeal={this.onDeleteMeal.bind(this)}/>
                }

                {this.state.openEntriesDialog &&
                    <EntriesDialog
                        title={`Add/Edit Entries`}
                        open={this.state.openEntriesDialog}
                        onClose={() => this.setState({ openEntriesDialog: false })}
                        onAddEntry={this.onAddEntry.bind(this)}
                        onEditEntry={this.onEditEntry.bind(this)}
                        onDeleteEntry={this.onDeleteEntry.bind(this)}
                        entries={this.state.rows}/>
                }

            </div>
        )
    }
}