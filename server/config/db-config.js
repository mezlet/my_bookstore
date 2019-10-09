const env = require('./env-config');

const { DATABASE_URL } = env;


module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    url: DATABASE_URL
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    operatorsAliases: false,
    url: DATABASE_URL,
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    operatorsAliases: false,
    url: DATABASE_URL,
    logging: false
  }
};