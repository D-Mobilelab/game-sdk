import React from 'react';
import ReactDOM from 'react-dom';

import Location from './js/lib/Location';
import { Provider } from 'react-redux';
import store from './store';

import { Menu } from './js/components/Menu';
import { Banner } from './js/components/Banner';
import { GameasyGameover } from './js/components/GameOvers';

import { SDK } from './SDK';
class App extends React.Component {
    
    constructor(props){
        super(props);
        // INITIALIZE THE SDK
        
    }

    render(){
        return (
            <div>
                <GameasyGameover />
                <Banner />
                <Menu />
            </div>
        )
    }
}

// DYNAMIC CREATION OF THE ELEMENT
let ROOT_ELEMENT = document.createElement('div');
ROOT_ELEMENT.id = 'gfsdk_root';
window.document.body.appendChild(ROOT_ELEMENT);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    ROOT_ELEMENT
);

let aliases = ['GamefiveSDK', 'GamifiveSDK', 'DocomoSDK', 'GamifiveSdk', 'GamefiveSdk'];
const instance = new SDK(store);
/* aliases.map((alias) => {
    window[alias] = instance;
});*/

export default instance
