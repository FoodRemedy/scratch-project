const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, './public'),
      // match the output 'publicPath'
      publicPath: '/',
    },
    historyApiFallback: true,
    port: 8080,
    // contentBase: path.resolve(__dirname, './public'),
  },
};
