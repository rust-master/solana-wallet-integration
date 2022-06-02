const { ProvidePlugin } = require('webpack');

module.exports = function (config, env) {
    return {
        ...config,
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.(m?js|ts)$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                },
            ],
        },
        plugins: [
            ...config.plugins,
            new ProvidePlugin({
                process: 'process/browser',
            }),
        ],
        resolve: {
            ...config.resolve,
            fallback: {
                // "fs": false,
                // "util": false,
                // "http": false,
                // "https": false,
                // "tls": false,
                // "net": false,
                // "crypto": false,
                // "path": false,
                // "url": false,
                // "os": false,
                // "zlib": false,
                assert: require.resolve('assert'),
                buffer: require.resolve('buffer'),
                stream: require.resolve('stream-browserify'),
            },
        },
        ignoreWarnings: [/Failed to parse source map/],
    };
};
