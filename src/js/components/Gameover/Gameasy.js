import gameover from './Default.jsx';
import theme from './theme/gameasy.css';
import connect from './connectGameover';
import withTheme from '../withTheme';

export default  connect(withTheme(gameover, theme));

