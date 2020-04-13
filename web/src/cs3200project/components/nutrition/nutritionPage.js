import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import DateSelector from '../date/dateSelector';
import Log from '../table/log';
import FoodEntriesDialog from '../dialog/foodEntriesDialog';
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
        this.setState({ rows: rowData.rows, calories: calData.calories });
    }

    async componentDidUpdate() {
        const date = `${this.state.month}-${this.state.day}-${this.state.year}`;
        const rowData = await this.foodLogService.getLogsForDate(this.props.id, date);
        const calData = await this.foodLogService.getTotalCaloriesForDate(this.props.id, date);
        if ((this.state.rows.length !== rowData.rows.length) || this.state.justUpdated) {
            this.setState({ rows: rowData.rows, justUpdated: false });
        }
        if (this.state.calories !== calData.calories) {
            this.setState({ calories: calData.calories });
        }
    }

    getHeaders() {
        return ['name', 'serving_size', 'calories_gained'];
    }

    getRows() {
        return this.state.rows;
    }

    async onCreateEntry(foodLogEntry) {
        foodLogEntry.user_id = this.props.id;
        foodLogEntry.date = `${this.state.month}-${this.state.day}-${this.state.year}`
        try {
            await this.foodLogService.createFoodLogEntry(this.props.id, foodLogEntry);
            this.setState({ operationSucceeded: true, justUpdated: true });
        } catch (e) {
            console.log(e);
            this.setState({ operationSucceeded: false, error: e });
        }
    }

    async onEditEntry(foodLogEntry) {
        try {
            await this.foodLogService.editFoodLogEntry(foodLogEntry);
            this.setState({ operationSucceeded: true, justUpdated: true });
        } catch (e) {
            console.log(e);
            this.setState({ operationSucceeded: false });
        }
    }

    async onDeleteEntry(foodLogEntry) {
        try {
            await this.foodLogService.deleteFoodLogEntry(foodLogEntry);
            this.setState({ operationSucceeded: true, justUpdated: true })
        } catch (e) {
            console.log(e);
            this.setState({ operationSucceeded: false })
        }
    }

    async onCreateMeal(meal) {
        try {
            await this.foodService.createMeal(this.props.id, meal);
            this.setState({ operationSucceeded: true, justUpdated: true });
        } catch (e) {
            console.log(e);
            this.setState({ operationSucceeded: false });
        }
    }

    async onEditMeal(meal) {
        try {
            await this.foodService.editMeal(this.props.id, meal);
            this.setState({ operationSucceeded: true, justUpdated: true })
        } catch (e) {
            console.log(e);
            this.setState({ operationSucceeded: false })
        }
    }

    async onDeleteMeal(mealId) {
        try {
            await this.foodService.deleteMeal(this.props.id, mealId);
            this.setState({ operationSucceeded: true, justUpdated: true });
        } catch (e) {
            console.log(e);
            this.setState({ operationSucceeded: false })
        }
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

                    {this.state.operationSucceeded &&
                    <Typography variant="h6" color="primary">Success!</Typography>}

                    {this.state.operationSucceeded === false &&
                    <Typography variant="h6" color="error">Error! {this.state.error.message}</Typography>}

                </Paper>

                {this.state.openMealsDialog &&
                    <MealsDialog
                        title={`Your Meals`}
                        open={this.state.openMealsDialog}
                        onClose={() => this.setState({ openMealsDialog: false })}
                        onCreateMeal={this.onCreateMeal.bind(this)}
                        onEditMeal={this.onEditMeal.bind(this)}
                        onDeleteMeal={this.onDeleteMeal.bind(this)}
                        {...this.props}/>
                }

                {this.state.openEntriesDialog &&
                    <FoodEntriesDialog
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