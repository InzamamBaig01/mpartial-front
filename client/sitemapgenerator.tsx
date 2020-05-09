require('babel-register');
 
const router = require('./app/pages/routes.tsx');
const Sitemap = require('react-router-sitemap');

(
    new Sitemap(router)
        .build('http://my-site.ru')
        .save('./sitemap.xml')
);