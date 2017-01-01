import React from 'react';
import { Button } from './Button';
import bannerStyle from '../../css/banner.css';

export class Banner extends React.Component {
    render(){
        let show = this.props.show ? bannerStyle.show : '';
        let contanierClass = [bannerStyle.bannerContainer, show].join(' ');
        const classNames = bannerStyle.banner;
        return (
            <div className={contanierClass}>
                <div className={classNames}>
                    <button className={bannerStyle.closeButton} >
                        <span >
                        </span>
                    </button>
                    <Button text='Get the app' />
                </div>
            </div>
        )
    }
}