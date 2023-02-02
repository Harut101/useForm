const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonWebpackConfig = require("./webpack.config");

const prodWebpackConfig = (_, arg) => {
  return merge(commonWebpackConfig, {
    mode: "production",
    devtool: false,
    optimization: {
      minimizer: [
        new TerserPlugin({
          exclude: /\/node_modules/,
          terserOptions: {
            sourceMap: false,
            output: {
              comments: false,
            },
          },
        }),
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false
      }),
      ],
      splitChunks: false,
      runtimeChunk: false,
    },
  });
};

module.exports = new Promise((resolve, _) => {
  resolve(prodWebpackConfig);
});
