import React from 'react';
import gameasyStyle from '../../css/gameover.css';

export class GameasyGameover extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let classNames = [gameasyStyle.gameover];
        classNames.push(this.props.open ? gameasyStyle.show : gameasyStyle.hide);        
        let classes = classNames.join(" ");

        return(
           <div className={classes}>
                <header className={gameasyStyle.header}>
                    <h1>{this.props.title}</h1>
                </header>
                <div>Score: {this.props.score}</div>
                <div>Rank: {this.props.rank}</div>                
                <div>
                    <h2>Related</h2>
                    <ul>
                    {
                        this.props.related.map((related)=>{
                            return (
                                <li>
                                    {related.title}
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
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