const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://task-manager-xgmq.onrender.com/', // Your backend server
      changeOrigin: true,
    })
  );
};