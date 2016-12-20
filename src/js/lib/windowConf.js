module.exports = function(HOST = 'www2.gameasy.com', GAME_ID = 'b67a8f2b6cf66b74b77d129cd5de17a1', COUNTRY_CODE = 'ww-it'){
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