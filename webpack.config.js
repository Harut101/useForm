const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "./src"),
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    main: [`${PATHS.src}`],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@hook": path.resolve(__dirname, `${PATHS.src}/hook`),
      "@types": path.resolve(__dirname, `${PATHS.src}/types`),
      "@utils": path.resolve(__dirname, `${PATHS.src}/utils`),
    },
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
