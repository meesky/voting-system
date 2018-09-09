import React, { Component , PropTypes } from 'react'
import { Button, Row, Col } from 'reactstrap'

class Candidate extends Component {

    constructor(props){
        super(props)

        this.state = {
            vote : 'Vote'
        }
    }

    render() {
        var style = {
            block: {
                margin: 2,
                borderRadius:150,
                borderWidth: 4, 
                backgroundColor: '#e6ffff',
                textAlign: 'center'
            },
            btnVote: {
                paddingTop: 10,
                paddingBottom: 10,
                marginTop: 30,
                paddingLeft: 94,
                paddingRight: 94,
                marginTop: 30,
                fontSize: 30
            }
        }
        return (
            <div>
                <Row style={style.block}>
                    <Col><img src={'../src/public/images/' + this.props.image + '.png'} width='100%' height='100%'/></Col>
                </Row>
                <Row>
                    <Col>
                        <from>
                            <Button 
                                onClick= {this.props.click}
                                color='info' 
                                size='lg' 
                                style={style.btnVote}>
                                {this.state.vote}
                            </Button>
                        </from>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Candidate