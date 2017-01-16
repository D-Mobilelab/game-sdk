import React from 'react';
import { Gameover } from './Gameover';

/** My Components */
import { Button } from './Button';
import { Related } from './Related';
import { Image } from './Image';

/** The styles */
import genericStyle from '../../css/generic.css';
import gameasyStyle from '../../css/gameover.css';

/** Connect to redux store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** TODO: import only needed actions */
import { Actions } from '../actions/index';
const mapStateToProps = (state) => {
  return {
    show: state.game_over.show,
    game_info: state.game_info,
    score: state.session.score,
    rank: state.session.rank
  }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

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
        let imgSrcSet = `${imgSrc}, ${innerWidth}w`;
        
        return(
           <div className={classes}>
                <header className={gameasyStyle.header}>
                    <h1>{this.props.game_info.title}</h1>
                </header>
                <div className={genericStyle.grid}>
                    
                    <div className={genericStyle.col + ' ' + genericStyle._2_3} style={{position:'relative'}}>
                        <Image srcSet={imgSrcSet} />
                        <Button text='play' onClick={this.handleReplay} center='true' style={{width:'50%'}} />
                    </div>
                    
                    <div className={genericStyle.col + ' ' + genericStyle._1_3}>
                        <div className={genericStyle.grid} style={{marginTop:'20%'}}>
                            <div className={genericStyle.col + ' ' + genericStyle._1_1} style={{textAlign:'center', paddingRight:'0'}}>
                                <div>
                                    <span className={genericStyle.icon + ' ' + genericStyle.iconCoppa}></span>
                                    <h3>Score:</h3>
                                    <h2>{this.props.score}</h2>
                                </div>
                            </div>
                            
                            <div className={genericStyle.col + ' ' + genericStyle._1_1} style={{textAlign:'center', paddingRight:'0'}}>
                                <hr className={genericStyle.divider} />
                            </div>
                            
                            
                            <div className={genericStyle.col + ' ' + genericStyle._1_1} style={{textAlign:'center'}}>
                                <div>
                                    <span className={genericStyle.icon + ' ' + genericStyle.iconRank}></span>
                                    <h3>Rank:</h3>
                                    <h2>{this.props.rank}</h2>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className={genericStyle.grid}>
                    <div className={genericStyle.col + ' ' + genericStyle._1_2}>
                        <button type="button">Favourite onClick={this.handleFavourites}></button>
                    </div>
                    
                    <div className={genericStyle.col + ' ' + genericStyle._1_2}>
                        <button type="button" onClick={this.handleShare}>Share</button>
                    </div>
                    
                </div>
                <Related related={this.props.game_info.related}/>
            </div>
        );
    }
}


const GamifiveRelatedItem = (props) => {
    let imgWidth = Math.round(window.innerWidth / 3);
    let imgSrc = props.item.images.cover.ratio_1.replace('[HSIZE]', 0).replace('[WSIZE]', imgWidth);
    return (
    <div className="box-grid">
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
        const showAndHideStyle = this.props.show ? {display:'block'} : {display:'none'};
        const imgWidth = (Math.round(window.innerWidth / 100) * 100);

        let imgHeight = (Math.round(innerWidth / 2));
        imgHeight = Math.round((imgHeight / 100)) * 100
        const imgSrc = this.props.game_info.images.cover.ratio_2.replace('[HSIZE]', imgHeight).replace('[WSIZE]', imgWidth);

        const baseFavourite = 'fa fa-heart'; 
        const addToFavouriteOn = 'ico-red';
        let favouriteClasses = `${baseFavourite}`;
        return (
            <div style={showAndHideStyle}>
                <div className="container game-over">
                    <a onClick={this.goToHome}>
                        <p className="logo-b"></p>
                    </a>
                    <h1>Gameover</h1>
                    <div className="box-game-over" style={{marginTop:0}}>

                        <div className="bg-line-box">
                            
                            <div className="game-over-data">
                                
                                <div className="score score--noChallenge">
                                    <h2 className="title-game">
                                        Your score 
                                    </h2>
                                    <h2 className="score__title">
                                        {this.props.score} 
                                    </h2>
                                    <h2 className="scoreResult__title">
                                        Ranking {this.props.rank}
                                    </h2>
                                </div>

                                <div className="row score__info">
                                    <h4></h4>
                                    <button className="btn-mini btn--fb fa-facebook-official" id="fb-challenge-button" onClick={this.handleShare}>
                                        FB SHARE
                                    </button>
                                </div>

                                <div className="img-game">
                                    <img className="center-block img-responsive" src={imgSrc} />
                                    
                                    <div className="col-xs-8 col-xs-offset-2 container-absolute-btn">
                                        <button className="btn btn--play fa fa-repeat" onClick={this.handleReplay}>
                                            <span className="line-btn">REPLAY</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="center-block like-btn">
                                    <a onClick={this.handleFavourites} id="gameOverLikeBtn" className="btn-social">
                                        <span className={favouriteClasses} id="heartIcon"></span>
                                    </a>
                                </div>
                                
                            </div>
                        </div>

                        <div className="container-boxgrid container-boxgrid-over">
                            <h2>Suggested Titles</h2>
                            {
                                this.props.game_info.related.map((item, index) =>{
                                    return (
                                        <GamifiveRelatedItem item={item} 
                                                             key={index} 
                                                             onClick={(evt) => {
                                                                 evt.preventDefault();
                                                                 this.handleOnClickRelated(item);
                                                             }}
                                                             PLAY_TEXT='Play'/>)
                                })
                            }
                        </div>

                        <div>
                            <a className="btn btn--otherGames" href="http://appsworld.gamifive-app.com/" onClick={(evt)=>evt}>
                                <span></span>
                            </a>
                        </div>

                        <div id="messages" className="mask mask--gameover hide">
                            <div className="box box-game-over">
                                <div className="box__inner">
                                    <div className="box__hd box__hd--messages h3">
                                        <div className="box__avatar--center">
                                            <img src="http://s.motime.com/img/wl/webstore_html5game/images/avatar/big/virgilio.png?v=20170111153950" className="img-avatar-abs" title="virgilio" alt="virgilio" />
                                        </div>
                                        <span className="alerthsuccess"></span>
                                        <span className="alertherror"></span>
                                    </div>
                                    <div className="box__bd box__bd--default">
                                        <h4 id="message-title" className="message-type"></h4>
                                        <p id="message-text" className="message-text"></p>
                                        <a href="javascript:;" onClick={(evt)=>evt} className="btn btn--messages" type="button"></a>
                                    </div>
                                    <div className="box__ft box__ft--default">
                                        <div>&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="fbconnect-calltoaction" className="mask mask--gameover connect hide">
                            <div className="box box-game-over">
                                <div className="box__inner">
                                    <div className="box__hd box__hd--messages h3">
                                        <div className="box__avatar--center">
                                            <img src="http://s.motime.com/img/wl/webstore_html5game/images/avatar/big/virgilio.png?v=20170111153950" className="img-avatar-abs" title="virgilio" alt="virgilio" />
                                        </div>
                                        <span> QATeam!</span>
                                    </div>
                                    <div className="box__bd box__bd--default">
                                        <p></p>
                                        <button onClick={(evt)=>evt} className="btn btn--fb" type="button">
                                        </button>
                                        <span className="message-link" onClick={(evt)=>evt}></span>
                                    </div>
                                    <div className="box__ft box__ft--default">
                                        <div>&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}