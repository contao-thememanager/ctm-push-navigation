const esbuild = require('esbuild');

// Browser
esbuild.build({
    entryPoints: ['./assets/js/pushnavigation.js'],
    outfile: './public/assets/dist/pushnavigation.js',
    minify: true,
    bundle: true,
    sourcemap: false,
    format: 'iife',
    globalName: 'PushNavigation',
    target: ['es2015']
}).catch((e) => console.error(e.message))
