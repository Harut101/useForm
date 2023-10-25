const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const commonWebpackConfig = require("./webpack.config");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
      ],
      splitChunks: false,
      runtimeChunk: false,
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "package.json", to: "." }],
      }),
    ],
  });
};

module.exports = new Promise((resolve, _) => {
  resolve(prodWebpackConfig);
});
