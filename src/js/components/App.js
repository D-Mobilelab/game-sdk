import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import genericStyle from '../../css/generic.css';
import { 
    GameasyGameover, 
    GamifiveGameover 
} from './GameOvers';

import Menu from './Menu';
import { Actions } from '../actions/index';
import { SDK } from '../lib/SDK';
const GameoverTypes = {
    gameasy: GameasyGameover,
    gamifive: GamifiveGameover
}

class App extends React.Component{
    
    constructor(props){
        super(props);
        
        // INITIALIZE THE SDK
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
                <TheGameoverComponent game_info={this.props.game_info}
                          score={this.props.session.score} 
                          rank={this.props.session.rank} 
                          related={this.props.game_info.related} 
                          show={this.props.game_over.show} 
                          actions={this.props.actions} />
                <Menu {...this.props.menu} actions={this.props.actions} />
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

// CONNECT TO THE STORE AND RENDER IT
export default connect(mapStateToProps, mapDispatchToProps)(App);