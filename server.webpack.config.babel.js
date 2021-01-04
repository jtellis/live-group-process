import path from 'path';

export default {
    entry: './src/server/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    }
};
