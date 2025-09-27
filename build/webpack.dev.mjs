
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    clean: true,
    library: 'OKLISH',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../tests'),
    },
    hot: true,
    host: '0.0.0.0',
    port: 3001,
    open: true,
    watchFiles: [path.resolve(__dirname, '../src/**/*'), path.resolve(__dirname, '../tests/**/*')],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../tests/coreTestPage.html'),
    }),
  ],
};
