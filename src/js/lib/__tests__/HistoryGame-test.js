import * as HistoryGame from '../HistoryGame';

describe('#HistoryGame push and pop!', () => {
  it('push should set a history array', () => {
    HistoryGame.push('http://www.gameasy.com');
    expect(HistoryGame.pop()).toEqual('http://www.gameasy.com');
    expect(HistoryGame.getHistory()).toBeUndefined();
  });

  it('pop should return undefined if no history', () => {
    expect(HistoryGame.pop()).toBeUndefined();
  });
});
