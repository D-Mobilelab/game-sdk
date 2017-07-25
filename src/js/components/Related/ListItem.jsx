import React, { Component } from 'react';
import  Image from '../Image/Image';

export default class ListItem extends Component {

    constructor(props){
        super(props);        
    }

    render(){
        let oneThird = Math.round(window.innerWidth / 3);
        let imgSrc = this.props.item.images.cover.ratio_1.replace('[WSIZE]', oneThird).replace('[HSIZE]', 0);
        return(
            <li onClick={this.props.onClick}>
                <Image src={imgSrc} />
            </li>
        )
    }
}