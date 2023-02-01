const { merge } = require("webpack-merge");
const commonWebpackConfig = require("./webpack.config");

const devWebpackConfig = merge(commonWebpackConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3001,
  },
});

module.exports = new Promise((resolve, _) => {
  resolve(devWebpackConfig);
});
