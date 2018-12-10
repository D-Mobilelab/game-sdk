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
// import { setLetters } from '../../actions/gameover-actions';
import theme from './styles/default';
import './styles/globalcss';

// const BandaiButton = withTheme(MaterialButton, bandaiTheme);
const Overlay = styled.div`
  display: ${props => ((props.visible === true) ? 'block' : 'none')};
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 899;
  background-color: ${props => props.theme.entername.overlay.background};
  opacity: ${props => props.theme.entername.overlay.opacity};
`;

const Frame = styled.div`
  padding: 5%;
  text-align: center;
  position: relative;
  z-index: 900;
  max-width: 740px;
  margin: 0px auto;
  margin-top:${props => ((props.visible === true) ? '0px' : '-195px')};
  transition: margin-top 0.5s ease;
`;

const Container = styled.div`
  height: 160px;
  width: 100%;
  background-color: ${props => props.theme.entername.container.background};
  border-radius: ${props => props.theme.entername.container.radius};
  border: ${props => props.theme.entername.container.border};
  font-family: ${props => props.theme.entername.container.font_family};
  box-sizing: border-box;
  padding:10px;
`;

const Title = styled.div`
  color: ${props => props.theme.entername.title.color};
  text-transform: uppercase;
  text-align: center;
  padding: 5px 0;
`;

const Layout = styled.div`
  display:table;
  margin:0px auto;
  width: 100%;
  margin-top: 15px;
`;

const Left = styled.div`
  display:table-cell;
  vertical-align:middle;
`;

const Right = styled.div`
  display:table-cell;
  vertical-align:middle;
`;

const Module = styled.div`
  text-align:center;
  padding:10px;
`;

const Letter = styled.input`
  display: inline-block;
  font-family: inherit;
  margin: 0 1px 0 0;
  padding: 0;
  border: 0;
  width: 30px;
  -webkit-appearance: none;
  border-radius: 0;
  box-shadow: none;
  text-transform: uppercase;
  text-align: center;
  font-size: 35px;
  color: ${props => props.theme.entername.letters.color};
  background: ${props => props.theme.entername.letters.background};
  border-bottom: ${props => props.theme.entername.letters.border_bottom};
`;

const Save = styled.button`
  text-align: center;
  padding: 10px;
  border: 0px;
  background-color:${props => props.theme.entername.button.background};
  color:${props => props.theme.entername.button.color};
  text-transform: uppercase;
  width: 120px;
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
`;

export class EnterName extends Component {
  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.serializeForm = this.serializeForm.bind(this);
    this.state = {
      dismiss: false,
      focusOn: 0,
      letters: [null, null, null],
      placeholder: 'a',
    };
  }

  componentDidMount() {
    this.currentAlias = sessionStorage.getItem('gfsdk-alias-name');
    if (this.currentAlias) {
      this.props.actions.setLetters(this.currentAlias.split(''));
    }
  }

  serializeForm() {
    const elements = [].slice.call(this.refs.myForm);
    const alias = elements
      .filter(element => element.type === 'text')
      .map(element => (element.value === '' ? this.state.placeholder : element.value))
      .join('');
    return alias;
  }

  onClick() {
    const name = this.serializeForm();
    // Save in storage and in state only if different from default
    if (name !== 'aaa') {
      this.props.actions.setLetters(name.split(''));
      this.setState({ letters: name.split('') });
      sessionStorage.setItem('gfsdk-alias-name', name);
    }
    // this.props.onSubmit(name, this.state.focusOn);
    this.props.actions.registerScore(name, this.state.focusOn);
    this.setState({ focusOn: 0 });
  }

  // onSubmit(e, alias, inputFocus) {
  onSubmit(e) {
    e.preventDefault();
    // this.props.actions.registerScore(alias, inputFocus);
  }

  onKeyUp(e) {
    const key = e.keyCode || e.which || e.charCode;
    if (key === 8) {
      // on delete
      console.log(`Delete key ${key} ${String.fromCharCode(key)}`);
      if (this.state.focusOn > 0) {
        this.setState({ focusOn: this.state.focusOn - 1 }, () => {
          this[`input${this.state.focusOn}`].focus();
        });
      }
    } else {
      // On input
      if (this.state.focusOn < this.state.letters.length - 1) {
        this.setState({ focusOn: this.state.focusOn + 1 }, () => {
          // Switch focus to next input
          this[`input${this.state.focusOn}`].focus();
        });
      } else {
        // give the focus to the button!
        this[`input${this.state.focusOn}`].blur();
      }
    }
  }

  onInputFocus(e) {
    try {
      e.target.value = '';
      const inputOnFocusNumber = parseInt(e.target.id.split('_')[1], 10);
      this.setState({ focusOn: inputOnFocusNumber });
    } catch (e) {}
  }

  render() {
    const themeClass = merge(theme, this.props.styles);

    return (
      <ThemeProvider theme={themeClass}>
        <div>
          <Overlay visible={this.props.show}/>
          <Frame visible={this.props.show}>
            <Container>
              <form ref='myForm' onKeyUp={this.onKeyUp} onSubmit={this.onSubmit}>
                <Title>Inserisci le tue iniziali</Title>
                <Layout>
                  <Left>
                    <Module>
                      {
                        this.props.letters.map((letter, i) => (
                      <Letter
                        onFocus={this.onInputFocus}
                        id={`input_${i}`}
                        key={`input_${i}`}
                        ref={(ref) => { this[`input${i}`] = ref; }}
                        type='text'
                        maxLength='1'
                        autoComplete='off'
                        defaultValue={letter}
                        placeholder='a'
                      />))
                      }
                    </Module>
                  </Left>
                  <Right>
                    <Save onClick={this.onClick}>Enter</Save>
                  </Right>
                </Layout>
              </form>
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
                  this.state.letters.map((letter, i) => (
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
                      />))
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
  onSubmit () { },
  onDismiss () { },
  show: false,
  loading: false,
};
