import React from 'react';
import { Image } from './Image';
import genericStyle from '../../css/generic.css';

export class Related extends React.Component {

    render(){
        return(
             <div className={genericStyle.grid}>
                <h2 style={{marginBottom:'2%'}}>Related</h2>
                <ul style={{textAlign:'center'}}>
                {
                    this.props.related.map((related, index) => {
                        let oneThird = Math.round(window.innerWidth / 3);
                        let imgSrc = related.images.cover.ratio_1.replace('[WSIZE]', oneThird).replace('[HSIZE]', 0);
                        let classes = [genericStyle.col, genericStyle._1_3].join(' ');

                        return (
                            <li className={classes} style={{padding:'1%'}} 
                                key={index}>
                                <Image src={imgSrc} />
                            </li>
                        )
                    })
                }
                </ul>
            </div>          
        )
    }
}