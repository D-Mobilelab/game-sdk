;(function(root, doc) {
    // Please insert gameFrame as id of the iframe parent element
    var __ENV__ = 'production';
    var IFRAME_SELECTOR = '#gameFrame iframe';
    function start() {
        var iframe = doc.querySelector(IFRAME_SELECTOR);
        if(iframe && iframe.contentWindow) { iframe.contentWindow.history.back = root.history.back; }
        window.addEventListener('message', function(e) {
            if (e.origin !== 'http://timgate.playmobile.it' && __ENV__ === 'production') { return; }
            if (e.data === 'GO_TO_HOME') {
                root.history.back();
            }
        })
    }
    doc.addEventListener('DOMContentLoaded', start);
})(window, document);