
var MongoClient = require('mongodb').MongoClient

let client = null;


module.exports = {
  connect: async (uri) => {
    client = await MongoClient.connect(uri, { useNewUrlParser: true} );
    return client;
  },

  client: () => {
    return client;
  }
}
