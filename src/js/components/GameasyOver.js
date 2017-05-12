import React from 'react';
import Gameover from './Gameover';

/** My Components */
import { MaterialButton } from './MaterialButton';
import RelatedList from './Related/List';
import RelatedListItem from './Related/ListItem';
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
class GameasyGameover extends Gameover {
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

export default connect(mapStateToProps, mapDispatchToProps)(GameasyGameover);
