(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"./client/app/components/DataPoint.tsx":function(e,t,o){"use strict";(function(e){var a,n=o("./node_modules/react/index.js"),r=o.n(n),s=o("./node_modules/@emotion/core/dist/core.browser.esm.js");(a="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&a(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var i,l,c=function(e){return Object(s.a)(r.a.Fragment,null,Object(s.a)("div",{className:"data_point_item row no-gutters"},Object(s.a)("div",{className:"data_number data_number_".concat(e.point.number," col-md-4 col-sm-12")},e.point.number),Object(s.a)("div",{className:"data_text  col-md-8 col-sm-12 "},1==e.point.number?Object(s.a)("a",{href:"https://www.getinsights.org/matterport-standards/"},e.point.point):Object(s.a)("span",null,e.point.point))))},d=c;t.a=d,(i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(i.register(c,"DataPoint","C:\\Users\\Musadiq Khan\\Desktop\\mpartial-frontend\\client\\app\\components\\DataPoint.tsx"),i.register(d,"default","C:\\Users\\Musadiq Khan\\Desktop\\mpartial-frontend\\client\\app\\components\\DataPoint.tsx")),(l="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&l(e)}).call(this,o("./node_modules/webpack/buildin/harmony-module.js")(e))},"./client/app/components/SectionTitle.tsx":function(e,t,o){"use strict";(function(e){var a,n=o("./node_modules/react/index.js"),r=o.n(n),s=o("./node_modules/@emotion/core/dist/core.browser.esm.js");(a="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&a(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var i,l,c=function(e){return Object(s.a)(r.a.Fragment,null,"left"===e.type?Object(s.a)("div",{className:"title left"},Object(s.a)("div",{className:"row"},Object(s.a)("div",{className:"col-md-6 col-sm-12"},Object(s.a)("h1",{className:"section_title_text"},e.title)),Object(s.a)("div",{className:"col-md-6 col-sm-12"},Object(s.a)("div",{className:"section_title_description"},e.description)))):Object(s.a)("div",{className:"title center"},Object(s.a)("div",{className:"row"},Object(s.a)("div",{className:"col"},Object(s.a)("h1",{className:"section_title_text"},e.title)))))},d=c;t.a=d,(i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(i.register(c,"SectionTitle","C:\\Users\\Musadiq Khan\\Desktop\\mpartial-frontend\\client\\app\\components\\SectionTitle.tsx"),i.register(d,"default","C:\\Users\\Musadiq Khan\\Desktop\\mpartial-frontend\\client\\app\\components\\SectionTitle.tsx")),(l="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&l(e)}).call(this,o("./node_modules/webpack/buildin/harmony-module.js")(e))},"./client/app/pages/Homepage/_components/HowItWorks.tsx":function(e,t,o){"use strict";o.r(t),function(e){var a,n=o("./node_modules/@babel/runtime/helpers/objectDestructuringEmpty.js"),r=o.n(n),s=o("./node_modules/react/index.js"),i=o("./node_modules/react-router-dom/esm/react-router-dom.js"),l=o("./client/app/components/SectionTitle.tsx"),c=o("./client/app/components/DataPoint.tsx"),d=o("./client/contexts/authContext.tsx"),u=o("./node_modules/@emotion/core/dist/core.browser.esm.js");(a="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&a(e);var p=function(e){r()(e);var t=s.useContext(d.a).isUserAuthenticated;return Object(u.a)(s.Fragment,null,Object(u.a)("div",{className:"mpartial_section howitworks"},Object(u.a)("div",{className:"container"},Object(u.a)(l.a,{title:"How It Works",description:"",type:"center"}),Object(u.a)("div",{className:"data_points"},Object(u.a)("div",{className:"row no-gutters"},["Perform pre-mitigation and post-mitigation scans with a Matterport Pro Series camera.","Submit the Matterport scans via the mpartial portal and then go back to what you do great.","Receive a well-formatted, fully documented Xactimate PDF, ESX & Matterport TrueSketch PLUS SKX."].map(function(e,t){return Object(u.a)("div",{className:"col-md-4 col-sm-12",key:t},Object(u.a)(c.a,{point:{point:e,number:t+1}}))}))),Object(u.a)("div",{className:"try_now_btn"},Object(u.a)(i.a,{to:t()?"/order":"/login"},Object(u.a)("button",{className:"btn"},"Get Started"))))))};("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})(p,"useContext{{ isUserAuthenticated }}");var m,b,f=p;t.default=f,(m="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(m.register(p,"HowItWorks","C:\\Users\\Musadiq Khan\\Desktop\\mpartial-frontend\\client\\app\\pages\\Homepage\\_components\\HowItWorks.tsx"),m.register(f,"default","C:\\Users\\Musadiq Khan\\Desktop\\mpartial-frontend\\client\\app\\pages\\Homepage\\_components\\HowItWorks.tsx")),(b="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&b(e)}.call(this,o("./node_modules/webpack/buildin/harmony-module.js")(e))},"./node_modules/@babel/runtime/helpers/objectDestructuringEmpty.js":function(e,t){e.exports=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}}}]);