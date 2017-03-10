import React, { Component } from 'react';
import { Image } from './Image';
import genericStyle from '../../css/generic.css';

export default class RelatedListItem extends Component {

    constructor(props){
        super(props);        
    }

    render(){
        let oneThird = Math.round(window.innerWidth / 3);
        let imgSrc = this.props.item.images.cover.ratio_1.replace('[WSIZE]', oneThird).replace('[HSIZE]', 0);
        let classes = [genericStyle.col, genericStyle._1_3].join(' ');
        return(
            <li className={classes}
                onClick={this.props.onClick}
                style={{padding:'1%'}}>
                <Image src={imgSrc} />
            </li>
        )
    }
}