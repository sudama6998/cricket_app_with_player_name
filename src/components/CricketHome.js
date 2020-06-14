// Rules for the Game of Cricket
// Match is of 10 overs
// If wickets is equal to 10 or over is equal to 10 the match will stopped
// It will generate random number between 0 and 8
// If number is equal to 8 then it is wickets
// If number is equal to 7 then it can be noball or wide ball
// If number is 1 or 3 or 5 then stricker batsman will swap with non stricker
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
    viewDetails : true,

    // To Store the batsman details - Sudama [13/06/2020]
    batsmanDetails : [
      {
        batsmanName : 'Batsman1',
        runs : 0,
        balls : 0,
        fours : 0,
        sixs : 0
      },
      {
        batsmanName : 'Batsman2',
        runs : 0,
        balls : 0,
        fours : 0,
        sixs : 0
      },
      {
        batsmanName : 'Batsman3',
        runs : 0,
        balls : 0,
        fours : 0,
        sixs : 0
      },
      {
        batsmanName : 'Batsman4',
        runs : 0,
        balls : 0,
        fours : 0,
        sixs : 0
      },
      {
        batsmanName : 'Batsman5',
        runs : 0,
        balls : 0,
        fours : 0,
        sixs : 0
      },
      {
        batsmanName : 'Batsman6',
        runs : 0,
        balls : 0,
        fours : 0,
        sixs : 0
      },
      {
        batsmanName : 'Batsman7',
        runs : 0,
        balls : 0,
        fours : 0,
        sixs : 0
      },
      {
        batsmanName : 'Batsman8',
        runs : 0,
        balls : 0,
        fours : 0,
        sixs : 0
      },
      {
        batsmanName : 'Batsman9',
        runs : 0,
        balls : 0,
        fours : 0,
        sixs : 0
      },
      {
        batsmanName : 'Batsman10',
        runs : 0,
        balls : 0,
        fours : 0,
        sixs : 0
      },
      {
        batsmanName : 'Batsman11',
        runs : 0,
        balls : 0,
        fours : 0,
        sixs : 0
      },
    ],

    // To store all value to display details to user - Sudama [13/06/2020]
    matchDetails : []

  }

  // To Update Batsman Name from local storage - Sudama [13/06/2020]
  componentDidMount = () => {
    let batsmandetails = [...this.state.batsmanDetails]

    for(let i=0; i < 11; i++) {
      batsmandetails[i].batsmanName = localStorage.getItem(`player${i}`);
    }

    this.setState({
      batsmanDetails : batsmandetails,
      stricker : batsmandetails[0].batsmanName,
      nonStricker : batsmandetails[1].batsmanName,
    })
  }

  // Method to Stop the Interval to Stop the Running Match - Sudama [12/06/2020]
  stopMatch = () => {
    clearInterval(matchInterval);
    console.log(this.state.matchDetails)
  }

  // Method if there is a wicket - Sudama [12/06/2020]
  itsWicket = () => {
    let totalWickets = this.state.wickets + 1;
    let newCurrentStricker;
    // If Wicket is equal or more than 10 then stop the match - Sudama [12/06/2020]
    if(totalWickets >= 10) {
      this.stopMatch();
    } else {
      // Else Change the Batsman with the new Batsman - Sudama [12/06/2020]
      newCurrentStricker = this.state.batsmanDetails[totalWickets + 1].batsmanName
    }

    // Updating value in state - Sudama [12/06/2020]
    this.setState({
      stricker: newCurrentStricker,
      wickets : totalWickets
    })
  }

  // Method if there is extra run if random number is 7 - Sudama [12/06/2020]
  itsExtra = () => {
    // Copying the Batsman Details Array - Sudama [13/06/2020]
    let batsmandetails = [...this.state.batsmanDetails];
    // Finding the Index of Current Stricker - Sudama [13/06/2020]
    let strickerIndex = batsmandetails.findIndex(batsmanData => {
      return batsmanData.batsmanName === this.state.stricker
    })

    // Updating Details for current Stricker according to condition - Sudama [13/06/2020]
    let batsmanScore = {...batsmandetails[strickerIndex]}
    batsmanScore.balls += 1;

    // Replacing the object at the current stricker index - Sudama [13/06/2020]
    batsmandetails[strickerIndex] = batsmanScore;

    // Setting State - Sudama [13/06/2020]
    this.setState({
      extras: this.state.extras + 1,
      totalScore: this.state.totalScore + 1,
      batsmanDetails : batsmandetails
    })
  }

  // Method if there is an odd score - Sudama [12/06/2020]
  itsOddScore = (ballScore) => {
    // Code to Swap the Stricker with Non-Stricker - Sudama [12/06/2020]
    let currentStricker = this.state.nonStricker;
    let currentNonStricker = this.state.stricker;
    
    // To update the Batsman Score who is the current Stricker - Sudama [13/06/2020]
    let batsmandetails = [...this.state.batsmanDetails];
    // Finding Index of Current Stricker - Sudama [13/06/2020]
    let strickerIndex = batsmandetails.findIndex(batsmanData => {
      return batsmanData.batsmanName === currentNonStricker
    })

    // Coping the object loacted at current stricker index - Sudama [13/06/2020]
    let batsmanScore = {...batsmandetails[strickerIndex]}
    // Updating Values - Sudama [13/06/2020]
    batsmanScore.runs += ballScore;
    batsmanScore.balls += 1;

    // Updating Objects - Sudama [13/06/2020]
    batsmandetails[strickerIndex] = batsmanScore;

    this.setState({
      stricker: currentStricker,
      nonStricker: currentNonStricker,
      totalScore: this.state.totalScore + ballScore,
      batsmanDetails : batsmandetails
    })
  }

  // All Other Remaining Condition - Sudama [12/06/2020]
  otherScore = (ballScore) => {
    // To update the current stricker score - Sudama [13/06/2020]

    let batsmandetails = [...this.state.batsmanDetails];
    let strickerIndex = batsmandetails.findIndex(batsmanData => {
      return batsmanData.batsmanName === this.state.stricker
    })

    let batsmanScore = {...batsmandetails[strickerIndex]}
    batsmanScore.runs += ballScore;
    batsmanScore.balls += 1;

    // If it is Four or Six then increment by 1 at current stricker - Sudama [13/06/2020]
    if(ballScore === 6) {
      batsmanScore.sixs += 1;
    } else if(ballScore === 4) {
      batsmanScore.fours += 1;
    }

    batsmandetails[strickerIndex] = batsmanScore;


    // let batsmanscores = {...this.state.batsmanScores};
    // batsmanscores[this.state.stricker] = batsmanscores[this.state.stricker] + ballScore;
    this.setState({
      totalScore: this.state.totalScore + ballScore,
      batsmanDetails : batsmandetails
    })
  }


  // Method to Generate Score and Call the Methods according to the condition - Sudama [12/06/2020]
  generateScore = () => {
    const currentScore = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    
    //To Update Ball Count and Over - Sudama [13/06/2020]
    let updatedBallCount = this.state.ballCount;
    let updatedOverCount = this.state.overCount;

    let currentBallDetails = {};
    let ballType;

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
        ballType = "Wicket";
        this.itsWicket();
        // Object Which will be store in matchDetails in State to display in table - Sudama [13/06/2020]
        currentBallDetails = {
          overNo : updatedOverCount,
          ballNo : updatedBallCount,
          run : ballType,
          extra : 0,
          totalExtra: this.state.extras,
          stricker : this.state.stricker,
          non_stricker : this.state.nonStricker,
          totalRun : this.state.totalScore,
          totalWickets : this.state.wickets
        };
      } else if(currentScore === 7) {
        ballType = "Wide Or No Ball"
        // If Ball is Wide or No Ball then do not update ball count - Sudama [13/06/2020]
        if(updatedBallCount === 0) {
          updatedBallCount = 5;
          --updatedOverCount;
        } else {
          --updatedBallCount;
        }

        this.itsExtra(); // Calling itsExtra function - Sudama [13/06/2020]

        currentBallDetails = {
          overNo : updatedOverCount,
          ballNo : updatedBallCount,
          run : ballType,
          extra : 1,
          totalExtra: this.state.extras,
          stricker : this.state.stricker,
          non_stricker : this.state.nonStricker,
          totalRun : this.state.totalScore,
          totalWickets : this.state.wickets
        };
      } else if(currentScore === 5 || currentScore === 3 || currentScore === 1) {
        // Calling funtion itsOddScore - Sudama [13/06/2020]
        this.itsOddScore(currentScore);

        // Update Ball Type according to score - Sudama [13/06/2020]
        if(currentScore === 5) {
          ballType = "5 Runs"
        } else if(currentScore === 3) {
          ballType = "3 Runs"
        } else {
          ballType = "1 Run"
        }

        currentBallDetails = {
          overNo : updatedOverCount,
          ballNo : updatedBallCount,
          run : ballType,
          extra : 0,
          totalExtra: this.state.extras,
          stricker : this.state.nonStricker,
          non_stricker : this.state.stricker,
          totalRun : this.state.totalScore,
          totalWickets : this.state.wickets
        };
      } else {
        if(currentScore === 6) {
          ballType = "Six"
        } else if(currentScore === 4) {
          ballType = "Four"
        } else {
          ballType = "2 Runs"
        }
        this.otherScore(currentScore);
        currentBallDetails = {
          overNo : updatedOverCount,
          ballNo : updatedBallCount,
          run : ballType,
          extra : 0,
          totalExtra: this.state.extras,
          stricker : this.state.stricker,
          non_stricker : this.state.nonStricker,
          totalRun : this.state.totalScore,
          totalWickets : this.state.wickets
        };
      }
      //Adding the Current Ball Details in MatchDetails Array in State - Sudama [13/06/2020]
      let fulldetails = this.state.matchDetails;
      fulldetails.push(currentBallDetails);

      this.setState({
        currentBallScore: currentScore,
        ballCount: updatedBallCount,
        overCount: updatedOverCount,
        matchDetails: fulldetails
      })
    }
  }

  // Method to Start the Match
  startMatch = () => {
    this.setState({
      btnDisabled : true
    })
    matchInterval = setInterval(() => this.generateScore(), 1000)
  }

  // To toggle the display of details - Sudama [13/06/2020]
  viewDetailsToggleHandler = () => {
    this.setState({
      viewDetails: !this.state.viewDetails
    })
  }

  render() {
    return (
      // Code to Display Score Board to user - Sudama [12/06/2020]
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center" style={{minHeight: '100vh'}}>
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
              {/* Button to toggle details - Sudama [13/06/2020] */}
              <button className="btn btn-primary m-auto start_match_btn" onClick={() => this.viewDetailsToggleHandler()}>{this.state.viewDetails ? "Hide Details" : "View Details" }</button>
            </div>
          </div>
        </div>
        {/* Container to display Batsman Score Board - Sudama [13/06/2020] */}
        <div className="batsman_score_card p-3">
          <div className="container-fluid">
            <div className="row mb-3">
              <h2 className="m-auto">Batsman Score Details</h2>
            </div>
            <div className="row">
              <table className="table table-sm table-bordered full_data_table">
                <thead>
                  <tr>
                    <th scope="col">Batsman Name</th>
                    <th scope="col" className="m-auto">R</th>
                    <th scope="col" className="m-auto">B</th>
                    <th scope="col" className="m-auto">4s</th>
                    <th scope="col" className="m-auto">6s</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Display the Data From Batsman Details Array */}
                  {this.state.batsmanDetails?.map((batsmandata, index) => (
                    <tr key={"player" + index}>
                      <td>{batsmandata.batsmanName}</td>
                      <td>{batsmandata.runs}</td>
                      <td>{batsmandata.balls}</td>
                      <td>{batsmandata.fours}</td>
                      <td>{batsmandata.sixs}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Total Score</th>
                    <td colSpan="4">{this.state.totalScore}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* To display the Full Details of the Match - Sudama [13/06/2020] */}
        {this.state.viewDetails ? 
        <div className="full_match_details_container">
          <div className="container-fluid">
            <div className="row mb-3">
              <h1 className="m-auto">Match Full Details</h1>
            </div>
            <div className="row">
              <div className="table-responsive">
                <table className="table table-bordered full_data_table">
                  <thead>
                    <tr>
                      <th scope="col">Over</th>
                      <th scope="col">Ball</th>
                      <th scope="col">Type</th>
                      <th scope="col">Extra</th>
                      <th scope="col">Total Extra</th>
                      <th scope="col">Striker</th>
                      <th scope="col">Non Striker</th>
                      <th scope="col">Total Run</th>
                      <th scope="col">Total Wicket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Displaying Data from Match Details - Sudama [13/06/2020] */}
                    {this.state.matchDetails?.map((data, index) => (
                      <tr key={"data"+index}>
                        <td>{data.overNo}</td>
                        <td>{data.ballNo}</td>
                        <td>{data.run}</td>
                        <td>{data.extra}</td>
                        <td>{data.totalExtra}</td>
                        <td>{data.stricker}</td>
                        <td>{data.non_stricker}</td>
                        <td>{data.totalRun}</td>
                        <td>{data.totalWickets}</td>
                      </tr>
                    ))}
                    <tr>
                      <th scope='row' colSpan='6'>Total Score</th>
                      <td colSpan='3'>{this.state.totalScore}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        : null}
        </div>
      </div>
    )
  }
}

export default CricketHome;