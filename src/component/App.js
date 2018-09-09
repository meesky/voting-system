import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import { Web3Provider } from 'react-web3';

import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Election from '../../build/contracts/Election.json'


// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import $ from 'jquery'
import Popper from 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { Container, Row, Col, Button } from 'reactstrap'

// import component
import Header from './header'
import Logo from './logo'
import Board from './board'
import Candidate from './candidate'
import ButtonResult from './button'
import Footer from './footer'
import Content from './Content'

// import image
import f from '../images/fruitchain.png'
import i from '../images/infinito.png'
import b from '../images/blockpass.png'
import q from '../images/quanta.png'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      candidates: [],
      hasVoted: false,
      loading: true,
      votings: false,
      
      start: 'START' ,
      vote: 'VOTE',
      // time
      time: {},seconds: 300,

      
    }

      this.startTimer = this.startTimer.bind(this)
      this.countDown = this.countDown.bind(this)
      this.onComplete = this.onComplete.bind(this)
      this.vote = this.vote.bind(this)

      // connect to server port 3000
      this.socket = io('localhost:3000')
      this.socket.on('START_MESSAGE', function(data){
        startTime(data)
      })
      this.timer = 0
      const startTime = data => {
        //console.log(data);
        this.setState({
          //data: data,
          seconds: data.time
        })
        this.startTimer()
      }
  
      this.sendMessage = ev => {
        ev.preventDefault()
        this.socket.emit('START_MESSAGE', {
          start: true
        })
        // this.setState({message: ''})
      }


    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.election = TruffleContract(Election)
    this.election.setProvider(this.web3Provider)

    this.castVote = this.castVote.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
  }

  componentDidMount() {
    let timeLeft = this.secondsToTime(this.state.seconds)
    this.setState({ time: timeLeft })
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.election.deployed().then((electionInstance) => {
        this.electionInstance = electionInstance
        this.watchEvents()
        this.electionInstance.candidatesCount().then((candidatesCount) => {
          for (var i = 1; i <= candidatesCount; i++) {
            this.electionInstance.candidates(i).then((candidate) => {
              const candidates = [...this.state.candidates]
              candidates.push({
                id: candidate[0],
                name: candidate[1],
                voteCount: candidate[2]
              });
              this.setState({ candidates: candidates })
            });
          }
        })
        this.electionInstance.voters(this.state.account).then((hasVoted) => {
          this.setState({ hasVoted, loading: false })
        })
      })
    })
  }

  watchEvents() {
    // TODO: trigger event when vote is counted, not when component renders
    this.electionInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })
  }

  castVote(candidateId) {
    this.setState({ voting: true })
    this.electionInstance.vote(candidateId, { from: this.state.account }).then((result) =>
      this.setState({ hasVoted: true })
    )
  }

    // set Countdown TIME 
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60))
    let divisor_for_minutes = secs % (60 * 60)
    let minutes = Math.floor(divisor_for_minutes / 60)
    let divisor_for_seconds = divisor_for_minutes % 60
    let seconds = Math.ceil(divisor_for_seconds)
    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    })
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer)
      this.onComplete()
    }
  }

  onComplete(){
    alert('Done')
  }

  // set Button VOTE
  vote(index){
    alert(index)
  }

  render() {
    var style = {
      block: {
          margin: 2,
          textAlign: 'center'
      },
      btnVote: {
          paddingTop: 10,
          paddingBottom: 10,
          marginTop: 30,
          paddingLeft: 80,
          paddingRight: 80,
          fontSize: 30,
          textAlign: 'center'
      }
    }

    return (
    < Web3Provider >
      <Container>
        
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <Logo />
            <div style={{textAlign: 'center'}}>
              <form >
                <Button 
                  color="warning" 
                  // type='submit'
                  onClick={this.sendMessage}
                  style={{
                    paddingTop: 17,
                    paddingRight: 90,
                    paddingLeft: 90,
                    paddingBottom: 17,
                    fontSize: 35,
                    size: 'lg',
                    fontWeight: 'bold'
                  }}> 
                  {this.state.start} 
                </Button>
              </form>
                <p style= {{
                  color: '#a9eb00',
                  fontSize : 70}}>
                  {this.state.time.m}:{this.state.time.s}
                </p>
            </div>
          </Col>
          <Col>
            <Board />
          </Col>
        </Row>

        <Row>
          <Col xs="3" style={{ marginTop: 62 }}>     
            <Row style={style.block}>
              <Col><img src={f} width='100%' height='100%'/></Col>
            </Row>
            <Row>
              <Col>
                  <from>
                      <Button
                          color='info' 
                          size='lg' 
                          style={style.btnVote}>
                          {this.state.vote}
                      </Button>
                  </from>
              </Col>
            </Row>
          </Col>

          <Col xs="3" style={{ marginTop: 35 }}>     
            <Row style={style.block}>
              <Col><img src={b} width='100%' height='100%'/></Col>
            </Row>
            <Row>
              <Col>
                  <from>
                      <Button
                          color='info' 
                          size='lg' 
                          style={style.btnVote}>
                          {this.state.vote}
                      </Button>
                  </from>
              </Col>
            </Row>
          </Col>

          <Col xs="3" style={{ marginTop: 30 }}>     
            <Row style={style.block}>
              <Col><img src={i} width='100%' height='100%'/></Col>
            </Row>
            <Row>
              <Col>
                  <from>
                      <Button
                          color='info' 
                          size='lg' 
                          style={style.btnVote}>
                          {this.state.vote}
                      </Button>
                  </from>
              </Col>
            </Row>
          </Col>

          <Col xs="3">     
            <Row style={style.block}>
              <Col><img src={q} width='100%' height='100%'/></Col>
            </Row>
            <Row>
              <Col>
                  <from>
                      <Button
                          color='info' 
                          size='lg' 
                          style={style.btnVote}>
                          {this.state.vote}
                      </Button>
                  </from>
              </Col>
            </Row>
          </Col>
        </Row>  

        <Row>
          <Col>
            <ButtonResult />
          </Col>
        </Row>

        <div class='row'>
          <div class='col-lg-12 text-center' >
            <br/>
            { this.state.loading || this.state.voting
              ? <p class='text-center'>Loading...</p>
              : <Content
                  account={this.state.account}
                  candidates={this.state.candidates}
                  hasVoted={this.state.hasVoted}
                  castVote={this.castVote} />
            }
          </div>
        </div>

        <Row style= {{ marginTop: 50 }}>
          <Col><Footer /></Col>
        </Row>
        
      </Container>
    </Web3Provider>

    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
