var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [path.resolve(__dirname, './client/src/app.js'), path.resolve(__dirname, './client/style/style.scss')],

  output: {
    path: __dirname,
    filename: 'bundle/js/app.js'
  },

  plugins: [
    new ExtractTextPlugin('bundle/css/style.css'),
    new webpack.DefinePlugin({ // The DefinePlugin allows you to create global constants which can be configured at compile time. This can be useful for allowing different behavior between development builds and production builds. If you perform logging in your development build but not in the production build you might use a global constant to determine whether logging takes place. That's where DefinePlugin shines, set it and forget it rules for development and production builds
      'process.env': { // When defining values for process prefer 'process.env.NODE_ENV': JSON.stringify('production') over process: { env: { NODE_ENV: JSON.stringify('production') } }. Using the latter will overwrite the process object which can break compatibility with some modules that expect other values on the process object to be defined
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify('http://localhost:3005/api'),
        GITHUB_LOGIN_URL: JSON.stringify('http://localhost:3005/api/auth/github')
      },
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            plugins: [
              'babel-plugin-transform-class-properties',
              'babel-plugin-syntax-dynamic-import',
              'babel-plugin-transform-object-rest-spread'
            ]
          }
        }]
      },
      {
        test: /\.(css|scss)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|wav)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192 // specifying the maximum size of a file in bytes
            }
          }
        ]
      }
    ]
  },

  stats: {
    colors: true
  },

  devtool: 'source-map'
};
