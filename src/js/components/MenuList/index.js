import withTheme from '../withTheme';
import index from './Default.jsx';

// themes
// import zainTheme from './theme/zain.css';
// import gameasyTheme from './theme/gameasy.css';
import defaultTheme from './theme/default.css';

// attach theme
// const ZainGameover = withTheme(index, zainTheme);
// const GameasyGameover = withTheme(index, gameasyTheme);
const DefaultMenuList = withTheme(index, defaultTheme);

// export { ZainGameover, GameasyGameover, DefaultGameover }

export default DefaultMenuList;
