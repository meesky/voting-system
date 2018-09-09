import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Result extends Component {
    constructor(props){
        super(props)
        this.number = 4
        this.data = this.props.data;
    }
    render() {
        const numrows = 4;
        var maxVoted = 0;
        var maxIndex = 0;
        var rows = [];
        for(var i = 0; i< numrows;i++){
            if(maxVoted < this.data[i].voted){
                maxVoted = this.data[i].voted;
                maxIndex = i;
            }
            rows.push(
                <tr>
                    <th scope="row">{i+1}</th>
                    <td>{this.data[i].name}</td>
                    <td>{this.data[i].voted}</td>
                </tr>
            )
        }
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Voted</th>
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
                <p>Winer: {this.data[maxIndex].name}</p>
                <p>Max voted: {maxVoted}</p>
            </div>
      
        );
    }
}
export default Result