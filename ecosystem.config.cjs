module.exports = {
  apps: [
    {
      name: 'storne-smartcondo',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3050',
      cwd: '/www/wwwroot/storne.com.br',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3050,
      },
    },
  ],
};
