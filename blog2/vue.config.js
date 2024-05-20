const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    proxy: {
      '/articles': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/articles': '' },
      },
    },
  },
};
