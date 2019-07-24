module.exports = {
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  lintOnSave: true,
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: true
      });
  }
};
