import React from 'react';
import imageStyle from '../../css/image.css';

export class Image extends React.Component {
    constructor(props){
        super(props);
        this.onImgLoad = this.onImgLoad.bind(this);
        this.onImgError= this.onImgError.bind(this);
        this.state = { loaded: false };
    }

    onImgLoad(){
        this.setState({loaded: true});
    }

    onImgError(){
        this.setState({loaded: false});
    }

    render(){
        let className = this.state.loaded ? imageStyle.imgLoaded : '';
        return (
            <div className={imageStyle.lazyContainer}>
                <img className={className}
                    onLoad={this.onImgLoad} 
                    onError={this.onImgError} 
                    {...this.props} />
            </div>
        )
    }
}