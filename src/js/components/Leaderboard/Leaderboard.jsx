import React, { Component } from 'react';
import merge from 'deepmerge';
import styled, { ThemeProvider, css, keyframes } from 'styled-components';
import theme from './styles/default';
// import './styles/globalcss';


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
  display: ${props => ((props.visible === true) ? 'block' : 'none')};
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 8100;
  background-color: ${props => props.theme.leaderboard.overlay.background};
  opacity: ${props => props.theme.leaderboard.overlay.opacity};
`;

const Frame = styled.div`
  animation: ${props => ((props.visible === true) ? animationInRule : 'none')};
  display:${props => ((props.visible === true) ? 'block' : 'none')};
  padding: 5%;
  text-align: center;
  position: fixed;
  z-index: 8101;
  max-width: 450px;
  margin: 0px auto;
  transform: translateY(-1200px);
  overflow-y: scroll;
  height: 90vh;
  top: 0px;
  left: 0px;
  right: 0px;
`;

const Container = styled.div`
  height: ${props => ((props.showReplayButton === true) ? '500px' : '450px')};
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
`;

const Top = styled.div`
  margin:0px;
  background: ${props => props.theme.leaderboard.top.background};
  padding: 10px 10px 0px 10px;
  `;
  
  const Bottom = styled.div`
  margin:0px;
  background: ${props => props.theme.leaderboard.bottom.background};
  padding: 10px 10px 13px 10px;
`;

const CloseX = styled.span`
  position: relative;
  top:  ${props => props.theme.leaderboard.close_x.top};
  right:  ${props => props.theme.leaderboard.close_x.right};
  text-align: right;
  display: inline-block;
  color: #ffffff;
  width: 100%;
  display: inline-block;
  fill: ${props => props.theme.leaderboard.close_x.color};
  margin-bottom: 5px;
  margin-top: 5px;
`;

const ScoreTitle = styled.div`
  text-transform: uppercase;
  font-size: 1.4em;
  text-align: center;
  font-weight:bold;
  margin-top: -28px;
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
  font-size: ${props => props.theme.leaderboard.table_score.font_size};
  color: ${props => props.theme.leaderboard.table_score.color};
  &:first-child{
    font-size: 1.5em;
    color: ${props => props.theme.leaderboard.table_score.first_row_color};
    font-weight: ${props => props.theme.leaderboard.table_score.first_row_font_weight};
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
  height:85px;
  position: relative;
  color: ${props => props.theme.leaderboard.message.color};
  margin-top: -10px;
  >span{
    transform: translate(-50%, -50%);
    position:absolute;
    top:50%;
    left:50%;
    font-size: 0.96em;
    width:90%;
    text-transform: uppercase;
    }
`;

const PlayAgain = styled.button`
  background-color: ${props => props.theme.leaderboard.button.backgroundColor};
  background:  ${props => props.theme.leaderboard.button.background};
  color: ${props => props.theme.leaderboard.button.color};
  font-family: ${props => props.theme.leaderboard.button.fontFamily};
  border-radius: ${props => props.theme.leaderboard.button.borderRadius};
  height: 40px;
  border: none;
  text-transform: uppercase;
  font-size: 1.4em;
  width: 200px;
  display: ${props => ((props.showReplayButton === true) ? '' : 'none')};
`;


export class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.handleReplay = this.handleReplay.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  handleReplay(evt) {
    evt.preventDefault();
    this.props.actions.startSession();
  }

  onClose(evt) {
    evt.preventDefault();
    this.props.actions.hideLeaderboard();
    this.props.actions.startSession();
  }

  render() {
    const themeClass = merge(theme, this.props.styles);

    return (
      <ThemeProvider theme={themeClass}>
        <div>
          <Overlay visible={this.props.show}/>
          <Frame visible={this.props.show}>
            <Container showReplayButton={this.props.showReplayButton}>
              <Top>
                <CloseX onClick={this.onClose}>
                <svg width="20" height="20">
                  <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                </svg>
                </CloseX>
                <ScoreTitle>{this.props.dictionary.WEBAPP_GAMEOVER_YOUR_SCORE}</ScoreTitle>
                <ScoreContainer>
                  <ArrowLeft/>
                  <YourScore>{this.props.score}</YourScore>
                  <ArrowRight/>
                </ScoreContainer>
                <HighScoreTitle>{this.props.dictionary.WEBAPP_GAMEOVER_HIGH_SCORE}</HighScoreTitle>
                <HighScoreList>

                  {this.props.positions.map((position, i) => {
                  return <ScoreListRow><Position>{i + 1}{this.props.dictionary['WEBAPP_GAMEOVER_POSITION_' + (i + 1)]}</Position><Score>{position.score}</Score><Name>{position.player_name}</Name></ScoreListRow>;
              })}

                </HighScoreList>
              </Top>
              <Bottom>
                <Divider>
                  <span></span>
                  <span></span>
                  <span></span>
                </Divider>
                <Message><span dangerouslySetInnerHTML={{ __html: this.props.dictionary.WEBAPP_GAMEOVER_MESSAGE }} /></Message>
                <PlayAgain showReplayButton={this.props.showReplayButton} onClick={this.handleReplay}>{this.props.dictionary.WEBAPP_REPLAY}</PlayAgain>
              </Bottom>
            </Container>
          </Frame>
        </div>
      </ThemeProvider>
    );
  }
}

export default Leaderboard;
