const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackAutoInject = require("webpack-auto-inject-version");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.svg$/,
        loader: "raw-loader"
      }
    ]
  },
  resolve: {
    alias: {
      home: path.resolve(__dirname, "./src/")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/public"
      }
    ]),
    new WebpackAutoInject({
      components: {
        AutoIncreaseVersion: false
      },
      componentsOptions: {
        InjectAsComment: {
          tag: "Версия: {version} - Дата: {date}",
          dateFormat: "HH:MM:ss"
        }
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: __dirname + "/src/public"
  }
};
