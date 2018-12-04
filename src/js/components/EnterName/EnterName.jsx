// import React, { Component } from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import MaterialButton from '../MaterialButton/MaterialButton';
// import bandaiTheme from '../MaterialButton/theme/bandai.css';
// import withTheme from '../withTheme';
// import transitions from './transitions.css';
// import css from './enterName.css';

import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider } from 'styled-components';
import { sessionStorage } from '../../lib/LocalStorage';
import { setLetters } from '../../actions/gameover-actions';
import theme from './styles/default';
import './styles/globalcss';

// const BandaiButton = withTheme(MaterialButton, bandaiTheme);
const Overlay = styled.div`
  display: ${props => (props.visible === true) ? 'block' : 'block'};
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: ${props => props.theme.overlay.background};
  opacity: ${props => props.theme.overlay.opacity};
`;

const Frame = styled.div`
  display: ${props => (props.visible === true) ? 'block' : 'block'};
  padding: 5%;
  text-align: center;
  position: relative;
  z-index: 1001;
  max-width: 740px;
  margin: 0px auto;
`;

const Container = styled.div`
  height: 300px;
  width: 100%;
  background-color: ${props => props.theme.container.background};
  border-radius: ${props => props.theme.container.radius};
  border: ${props => props.theme.container.border};
  font-family: ${props => props.theme.container.font_family};
  box-sizing: border-box;
  padding:10px;
`;

const Title = styled.div`
  text-align:center;
  padding:10px;
`;

const Module = styled.div`
  text-align:center;
  padding:10px;
`;

const Save = styled.button`
  text-align:center;
  padding:10px;
  background-color:#000;
  color:#fff;
`;

export class EnterName extends Component {
  constructor(props) {
    super(props);
    // this.onKeyUp = this.onKeyUp.bind(this);
    // this.onInputFocus = this.onInputFocus.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    // this.serializeForm = this.serializeForm.bind(this);
    // this.state = {
    //   dismiss: false,
    //   focusOn: 0,
    //   letters: [null, null, null],
    //   placeholder: 'a',
    // };
  }

  componentDidMount() {
    this.currentAlias = sessionStorage.getItem('gfsdk-alias-name');
    this.currentAlias = 'ALE';
    if (this.currentAlias) {
      this.props.actions.setLetters(this.currentAlias.split(''));
    }
  }

  // serializeForm() {
  //   /** serialize the form */
  //   const elements = [].slice.call(this.refs.myForm);
  //   const alias = elements
  //     .filter(element => element.type === 'text')
  //     .map(element => element.value === '' ? this.state.placeholder : element.value)
  //     .join('');
  //   return alias;
  // }

  onClick() {
    // const name = this.serializeForm();
    const name = 'ugo';
    // Save in storage and in state only if different from default
    if (name !== 'aaa') {
      // this.setState({ letters: name.split('') });
      this.props.actions.setLetters(name.split(''));
      sessionStorage.setItem('gfsdk-alias-name', name);
    }
    // this.props.onSubmit(name, this.state.focusOn);
    // this.setState({ focusOn: 0 });
  }

  // onSubmit(e) {
  //   /**
  //    * iOS safari can't process correctly the submit
  //    */
  //   e.preventDefault();
  // }

  // onKeyUp(e) {
  //   const key = e.keyCode || e.which || e.charCode;
  //   // const inputValue = this[`input${this.state.focusOn}`].value;
  //   // on delete go backwards
  //   // 8 is delete
  //   const character = String.fromCharCode(key);
  //   if (key === 8) {
  //     console.log(`Delete key ${key} ${String.fromCharCode(key)}`);
  //     // on delete
  //     if (this.state.focusOn > 0) {
  //       this.setState({ focusOn: this.state.focusOn - 1 }, () => {
  //         // Switch focus to previous input
  //         // console.log("previous focus", this.state);
  //         this[`input${this.state.focusOn}`].focus();
  //       });
  //     }
  //   } else {
  //     // On input
  //     if (this.state.focusOn < this.state.letters.length - 1) {
  //       this.setState({ focusOn: this.state.focusOn + 1 }, () => {
  //         // Switch focus to next input
  //         // console.log("next focus", this.state);
  //         this[`input${this.state.focusOn}`].focus();
  //       });
  //     } else {
  //       // give the focus to the button?
  //       this[`input${this.state.focusOn}`].blur();
  //     }
  //   }
  // }

  // onInputFocus(e) {
  //   try {
  //     e.target.value = '';
  //     const inputOnFocusNumber = parseInt(e.target.id.split('_')[1], 10);
  //     this.setState({ focusOn: inputOnFocusNumber });
  //   } catch (e) {}
  // }

  render() {
    const themeClass = merge(theme, this.props.styles.styles);

    return (
      <ThemeProvider theme={themeClass}>
      <div>
        <Overlay visible={this.props.show}/>
        <Frame visible={this.props.show}>
          <Container>
            <Title>Inserisci il tuo nome</Title>
            <Module>
              {
                this.props.letters.map((letter, i) => {
                  return (
                    <input
                      id={`input_${i}`}
                      key={`input_${i}`}
                      ref={(ref) => { this[`input${i}`] = ref; }}
                      type='text'
                      maxLength='1'
                      autoComplete='off'
                      defaultValue={letter}
                      placeholder='a'
                    />)
                })
              }
            </Module>
            <Save onClick={this.onClick}>Continue</Save>
        </Container>
        </Frame>
      </div>
      </ThemeProvider>
    );
  }

  render2() {
    return (
      <div className={css.container} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>        
        <button className={css.closeButton} onClick={this.props.onDismiss}></button>
        <div className={css.title}>{this.props.title}</div>
        <div className={css.formContainer}>
          <form className={css.form} ref='myForm' onKeyUp={this.onKeyUp} onSubmit={this.onSubmit}>
            <div className={css.element}>
              <div className={css.inputBlock}>
                {
                  this.state.letters.map((letter, i) => {
                    return (
                      <input onFocus={this.onInputFocus}
                        className={css.inputLetter}
                        id={`input_${i}`}
                        key={`input_${i}`}
                        ref={(ref) => { this[`input${i}`] = ref; }}
                        type='text'
                        maxLength='1'
                        autoComplete='off'
                        defaultValue={letter}
                        placeholder={this.state.placeholder}
                      />)
                  })
                }
              </div>
            </div>
            <div className={css.element}>
              <BandaiButton ref='submitButton' type='button' isLoading={this.props.loading} disabled={this.props.loading} onClick={this.onClick}>
                {this.props.buttonLabel.toUpperCase()}
              </BandaiButton>
            </div>
          </form>
        </div>
      </div>
    );
  }

//   render() {
//     return (
//       <ReactCSSTransitionGroup
//         transitionAppear={true}
//         transitionAppearTimeout={600}
//         transitionEnterTimeout={600}
//         transitionLeaveTimeout={1200}
//         transitionName={transitions}>
//         {(this.props.show) ? this.returnComponent() : null}
//       </ReactCSSTransitionGroup>
//     )
//   }
}

export default EnterName;

EnterName.defaultProps = {
  title: '',
  buttonLabel: '',
  onSubmit: function () { },
  onDismiss: function () { },
  show: false,
  loading: false,
};
