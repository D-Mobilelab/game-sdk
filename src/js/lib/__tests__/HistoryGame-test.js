import * as HistoryGame from '../HistoryGame';

describe('#HistoryGame push and pop!', function () {

  it('push should set a history array', function () {
    HistoryGame.push('http://www.gameasy.com');
    expect(HistoryGame.pop()).toEqual('http://www.gameasy.com');
    expect(HistoryGame.getHistory()).toBeUndefined();
  });

  it('pop should return undefined if no history', function () {
    expect(HistoryGame.pop()).toBeUndefined();
  });
});
