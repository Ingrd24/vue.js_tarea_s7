const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue.js_tarea_s7/' // Ruta en producción
    : '/' // Ruta en desarrollo
});
