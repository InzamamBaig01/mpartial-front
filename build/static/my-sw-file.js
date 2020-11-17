/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/static/0967e954edf0083de999e4b71bd79a6e.eot","0967e954edf0083de999e4b71bd79a6e"],["/static/174ff75c4beef45d9e9d5cae7f5db9c9.ttf","174ff75c4beef45d9e9d5cae7f5db9c9"],["/static/2.99defc83200ba4fde172.js","67fbe3db861a1ee357617eb170d2090f"],["/static/2.99defc83200ba4fde172.js.LICENSE","1234143d74a8ddd93881ad81796d47d0"],["/static/2.99defc83200ba4fde172.js.LICENSE.txt","8e60553c3f7d6052374f5110bfdad429"],["/static/2.99defc83200ba4fde172.js.br","f76dd0510969549e176bd0b2f5f00f8e"],["/static/2.99defc83200ba4fde172.js.gz","ea4be9aae0219f9f0362581201eedf34"],["/static/24364bc4dd8b1ae70cd41c8116516633.eot","24364bc4dd8b1ae70cd41c8116516633"],["/static/3.99defc83200ba4fde172.js","8061f7ed600acc53144c7d098c8a6248"],["/static/3.99defc83200ba4fde172.js.LICENSE","dea682e87296679e9fb0faa5cf0db302"],["/static/3.99defc83200ba4fde172.js.LICENSE.txt","ea9f5c7413467148f97d55f435e2f8f1"],["/static/3.99defc83200ba4fde172.js.br","67ecb6c9b9086ed1eebe9bcd68e9f49c"],["/static/3.99defc83200ba4fde172.js.gz","2b6d918a3e8fcd8a6a3db288f503798d"],["/static/4.99defc83200ba4fde172.js","e0fff06a22b0743ac690066ee6433ac8"],["/static/4.99defc83200ba4fde172.js.LICENSE","239cc07dcbe2dc4eb73e90592a17be75"],["/static/4.99defc83200ba4fde172.js.LICENSE.txt","ff2e5cb34a9c07acc34f6c2b85206977"],["/static/4.99defc83200ba4fde172.js.br","fb026f4f6e4c5e8fffb29ed0a147eb3a"],["/static/4.99defc83200ba4fde172.js.gz","b4375aee0352f48bcf7080d40b2f4619"],["/static/417f6190949d82eff751ae8f838156b7.svg","417f6190949d82eff751ae8f838156b7"],["/static/417f6190949d82eff751ae8f838156b7.svg.br","548a64c6ae13e307197da5071bcf11b3"],["/static/417f6190949d82eff751ae8f838156b7.svg.gz","dbc66a2346033cadb13905516ba71b5d"],["/static/4191c7967f1de500ee3028f6b0ec0683.ttf","4191c7967f1de500ee3028f6b0ec0683"],["/static/47763551bc75993a6abaa231445b9736.eot","47763551bc75993a6abaa231445b9736"],["/static/5.99defc83200ba4fde172.js","61e11bacace20399ec3a6b4820944a61"],["/static/5.99defc83200ba4fde172.js.LICENSE","7aded3781f6541a4577f0f755aeb482f"],["/static/5.99defc83200ba4fde172.js.LICENSE.txt","ea9f5c7413467148f97d55f435e2f8f1"],["/static/5.99defc83200ba4fde172.js.br","f45cf0dd76b5ad61479c726e5c8095dc"],["/static/6.99defc83200ba4fde172.js","e3df64d4c5ff3e2f5fd44490cf2654e5"],["/static/6.99defc83200ba4fde172.js.LICENSE","04f173a99ed473dbdfdfc62cff0b3e24"],["/static/6.99defc83200ba4fde172.js.LICENSE.txt","2015446564f1c1a851a2c45600e14a8a"],["/static/6.99defc83200ba4fde172.js.br","2adaaeaab6e04cd147eb5d66e9ea07a9"],["/static/6.99defc83200ba4fde172.js.gz","5689540bc30c23ad504b94faddce0224"],["/static/7.99defc83200ba4fde172.js","e4e091b824b48688e795447cd31d9eee"],["/static/7.99defc83200ba4fde172.js.LICENSE","367b9c8b37b745d9aafbec5074e72fad"],["/static/7.99defc83200ba4fde172.js.LICENSE.txt","bab5525d74075fd1f9bfa9b2f0e8d452"],["/static/7.99defc83200ba4fde172.js.br","0615ea68df8314420d0ecebc85a7dc32"],["/static/7.99defc83200ba4fde172.js.gz","94d2493b8db2fc16d30c1bde209f3ec6"],["/static/7097bbd53a87e7abdf85a5226471460e.svg","7097bbd53a87e7abdf85a5226471460e"],["/static/7097bbd53a87e7abdf85a5226471460e.svg.br","a618d922027ad151ba93eac6c61144b0"],["/static/7097bbd53a87e7abdf85a5226471460e.svg.gz","97a6d7461cce833fdd3f1f9f990794e8"],["/static/918e12c4ba812f7f18663fa67ac49f93.eot","918e12c4ba812f7f18663fa67ac49f93"],["/static/92da8f4754f3ee9d8d7d0e210268efab.svg","92da8f4754f3ee9d8d7d0e210268efab"],["/static/92da8f4754f3ee9d8d7d0e210268efab.svg.br","1e90ce65cc0b073ee9fcc2c4c24619ac"],["/static/92da8f4754f3ee9d8d7d0e210268efab.svg.gz","6585b7e41295fbfbcfcffd9d2934df60"],["/static/93ee77e2d7937acb94a8122e2c3396d3.svg","93ee77e2d7937acb94a8122e2c3396d3"],["/static/93ee77e2d7937acb94a8122e2c3396d3.svg.br","417155a40f13705a40fd2f966defa488"],["/static/93ee77e2d7937acb94a8122e2c3396d3.svg.gz","b5dcd8ca4b02b45ca1a94a312bab77ca"],["/static/9d7459c8ab3477b89b47bf71766c77d7.ttf","9d7459c8ab3477b89b47bf71766c77d7"],["/static/app.99defc83200ba4fde172.css","b2d498d4e5c03a345b6bc711bc5bbd09"],["/static/app.99defc83200ba4fde172.css.br","4a528b47fe770be4d8cc0ece81440b32"],["/static/app.99defc83200ba4fde172.css.gz","4fa41a3d5763efbe4c96c173a3dd9425"],["/static/app.99defc83200ba4fde172.js","6fee8384fcf0a480ab29a59a499c281a"],["/static/app.99defc83200ba4fde172.js.LICENSE","d94430f0d80b2e3ea7ba17325e1487fd"],["/static/app.99defc83200ba4fde172.js.LICENSE.txt","1178163f04dcc68ee524dd5d59a084c3"],["/static/app.99defc83200ba4fde172.js.br","4672f477511ff8d71ccd607ddfaf186b"],["/static/app.99defc83200ba4fde172.js.gz","38ddaf65abbcae993eb5d4c662c82ad4"],["/static/assets/American-Express.png","c3360b95d2f8d66b3dfea5ef0648ca75"],["/static/assets/TS_Plus_Front.png","0c1c9a419e651e52d95d065634a9de9f"],["/static/assets/TS_Plus_Top_View.png","97ca2fb22bb51fc6390d12f4858b8927"],["/static/assets/adminlogo.svg","cfba66f91c92451b752ac944a918aea0"],["/static/assets/adminlogo.svg.br","5060ae5ac73683867e4e6944eb4d7fd9"],["/static/assets/adminlogo.svg.gz","31b4ed7b196b09e1673f630b1cd79634"],["/static/assets/arrow-left.png","6013e392535f731257e299b5e790e2e1"],["/static/assets/arrow-right.png","a81f2f8a1a019fa7305e26691ecc65aa"],["/static/assets/avatar.png","c30659afa33a444a3fc733e73b5bf00a"],["/static/assets/cart.svg","4be8f2db199f4c0a85fec4f32d4711f5"],["/static/assets/cart.svg.br","38cf03e9f073006ed0c211173959cbce"],["/static/assets/compare_handle.png","4162591f7f906449a5911da07e218a71"],["/static/assets/coupon-hover.png","9307d75a75f6c77091fe77384831aeef"],["/static/assets/coupon-hover.svg","6e23da9560b6a6233d1cc95546370ced"],["/static/assets/coupon-hover.svg.br","15b81a4a177050b657415ac3c741ba76"],["/static/assets/coupon-hover.svg.gz","ee312c0611792531631c73c64bb67be5"],["/static/assets/coupon.svg","4182002085ce22fa39ac454d6195ea52"],["/static/assets/coupon.svg.br","93f49ea0390a0e6e27ac70263c5387ff"],["/static/assets/datapoint.png","33fcfe84677c4abc2c8550a1ce3cbfa2"],["/static/assets/deliverable-1.png","ac34e3b38f17a66d60b0036e2ca06bc6"],["/static/assets/deliverable-2.png","9e4f77fa5147c1621a45a11fd3058228"],["/static/assets/discover.png","52eef3815942f7432364e3f05999b5bb"],["/static/assets/drag.png","eab2472a7e8d22a2b2eb2e38d476ae18"],["/static/assets/email.svg","576442b8622f5a6c9d4bc519218dc5c0"],["/static/assets/error_icon.png","ec179d59852042edf25bfe7441e5d005"],["/static/assets/exterior.jpg","8d195070b9ca8327a97d150b7f43ecf1"],["/static/assets/facebook-logo.svg","2088e21733fe9f8aa4fdea657d2d5071"],["/static/assets/favicon.png","643f0b6238447807c5a24370a21292f8"],["/static/assets/first.svg","d31f1ffc4482ded22980059df29c6c99"],["/static/assets/hamburger.png","9ad303bd3fd23e5a51c2637c2f309255"],["/static/assets/instagram.svg","996b7a4c3a4b295a73360d3c5bd06f18"],["/static/assets/instagram.svg.br","b445f788a6be779e9a4339b8b05406d0"],["/static/assets/interior.jpg","90aaa209ba29984749244c565b6b0b79"],["/static/assets/is-default.svg","32ed0636837cd86756a697f66dfe5312"],["/static/assets/last.svg","f4079663347b612811c624757cde276c"],["/static/assets/left.svg","19b79202e2bc621df111e1ac358ed604"],["/static/assets/linkedin.svg","9ecc006b7fcabae719753b1d085bf600"],["/static/assets/linkedin.svg.br","06e7c437923883198d395fdac742aa00"],["/static/assets/loader.gif","27ff4518f60772b9964c1fed617757b1"],["/static/assets/lock.svg","3767f762b0b69514d86ccd9b84c61250"],["/static/assets/lock.svg.br","d22491d1f2aca02723b2c8c74874c9d9"],["/static/assets/logo.png","88761cf4a47dafe5c43d2502cff0cdaa"],["/static/assets/logout.svg","e478f1faf1eb844fe0619e4c21ae5e7c"],["/static/assets/logout.svg.br","21c1ab638a8bf5e6e4ed2799b4eb307f"],["/static/assets/mastercard.png","19e936d5b74239f89c139b9955d28d29"],["/static/assets/next.svg","026d2e46570bc30daac1b853897e08fd"],["/static/assets/order-hover.svg","4f36035808f686b9d6cc8ebcf9b3dbb5"],["/static/assets/order-hover.svg.br","3903ea543243a926b6c543826530b40d"],["/static/assets/order.svg","b60d5d46b22f2476a0e767dd9ad1c6f0"],["/static/assets/order.svg.br","461c439a1932cbb3afaef900fe72c683"],["/static/assets/password.svg","3767f762b0b69514d86ccd9b84c61250"],["/static/assets/password.svg.br","d22491d1f2aca02723b2c8c74874c9d9"],["/static/assets/post.jpg","4c03cea33ebef9351e45ea29be601f08"],["/static/assets/pre.jpg","3b6f449021c10a52473044c3f58f0e16"],["/static/assets/previous.svg","64664acc2c93f01801c924d00dfe4f3b"],["/static/assets/profile_edit.svg","b6ded1e96cad0e99cee795adf9554489"],["/static/assets/public_logo.svg","301cf4c3358505194632cb2039acbc40"],["/static/assets/question.svg","f124d4efa954a1adfba7c5f951fa5cff"],["/static/assets/question.svg.br","8e4f5bc572e40378f656394fffdb5212"],["/static/assets/remove.svg","7ab323e136825bc3c9f7ee1d03d0eb55"],["/static/assets/right-arrow-dark.svg","b7c8a6cb04681feb195df8d377b92578"],["/static/assets/right-arrow.svg","31f72dd845dcf65225871a18a79d1af5"],["/static/assets/save.svg","dfc5409a4c01bafe877b52d87f61d9f1"],["/static/assets/save.svg.br","214f3ad650c25bf5104c421dce02146c"],["/static/assets/save2.svg","25ac8ce2d48f2b4774604d817a53c126"],["/static/assets/save2.svg.br","f354ead24cf4f6055e5a449b722b4c3a"],["/static/assets/search.svg","922935badad0243868740589d7eee113"],["/static/assets/sketch-1.png","1c829a3d49b9b6f1186b6d9c3fa1cfb3"],["/static/assets/sketch2.png","e84ac62de38fe6d224fca105f64dbf41"],["/static/assets/slide.png","4824389ae22dc8502db1005efff2dc9d"],["/static/assets/slides/slide1.jpg","1a9ca279f4d46a46f6f8571afa6a2bba"],["/static/assets/slides/slide2.jpg","6c062907e703bab1c3d062f3884e4372"],["/static/assets/slides/slide3.jpg","648f21ab3c415c945a7ddc683cdf1f77"],["/static/assets/slides/slide4.jpg","6cec14bc38bc8c23a6cc57981067a57a"],["/static/assets/slides/slide5.jpg","8fbe142e43bea56a7a3a77fe37ac287d"],["/static/assets/slides/slide6.jpg","c7f8d28198d55e96e345598dd10f71d1"],["/static/assets/success_icon.png","e559ab1318291db0f7637b44c254c9c6"],["/static/assets/title_circle.png","10223afe22dfc2154e4ca64fd71721cb"],["/static/assets/twitter.svg","eed96b4233e56d93468a9e46b3002286"],["/static/assets/up-arrow-white.svg","f807c3a82ca631c0983e1b407c970213"],["/static/assets/up-arrow.svg","739a0f58d8affeeb79b507ba544f03ef"],["/static/assets/upload.svg","528d84b4e15568edfad06d3f4c6eed49"],["/static/assets/user-admin.svg","0a708694e0bf0921c7d906a91ae3ae7d"],["/static/assets/user-admin.svg.br","d7b040e865a55ab4f5aa928d37d5a80c"],["/static/assets/user-hover.svg","75e5ba1de86d669416dc1033e0ecae8d"],["/static/assets/user-hover.svg.br","9f96f50874a115a4f3b7bd206868f0d4"],["/static/assets/user.svg","5e09c0c091c444670409225c22512e71"],["/static/assets/userProfile.svg","542cb9e3e041f5fcc2e2297ae20d4f09"],["/static/assets/usericon.svg","4d3b578d470898d1f79be654e94aa25a"],["/static/assets/view.svg","5f6607f10f07374621d24d9b82c62692"],["/static/assets/visa.png","df2eb2e0550be67ad12b3090648483dc"],["/static/cfba66f91c92451b752ac944a918aea0.svg","cfba66f91c92451b752ac944a918aea0"],["/static/cfba66f91c92451b752ac944a918aea0.svg.br","5060ae5ac73683867e4e6944eb4d7fd9"],["/static/cfba66f91c92451b752ac944a918aea0.svg.gz","31b4ed7b196b09e1673f630b1cd79634"],["/static/compareslider.99defc83200ba4fde172.js","a2472837e2970f99a0b78666d5c651b9"],["/static/compareslider.99defc83200ba4fde172.js.LICENSE","9042187f488dcfad3c6f2959402e7848"],["/static/compareslider.99defc83200ba4fde172.js.LICENSE.txt","b960e0a9c87f758d628ba880eec73f64"],["/static/compareslider.99defc83200ba4fde172.js.br","89e4af2886272c06d9d408213c2bd2e1"],["/static/compareslider.99defc83200ba4fde172.js.gz","7f4754780c37c4910840fefa276685df"],["/static/f4cbcb34f2d88d4653d73d5b53bc3dba.ttf","f4cbcb34f2d88d4653d73d5b53bc3dba"],["C:/Users/Musadiq Khan/Desktop/mpartial-frontend/build/.htaccess","0f6f94e41bac0c0c11ced6d251f34395"],["C:/Users/Musadiq Khan/Desktop/mpartial-frontend/build/index.html","12249eb09c905954cdda82108dfafb8a"],["C:/Users/Musadiq Khan/Desktop/mpartial-frontend/build/index.html.br","db187f60ae64ea92f3cd6474d06b622d"],["C:/Users/Musadiq Khan/Desktop/mpartial-frontend/build/sitemap.txt","322db083f83ef858f011dd5ae8865741"]];
var cacheName = 'sw-precache-v3-my-project-name-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







