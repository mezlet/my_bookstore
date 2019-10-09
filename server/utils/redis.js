const redis = require('redis');

const client = redis.createClient(process.env.REDIS_URL);

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});


export default client;