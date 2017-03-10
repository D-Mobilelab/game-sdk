import { normalizeGameInfo } from '../gameinfo-actions';

describe('Gameinfo tests', function() {
  let gameInfoResponse403, gameInfoResponse200;
  beforeEach(function(){
    gameInfoResponse403 = {
        "status":403,
        "return_url":null,
        "game_info":
            {"alfresco_id":"HAWW990001849",
            "category":null,
            "compatibility":true,
            "content_id":"b818605b3edf178a8eb0bcdc9c37c12f",
            "counters_favourites":0,
            "counters_matches":0,
            "customer_id":"ww_testgamifive","description":"Chop fish, sake bottles, takoyaki balls, ebi tempura and more flying food in half. Don't cut bombs, because they will explode. Are you quick as a Ninja??","description_short":"Chop fish, sake bottles, takoyaki balls, ebi tempura and more flying food in half. Don't cut bombs, ...","format":"html5applications","has_sdk":true,"id":"b818605b3edf178a8eb0bcdc9c37c12f","img_qrcode":"http:\/\/appsworld.gamifive-app.com\/qrcode?text=http%3A%2F%2Fappsworld.gamifive-app.com%2Fsetwelcome%3Freturn_url%3Dhttp%253A%252F%252Fappsworld.gamifive-app.com%252F%2523%2521%252Fgames%252Fsushi-slicer_HAWW990001849","name":"Sushi Slicer","size":"7,03 MB","title":"Sushi Slicer","title_publisher":"coolgames","url_api_dld":"http:\/\/appsworld.gamifive-app.com\/v01\/contents\/b818605b3edf178a8eb0bcdc9c37c12f\/download?formats=html5applications","url_leaf_engine_subscription":"http:\/\/appsworld.gamifive-app.com\/subscribe\/content\/HAWW990001849","url_play":"http:\/\/appsworld.gamifive-app.com\/html5gameplay\/b818605b3edf178a8eb0bcdc9c37c12f\/game\/sushi-slicer","url_preview_big":"http:\/\/s.motime.com\/p\/bcontents\/absimageapp2\/h600\/w0\/ww_appsworld\/mnt\/alfresco_content_preprod\/content\/contentstore\/2016\/9\/29\/12\/2\/28e083ed-1039-4bf3-92a9-e4c5579aef1f\/sushi-slicer.bin?v=1488572928","url_preview_medium":"http:\/\/s.motime.com\/p\/bcontents\/absimageapp2\/h240\/w0\/ww_appsworld\/mnt\/alfresco_content_preprod\/content\/contentstore\/2016\/9\/29\/12\/2\/28e083ed-1039-4bf3-92a9-e4c5579aef1f\/sushi-slicer.bin?v=1488572928","url_preview_small":"http:\/\/s.motime.com\/p\/bcontents\/absimageapp2\/h175\/w0\/ww_appsworld\/mnt\/alfresco_content_preprod\/content\/contentstore\/2016\/9\/29\/12\/2\/28e083ed-1039-4bf3-92a9-e4c5579aef1f\/sushi-slicer.bin?v=1488572928","url_publisher":"http:\/\/appsworld.gamifive-app.com\/#!\/publisher\/coolgames\/","url_share":"http:\/\/appsworld.gamifive-app.com\/share\/games\/sushi-slicer_HAWW990001849.html","url_zoom":"http:\/\/appsworld.gamifive-app.com\/#!\/games\/sushi-slicer_HAWW990001849","url_zoom_simple":"sushi-slicer_HAWW990001849"}
        };
        gameInfoResponse200 = {
        "status": 200,
        "return_url": null,
            "game_info": {
                "label": "it_gameasy",
                "contentId": "4de756a55ac71f45c5b7b4211b71219e",
                "dest_domain": "http:\/\/www.gameasy.com\/it\/",
                "thankyoupage_on_mip": 0,
                "thankyoupage_on_mip_message_title": null,
                "thankyoupage_on_mip_message_body": null,
                "thankyoupage_on_mip_delay_ms": "5000",
                "typmip": null,
                "userId": "485de7fefda611e6b728005056b60718",
                "fbUserId": null,
                "fbAppId": "1530616587235761",
                "fbConnected": false,
                "requireFbConnect": true,
                "fbExternal": false,
                "userFreemium": false,
                "challenge": {
                    "id": null
                },
                "game": {
                    "access_type": {
                        "guest": false,
                        "free": true,
                        "premium": true
                    },
                    "alfresco_id": "HAIT990001689",
                    "binary_md5": "a6e187a6090c5c06bb2415b75cff06f1",
                    "category": null,
                    "compatibility": true,
                    "content_id": "4de756a55ac71f45c5b7b4211b71219e",
                    "counters_favourites": 8,
                    "counters_matches": 451,
                    "customer_id": "xx_gameasy",
                    "description": "Taglia la frutta, fai le combinazioni e batti i record!",
                    "description_short": "Taglia la frutta, fai le combinazioni e batti i record!",
                    "format": "html5applications",
                    "has_sdk": true,
                    "id": "4de756a55ac71f45c5b7b4211b71219e",
                    "img_qrcode": "http:\/\/www.gameasy.com\/it\/qrcode?text=http%3A%2F%2Fwww.gameasy.com%2Fit%2Fsetwelcome%3Freturn_url%3Dhttp%253A%252F%252Fwww.gameasy.com%252Fit%252F%2523%2521%252Fgames%252Ffruit-slicer_4de756a55ac71f45c5b7b4211b71219e",
                    "name": "Fruit Slicer",
                    "offline_available": true,
                    "size": "9,64 MB",
                    "title": "Fruit Slicer",
                    "title_publisher": "alexanderPorubov",
                    "url_api_dld": "http:\/\/www.gameasy.com\/it\/v01\/contents\/4de756a55ac71f45c5b7b4211b71219e\/download?formats=html5applications",
                    "url_binary_dld": "http:\/\/s.motime.com\/p\/bcontents\/appsdownload\/it_gameasy\/2016\/11\/21\/10\/58\/410c98a6-4c49-404a-9856-01245f768788\/fruit-slicer.bin?v=1488339901",
                    "url_leaf_engine_subscription": "http:\/\/www.gameasy.com\/it\/subscribe\/content\/4de756a55ac71f45c5b7b4211b71219e?content_id=4de756a55ac71f45c5b7b4211b71219e&cors_compliant=1",
                    "url_play": "http:\/\/www.gameasy.com\/it\/html5gameplay\/4de756a55ac71f45c5b7b4211b71219e\/game\/fruit-slicer",
                    "url_preview_big": "http:\/\/s.motime.com\/p\/bcontents\/absimageapp2\/h600\/w0\/it_gameasy\/mnt\/alfresco_content_prod\/contentstore\/2016\/6\/28\/9\/19\/21df2e13-0970-4970-b40a-710b335af601\/fruit-slicer.bin?v=1488339901",
                    "url_preview_medium": "http:\/\/s.motime.com\/p\/bcontents\/absimageapp2\/h240\/w0\/it_gameasy\/mnt\/alfresco_content_prod\/contentstore\/2016\/6\/28\/9\/19\/21df2e13-0970-4970-b40a-710b335af601\/fruit-slicer.bin?v=1488339901",
                    "url_preview_small": "http:\/\/s.motime.com\/p\/bcontents\/absimageapp2\/h175\/w0\/it_gameasy\/mnt\/alfresco_content_prod\/contentstore\/2016\/6\/28\/9\/19\/21df2e13-0970-4970-b40a-710b335af601\/fruit-slicer.bin?v=1488339901",
                    "url_publisher": "http:\/\/www.gameasy.com\/it\/#!\/publisher\/alexanderPorubov\/",
                    "url_share": "http:\/\/www.gameasy.com\/it\/share\/games\/fruit-slicer_4de756a55ac71f45c5b7b4211b71219e.html",
                    "url_zoom": "http:\/\/www.gameasy.com\/it\/#!\/games\/fruit-slicer_4de756a55ac71f45c5b7b4211b71219e",
                    "url_zoom_simple": "fruit-slicer_4de756a55ac71f45c5b7b4211b71219e"
                },
                "dictionary": {
                    "messageOfFbChallenge": "Il mio punteggio \u00e8 %s; prova a batterlo!",
                    "matchLeftSingular": "ti \u00e8 rimasta %s partita",
                    "matchLeftPlural": "ti sono rimaste %s partite",
                    "matchLeftNone": "Hai esaurito i crediti"
                },
                "user": {
                    "userId": "485de7fefda611e6b728005056b60718",
                    "session_id": null,
                    "fbUserId": null,
                    "fbConnected": false,
                    "userFreemium": false,
                    "nickname": null,
                    "avatar": {
                        "src": "http:\/\/s.motime.com\/img\/wl\/webstore_html5game\/images\/avatar\/big\/avatar_01.png?v=20170306101345",
                        "name": "avatar_01.png"
                    },
                    "level": 1
                }
            }
        };
  });

  it('should normalize gameinfo response', function() {
    let result = normalizeGameInfo(gameInfoResponse200.game_info);
    expect(result.game).toBeUndefined();
    expect(result.title).toEqual('Fruit Slicer');
    expect(result.content_id).toEqual('4de756a55ac71f45c5b7b4211b71219e');
  });

  it('handle when gaminfo is null', function() {
    let result = normalizeGameInfo(null);
    expect(result.game).toBeUndefined();
    expect(result.title).toBeUndefined();
    expect(result.content_id).toBeUndefined();
  });
});