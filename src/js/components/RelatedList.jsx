import React, { Component } from 'react';
import RelatedItem from './RelatedListItem';
import genericStyle from '../../css/generic.css';

export default class RelatedList extends Component {

    constructor(props){
        super(props);
        //this.onClick = this.onClick.bind(this);
    }

    onClick(related, evt) {
        evt.preventDefault();
        window.location.href = related.url_play;
    }

    render(){
        return(
             <div className={genericStyle.grid}>
                <h2 style={{marginBottom:'2%'}}>{this.props.title}</h2>
                <ul style={{textAlign:'center'}}>
                {
                    this.props.items.map((item, index) => {
                        let oneThird = Math.round(window.innerWidth / 3);
                        let imgSrc = related.images.cover.ratio_1.replace('[WSIZE]', oneThird).replace('[HSIZE]', 0);
                        
                        return (<RelatedItem key={index} item={related} onClick={() => console.log("Click") }/>)
                    })
                }
                </ul>
            </div>
        )
    }
}