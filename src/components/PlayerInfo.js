import React, { Component } from 'react';
import '../assests/styles/PlayerInfo.css';
import ReusableInputField from '../ReusableComponent/ReusableInputField';

class PlayerInfo extends Component {
  state = {
    playerNames : ["","","","","","","","","","",""]
  }

  componentDidMount = () => {
    localStorage.clear();
  }

  onInputChage = (event, index) => {
    let playernames = [...this.state.playerNames];
    playernames[index] = event.target.value;

    this.setState({
      playerNames : playernames
    })
  }

  onSubmitClick = () => {
    let inputEmpty = true;
    for( let i=0; i < this.state.playerNames.length; i++) {
      if(this.state.playerNames[i] === '') {
        inputEmpty = true;
        break;
      } else {
        localStorage.setItem(`player${i}`,this.state.playerNames[i])
        inputEmpty = false;
      }
    }

    if(inputEmpty) {
      alert('Please Fill All Input Field');
      localStorage.clear();
    } else {
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center" style={{minHeight: '100vh'}}>
          <div className="player_details_input p-3">
            <div className="container-fluid">
              <div className="row">
                <h1 className="m-auto">Enter Players Name</h1>
              </div>
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
              <div className="row">
                <button className='btn btn-primary m-auto' onClick={() => this.onSubmitClick()}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerInfo;