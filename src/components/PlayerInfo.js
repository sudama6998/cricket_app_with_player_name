import React, { Component } from 'react';
import '../assests/styles/PlayerInfo.css';
import ReusableInputField from '../ReusableComponent/ReusableInputField';

class PlayerInfo extends Component {
  state = {
    playerNames : ["","","","","","","","","","",""]
  }

  // Method to handle the onchange for input field - Sudama [13/06/2020]
  onInputChage = (event, index) => {
    let playernames = [...this.state.playerNames];
    playernames[index] = event.target.value;

    this.setState({
      playerNames : playernames
    })
  }

  // Method When User Click Submit - Sudama [13/06/2020]
  onSubmitClick = () => {
    let inputEmpty = true; // For Validating the input field should not be empty - Sudama [13/06/2020]
    for( let i=0; i < this.state.playerNames.length; i++) {
      // If the Input Field is Empty then break the loop - Sudama [13/06/2020]
      if(this.state.playerNames[i] === '') {
        inputEmpty = true;
        break;
      } else { // Else Update the value in localstorage - Sudama [13/06/2020]
        localStorage.setItem(`player${i}`,this.state.playerNames[i])
        inputEmpty = false;
      }
    }

    // If any input field found empty then provide alert and clear the local storage - Sudama [13/06/2020]
    if(inputEmpty) {
      alert('Please Fill All Input Field');
    } else { // Else Move to next page - Sudama [13/06/2020]
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      // Player Name Input Form - Sudama [13/06/2020]
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center" style={{minHeight: '100vh'}}>
          <div className="player_details_input p-3">
            <div className="container-fluid">
              <div className="row">
                <h1 className="m-auto">Enter Players Name</h1>
              </div>
              {/* Form Starts Here - Sudama [13/06/2020] */}
              <div className="w-100 my-4">
                {this.state.playerNames?.map((data, index) => (
                  <ReusableInputField
                    key={index}
                    id={`player${index+1}`}
                    index={index}
                    type='text'
                    placeholder='Enter Name'
                    onchange={(event) => this.onInputChage(event, index)}
                    value={this.state.playerNames[index]}
                  />
                ))}
              </div>
              {/* Form Ends Here - Sudama [13/06/2020] */}
              {/* Button to Submit Form - Sudama [13/06/2020] */}
              <div className="row">
                <button className='btn btn-primary m-auto' style={{width: '60%', marginTop: '20px', marginBottom: '30px !important'}} onClick={() => this.onSubmitClick()}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerInfo;