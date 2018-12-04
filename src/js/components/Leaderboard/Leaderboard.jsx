import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/default';
import './styles/globalcss';


const Overlay = styled.div`
  display: ${props => (props.visible === true) ? 'block' : 'none'};
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: ${props => props.theme.overlay.background};
  opacity: ${props => props.theme.overlay.opacity};
`;

const Frame = styled.div`
  display: ${props => (props.visible === true) ? 'block' : 'none'};
  padding: 5%;
  text-align: center;
  position: relative;
  z-index: 1001;
  max-width: 740px;
  margin: 0px auto;
`;

const Container = styled.div`
  height: 500px;
  width: 100%;
  background-color: ${props => props.theme.container.background};
  border-radius: ${props => props.theme.container.radius};
  border: ${props => props.theme.container.border};
  font-family: ${props => props.theme.container.font_family};
  box-sizing: border-box;
  padding:10px;

`;

const ScoreTitle = styled.div`
  text-transform: uppercase;
  font-size: 1.4em;
  text-align: center;
  font-weight:bold;
`;

const ScoreContainer = styled.div`
  display:table;
  margin:0px auto;
`;

const ArrowLeft = styled.div`
  display:table-cell;
  vertical-align:middle;
  &:after{
    width: 15px;
    height: 0px;
    border-top:8px solid transparent;
    border-left:8px solid black;
    border-right:8px solid transparent;
    border-bottom:8px solid transparent;
    display:block;
    content:"";
  }
`;

const YourScore = styled.div`
  text-align: center;
  font-size:2em;
  display:table-cell;
  vertical-align:middle;
  width: 110px;
`;

const ArrowRight = styled.div`
  display:table-cell;
  vertical-align:middle;
  &:after{
    width: 15px;
    height: 0px;
    border-top:8px solid transparent;
    border-left:8px solid transparent;
    border-right:8px solid black;
    border-bottom:8px solid transparent;
    display:block;
    content:"";
    }
`;

const HighScoreTitle = styled.div`
  margin-top: 20px;
  clear: both;
  font-size: 1.3em;
  font-weight: bold;
`;

const HighScoreList = styled.div`
  display:table;
  border-top:solid thin #000000;
  border-bottom:solid thin #000000;
  padding-top:10px;
  padding-bottom:10px;
  width:100%;
`;


const Divider = styled.div`
  margin-top: 10px;
  >span{
    width: 10px;
    height: 10px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    background: #000000;
    margin: 10px;
    display: inline-block;
  }
`;

const ScoreListRow = styled.div`
  display:table-row;
  &:first-child{
    font-size: 1.5em;

  }
`;

const Position = styled.div`
  display:table-cell;
  text-align:left;
  text-transform: uppercase;
`;

const Score = styled.div`
  display:table-cell;  
  text-align:right;
`;

const Name = styled.div`
  display:table-cell;
  text-align:right;
  text-transform: uppercase;
`;

const Message = styled.div`
  text-align:center;
  text-transform: uppercase;
  margin-top:20px;
  margin-bottom:20px;
`;

const PlayAgain = styled.button`
  background-color: ${props => props.theme.play.background};
  color: ${props => props.theme.play.color};
  border-radius: 25px;
  height: 40px;
  line-height: 40px;
  border: none;
  text-transform: uppercase;
  font-size: 1.2em;
  width: 200px;
`;




export class Leaderboard extends Component {
  
  constructor(props) {
    super(props);
    this.handleReplay = this.handleReplay.bind(this);
  }

  handleReplay(evt) {
    evt.preventDefault();
    this.props.actions.startSession();
  }

  render() {
    const themeClass = merge(theme, this.props.styles.styles);

    return (
      <ThemeProvider theme={themeClass}>
      <div>
        <Overlay visible={this.props.show}/>
        <Frame visible={this.props.show}>
          <Container>
          <ScoreTitle>Your Score</ScoreTitle>
          <ScoreContainer>
            <ArrowLeft/>
              <YourScore>{this.props.score}</YourScore>
            <ArrowRight/>  
          </ScoreContainer>
          <HighScoreTitle>HIGH SCORE</HighScoreTitle> 
          <HighScoreList>

            <ScoreListRow>
              <Position>1st</Position>
              <Score>2.835</Score>
              <Name>STE</Name>
            </ScoreListRow>

            <ScoreListRow>
              <Position>2nd</Position>
              <Score>2.835</Score>
              <Name>STE</Name>
            </ScoreListRow>
            
            <ScoreListRow>
              <Position>3th</Position>
              <Score>2.835</Score>
              <Name>STE</Name>
            </ScoreListRow>
            
            <ScoreListRow>
              <Position>4th</Position>
              <Score>2.835</Score>
              <Name>STE</Name>
            </ScoreListRow>
            
            <ScoreListRow>
              <Position>5th</Position>
              <Score>2.835</Score>
              <Name>STE</Name>
            </ScoreListRow>

          </HighScoreList>
          <Divider>
            <span></span>
            <span></span>
            <span></span>
          </Divider>
          <Message>Congratulations!<br/>play again and get the <br/>top of the ranking</Message>
          <PlayAgain  onClick={this.handleReplay}>Play Again</PlayAgain>
        </Container>
        </Frame>
      </div>
      </ThemeProvider>
    );
  }

}

export default Leaderboard;
