import React, { Component } from 'react';
import '../assests/styles/CricketHome.css';

let matchInterval;

class CricketHome extends Component {
  state = {
    totalScore : 0,
    extras : 0,
    ballCount : 0,
    overCount : 0,
    wickets : 0,
    stricker : 'Batsman1',
    nonStricker : 'Batsman2',
    currentBallScore: 0,
    btnDisabled : false,
  }

  stopMatch = () => {
    clearInterval(matchInterval);
  }

  itsWicket = () => {
    let totalWickets = this.state.wickets + 1;
    let newCurrentStricker = this.state.stricker;
    if(totalWickets >= 10) {
      this.stopMatch();
    } else {
      newCurrentStricker = `Batsman${totalWickets + 2}`
    }

    this.setState({
      stricker: newCurrentStricker,
      wickets : totalWickets
    })
  }

  itsExtra = () => {
    this.setState({
      extras: this.state.extras + 1,
      totalScore: this.state.totalScore + 1
    })
  }

  itsOddScore = (ballScore) => {
    let currentStricker = this.state.nonStricker;
    let currentNonStricker = this.state.stricker;

    this.setState({
      stricker: currentStricker,
      nonStricker: currentNonStricker,
      totalScore: this.state.totalScore + ballScore
    })
  }

  otherScore = (ballScore) => {
    this.setState({
      totalScore: this.state.totalScore + ballScore
    })
  }



  generateScore = () => {
    const currentScore = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    
    let updatedBallCount = this.state.ballCount;
    let updatedOverCount = this.state.overCount;

    if(this.state.overCount >= 10) {
      this.stopMatch();
    } else {
      if(updatedBallCount >= 5 ) {
        updatedBallCount = 0;
        updatedOverCount++;
      } else {
        updatedBallCount++;
      }

      if(currentScore === 8) {
        this.itsWicket();
      } else if(currentScore === 7) {
        this.itsExtra();
      } else if(currentScore === 3 || currentScore === 1) {
        this.itsOddScore(currentScore);
      } else {
        this.otherScore(currentScore);
      }
    }

    this.setState({
      currentBallScore: currentScore,
      ballCount: updatedBallCount,
      overCount: updatedOverCount
    })
  }

  startMatch = () => {
    this.setState({
      btnDisabled : true
    })
    matchInterval = setInterval(() => this.generateScore(), 1000)
  }

  render() {
    return (

      <div className="container">
        <div className="cricket_card py-2">
          <div className="container-fluid">
            <div className="row">
              <h1 className="m-auto">Score Card</h1>
            </div>
            <div className="row">
              <p className="total_score">{this.state.totalScore}-{this.state.wickets}<span>({this.state.overCount}.{this.state.ballCount})</span></p>
            </div>
            <p className="other_details">Extras : {this.state.extras}</p>
            <p className="other_details">Striker : {this.state.stricker}</p>
            <p className="other_details mb-4">Non-Striker : {this.state.nonStricker}</p>

            <div className="row w-100 m-0">
              <button className="btn btn-primary m-auto start_match_btn" onClick={() => this.startMatch()} disabled={this.state.btnDisabled}>Start Match</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CricketHome;