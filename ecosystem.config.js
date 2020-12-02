module.exports = {
  apps : [{
    name: __dirname.split('/').pop(),
    script: 'server.js',
    args: '',
    autorestart: true,
    log_date_format: 'HH:mm:ss',
    watch: true,
    ignore_watch : [".git"],
    max_memory_restart: '2G',
  }]
};