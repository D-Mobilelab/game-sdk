import React from 'react';
import imageStyle from './image.css';

export default class Image extends React.Component {
    constructor(props){
        super(props);
        this.onImgLoad = this.onImgLoad.bind(this);
        this.onImgError= this.onImgError.bind(this);
        this.state = { loaded: false };
    }

    onImgLoad(){
        this.setState({ loaded: true });
    }

    onImgError(){
        this.setState({ loaded: false });
    }

    render(){
        
        let imageClasses = [];
        let loaded = this.state.loaded ? imageStyle.imgLoaded : '';
        imageClasses = imageClasses.concat([loaded]);
        
        /**
         * Padding bottom image is a trick to calculate the space
         * that the image will cover in document
         * http://davidecalignano.it/lazy-loading-with-responsive-images-and-unknown-height/
         */
        let paddingBottom = {paddingBottom: '100%'};
        if(this.props.height && this.props.width) {
            paddingBottom = { paddingBottom: `${(this.props.height / this.props.width) * 100}%` }
        }
        return (
            <div className={imageStyle.lazyContainer} style={paddingBottom}>
                <img className={imageClasses.join(' ')}
                     onLoad={this.onImgLoad} 
                     onError={this.onImgError} 
                     style={this.props.style} 
                     src={this.props.src}/>
            </div>
        )
    }
}