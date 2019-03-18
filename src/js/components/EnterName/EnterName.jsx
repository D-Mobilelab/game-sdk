import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider, css, keyframes } from 'styled-components';
import { sessionStorage } from '../../lib/LocalStorage';
import theme from './styles/default';

const animationIn = keyframes`
    0%   {
      opacity: 0;
      transform: translateY(-250px);
      display:none;
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
`;

const animationInRule = css`
  ${animationIn} 600ms cubic-bezier(.67,1.99,.64,.6) forwards;
`;

const Overlay = styled.div`
  display: ${props => ((props.visible === true) ? 'block' : 'none')};
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 8100;
  background-color: ${props => props.theme.entername.overlay.background};
  opacity: ${props => props.theme.entername.overlay.opacity};
`;

const Frame = styled.div`
  animation: ${props => ((props.visible === true) ? animationInRule : 'none')};
  padding: 5%;
  text-align: center;
  position: relative;
  z-index: 8101;
  max-width: 450px;
  margin: 0px auto;
  transform: translateY(-250px);
  display:${props => ((props.visible === true) ? 'block' : 'none')};
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
`;

const Container = styled.div`
  height: 160px;
  width: 100%;
  background: ${props => props.theme.entername.container.background};
  background-color: ${props => props.theme.entername.container.backgroundColor};
  background-repeat: ${props => props.theme.entername.container.backgroundRepeat};
  border-radius: ${props => props.theme.entername.container.radius};
  border: ${props => props.theme.entername.container.border};
  border-image: ${props => props.theme.entername.container.borderImage};
  font-family: ${props => props.theme.entername.container.fontFamily};
  box-sizing: border-box;
  padding:10px;
`;

const CloseX = styled.span`
  position: relative;
  top:  ${props => props.theme.entername.close_x.top};
  right:  ${props => props.theme.entername.close_x.right};
  text-align: right;
  font-size: 1.2em;
  display: inline-block;
  color: #ffffff;
  width: 100%;
  display: inline-block;
  fill: ${props => props.theme.entername.close_x.color};
  margin-bottom: 5px;
  margin-top: 5px;
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

const Form = styled.form`
  margin-top: -27px;
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
  background:${props => props.theme.entername.button.background};
  background-color:${props => props.theme.entername.button.backgroundColor};
  color:${props => props.theme.entername.button.color};
  font-family: ${props => props.theme.entername.button.fontFamily};
  text-transform: uppercase;
  width: 120px;
  font-size: 20px;
  border-radius: ${props => props.theme.entername.button.borderRadius};
  &:focus{
      outline: none;
  }
`;

export class EnterName extends Component {
  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
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
    if (name !== 'aaa') {
      this.props.actions.setLetters(name.split(''));
      this.setState({ letters: name.split('') });
      sessionStorage.setItem('gfsdk-alias-name', name);
    }
    this.props.actions.registerScore(name, this.state.focusOn);
    this.setState({ focusOn: 0 });
  }

  onSubmit(e) {
    e.preventDefault();
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

  onClose(evt) {
    evt.preventDefault();
    this.props.actions.hideEnterNameModal();
    this.props.actions.startSession();
  }

  render() {
    const themeClass = merge(theme, this.props.styles);

    return (
      <ThemeProvider theme={themeClass}>
        <div>
          <Overlay visible={this.props.show}/>
          <Frame visible={this.props.show}>
            <Container data-mipqa="enterName">
              <CloseX onClick={this.onClose}>
              <svg width="20" height="20">
							  <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
						  </svg>
              </CloseX>
              <Form ref='myForm' onKeyUp={this.onKeyUp} onSubmit={this.onSubmit}>
                <Title>{this.props.dictionary.WEBAPP_GAMEOVER_INSERT_ALIAS}</Title>
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
                        data-mipqa={`input_${i}`}
                      />))
                      }
                    </Module>
                  </Left>
                  <Right>
                    <Save data-mipqa="saveName" onClick={this.onClick}>{this.props.dictionary.WEBAPP_GAMEOVER_INSERT_ALIAS_BUTTON}</Save>
                  </Right>
                </Layout>
              </Form>
            </Container>
          </Frame>
        </div>
      </ThemeProvider>
    );
  }
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
