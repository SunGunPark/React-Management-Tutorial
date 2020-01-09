const proxy = require('http-proxy-middleware');
// create-react-app proxy 설정


// 190524 je.kim dev server 에서 proxy 사용시 세션 유지 불가 -> 강제로 세션키를 맞춤
var cookie;

// proxy 로 request 시 이벤트
function relayRequestHeaders(proxyReq, req) {
    console.debug('--request--');
    Object.keys(req.headers).forEach(function (key) {
      console.debug(`${key} : ${req.headers[key]}`);
    });
    if (cookie) {
      proxyReq.setHeader('cookie', cookie);
    }
};

// proxy 로 Response 시 이벤트
function relayResponseHeaders(proxyRes, req, res) {
    console.debug('--response--');
    Object.keys(proxyRes.headers).forEach(function (key) {
      console.debug(`${key} : ${proxyRes.headers[key]}`);
    });
    var proxyCookie = proxyRes.headers["set-cookie"];
    if (proxyCookie) {
      cookie = proxyCookie;
    }
};

module.exports = function(app) {
  // ...
  // 프록시 설정
  app.use(
    proxy(
      [
        '/api/customers',
      ], {
        // 대상서버
         target: 'http://localhost:5000' ,
         secure: false, // disable SSL verification
         //changeOrigin: true, // for vhosted sites, changes host header to match to target's host
         ws : true, // websock on
         onProxyReq: relayRequestHeaders,
         onProxyRes: relayResponseHeaders,
         // ajax 혹은 통신이 있을경우에 로그에 표시
         // logLevel: 'debug'
       }
    )
  );
};