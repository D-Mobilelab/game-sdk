import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MaterialButton from '../src/js/components/MaterialButton/MaterialButton';
import EnterName from '../src/js/components/EnterName/EnterName';
import Leaderboard from '../src/js/components/EnterName/Leaderboard';
import withTheme from '../src/js/components/withTheme';

import gameasy from '../src/js/components/MaterialButton/theme/gameasy.css';
import standard from '../src/js/components/MaterialButton/theme/default.css';
import bandai from '../src/js/components/MaterialButton/theme/bandai.css';

import MenuComponent from '../src/js/components/Menu/MenuComponent';
import Toast from '../src/js/components/Toast/Toast';
import bandaiMenuTheme from '../src/js/components/Menu/theme/bandai.css';

import BannerIOS from '../src/js/components/Banner/ios/Banner';
import BannerAndroid from '../src/js/components/Banner/android/Banner';

const MyButton = withTheme(MaterialButton, gameasy);
const StandardButton = withTheme(MaterialButton, standard);
const BandaiButton = withTheme(MaterialButton, bandai);
const BandaiMenu = withTheme(MenuComponent, bandaiMenuTheme);

storiesOf('MaterialButton', module)
  .add('standard', () => (<StandardButton onClick={action('clicked')}>Prova</StandardButton>))
  .add('with long text', () => (<StandardButton onClick={action('clicked')}>Some very very long texxxxxxxxxxxxxxxxxxt</StandardButton>))
  .add('disabled', () => (<StandardButton disabled>Prova</StandardButton>))
  .add('disabled isLoading', () => (<StandardButton disabled isLoading>Prova</StandardButton>))
  .add('isLoading', () => (<StandardButton isLoading={true}>Prova</StandardButton>));

storiesOf('MaterialButton theme', module)
  .add('standard', () => (<MyButton onClick={action('clicked')}>Prova</MyButton>))
  .add('with long text', () => (<MyButton onClick={action('clicked')}>Some very very long texxxxxxxxxxxxxxxxxxt</MyButton>))
  .add('disabled', () => (<MyButton disabled>Prova</MyButton>))
  .add('disabled isLoading', () => (<MyButton disabled isLoading>Prova</MyButton>))
  .add('isLoading', () => (<MyButton isLoading={true}>Prova</MyButton>));


storiesOf('BandaiButton theme', module)
  .add('primary', () => (<BandaiButton onClick={action('clicked')}>Prova</BandaiButton>))  
  .add('with long text', () => (<BandaiButton onClick={action('clicked')}>Some very very long texxxxxxxxxxxxxxxxxxt</BandaiButton>))
  .add('disabled', () => (<BandaiButton disabled>Prova</BandaiButton>))
  .add('disabled isLoading', () => (<BandaiButton disabled isLoading>Prova</BandaiButton>))
  .add('isLoading', () => (<BandaiButton isLoading={true}>Prova</BandaiButton>))
  .add('secondary', () => (<BandaiButton secondary>Prova</BandaiButton>))
  .add('secondary is loading', () => (<BandaiButton secondary isLoading={true} disabled={true}>Prova</BandaiButton>));

storiesOf('EnterName without theme', module)
  .add('standard', () => {
    class Container extends React.Component {
      constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.state = {
          isOpen: true,
        };
      }

      close() {
        this.setState({ isOpen: false });
      }

      render() {
        return (
          <div style={{ position: 'fixed', width: '100%', top: '0' }}>
            <EnterName show={this.state.isOpen} onDismiss={() => this.close()} onSubmit={action('on submit action')} />
          </div>
        );
      }
    }

    return (<Container />);
  })
  .add('loading', () => (
    <div style={{ position: 'fixed', width: '100%', top: '0' }}>
      <EnterName show={true} onDismiss={action('close')} loading={true} />
    </div>));

storiesOf('LeaderBoard Bandai theme', module)
  .add('Leaderboard', () => (
    <div style={{ position: 'fixed', width: '100%', top: '0' }}>
      <Leaderboard title={'High Score'}
        score={975}
        onClose={action('close clicked')}
        show={true}
        leaderboard={[
          { score: 2398, position: 1, player_name: 'ALE' },
          { score: 2005, position: 2, player_name: 'JOE' },
          { score: 1560, position: 3, player_name: 'ROY' },
        ]}
      />
    </div>
  ))
  .add('Leaderboard with replaybutton', () => (
    <div style={{ position: 'fixed', width: '100%', top: '0' }}>
      <Leaderboard title={'High Score'}
        score={975}
        onClose={action('close clicked')}
        show={true}
        leaderboard={[
          { score: 2398, position: 1, player_name: 'ALE' },
          { score: 2005, position: 2, player_name: 'JOE' },
          { score: 1560, position: 3, player_name: 'ROY' },
        ]}
        showReplayButton={true}
        replayButtonText='Replay'
      />
    </div>
  ));

storiesOf('Menu', module)
  .add('Menu Bandai Left bottom', () => (<BandaiMenu show={true} position='BOTTOM_LEFT' />))
  .add('Menu Bandai Right bottom', () => (<BandaiMenu show={true} position='BOTTOM_RIGHT' />))
  .add('Menu Bandai Left top', () => (<BandaiMenu show={true} position='TOP_LEFT' />));

const ToastStory = storiesOf('Toast', module);

ToastStory.add('Toast bottom', () => (<Toast message={'Cannot register score'} show />));

ToastStory.add('Toast top', () => (<Toast message='Cannot register score' show={false} position='top' />));

ToastStory.add('Toast top with duration', () => {
  class ToastContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        message: 'Cannot register score',
        show: false,
      };
    }

    render() {
      return (
        <div>
          <button onClick={() => {
            this.setState({ message: this.state.message.split('').reverse().join(''), show: true });
          }
          }>Change</button>
          <Toast message={this.state.message} show={this.state.show} position='top' duration={3000}/>
        </div>
      );
    }
  }
  return (<ToastContainer />);
});

storiesOf('Banner', module)  
  .add('Banner ios', () => <BannerIOS buttonText={'GET APP'} onClick={action('on submit action')} texts={['All Your Games', 'ANYTIME', 'ANYWHERE']} />)
  .add('Banner android', () => <BannerAndroid buttonText={'GET APP'} handleClose={action('on handle close')} onClick={action('on submit action')} dictionary={{}} />);
