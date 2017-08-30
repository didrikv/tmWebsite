module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "AwesomeWebsite",
      script    : "server.js",
      env_production : {
        NODE_ENV: "production"
      }
    },

  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "deploy",
      host : "188.166.148.124",
      ref  : "origin/master",
      repo : "https://github.com/didrikv/boilerplate.git",
      path : "/home/deploy/boilerplate/",
      "post-deploy" : "nvm install && npm install && /home/deploy/.nvm/versions/node/v7.6.0/bin/pm2 startOrRestart ecosystem.config.js --env production"
    },
  }
}
