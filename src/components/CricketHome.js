// Rules for the Game of Cricket
// Match is of 10 overs
// If wickets is equal to 10 or over is equal to 10 the match will stopped
// It will generate random number between 0 and 8
// If number is equal to 8 then it is wickets
// If number is equal to 7 then it can be noball or wide ball
// If number is 1 or 3 then stricker batsman will swap with non stricker
// Remaining number will only update the total score - Sudama [12/06/2020]

import React, { Component } from 'react';
import '../assests/styles/CricketHome.css';

// Globally declared variable to set interval for every 1 second - Sudama [12/06/2020]
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

  // Method to Stop the Interval to Stop the Running Match - Sudama [12/06/2020]
  stopMatch = () => {
    clearInterval(matchInterval);
  }

  // Method if there is a wicket - Sudama [12/06/2020]
  itsWicket = () => {
    let totalWickets = this.state.wickets + 1;
    let newCurrentStricker = this.state.stricker;
    // If Wicket is equal or more than 10 then stop the match - Sudama [12/06/2020]
    if(totalWickets >= 10) {
      this.stopMatch();
    } else {
      // Else Change the Batsman with the new Batsman - Sudama [12/06/2020]
      newCurrentStricker = `Batsman${totalWickets + 2}`
    }

    // Updating value in state - Sudama [12/06/2020]
    this.setState({
      stricker: newCurrentStricker,
      wickets : totalWickets
    })
  }

  // Method if there is extra run if random number is 7 - Sudama [12/06/2020]
  itsExtra = () => {
    this.setState({
      extras: this.state.extras + 1,
      totalScore: this.state.totalScore + 1
    })
  }

  // Method if there is an odd score - Sudama [12/06/2020]
  itsOddScore = (ballScore) => {
    // Code to Swap the Stricker with Non-Stricker - Sudama [12/06/2020]
    let currentStricker = this.state.nonStricker;
    let currentNonStricker = this.state.stricker;

    this.setState({
      stricker: currentStricker,
      nonStricker: currentNonStricker,
      totalScore: this.state.totalScore + ballScore
    })
  }

  // All Other Remaining Condition - Sudama [12/06/2020]
  otherScore = (ballScore) => {
    this.setState({
      totalScore: this.state.totalScore + ballScore
    })
  }


  // Method to Generate Score and Call the Methods according to the condition - Sudama [12/06/2020]
  generateScore = () => {
    const currentScore = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    
    let updatedBallCount = this.state.ballCount;
    let updatedOverCount = this.state.overCount;

    // If Over is equal or more than 10 then stop the match - Sudama [12/06/2020]
    if(this.state.overCount >= 10) {
      this.stopMatch();
    } else { // If Not then update the ball count - Sudama [12/06/2020]
      // If ball count is equal to six then update over and reset ball count - Sudama [12/06/2020]
      if(updatedBallCount >= 5 ) {
        updatedBallCount = 0;
        updatedOverCount++;
      } else {
        updatedBallCount++;
      }

      // Call Function according to generated Score - Sudama [12/06/2020]
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

  // Method to Start the Match
  startMatch = () => {
    this.setState({
      btnDisabled : true
    })
    matchInterval = setInterval(() => this.generateScore(), 1000)
  }

  render() {
    return (
      // Code to Display Score Board to user - Sudama [12/06/2020]
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
              {/* Button to Start Match - Sudama [12/06/2020] */}
              <button className="btn btn-primary m-auto start_match_btn" onClick={() => this.startMatch()} disabled={this.state.btnDisabled}>Start Match</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CricketHome;