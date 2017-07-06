import React from 'react';
import css from './style.css';

export default class EnterName extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      focusOn:0,
      letters: ['a','a','a']
    }
  }

  componentDidMount(){
    this.input0.focus();
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submit", e);
  }

  onKeyUp(e) {
    const key = e.keyCode || e.which || e.charCode;
    const inputValue = e.target.value;
    // on delete go backwards
    // I need to check the delete key press 
    //like this because an issue on mobile chrome etc
    if (inputValue === '') {
      if (this.state.focusOn > 0) {
        this.setState({ ...this.state, focusOn: this.state.focusOn - 1 }, () => { 
          //Switch focus to previous input
          console.log("previous focus", this.state);
          this[`input${this.state.focusOn}`].focus();
        });
      }
    } else {
      if (this.state.focusOn + 1 < this.state.letters.length) {
        this.setState({ ...this.state, focusOn: this.state.focusOn + 1 }, () => { 
          //Switch focus to next input
          console.log("next focus", this.state);
          this[`input${this.state.focusOn}`].focus();
        });
      } else {
        //give the focus to the button?
        console.log("focus to the button");        
      }
    }
  }

  onFocus(e) {    
    try {
      e.target.value = '';
      const inputOnFocusNumber = parseInt(e.target.id.split('_')[1]);
      this.setState({ ...this.state, focusOn: inputOnFocusNumber });
    } catch(e) { }
  }

  render() {
    return (
      <div className={css.container}>
        <div className={css.title}>{this.props.title}</div>
        <form onKeyUp={this.onKeyUp} onSubmit={this.onSubmit}>
          {
            this.state.letters.map((letter, i) => {
              return (
              <input onFocus={this.onFocus}
                className={css.inputLetter}
                id={`input_${i}`} 
                key={i} 
                ref={(ref) => { this[`input${i}`] = ref; }} 
                type="text" 
                maxLength="1" 
                autoComplete="off"
                placeholder={letter}
              />)
            })
          }
          <button ref='submitButton' type="submit">{this.props.buttonLabel}</button>
        </form>
      </div>
    )
  }
}
