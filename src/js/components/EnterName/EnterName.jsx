import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import css from './style.css';
import transitions from './transitions.css';

export default class EnterName extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      focusOn: 0,
      letters: ['a','a','a'],
      placeholder: 'a'
    }
  }

  componentDidMount() {
    this.input0.focus();
  }  

  onSubmit(e) {
    e.preventDefault();
    const elements = [].slice.call(this.refs.myForm);
    const alias = elements
        .filter((element) => element.type === 'text')
        .map((element) => element.value === '' ? this.state.placeholder : element.value)
        .join('');
    this.props.onSubmit(alias);
  }

  onKeyUp(e) {
    const key = e.keyCode || e.which || e.charCode;
    const inputValue = this[`input${this.state.focusOn}`].value;
    // on delete go backwards
    // I need to check the delete key press 
    // like this because an issue on mobile chrome etc    
    if (inputValue === '') {
      // on delete
      if (this.state.focusOn > 0) {
        this.setState({ ...this.state, focusOn: this.state.focusOn - 1 }, () => {
          // Switch focus to previous input
          //console.log("previous focus", this.state);
          this[`input${this.state.focusOn}`].focus();
        });
      }
    } else {
      // on input
      if (this.state.focusOn < this.state.letters.length - 1) {
        this.setState({ ...this.state, focusOn: this.state.focusOn + 1 }, () => { 
          // Switch focus to next input
          // console.log("next focus", this.state);
          this[`input${this.state.focusOn}`].focus();
        });
      } else {
        // give the focus to the button?        
      }
    }
  }

  onInputFocus(e) {
    try {
      e.target.value = '';   
      const inputOnFocusNumber = parseInt(e.target.id.split('_')[1]);
      this.setState({ ...this.state, focusOn: inputOnFocusNumber });
    } catch(e) { }
  }

  returnComponent() {
    return (
      <div className={css.container}>
              <div className={css.title}>{this.props.title}</div>
                <div className={css.formContainer}>
                  <form ref='myForm' onKeyUp={this.onKeyUp} onSubmit={this.onSubmit}>
                      <div className={css.element}>
                        <div className={css.inputBlock}>
                        {
                          this.state.letters.map((letter, i) => {
                            return (
                              <input onFocus={this.onInputFocus}
                                className={css.inputLetter}
                                id={`input_${i}`} 
                                key={i} 
                                ref={(ref) => { this[`input${i}`] = ref; }} 
                                type='text'
                                maxLength='1'
                                autoComplete='off'
                                placeholder={this.state.placeholder}                                       
                              />)
                          })
                        }
                        </div>                      
                      </div>
                      <div className={css.element}>
                        <button ref='submitButton' type="submit">{this.props.buttonLabel.toUpperCase()}</button>                    
                      </div>
                  </form>
                </div>                
      </div>);
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={400}
        transitionEnterTimeout={400}
        transitionLeaveTimeout={600}
        transitionName={transitions}>
        {this.props.show ? this.returnComponent() : null}
      </ReactCSSTransitionGroup>
    )
  }
}
