import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { MaterialButton } from '../src/js/components/MaterialButton/MaterialButton';
import EnterName from '../src/js/components/EnterName/EnterName';
import withTheme from '../src/js/components/withTheme';
import gameasy from '../src/js/components/MaterialButton/theme/gameasy.css';
import standard from '../src/js/components/MaterialButton/theme/default.css';
import bandai from '../src/js/components/MaterialButton/theme/bandai.css';

const MyButton = withTheme(MaterialButton, gameasy);
const StandardButton = withTheme(MaterialButton, standard);
const BandaiButton = withTheme(MaterialButton, bandai);

/*
import Button from '@storybook/components/dist/demo/Button';
import Welcome from '@storybook/components/dist/demo/Welcome';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
*/

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
          return (<EnterName show={this.state.isOpen} onDismiss={() => this.close()}/>)
        }
      }

      return (<Container />)
      
    })