import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: 'Waiting...',
      resultColor: 'black',
  }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const openedItems = ['{','(','['];
    const closedItems = ['}',')',']'];
    let foundOpenedItems = [];
    let foundClosedItems = [];
    let stringSubmited = this.state.value;
    let result = this.state.result;
    let resultColor = this.state.resultColor;
    let flag = 1;

    for(let a=0; a<stringSubmited.length;a++){
      for(let b=0; b<3; b++){
        if(stringSubmited[a] === openedItems[b]){
          foundOpenedItems.push(openedItems[b]);
        }
        if(stringSubmited[a] === closedItems[b]){
          foundClosedItems.push(closedItems[b]);
          if(foundClosedItems.length>foundOpenedItems.length){
            result = 'Invlid string';
            flag = 0;
          }
        }
      }
    }

    if(foundOpenedItems.length > 0){
      for(let c=0; c<foundOpenedItems.length; c++){
        if(foundOpenedItems[c]==='{') {foundOpenedItems[c]='}';}
        if(foundOpenedItems[c]==='(') {foundOpenedItems[c]=')';}
        if(foundOpenedItems[c]==='[') {foundOpenedItems[c]=']';}
      }
    }

    if(foundOpenedItems.length <= 0 && foundClosedItems <= 0){
      result = 'Valid string';
    }

    if(foundOpenedItems.length === foundClosedItems.length && flag===1){
      for(let a=0, b=foundClosedItems.length-1; a<foundOpenedItems.length; a++, b--){
        if(foundClosedItems[b] === foundOpenedItems[a]){
          result = 'Valid string';
          break;
        }
        else{
          result = 'Invalid string';
          break;
        }
      }
    }
    else result = 'Invalid string';

    console.log('FOPI', foundOpenedItems.length);
    console.log('FCLI', foundClosedItems.length);
    if(result === 'Valid string'){
      resultColor = 'green';
    }
    if(result === 'Invalid string'){
      resultColor = 'red';
    }

    this.setState({result, value:'', resultColor});
    event.preventDefault();
  }

  render() {
    return (
     <div className='App' >
        <form onSubmit={this.handleSubmit} className='input' >
          <label>
            String:
            <input type="text" className='inputText' value={this.state.value} onChange={this.handleChange} placeholder = 'Write something here...' />
          </label>
          <input type="submit" value="Submit" className='button' />
        </form>
        <div className='result' >
          <label>result: </label>
          <span style={{color: this.state.resultColor}} className='resultSpan' >{this.state.result}</span>
        </div>
     </div>
    );
  }
}

export default App;
