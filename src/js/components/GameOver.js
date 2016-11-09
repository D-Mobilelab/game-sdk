import React from 'react';

export default class GameOver extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='gameover hide'>
                {`Hello ${this.props.message}`}
                <header>                    
                    <h1>{this.props.title}</h1>                    
                </header>
                <div>
                    Score: {this.props.score}
                </div>
                <div>
                   Rank: {this.props.rank}
                </div>
            </div>
        );
    }
}