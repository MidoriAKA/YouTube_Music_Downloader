import type { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CspHtmlWebpackPlugin from "csp-html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isDev = process.env.NODE_ENV === "development";

const common: Configuration = {
  mode: isDev ? "development" : "production",
  externals: ["fsevents"],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      "@": __dirname + "/src",
      "@web": __dirname + "/src/web",
      "@styles": __dirname + "/src/web/styles",
      "@components": __dirname + "/src/web/components",
      "@generic": __dirname + "/src/web/components/genericComponents",
    },
  },
  output: {
    publicPath: "./",
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(ico|png|svg|eot|woff?2?)$/,
        type: "asset/resource",
      },
    ],
  },
  watch: isDev,
  devtool: isDev ? "source-map" : undefined,
};

const main: Configuration = {
  ...common,
  target: "electron-main",
  entry: {
    main: "./src/main.ts",
  },
};

const preload: Configuration = {
  ...common,
  target: "electron-preload",
  entry: {
    preload: "./src/preload.ts",
  },
};

const renderer: Configuration = {
  ...common,
  target: "web",
  entry: {
    app: "./src/web/index.tsx",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./src/web/index.html",
    }),
    new CspHtmlWebpackPlugin({
      'default-src': "'self'",
      'script-src': ["'self'", "'unsafe-inline'"],
      'style-src': ["'self'", "'unsafe-inline'"],
    }),
  ],
};

export default [main, preload, renderer];
