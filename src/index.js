import React from 'react';
import ReactDOM from 'react-dom';

import Location from './js/lib/Location';
import { Provider } from 'react-redux';
import store from './store';

import { Menu } from './js/components/Menu';
import { Banner } from './js/components/Banner';
import { GameasyGameover, GamifiveGameover} from './js/components/GameOvers';

const Gameovers = { 
    gamifive: GamifiveGameover,
    gameasy: GameasyGameover
}

import { SDK } from './SDK';
class App extends React.Component {
    
    constructor(props){
        super(props);
    }

    render(){
        let TheGameover = Gameovers[this.props.label];
        return (
            <div>
                <TheGameover />
                <Banner />
                <Menu white_label={this.props.label}/>
            </div>
        )
    }
}

function onDomLoaded(event) {
    let ROOT_ELEMENT = document.createElement('div');
    ROOT_ELEMENT.id = 'gfsdk_root_new';
    window.document.body.appendChild(ROOT_ELEMENT);

    let WHITE_LABEL = Location.isGamifive() ? 'gamifive' : 'gameasy';
    
    ReactDOM.render(
        <Provider store={store}>
            <App label={WHITE_LABEL} />
        </Provider>,
        ROOT_ELEMENT
    );
}

window.document.addEventListener("DOMContentLoaded", onDomLoaded);

let aliases = ['GamefiveSDK', 'DocomoSDK', 'GamifiveSdk', 'GamefiveSdk'];
const instance = new SDK(store);
aliases.map((alias) => {
    window[alias] = instance;
});

export default instance
