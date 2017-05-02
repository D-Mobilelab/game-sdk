import React, { Component } from 'react';

export default class List extends Component {

    constructor(props){
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(item, evt) {
        evt.preventDefault();
        window.location.href = item.url_play;
    }

    render(){
        
        return(
            <div>          
                <h2 style={{marginBottom:'2%'}}>{this.props.title}</h2>
                <ul style={{textAlign:'center', margin:'0', padding:'0'}}>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}