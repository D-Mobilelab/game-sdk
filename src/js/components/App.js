import React from 'react';
import { 
    GameasyGameover, 
    GamifiveGameover 
} from './GameOvers';
import Menu from './Menu';

import { connect } from 'react-redux';
import * as Actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import { SDK } from './sdk';

const GameoverTypes = {
    gameasy: GameasyGameover,
    gamifive: GamifiveGameover
}

class App extends React.Component{
    
    constructor(props){
        super(props);
        let aliases = ['GamefiveSDK', 'GamifiveSDK', 'DocomoSDK', 'GamifiveSdk', 'GamefiveSdk'];
        const instance = new SDK(props);
        aliases.map((alias)=>{
            window[alias] = instance;
        });
    }

    render(){
        const TheGameoverComponent = GameoverTypes[this.props.label];
        return (
            <div>
                <TheGameoverComponent title={this.props.gameInfo.name}
                          score={this.props.currentSession.score} 
                          rank={this.props.currentSession.rank} 
                          related={this.props.gameInfo.related} 
                          open={this.props.game_over.show} />
                <Menu {...this.props.menu} actions={this.props.actions} />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
  return {...state}
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);