// webpack.mix.js

let mix = require('laravel-mix');

mix.js('resources/js/client.js', 'public/js/client.js').sass('resources/scss/style.scss', 'public/css/style.css');