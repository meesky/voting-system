import React, { Component } from 'react'
import logo from '../images/logo.png'

class Logo extends Component {
    constructor(props){
        super(props)

        this.state = {
            alt: 'Infinity Blockchain Labs',
            url: 'https://www.blockchainlabs.asia/'
        }
    }
    render () {
        return (
            <div style={{ textAlign: 'center', marginBottom: 32 }} >
                <a href={this.state.url}>
                    <img 
                        style={{ textAlign: 'center' }} 
                        src={logo} 
                        width="100%" 
                        height="100%" 
                        alt={this.state.alt}
                    />
                </a>
            </div>
        )
    }
}

export default Logo