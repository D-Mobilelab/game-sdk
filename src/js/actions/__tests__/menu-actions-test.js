import * as menuActions from '../menu-actions';

describe('Menu Actions tests', () => {
  it('should show the menu', () => {
    const typeAction = 'SHOW_MENU';
    expect(menuActions.showMenu({ bottom: '0%' })).toEqual({ type: typeAction, style: { bottom: '0%' } });
  });
});
