import React from 'react';
import { 
    GameasyGameover, 
    GamifiveGameover 
} from './GameOvers';
import Menu from './Menu';

import { connect } from 'react-redux';
import * as Actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import { SDK } from '../lib/SDK';

const GameoverTypes = {
    gameasy: GameasyGameover,
    gamifive: GamifiveGameover
}

class App extends React.Component{
    
    constructor(props){
        super(props);
        let aliases = ['GamefiveSDK', 'GamifiveSDK', 'DocomoSDK', 'GamifiveSdk', 'GamefiveSdk'];
        const instance = new SDK(props);
        aliases.map((alias) => {
            window[alias] = instance;
        });
    }

    render(){
        const TheGameoverComponent = GameoverTypes[this.props.label];
        return (
            <div>
                <TheGameoverComponent title={this.props.game_info.name}
                          score={this.props.session.score} 
                          rank={this.props.session.rank} 
                          related={this.props.game_info.related} 
                          show={this.props.generic.game_over.show} />
                <Menu {...this.props.generic.menu} actions={this.props.actions} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {...state}
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);