import React from 'react';

export default class Menu extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                {`Im the Menu ${this.props.message}`}
            </div>
        );
    }
}