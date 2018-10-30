import { normalizeGameInfo, getUserType } from '../utils';

describe('Gameinfo tests', () => {
  let gameInfoResponse200;
  beforeEach(() => {
    gameInfoResponse200 = {
      status: 200,
      return_url: null,
      game_info: {
        label: 'it_gameasy',
        contentId: '4de756a55ac71f45c5b7b4211b71219e',
        dest_domain: 'http://www.gameasy.com/it/',
        thankyoupage_on_mip: 0,
        thankyoupage_on_mip_message_title: null,
        thankyoupage_on_mip_message_body: null,
        thankyoupage_on_mip_delay_ms: '5000',
        typmip: null,
        userId: '485de7fefda611e6b728005056b60718',
        fbUserId: null,
        fbAppId: '1530616587235761',
        fbConnected: false,
        requireFbConnect: true,
        fbExternal: false,
        userFreemium: false,
        challenge: {
          id: null,
        },
        game: {
          access_type: {
            guest: false,
            free: true,
            premium: true,
          },
          alfresco_id: 'HAIT990001689',
          binary_md5: 'a6e187a6090c5c06bb2415b75cff06f1',
          category: null,
          compatibility: true,
          content_id: '4de756a55ac71f45c5b7b4211b71219e',
          counters_favourites: 8,
          counters_matches: 451,
          customer_id: 'xx_gameasy',
          description: 'Taglia la frutta, fai le combinazioni e batti i record!',
          description_short: 'Taglia la frutta, fai le combinazioni e batti i record!',
          format: 'html5applications',
          has_sdk: true,
          id: '4de756a55ac71f45c5b7b4211b71219e',
          img_qrcode: 'http://www.gameasy.com/it/qrcode?text=http%3A%2F%2Fwww.gameasy.com%2Fit%2Fsetwelcome%3Freturn_url%3Dhttp%253A%252F%252Fwww.gameasy.com%252Fit%252F%2523%2521%252Fgames%252Ffruit-slicer_4de756a55ac71f45c5b7b4211b71219e',
          name: 'Fruit Slicer',
          offline_available: true,
          size: '9,64 MB',
          title: 'Fruit Slicer',
          title_publisher: 'alexanderPorubov',
          url_api_dld: 'http://www.gameasy.com/it/v01/contents/4de756a55ac71f45c5b7b4211b71219e/download?formats=html5applications',
          url_binary_dld: 'http://s.motime.com/p/bcontents/appsdownload/it_gameasy/2016/11/21/10/58/410c98a6-4c49-404a-9856-01245f768788/fruit-slicer.bin?v=1488339901',
          url_leaf_engine_subscription: 'http://www.gameasy.com/it/subscribe/content/4de756a55ac71f45c5b7b4211b71219e?content_id=4de756a55ac71f45c5b7b4211b71219e&cors_compliant=1',
          url_play: 'http://www.gameasy.com/it/html5gameplay/4de756a55ac71f45c5b7b4211b71219e/game/fruit-slicer',
          url_zoom_simple: 'fruit-slicer_4de756a55ac71f45c5b7b4211b71219e',
        },
        dictionary: {
          messageOfFbChallenge: 'Il mio punteggio \u00e8 %s; prova a batterlo!',
          matchLeftSingular: 'ti \u00e8 rimasta %s partita',
          matchLeftPlural: 'ti sono rimaste %s partite',
          matchLeftNone: 'Hai esaurito i crediti',
        },
        user: {
          userId: '485de7fefda611e6b728005056b60718',
          session_id: null,
          fbUserId: null,
          fbConnected: false,
          userFreemium: false,
          nickname: null,
          avatar: {
            src: 'http://s.motime.com/img/wl/webstore_html5game/images/avatar/big/avatar_01.png?v=20170306101345',
            name: 'avatar_01.png',
          },
          level: 1,
        },
      },
    };
  });

  it('should normalize gameinfo response', () => {
    const result = normalizeGameInfo(gameInfoResponse200.game_info);
    expect(result.game).toBeUndefined();
    expect(result.title).toEqual('Fruit Slicer');
    expect(result.content_id).toEqual('4de756a55ac71f45c5b7b4211b71219e');
  });

  it('handle when gaminfo is null', () => {
    const result = normalizeGameInfo(null);
    expect(result.game).toBeUndefined();
    expect(result.title).toBeUndefined();
    expect(result.content_id).toBeUndefined();
  });

  it('get user type from usercheck', () => {
    expect(getUserType({ user: 'abcdefghi123456789', subscribed: true })).toEqual('premium');
    expect(getUserType({ user: null })).toEqual('guest');
    expect(getUserType({ user: null })).toEqual('guest');
    expect(getUserType({ user: '1231512', subscribed: false, logged: true })).toEqual('free');
  });
});
