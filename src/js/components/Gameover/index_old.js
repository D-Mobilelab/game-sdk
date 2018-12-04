import withTheme from '../withTheme';
import index from './Old.jsx';
// themes
import zainTheme from './theme/zain.css';
import gamempireTheme from './theme/gamempire.css';
import gameasyTheme from './theme/gameasy.css';
import h3gTheme from './theme/h3g.css';
import defaultTheme from './theme/default.css';


const ZainGameover = withTheme(index, zainTheme);
const GamempireGameover = withTheme(index, gamempireTheme);
const GameasyGameover = withTheme(index, gameasyTheme);
const H3gGameover = withTheme(index, h3gTheme);
const DefaultGameover = withTheme(index, defaultTheme);

export { ZainGameover, GamempireGameover, GameasyGameover, H3gGameover, DefaultGameover }
