var Encore = require('@symfony/webpack-encore');
var path = require('path');
// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('admin', './assets/js/admin.js')
    .addEntry('front', './assets/js/front.js')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
    .configureUrlLoader({
        fonts: {limit: 4096},
        images: {limit: 4096}
    })
    .enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    .autoProvidejQuery()
    .autoProvideVariables(
        {
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'Routing': 'router'
        }
    )

    .addLoader(
        {
            test: /jsrouting-bundle\/Resources\/public\/js\/router.min.js$/,
            loader: 'exports-loader?router=window.Routing'
        }
    );
;

const config = Encore.getWebpackConfig();
config.resolve.alias = {
    '~': path.resolve(__dirname),
    'assets': path.resolve(__dirname, 'assets'),
    'theme': path.resolve(__dirname, 'assets/theme'),
    'css': path.resolve(__dirname, 'assets/css'),
    'js': path.resolve(__dirname, 'assets/js'),
    'vendor': path.resolve(__dirname, 'vendor'),
    'node_modules': path.resolve(__dirname, 'node_modules'),
    'public': path.resolve(__dirname, 'public'),
    'router': path.resolve(__dirname, 'assets/js/router.js')
};

module.exports = config;
