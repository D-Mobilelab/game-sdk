import React from 'react';
import { Button } from './Button';
import bannerStyle from '../../css/banner.css';

/** Connect to redux store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** TODO: import only needed actions */
import { Actions } from '../actions/index';
const mapStateToProps = (state) => {
  return {...state.banner}
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export class Banner extends React.Component {

    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(evt){
        evt.preventDefault();
        this.props.actions.hideBanner();
    }

    render(){
        let show = this.props.show ? bannerStyle.show : '';
        let contanierClass = [bannerStyle.bannerContainer, show].join(' ');
        const classNames = bannerStyle.banner;
        return (
            <div className={contanierClass}>
                <div className={classNames}>
                    <button className={bannerStyle.closeButton} onClick={this.handleClose}>
                        <span >
                        </span>
                    </button>
                    <Button text='Get the app' />
                </div>
            </div>
        )
    }
}