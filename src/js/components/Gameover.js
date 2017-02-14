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
        return this.props.user.favourites.some((favourite) => {
            return (favourite.content_id === this.props.game_info.content_id) || (favourite.id === this.props.game_info.id);
        });
    }

    handleFavourites(evt){
        evt.preventDefault();
        this.props.actions.toggleGameLike();
    }

    handleOnClickRelated(item){
        console.log("Handle on click related", item);
    }

    render(){
        return (<div>Base gameover</div>);
    }
}
