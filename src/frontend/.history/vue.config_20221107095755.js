const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // '/api'로 들어오면 포트 7071(스프링 서버)로 보낸다.
        target: 'http://localhost:7071',
        changeOrigin: true //cross origin 허용
      }
    }
  }
})
