import path from 'path';

export default {
    entry: './src/server/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    experiments: {
      topLevelAwait: true
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {targets: 'current node'}]
                ]
              }
            }
          }
        ]
    }
};
