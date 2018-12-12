import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider, css, keyframes } from 'styled-components';
import theme from './styles/default';
import './styles/globalcss';


const animationIn = keyframes`
    0%   {
      opacity: 0;
      transform: translateY(-250px);
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
  display: ${props => (props.visible === true) ? 'block' : 'none'};
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 899;
  background-color: ${props => props.theme.leaderboard.overlay.background};
  opacity: ${props => props.theme.leaderboard.overlay.opacity};
`;

const Frame = styled.div`
  animation: ${props => ((props.visible === true) ? animationInRule : 'none')};
  padding: 5%;
  text-align: center;
  position: relative;
  z-index: 900;
  max-width: 740px;
  margin: 0px auto;
  transform: translateY(-1000px);
`;

const Container = styled.div`
  height: 510px;
  width: 100%;
  background: ${props => props.theme.leaderboard.container.background};
  background-color: ${props => props.theme.leaderboard.container.backgroundColor};
  background-repeat: ${props => props.theme.leaderboard.container.backgroundRepeat};
  color: ${props => props.theme.leaderboard.container.color};
  border-radius: ${props => props.theme.leaderboard.container.radius};
  border: ${props => props.theme.leaderboard.container.border};
  border-image: ${props => props.theme.leaderboard.container.borderImage};
  font-family: ${props => props.theme.leaderboard.container.fontFamily};
  box-sizing: border-box;
  padding:10px;

`;

const ScoreTitle = styled.div`
  text-transform: uppercase;
  font-size: 1.4em;
  text-align: center;
  font-weight:bold;
  color: ${props => props.theme.leaderboard.title.color};
`;

const ScoreContainer = styled.div`
  display:table;
  margin:0px auto;
  margin-top: 10px;
`;

const ArrowLeft = styled.div`
  display:table-cell;
  vertical-align:middle;
  &:after{
    width: 15px;
    height: 0px;
    border-top:8px solid transparent;
    border-left:8px solid #000000;
    border-left-color: ${props => props.theme.leaderboard.arrow.color};
    border-right:8px solid transparent;
    border-bottom:8px solid transparent;
    display:block;
    content:"";
    color: #ffffff;
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
    border-right:8px solid #000000;
    border-right-color: ${props => props.theme.leaderboard.arrow.color};
    border-bottom:8px solid transparent;
    display:block;
    content:"";
    color: #ffffff;
    }
`;

const HighScoreTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
  clear: both;
  font-size: 1.3em;
  font-weight: bold;
  text-transform: uppercase;
  color:  ${props => props.theme.leaderboard.table_score.title_color};
`;

const HighScoreList = styled.div`
  display:table;
  border-top:solid thin #000000;
  border-top-color: ${props => props.theme.leaderboard.table_score.border_top_color};
  border-bottom:solid thin #000000;
  border-bottom-color: ${props => props.theme.leaderboard.table_score.border_bottom_color};
  padding-top:10px;
  padding-bottom:10px;
  width: 90%;
  margin-left: 15px;
`;


const Divider = styled.div`
  margin-top: 10px;
  >span{
    width: 10px;
    height: 10px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    background: ${props => props.theme.leaderboard.divider.color};
    margin: 10px;
    display: inline-block;
  }
`;

const ScoreListRow = styled.div`
  display:table-row;
  height: 25px;
  &:first-child{
    font-size: 1.5em;
    color: ${props => props.theme.leaderboard.table_score.first_row_color};
    height: 30px;
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
  margin-top:5px;
  margin-bottom:20px;
  color: ${props => props.theme.leaderboard.message.color};
`;

const PlayAgain = styled.button`
  background-color: ${props => props.theme.leaderboard.button.background};
  color: ${props => props.theme.leaderboard.button.color};
  font-family: ${props => props.theme.leaderboard.button.font_family};
  border-radius: ${props => props.theme.leaderboard.button.borderRadius};
  height: 40px;
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
    const themeClass = merge(theme, this.props.styles);

    return (
      <ThemeProvider theme={themeClass}>
      <div>
        <Overlay visible={this.props.show}/>
        <Frame visible={this.props.show}>
          <Container>
          <ScoreTitle>{this.props.dictionary.WEBAPP_GAMEOVER_YOUR_SCORE}</ScoreTitle>
          <ScoreContainer>
            <ArrowLeft/>
              <YourScore>{this.props.score}</YourScore>
            <ArrowRight/>
          </ScoreContainer>
          <HighScoreTitle>{this.props.dictionary.WEBAPP_GAMEOVER_HIGH_SCORE}</HighScoreTitle>
          <HighScoreList>

            {this.props.positions.map(function(position, i){
                return <ScoreListRow><Position>{i+1}{(i===0)?'st':(i===1)?'nd':(i===2)?'rd':'th'}</Position><Score>{position.score}</Score><Name>{position.player_name}</Name></ScoreListRow>;
                return <ObjectRow obj={object} key={i} />;
            })}

          </HighScoreList>
          <Divider>
            <span></span>
            <span></span>
            <span></span>
          </Divider>
          <Message dangerouslySetInnerHTML={{ __html: this.props.dictionary.WEBAPP_GAMEOVER_MESSAGE }} />
          <PlayAgain  onClick={this.handleReplay}>{this.props.dictionary.WEBAPP_REPLAY}</PlayAgain>
        </Container>
        </Frame>
      </div>
      </ThemeProvider>
    );
  }

}

export default Leaderboard;
