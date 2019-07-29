
var MongoClient = require('mongodb').MongoClient

let client = null;


module.exports = {
  connect: async (uri) => {
    client = await MongoClient.connect(uri);
    return client;
  },

  client: () => {
    return client;
  }
}
