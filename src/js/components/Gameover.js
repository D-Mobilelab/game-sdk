import React from 'react';

export class Gameover extends React.Component{
    constructor(props){
        super(props);
        this.handleReplay = this.handleReplay.bind(this);
        this.goToHome = this.goToHome.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.handleFavourites = this.handleFavourites.bind(this);
        this.handleOnClickRelated = this.handleOnClickRelated.bind(this);
    }
    
    handleReplay(evt) {
        evt.preventDefault();
        this.props.actions.startSession();
    }

    goToHome(evt) {
        evt.preventDefault();
        this.props.actions.goToHome();
    }

    handleShare(evt){
        evt.preventDefault();
        console.log(evt, "Handle share");
    }
    
    handleFavourites(evt){
        evt.preventDefault();
        this.props.actions.addGameLike();
    }

    handleOnClickRelated(item){
        console.log("Handle on click related", item);
    }

    render(){
        return (<div>Base gameover</div>);
    }
}
