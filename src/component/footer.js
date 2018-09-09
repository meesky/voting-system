import React, { Component } from 'react'
import { Row , Col } from 'reactstrap'

class Footer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            content: '© 2018 Infinity Blockchain Labs. All rights reserved.',
            aboutUs: 'About us'
        }
    }

    render() {
        return (
            <Row>
                <Col>
                    <p 
                        style= {{ fontSize: 18 }}>
                        {this.state.content}
                    </p>
                </Col>
                <Col style={{ textAlign: 'right'}}>
                    <a href='https://www.blockchainlabs.asia/about/'>
                        {this.state.aboutUs}
                    </a>
                </Col>
            </Row>
        )
    }
}

export default Footer