import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { MaterialButton } from '../src/js/components/MaterialButton';

/*
import Button from '@storybook/components/dist/demo/Button';
import Welcome from '@storybook/components/dist/demo/Welcome';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
*/

storiesOf('MaterialButton', module)
  .add('standard', () => (<MaterialButton onClick={action('clicked')}>Prova</MaterialButton>))
  .add('with long text', () => (<MaterialButton onClick={action('clicked')}>Some very very long texxxxxxxxxxxxxxxxxxt</MaterialButton>))
  .add('disabled', () => (<MaterialButton disabled>Prova</MaterialButton>));