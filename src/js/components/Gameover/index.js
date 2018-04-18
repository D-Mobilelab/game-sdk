import withTheme from '../withTheme';
import index from './Default.jsx';
// themes
import zainTheme from './theme/zain.css';
import gamempireTheme from './theme/gamempire.css';
import gameasyTheme from './theme/gameasy.css';
import defaultTheme from './theme/default.css';


const ZainGameover = withTheme(index, zainTheme);
const GamempireGameover = withTheme(index, gamempireTheme);
const GameasyGameover = withTheme(index, gameasyTheme);
const DefaultGameover = withTheme(index, defaultTheme);

export { ZainGameover, GamempireGameover, GameasyGameover, DefaultGameover }
