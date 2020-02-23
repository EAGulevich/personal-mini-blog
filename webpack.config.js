const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackAutoInject = require("webpack-auto-inject-version");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
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
  watchOptions: {
    ignored: __dirname + "/src/public/report.html"
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      hash: true
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
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: __dirname + "/src/public/report.html"
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: __dirname + "/src/public"
  }
};
