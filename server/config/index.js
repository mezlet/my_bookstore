module.exports = {
    secret: process.env.NODE_ENV === 'development' ? process.env.SECRET : 'secret'
  };