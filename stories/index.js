import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { MaterialButton } from '../src/js/components/MaterialButton/MaterialButton';
import EnterName from '../src/js/components/EnterName/EnterName';
import Leaderboard from '../src/js/components/EnterName/Leaderboard';
import withTheme from '../src/js/components/withTheme';

import gameasy from '../src/js/components/MaterialButton/theme/gameasy.css';
import standard from '../src/js/components/MaterialButton/theme/default.css';
import bandai from '../src/js/components/MaterialButton/theme/bandai.css';

const MyButton = withTheme(MaterialButton, gameasy);
const StandardButton = withTheme(MaterialButton, standard);
const BandaiButton = withTheme(MaterialButton, bandai);

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
  .add('standard', () => (<BandaiButton onClick={action('clicked')}>Prova</BandaiButton>))
  .add('with long text', () => (<BandaiButton onClick={action('clicked')}>Some very very long texxxxxxxxxxxxxxxxxxt</BandaiButton>))
  .add('disabled', () => (<BandaiButton disabled>Prova</BandaiButton>))
  .add('disabled isLoading', () => (<BandaiButton disabled isLoading>Prova</BandaiButton>))
  .add('isLoading', () => (<BandaiButton isLoading={true}>Prova</BandaiButton>));

  storiesOf('EnterName without theme', module)
    .add('standard', () => {
      class Container extends React.Component{
        constructor(props){
          super(props);
          this.close = this.close.bind(this);
          this.state = {
            isOpen: true
          };
        }

        close(){
          this.setState({ isOpen: false})
        }

        render(){
          return (
            <div style={{position: 'fixed', width: '100%', top: '0' }}>
              <EnterName show={this.state.isOpen} onDismiss={() => this.close()}/>
            </div>
          )
        }
      }

      return (<Container />)
      
    })
    .add('loading', () => {
      return (
        <div style={{position: 'fixed', width: '100%', top:'0' }}>
          <EnterName show={true} onDismiss={action('close')} loading={true} />
        </div>)
    });

storiesOf('LeaderBoard Bandai theme', module)
  .add('Leaderboard', () => {
        
    return (
      <div style={{position: 'fixed', width: '100%', top:'0' }}>
        <Leaderboard title={'High Score'} 
                     score={975} 
                     onClose={action('close clicked')}
                     show={true}
                     leaderboard={[
                       { points: 2398, position: 1, alias: "ALE"},
                       { points: 2005, position: 2, alias: "JOE"},
                       { points: 1560, position: 3,alias: "ROY"}
                    ]}
        />
      </div>
    );
  })