import React from 'react';
import GameOver from './GameOver';
import Menu from './Menu';

import { connect } from 'react-redux';
import * as Actions from '../actions/index.js';
import { bindActionCreators } from 'redux';
import { SDK } from './sdk';
class App extends React.Component{
    
    constructor(props){
        super(props);
        window.GamifiveSDK = new SDK(props);
    }   

    render(){
        return (
            <div>
                <GameOver {...this.props} />
                <Menu {...this.props}/>
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