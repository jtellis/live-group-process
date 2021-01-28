import path from 'path';
import Dotenv from 'dotenv-webpack';

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
    plugins: [ new Dotenv() ],
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
    },
    module: {
      rules: [
        {
          test: /\.g(?:raph)?ql/i,
          use: 'raw-loader'
        }
      ]
    }
};
