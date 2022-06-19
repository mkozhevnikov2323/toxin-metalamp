const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = {
  entry: {
    'colors-and-type': './src/colors-and-type.pug',
    'form-elements': './src/form-elements.pug',
  },

  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '',
    filename: 'js/[name].[contenthash:8].js',
    clean: true
  },

  resolve: {
    alias: {
      Images: path.join(__dirname, './src/images/'),
      Fonts: path.join(__dirname, './src/fonts/')
    }
  },

  plugins: [
    new PugPlugin({
      modules: [
        PugPlugin.extractCss({
          filename: '[name].[contenthash:8].css'
        })
      ]
    })
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        options: {
          method: 'render',
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|ico)/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 8080,
    https: false,
    compress: true,

    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
    open: true,
  },
};
