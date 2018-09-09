import React, { Component } from 'react'

class Header extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            header : 'voting system'
        }
    }
    
    render () {
        var style = {
            h1: {
                textAlign: 'center',
                fontSize: 70,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                marginTop: 60,
                marginBottom: 60
            }
        }
        return (
            <h1 
                style={style.h1}>
                {this.state.header}
            </h1>
        )
    }
}

export default Header