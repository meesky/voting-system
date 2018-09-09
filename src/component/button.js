import React, { Component } from 'react'
//import { Button } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Result from './result'

class ButtonResult extends Component {
  constructor (props) {
    super(props)
    this.state = {
      buttonLabel: 'Result',
      status : true,
      modal: false,
      getETH: 'Process'
    }
    //this.getData = this.getData.bind(this);
    this.data = this.getData();
    this.getData = this.getData.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getData = this.getData.bind(this);
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  getData(){
    var data = [
      {
        name: 'thuan',
        voted: 3
      },
      {
        name: 'me',
        voted: 0
      },
      {
        name: 'huy',
        voted: 10
      },
      {
        name: 'nh',
        voted: 1
      }
    ]
    return data;
  }
  
  render(){
    var style = {
      btnResult:{
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 150,
        paddingRight: 150,
        marginTop: 30,
        fontSize: 35,
        fontWeight: 'bold'
      }
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <from >
         
        <Button style={style.btnResult} color="success" onClick={this.toggle}>{this.state.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Table result</ModalHeader>
          <ModalBody>
            <Result data = {this.data}/>  
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>{this.state.getETH}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </from>
      </div>
    )
  }
}
export default ButtonResult