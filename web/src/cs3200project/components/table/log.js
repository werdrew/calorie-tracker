import React from 'react'
import { 
    Table, TableBody, TableCell, Paper,
    TableContainer, TableHead, TableRow 
} from '@material-ui/core';
import "./log.css";

export default class Log extends React.Component {
    constructor(props) {
        super(props);
    }

    renderHead() {
        return (
            <TableRow>
                {this.props.headers.map(header => {
                    return <TableCell>{header}</TableCell>
                })}
            </TableRow>
        )
    }

    renderBody() {
        return (
            this.props.rows.map(row => {
                return <TableRow>
                    {this.props.headers.map(header => {
                        return <TableCell>
                            {header == 'serving_size' 
                                ? row['num_servings'] || row['num_grams'] 
                                : row[header]}
                        </TableCell>
                    })}
                </TableRow>
            })
        );
    }

    render() {
        return (
            <TableContainer id="tableContainer" component={Paper}>
                <Table>
                    <TableHead>
                        {this.renderHead()}
                    </TableHead>
                    <TableBody>
                        {this.renderBody()}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}