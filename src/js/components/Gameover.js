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

    handleShare(url){
        this.props.actions.share(url, 'facebook');
    }
    
    isGameFavourite(){
        return this.props.user.favourites.some((favourite) => (favourite.id === this.props.game_info.id));
    }

    handleFavourites(evt){
        evt.preventDefault();
        this.props.actions.toggleGameLike();
    }

    handleOnClickRelated(related){
        /**
         * TODO:
         * make it as action and track the GameClickOnRelated
         */
        this.props.actions.goToRelated(related);
        //window.location.href = related.url_play;
    }

    render(){
        return (<div>Base gameover</div>);
    }
}
