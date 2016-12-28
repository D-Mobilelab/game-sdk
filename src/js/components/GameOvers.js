import React from 'react';
import genericStyle from '../../css/generic.css';
import gameasyStyle from '../../css/gameover.css';
import { Button } from './Button';
import { Related } from './Related';
import { Image } from './Image';

export class GameasyGameover extends React.Component{
    constructor(props){
        super(props);
        this.handleReplay = this.handleReplay.bind(this);
    }
    
    handleReplay(evt){
        evt.preventDefault();
        this.props.actions.startSession();
    }

    render(){
        
        let classNames = [gameasyStyle.gameover];
        classNames.push(this.props.show ? gameasyStyle.show : gameasyStyle.hide);        
        let classes = classNames.join(" ");
        let innerWidth = (Math.round(window.innerWidth / 100) * 100)
        let percentage = Math.round(window.innerWidth * 60 / 100);
        let imgSrc = this.props.game_info.images.cover.ratio_1.replace('[HSIZE]', 0)
                                                 .replace('[WSIZE]', percentage);
        let imgSrcSet = `${imgSrc}, ${innerWidth}w`;
        return(
           <div className={classes}>
                <header className={gameasyStyle.header}>
                    <h1>{this.props.game_info.title}</h1>
                </header>
                <div className={genericStyle.grid}>
                    
                    <div className={genericStyle.col23} style={{position:'relative'}}>
                        <Image srcSet={imgSrcSet} />
                        <Button text='play' onClick={this.handleReplay} />
                    </div>
                    
                    <div className={genericStyle.col13} style={{position:'absolute', right:'0', height:'100%'}}>
                        
                        <div style={{display:'table', width:'100%', height:'50%', textAlign:'center'}}>
                            <div style={{display:'table-cell', verticalAlign:'middle'}}>
                               <span className={genericStyle.icon + ' ' + genericStyle.iconCoppa}></span>
                               <h3>Score:</h3>
                               <h2>{this.props.score}</h2>
                            </div>
                        </div>
                        <hr className={genericStyle.divider}/>
                        <div style={{display:'table', width:'100%', height:'50%', textAlign:'center'}}>
                            <div style={{display:'table-cell', verticalAlign:'middle'}}>
                                <span className={genericStyle.icon + ' ' + genericStyle.iconRank}></span>
                                <h3>Rank:</h3>
                                <h2>{this.props.rank}</h2>
                            </div>                            
                        </div>

                    </div>

                </div>
                <Related related={this.props.related}/>
            </div>
        );
    }
}

export class GamifiveGameover extends React.Component{
    
    render(){
        return (
            <div>
                Gamifive Gameover
            </div>
        );
    }
}