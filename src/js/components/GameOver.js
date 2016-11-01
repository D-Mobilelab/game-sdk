import React from 'react';

export default class GameOver extends React.Component{

    render(){
        return(
            <div>
                {`Hello ${this.props.message}`}
            </div>
        );
    }
}