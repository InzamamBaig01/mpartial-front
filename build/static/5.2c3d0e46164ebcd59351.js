(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"./client/app/components/DataPoint.tsx":function(e,t,a){"use strict";(function(e){var o,n=a("./node_modules/react/index.js"),r=a.n(n),s=a("./node_modules/@emotion/core/dist/core.browser.esm.js");(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var i,d,c=function(e){return Object(s.a)(r.a.Fragment,null,Object(s.a)("div",{className:"data_point_item row no-gutters"},Object(s.a)("div",{className:"data_number data_number_".concat(e.point.number," col-md-4 col-sm-12")},e.point.number),Object(s.a)("div",{className:"data_text  col-md-8 col-sm-12 "},1==e.point.number?Object(s.a)("a",{href:"https://www.getinsights.org/matterport-standards/"},e.point.point):Object(s.a)("span",null,e.point.point))))},l=c;t.a=l,(i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(i.register(c,"DataPoint","C:\\Users\\Musadiq Khan\\Desktop\\mpartial-frontend\\client\\app\\components\\DataPoint.tsx"),i.register(l,"default","C:\\Users\\Musadiq Khan\\Desktop\\mpartial-frontend\\client\\app\\components\\DataPoint.tsx")),(d="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&d(e)}).call(this,a("./node_modules/webpack/buildin/harmony-module.js")(e))},"./client/app/pages/Homepage/_components/HowItWorks.tsx":function(e,t,a){"use strict";a.r(t),function(e){var o,n=a("./node_modules/@babel/runtime/helpers/objectDestructuringEmpty.js"),r=a.n(n),s=a("./node_modules/react/index.js"),i=a("./node_modules/react-router-dom/esm/react-router-dom.js"),d=a("./client/app/components/SectionTitle.tsx"),c=a("./client/app/components/DataPoint.tsx"),l=a("./client/contexts/authContext.tsx"),p=a("./node_modules/@emotion/core/dist/core.browser.esm.js");(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e);var u=function(e){r()(e);var t=s.useContext(l.a).isUserAuthenticated;return Object(p.a)(s.Fragment,null,Object(p.a)("div",{className:"mpartial_section howitworks"},Object(p.a)("div",{className:"container"},Object(p.a)(d.a,{title:"",title2:"How It Works",description:"",type:"center"}),Object(p.a)("div",{className:"data_points"},Object(p.a)("div",{className:"row no-gutters"},["Perform pre-mitigation and post-mitigation scans with a Matterport Pro Series camera.","Submit the Matterport scans via the mpartial portal and then go back to what you do great.","Receive a well-formatted, fully documented Xactimate PDF, ESX & Matterport TrueSketch PLUS SKX."].map(function(e,t){return Object(p.a)("div",{className:"col-md-4 col-sm-12",key:t},Object(p.a)(c.a,{point:{point:e,number:t+1}}))}))),Object(p.a)("div",{className:"try_now_btn"},Object(p.a)(i.a,{to:t()?"/order":"/login"},Object(p.a)("button",{className:"btn"},"Get Started"))))))};("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})(u,"useContext{{ isUserAuthenticated }}");var m,b,f=u;t.default=f,(m="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(m.register(u,"HowItWorks","C:\\Users\\Musadiq Khan\\Desktop\\mpartial-frontend\\client\\app\\pages\\Homepage\\_components\\HowItWorks.tsx"),m.register(f,"default","C:\\Users\\Musadiq Khan\\Desktop\\mpartial-frontend\\client\\app\\pages\\Homepage\\_components\\HowItWorks.tsx")),(b="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&b(e)}.call(this,a("./node_modules/webpack/buildin/harmony-module.js")(e))}}]);