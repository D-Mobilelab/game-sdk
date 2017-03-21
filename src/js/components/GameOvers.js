import React from 'react';
import { Gameover } from './Gameover';

/** My Components */
import { MaterialButton } from './MaterialButton';
import { RelatedList, RelatedListItem } from './Related/index';
import { Image } from './Image';
import { LikeButton } from './LikeButton';
import { ShareButton } from './ShareButton';

import { Grid, Column, Row } from './Layout/index';

/** The styles */
import genericStyle from '../../css/generic.css';
import gameasyStyle from '../../css/gameover.css';
import iconStyles from '../../css/icons.css';

/** Connect to redux store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** TODO: import only needed actions */
import { Actions } from '../actions/index';
const mapStateToProps = (state) => {
  return {
    show: state.game_over.show,
    game_info: state.game_info,
    user: state.user,
    score: state.session.score,
    rank: state.session.rank,
    dictionary: state.generic.dictionary
  }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

/** 
 * Dictionary
    WEBAPP_CONGRATULATIONS_SCORE: 'Your score is',
    WEBAPP_YOUR_POSITION_TITLE: 'Rank',
    WEBAPP_CANVAS_BUTTON_PLAY: 'Play',
    WEBAPP_RELATED_TITLE: 'Related',
    PLAY: 'Replay',
    WEBAPP_GAMEOVER_GUEST_FAVS: '',
    WEBAPP_GAMEOVER_GUEST_FAVS_SIGNIN: '',
    WEBAPP_CHALLENGE_INVITE
    WEBAPP_SHARE_FACEBOOK
 * */

@connect(mapStateToProps, mapDispatchToProps)
export class GameasyGameover extends Gameover {
    constructor(props){
        super(props);
    }

    render(){
        let classNames = [gameasyStyle.gameover];
        classNames.push(this.props.show ? gameasyStyle.show : gameasyStyle.hide);

        let classes = classNames.join(" ");
        let innerWidth = (Math.round(window.innerWidth / 100) * 100);
        let percentage = Math.round(window.innerWidth * 60 / 100);
        let imgSrc = this.props.game_info.images.cover.ratio_1.replace('[HSIZE]', 0).replace('[WSIZE]', percentage);

        let { 
            WEBAPP_CONGRATULATIONS_SCORE, 
            WEBAPP_YOUR_POSITION_TITLE, 
            WEBAPP_CANVAS_BUTTON_PLAY,
            WEBAPP_RELATED_TITLE
        } = this.props.dictionary;
        return(
        <Grid>
           <div className={classes}>
                    <Row>
                      <Column cols={12}>
                        <header className={gameasyStyle.header}>
                          <h1>{this.props.game_info.title}</h1>
                        </header>
                      </Column>
                    </Row>
                <div style={{maxWidth:'768px', margin:'0 auto'}}>
                    {/* This position relative is needed for vertical align the score and the rank */}
                    <Row style={{position:'relative'}}>
                        <Column cols={8}>
                            <Image src={imgSrc} />
                            <MaterialButton text={WEBAPP_CANVAS_BUTTON_PLAY} onClick={this.handleReplay} center='true' style={{width:'50%'}} />
                        </Column>
                        {/* custom styles needed for vertical align rank and score */}
                        <Column cols={4} style={{position:'absolute', right:'0', height: '100%'}}>
                            <div className={gameasyStyle.scoreContainer}>
                                <div>
                                    <div style={{textAlign:'center'}}>
                                        <span className={iconStyles.icon + ' ' + iconStyles.iconCoppa}></span>
                                        <h3>{WEBAPP_CONGRATULATIONS_SCORE}</h3>
                                        <h2>{this.props.score}</h2> 
                                    </div>
                                </div>
                                <hr className={genericStyle.divider} />
                                <div>
                                    <div style={{textAlign:'center'}}>
                                        <span className={iconStyles.icon + ' ' + iconStyles.iconRank}></span>
                                        <h3>{WEBAPP_YOUR_POSITION_TITLE}</h3>
                                        <h2>{this.props.rank}</h2>
                                    </div>
                                </div>
                            </div>
                        </Column>
                    </Row>
                    <Row style={{margin:'20px 0 20px 0'}}>
                        <Column cols={4} offset={2}>
                            <LikeButton onClick={this.handleFavourites} full={this.isGameFavourite() ? true : false} />
                        </Column>
                        <Column cols={4}>
                            <ShareButton onClick={(evt) => {
                                evt.preventDefault();
                                this.handleShare(this.props.game_info.url_share);
                            }} />
                        </Column>
                    </Row>
                    <Row>
                      <RelatedList title={WEBAPP_RELATED_TITLE}>
                          {
                               this.props.game_info.related.map((item, index) => (
                                   <Column cols={4} key={index}>
                                        <RelatedListItem item={item} onClick={this.handleOnClickRelated.bind(this, item)} />
                                   </Column>
                                ))
                          }
                      </RelatedList>  
                    </Row>                    
                </div>
            </div>
        </Grid>                
        );
    }
}


const GamifiveRelatedItem = (props) => {
    let imgWidth = Math.round(window.innerWidth / 3);
    let imgSrc = props.item.images.cover.ratio_1.replace('[HSIZE]', 0).replace('[WSIZE]', imgWidth);
    return (
    <div className="box-grid" style={{margin: '1px'}}>
        <div className="content-boxgrid">
            <a onClick={props.onClick}>
                <img src={imgSrc} className="img-responsive" />
            </a>
            <div className="button-grid-center">
                <a onClick={props.onClick} className="bt bt--play bt--small">
                    <span className="bt__textLight">{props.PLAY_TEXT}</span>
                </a>
            </div>
        </div>
    </div>);
}

@connect(mapStateToProps, mapDispatchToProps)
export class GamifiveGameover extends Gameover {
    constructor(props){
        super(props);
    }

    render(){
        const showAndHideStyle = this.props.show ? { display: 'block', zIndex: '10', position: 'absolute' } : { display: 'none' };
        const imgWidth = (Math.round(window.innerWidth / 100) * 100);

        let imgHeight = (Math.round(innerWidth / 2));
        imgHeight = Math.round((imgHeight / 100)) * 100
        const imgSrc = this.props.game_info.images.cover.ratio_2.replace('[HSIZE]', imgHeight).replace('[WSIZE]', imgWidth);

        const baseFavourite = 'fa fa-heart'; 
        const addToFavouriteOn = 'ico-red';
        let favouriteClasses = [baseFavourite];
        if(this.isGameFavourite()) favouriteClasses.push(addToFavouriteOn);
        let favClass = favouriteClasses.join(' ');
        let {
            WEBAPP_CONGRATULATIONS_SCORE, 
            WEBAPP_YOUR_POSITION_TITLE,
            WEBAPP_CANVAS_BUTTON_PLAY,
            WEBAPP_REPLAY,
            WEBAPP_RELATED_TITLE,
            WEBAPP_CHALLENGE_INVITE,
            WEBAPP_SHARE_FACEBOOK,
            WEBAPP_GAME_OVER,
        } = this.props.dictionary;

        return (            
                <div className="container game-over" style={showAndHideStyle}>
                    <a onClick={this.goToHome}>
                        <p className="logo-b"></p>
                    </a>
                    <h1>{WEBAPP_GAME_OVER}</h1>
                    <div className="box-game-over" style={{marginTop:0}}>

                        <div className="bg-line-box">
                            
                            <div className="game-over-data">
                                
                                <div className="score score--noChallenge">
                                    <h2 className="title-game">
                                        {WEBAPP_CONGRATULATIONS_SCORE}
                                    </h2>
                                    <h2 className="score__title">
                                        {this.props.score} 
                                    </h2>
                                    <h2 className="scoreResult__title">
                                        {WEBAPP_YOUR_POSITION_TITLE} {this.props.rank}
                                    </h2>
                                </div>

                                <div className="row score__info">
                                    <h4></h4>
                                    <button className="btn-mini btn--fb fa-facebook-official" id="fb-challenge-button" onClick={(evt) => {
                                        evt.preventDefault();
                                        this.handleShare(this.props.game_info.url_share);
                                    }}>
                                    {WEBAPP_SHARE_FACEBOOK}
                                    </button>
                                </div>

                                <div>
                                    <Image src={imgSrc} width={imgWidth} height={imgHeight} />
                                    <button className="btn btn--play fa fa-repeat" style={{width:'80%', marginLeft:'10%', marginTop:'-10px'}} onClick={this.handleReplay}>
                                        <span className="line-btn">{WEBAPP_REPLAY}</span>
                                    </button>
                                </div>

                                <div className="center-block like-btn">
                                    <a onClick={this.handleFavourites} id="gameOverLikeBtn" className="btn-social">
                                        <span className={favClass} id="heartIcon"></span>
                                    </a>
                                </div>
                                
                            </div>
                        </div>

                        <div className="container-boxgrid container-boxgrid-over">
                            <h2>{WEBAPP_RELATED_TITLE}</h2>
                            {
                                this.props.game_info.related.map((item, index) =>{
                                    return (
                                        <GamifiveRelatedItem item={item} 
                                                             key={index} 
                                                             onClick={(evt) => {
                                                                 evt.preventDefault();
                                                                 this.handleOnClickRelated(item);
                                                             }}
                                                             PLAY_TEXT={WEBAPP_CANVAS_BUTTON_PLAY}/>)
                                })
                            }
                        </div>
                    </div>
                </div>
        );
    }
}