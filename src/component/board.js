import React, { Component } from 'react'

class Board extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            rule : 'Rule of The Game',
            content1 : 'Start the game voting in 5 minutes and after 5 minutes the system will display the result the score',
            content2 : '1 ETH for a vote to the candidate',
            content3 : 'The candidate who has the highest of votes is the winner',
            content4 : 'who won will get 1 ETH ( ETH you was bet ) and get more the ETH with divide the entire ETH of who lose the game',
            content5 : 'If the game nobody to win, that game will refund the ETH to all user'
        }
    }
    render () {
        var style = {
            h2: {
                textAlign: 'center'
            },
            li: {
                lineHeight: 1.5,
                fontSize: 22
            }
        }
        
        return (
            <div>
                <h2 style={style.h2}>{this.state.rule}</h2>
                <ul>
                    <li style={style.li}>{this.state.content1}</li>
                    <li style={style.li}>{this.state.content2}</li>
                    <li style={style.li}>{this.state.content3}</li>
                    <li style={style.li}>{this.state.content4}</li>
                    <li style={style.li}>{this.state.content5}</li>
                </ul>
            </div>
        )
    }
}

export default Board