import env from './env-config'
const { DATABASE_URL } = env;

const db  = {
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

export default db;