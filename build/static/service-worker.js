if(!self.define){const s=s=>{"require"!==s&&(s+=".js");let e=Promise.resolve();return a[s]||(e=new Promise(async e=>{if("document"in self){const a=document.createElement("script");a.src=s,document.head.appendChild(a),a.onload=e}else importScripts(s),e()})),e.then(()=>{if(!a[s])throw new Error(`Module ${s} didn’t register its module`);return a[s]})},e=(e,a)=>{Promise.all(e.map(s)).then(s=>a(1===s.length?s[0]:s))},a={require:Promise.resolve(e)};self.define=(e,i,c)=>{a[e]||(a[e]=Promise.resolve().then(()=>{let a={};const t={uri:location.origin+e.slice(1)};return Promise.all(i.map(e=>{switch(e){case"exports":return a;case"module":return t;default:return s(e)}})).then(s=>{const e=c(...s);return a.default||(a.default=e),a})}))}}define("./service-worker.js",["./workbox-69b5a3b7"],(function(s){"use strict";self.addEventListener("message",s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()}),s.precacheAndRoute([{url:"/static/../index.html",revision:"1107415e6021f39d091cd0945924eb2f"},{url:"/static/0967e954edf0083de999e4b71bd79a6e.eot",revision:"0967e954edf0083de999e4b71bd79a6e"},{url:"/static/174ff75c4beef45d9e9d5cae7f5db9c9.ttf",revision:"174ff75c4beef45d9e9d5cae7f5db9c9"},{url:"/static/2.84816f5929140e5dddb7.js",revision:"269466e65f7ad736b823c4229ed0bd23"},{url:"/static/24364bc4dd8b1ae70cd41c8116516633.eot",revision:"24364bc4dd8b1ae70cd41c8116516633"},{url:"/static/3.84816f5929140e5dddb7.js",revision:"22440ec9e0101506b4b8acd1151eeeb6"},{url:"/static/4.84816f5929140e5dddb7.js",revision:"ba460ec32e3647432f8aa7ca8239b7b3"},{url:"/static/417f6190949d82eff751ae8f838156b7.svg",revision:"417f6190949d82eff751ae8f838156b7"},{url:"/static/4191c7967f1de500ee3028f6b0ec0683.ttf",revision:"4191c7967f1de500ee3028f6b0ec0683"},{url:"/static/47763551bc75993a6abaa231445b9736.eot",revision:"47763551bc75993a6abaa231445b9736"},{url:"/static/5.84816f5929140e5dddb7.js",revision:"12a0de6bdf1f48a62effcd9edee6179e"},{url:"/static/6.84816f5929140e5dddb7.js",revision:"0b199ec56171929d733095eeb7f21e16"},{url:"/static/7.84816f5929140e5dddb7.js",revision:"2fd89fc77f6798677371b71905d0c2d9"},{url:"/static/7097bbd53a87e7abdf85a5226471460e.svg",revision:"7097bbd53a87e7abdf85a5226471460e"},{url:"/static/918e12c4ba812f7f18663fa67ac49f93.eot",revision:"918e12c4ba812f7f18663fa67ac49f93"},{url:"/static/92da8f4754f3ee9d8d7d0e210268efab.svg",revision:"92da8f4754f3ee9d8d7d0e210268efab"},{url:"/static/93ee77e2d7937acb94a8122e2c3396d3.svg",revision:"93ee77e2d7937acb94a8122e2c3396d3"},{url:"/static/9d7459c8ab3477b89b47bf71766c77d7.ttf",revision:"9d7459c8ab3477b89b47bf71766c77d7"},{url:"/static/app.84816f5929140e5dddb7.css",revision:"b2d498d4e5c03a345b6bc711bc5bbd09"},{url:"/static/app.84816f5929140e5dddb7.js",revision:"652ec3fcaf1deec86257cfc7c1fc1292"},{url:"/static/app.84816f5929140e5dddb7.js.LICENSE",revision:"d2843f1fc39e607a60424bc0f1723983"},{url:"/static/app.84816f5929140e5dddb7.js.LICENSE.txt",revision:"6105af8b209d648b95e7a7eb136a840e"},{url:"/static/assets/American-Express.png",revision:"c3360b95d2f8d66b3dfea5ef0648ca75"},{url:"/static/assets/TS_Plus_Front.png",revision:"077b3dacc9a66c198414f6aedea51aa1"},{url:"/static/assets/TS_Plus_Top_View.png",revision:"a6e23c4314f4c3644084dff4f7357600"},{url:"/static/assets/adminlogo.svg",revision:"cfba66f91c92451b752ac944a918aea0"},{url:"/static/assets/arrow-left.png",revision:"6013e392535f731257e299b5e790e2e1"},{url:"/static/assets/arrow-right.png",revision:"a81f2f8a1a019fa7305e26691ecc65aa"},{url:"/static/assets/avatar.png",revision:"c30659afa33a444a3fc733e73b5bf00a"},{url:"/static/assets/cart.svg",revision:"4be8f2db199f4c0a85fec4f32d4711f5"},{url:"/static/assets/compare_handle.png",revision:"4162591f7f906449a5911da07e218a71"},{url:"/static/assets/coupon-hover.png",revision:"9307d75a75f6c77091fe77384831aeef"},{url:"/static/assets/coupon-hover.svg",revision:"ff5a0bb344e870162e68ad35950313a2"},{url:"/static/assets/coupon.svg",revision:"4182002085ce22fa39ac454d6195ea52"},{url:"/static/assets/datapoint.png",revision:"33fcfe84677c4abc2c8550a1ce3cbfa2"},{url:"/static/assets/deliverable-1.png",revision:"ac34e3b38f17a66d60b0036e2ca06bc6"},{url:"/static/assets/deliverable-2.png",revision:"9e4f77fa5147c1621a45a11fd3058228"},{url:"/static/assets/discover.png",revision:"52eef3815942f7432364e3f05999b5bb"},{url:"/static/assets/drag.png",revision:"eab2472a7e8d22a2b2eb2e38d476ae18"},{url:"/static/assets/email.svg",revision:"576442b8622f5a6c9d4bc519218dc5c0"},{url:"/static/assets/error_icon.png",revision:"ec179d59852042edf25bfe7441e5d005"},{url:"/static/assets/exterior.jpg",revision:"8d195070b9ca8327a97d150b7f43ecf1"},{url:"/static/assets/facebook-logo.svg",revision:"d28c8cf348732ee17b074b55d76befee"},{url:"/static/assets/favicon.png",revision:"643f0b6238447807c5a24370a21292f8"},{url:"/static/assets/first.svg",revision:"d31f1ffc4482ded22980059df29c6c99"},{url:"/static/assets/hamburger.png",revision:"9ad303bd3fd23e5a51c2637c2f309255"},{url:"/static/assets/instagram.svg",revision:"996b7a4c3a4b295a73360d3c5bd06f18"},{url:"/static/assets/interior.jpg",revision:"90aaa209ba29984749244c565b6b0b79"},{url:"/static/assets/is-default.svg",revision:"2740c3ce832d8a670d1403bd4396fdee"},{url:"/static/assets/last.svg",revision:"f4079663347b612811c624757cde276c"},{url:"/static/assets/left.svg",revision:"19b79202e2bc621df111e1ac358ed604"},{url:"/static/assets/linkedin.svg",revision:"8d78eef5cecfd29930ce7689d328c018"},{url:"/static/assets/loader.gif",revision:"27ff4518f60772b9964c1fed617757b1"},{url:"/static/assets/lock.svg",revision:"3767f762b0b69514d86ccd9b84c61250"},{url:"/static/assets/logo.png",revision:"88761cf4a47dafe5c43d2502cff0cdaa"},{url:"/static/assets/logout.svg",revision:"e478f1faf1eb844fe0619e4c21ae5e7c"},{url:"/static/assets/mastercard.png",revision:"19e936d5b74239f89c139b9955d28d29"},{url:"/static/assets/next.svg",revision:"026d2e46570bc30daac1b853897e08fd"},{url:"/static/assets/order-hover.svg",revision:"4f36035808f686b9d6cc8ebcf9b3dbb5"},{url:"/static/assets/order.svg",revision:"b60d5d46b22f2476a0e767dd9ad1c6f0"},{url:"/static/assets/password.svg",revision:"3767f762b0b69514d86ccd9b84c61250"},{url:"/static/assets/post.jpg",revision:"016dbde0798b8a2533ebc17cbbdc6de9"},{url:"/static/assets/pre.jpg",revision:"1c5413c88587f6e3ea46b368468a2e40"},{url:"/static/assets/previous.svg",revision:"64664acc2c93f01801c924d00dfe4f3b"},{url:"/static/assets/profile_edit.svg",revision:"b6ded1e96cad0e99cee795adf9554489"},{url:"/static/assets/public_logo.svg",revision:"7649cdbfa60984b7e4679a61f9875d42"},{url:"/static/assets/question.svg",revision:"f124d4efa954a1adfba7c5f951fa5cff"},{url:"/static/assets/remove.svg",revision:"0dabc6b27cab2dd489d1af4df0b79936"},{url:"/static/assets/right-arrow-dark.svg",revision:"ba1f3a2d65076e26536331cdbe0acea0"},{url:"/static/assets/right-arrow.svg",revision:"31f72dd845dcf65225871a18a79d1af5"},{url:"/static/assets/save.svg",revision:"dfc5409a4c01bafe877b52d87f61d9f1"},{url:"/static/assets/save2.svg",revision:"25ac8ce2d48f2b4774604d817a53c126"},{url:"/static/assets/search.svg",revision:"922935badad0243868740589d7eee113"},{url:"/static/assets/sketch-1.png",revision:"1c829a3d49b9b6f1186b6d9c3fa1cfb3"},{url:"/static/assets/sketch2.png",revision:"e84ac62de38fe6d224fca105f64dbf41"},{url:"/static/assets/slide.png",revision:"4824389ae22dc8502db1005efff2dc9d"},{url:"/static/assets/slides/slide1.jpg",revision:"08b2b44a4990d0e6e34a2f31448874b6"},{url:"/static/assets/slides/slide2.jpg",revision:"f085dabf5a503ec9810fe36039673826"},{url:"/static/assets/slides/slide3.jpg",revision:"08e2b9cb8863a5b729e55e901b8b58a4"},{url:"/static/assets/slides/slide4.jpg",revision:"a13a886389d8d5a967c1a870fef53962"},{url:"/static/assets/slides/slide5.jpg",revision:"801c92cffed5503927f1a1f2fb34dcd0"},{url:"/static/assets/slides/slide6.jpg",revision:"ab6663ec8797e3bb236b62fcce367bde"},{url:"/static/assets/success_icon.png",revision:"e559ab1318291db0f7637b44c254c9c6"},{url:"/static/assets/title_circle.png",revision:"10223afe22dfc2154e4ca64fd71721cb"},{url:"/static/assets/twitter.svg",revision:"eed96b4233e56d93468a9e46b3002286"},{url:"/static/assets/up-arrow-white.svg",revision:"f807c3a82ca631c0983e1b407c970213"},{url:"/static/assets/up-arrow.svg",revision:"739a0f58d8affeeb79b507ba544f03ef"},{url:"/static/assets/upload.svg",revision:"528d84b4e15568edfad06d3f4c6eed49"},{url:"/static/assets/user-admin.svg",revision:"0a708694e0bf0921c7d906a91ae3ae7d"},{url:"/static/assets/user-hover.svg",revision:"75e5ba1de86d669416dc1033e0ecae8d"},{url:"/static/assets/user.svg",revision:"07b9cedfc347d58b563e7b4005e98e09"},{url:"/static/assets/userProfile.svg",revision:"542cb9e3e041f5fcc2e2297ae20d4f09"},{url:"/static/assets/usericon.svg",revision:"4d3b578d470898d1f79be654e94aa25a"},{url:"/static/assets/view.svg",revision:"5f6607f10f07374621d24d9b82c62692"},{url:"/static/assets/visa.png",revision:"df2eb2e0550be67ad12b3090648483dc"},{url:"/static/cfba66f91c92451b752ac944a918aea0.svg",revision:"cfba66f91c92451b752ac944a918aea0"},{url:"/static/compareslider.84816f5929140e5dddb7.js",revision:"403c3c579453143c9126eb05f802e483"},{url:"/static/f4cbcb34f2d88d4653d73d5b53bc3dba.ttf",revision:"f4cbcb34f2d88d4653d73d5b53bc3dba"}],{})}));
//# sourceMappingURL=service-worker.js.map
