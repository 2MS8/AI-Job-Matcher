const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        popup: './src/popup/index.jsx',
        sidebar: './src/sidebar/index.jsx',
        background: './src/background/service-worker.js',
        contentScript: './src/content/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: (pathData) => {
            // Keep background and content scripts in their respective folders in dist
            if (['background', 'contentScript'].includes(pathData.chunk.name)) {
                if (pathData.chunk.name === 'background') return 'background/service-worker.js';
                return 'content/contentScript.js';
            }
            return '[name]/[name].js';
        },
        clean: true
    },
    optimization: {
        // Extract shared libraries (wink-nlp, pdfjs-dist, react) into a common chunk
        splitChunks: {
            chunks(chunk) {
                // Only split popup and sidebar; background/content must remain standalone
                return ['popup', 'sidebar'].includes(chunk.name);
            },
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'shared/vendor',
                    minChunks: 2, // Only extract if used by both popup AND sidebar
                    priority: 10,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/popup.html',
            filename: 'popup/popup.html',
            chunks: ['shared/vendor', 'popup']
        }),
        new HtmlWebpackPlugin({
            template: './public/sidebar.html',
            filename: 'sidebar/sidebar.html',
            chunks: ['shared/vendor', 'sidebar']
        }),
        new CopyPlugin({
            patterns: [
                { from: 'public/manifest.json', to: 'manifest.json' },
                { from: 'public/icons', to: 'icons' },
                { from: 'src/content/injector.css', to: 'content/injector.css' },
                { from: 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs', to: 'lib/pdf.worker.min.mjs' }
            ]
        })
    ],
    // No source maps in production — saves ~6 MB
    devtool: false
};
