function get_cookies(request) {
    var cookies = {};
    const rawCookie = request.headers['cookie'];
    if(rawCookie){
        rawCookie.split(';').forEach(function (cookie) {
            var parts = cookie.match(/(.*?)=(.*)$/)
            cookies[parts[1].trim()] = (parts[2] || '').trim();
        });
    }
    return cookies;
};

module.exports = {get_cookies};