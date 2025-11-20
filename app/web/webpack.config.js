const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    ['hello-world-bundle']: './src/widgets/HelloWorld/index.js',
    ['todo-bundle']: './src/widgets/Todo/index.js',
    ['flight-search-bundle']: './src/widgets/FlightSearch/index.js',
  },
  output: {
    path: path.resolve('../server/dist'),
    filename: '[name].js',
    clean: true, // Clean the output directory before emit
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      { 
          test: /\.css?$/,
          exclude: /node_modules/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
          ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "sass-loader" }
          ]
        },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/widgets/index.html', // Your HTML template file
      filename: 'hello-world.html',
      chunks: ['hello-world-bundle'], // Inject only the 'index' JS bundle
    }),
    new HtmlWebpackPlugin({
      template: './src/widgets/index.html',
      filename: 'todo.html',
      chunks: ['todo-bundle'], // Inject only the 'about' JS bundle
    }),
    new HtmlWebpackPlugin({
      template: './src/widgets/index.html',
      filename: 'flight-search.html',
      chunks: ['flight-search-bundle'], // Inject only the 'about' JS bundle
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Allow importing .js and .jsx files without extension
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3001,
    open: true, // Open the browser after server starts
  },
  mode: 'development', // or 'production' for optimized builds
};
