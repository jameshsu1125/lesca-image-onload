const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Meta = require('./template/template.meta');
const Folder = 'bundle'; // 自動產生檔案的folder
const { NODE_ENV } = process.env;

module.exports = {
  entry: path.join(__dirname, 'src/docs'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${Folder}/js/[name].min.js`,
    publicPath: NODE_ENV === 'production' ? './' : '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: `${Folder}/image/[path][name].[ext]`, context: 'src/docs' },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      ...Meta,
      template: 'template/template.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 8000,
  },
};
