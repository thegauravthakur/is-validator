const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        library: {
            name: 'is',
            type: 'umd',
        },
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this',
    },
    stats: {
        errorDetails: true,
    },
};
