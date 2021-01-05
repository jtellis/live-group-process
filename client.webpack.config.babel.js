import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const srcDir = './src/client';

export default {
    entry: `${srcDir}/index.js`,
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/client'),
    },
    target: 'web',
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {targets: 'defaults'}]
                ]
              }
            }
          }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: `${srcDir}/index.html`
      }) 
    ]
};
