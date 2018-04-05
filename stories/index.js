import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';

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
import gamempireMenuTheme from '../src/js/components/Menu/theme/gamempire.css';

import BannerIOS from '../src/js/components/Banner/ios/Banner';
import BannerAndroid from '../src/js/components/Banner/android/Banner';

import { ZainGameover, GamempireGameover, GameasyGameover, DefaultGameover } from '../src/js/components/Gameover/index';

const MyButton = withTheme(MaterialButton, gameasy);
const StandardButton = withTheme(MaterialButton, standard);
const BandaiButton = withTheme(MaterialButton, bandai);
const BandaiMenu = withTheme(MenuComponent, bandaiMenuTheme);
const GamempireMenu = withTheme(MenuComponent, gamempireMenuTheme);

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
  .add('Menu Bandai Left top', () => (<BandaiMenu show={true} position='TOP_LEFT' />))
  .add('Menu Gamempire Left top', () => (<GamempireMenu show={true} position='TOP_LEFT' />));

const ToastStory = storiesOf('Toast', module);
ToastStory.addDecorator(withKnobs);

ToastStory.add('Toast bottom', () => {
  const label = 'position';
  const defaultValue = 'bottom';

  const position = text(label, defaultValue);
  return (<Toast message={'Cannot register score'} show={boolean('show', true)} position={position} />);
});

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


const game_info={
  title:"Game name",
  images: {cover: {ratio_1: 'http://s2.motime.com/p/bcontents/absimageapp1/h0/w455/xx_gameasy/mnt/alfresco_content_prod/contentstore/2016/7/1/12/30/d806572b-3cdb-4925-be24-3f8cee2e51d9/fruit-galaxy.bin?v=1485249889'}},
  related: [
    { images: { cover: { ratio_1: 'http://s2.motime.com/p/bcontents/absimageapp1/h0/w253/xx_gameasy/mnt/alfresco_content_prod/contentstore/2014/9/9/15/50/584124cf-f364-4419-8af7-5d0428371d36/cheese-lab.bin?v=1485251871' } } },
    { images: { cover: { ratio_1: 'http://s2.motime.com/p/bcontents/absimageapp1/h0/w253/xx_gameasy/mnt/alfresco_content_prod/contentstore/2016/5/26/18/56/b5a6c5b4-1f2b-4002-8fed-ba11f9dcd33b/jumping-light.bin?v=1485251932' } } },
    { images: { cover: { ratio_1: 'http://s2.motime.com/p/bcontents/absimageapp1/h0/w253/xx_gameasy/mnt/alfresco_content_prod/contentstore/2015/11/16/12/5/b36412bd-1893-4dc8-835c-28284da9a631/paper-plane-flight.bin?v=1485252028' } } }
  ] 
};

const dictionary= {
  WEBAPP_CONGRATULATIONS_SCORE: 'Your Score',
  WEBAPP_YOUR_POSITION_TITLE: 'Your Ranking',
  WEBAPP_CANVAS_BUTTON_PLAY: 'PLAY',
  WEBAPP_RELATED_TITLE: 'RELATED',
};

const GameoverStory = storiesOf('Gameover', module);
GameoverStory.addDecorator(withKnobs);

GameoverStory.add('standard', () => <DefaultGameover isGameFavourite={boolean('Like', false)} dictionary={dictionary} show={boolean('Show', true)} label={'default'} title={'Default'} score={200} rank={6} game_info={game_info} />)
GameoverStory.add('gameasy', () => <GameasyGameover isGameFavourite={boolean('Like', false)} dictionary={dictionary} show={boolean('Show', true)} label={'gameasy'} title={'Gameasy'} score={200} rank={6} game_info={game_info}/>);
GameoverStory.add('zain', () => <ZainGameover isGameFavourite={boolean('Like', false)} dictionary={dictionary} show={boolean('Show', true)} label={'zain'} title={'Zain'} score={200} rank={6} game_info={game_info}/>);
GameoverStory.add('gamempire', () => <GamempireGameover isGameFavourite={boolean('Like', false)} dictionary={dictionary} show={boolean('Show', true)} label={'zain'} title={'Zain'} score={200} rank={6} game_info={game_info}/>);

