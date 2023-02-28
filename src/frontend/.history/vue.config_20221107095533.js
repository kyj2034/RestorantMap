const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  server: {
    port:7071, //바꿀 포트번호 입력 
  }
})
