module.exports = function(HOST = 'www2.gameasy.com', GAME_ID = '8ca8ff681ca627444cdffc0b6c0c7111', COUNTRY_CODE = 'ww-it'){
    return {
        "hash": "",
        "search": "",
        "pathname": `/${COUNTRY_CODE}/html5gameplay/${GAME_ID}/game/sample`,
        "port": "",
        "hostname": `${HOST}`,
        "host": `${HOST}`,
        "protocol": "http:",
        "origin": `http://${HOST}`,
        "href": `http://${HOST}/${COUNTRY_CODE}/html5gameplay/${GAME_ID}/game/sample`,    
    }
}